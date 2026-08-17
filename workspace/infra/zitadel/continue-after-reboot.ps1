[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$taskName = 'FFAX-PostReboot-Setup'
$workspace = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$dockerExe = 'C:\Program Files\Docker\Docker\resources\bin\docker.exe'
$dockerDesktop = 'C:\Program Files\Docker\Docker\Docker Desktop.exe'
$nodeExe = 'C:\Program Files\nodejs\node.exe'
$success = $false

function Wait-Url([string]$Url, [int]$Attempts = 120) {
  for ($attempt = 1; $attempt -le $Attempts; $attempt += 1) {
    try {
      $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
        return $true
      }
    }
    catch {
      Start-Sleep -Seconds 3
    }
  }

  return $false
}

try {
  Set-Location -LiteralPath $workspace

  if (-not (Get-Process -Name 'Docker Desktop' -ErrorAction SilentlyContinue)) {
    Start-Process -FilePath $dockerDesktop -WindowStyle Hidden
  }

  $dockerReady = $false
  for ($attempt = 1; $attempt -le 180; $attempt += 1) {
    & $dockerExe version --format '{{.Server.Version}}' *> $null
    if ($LASTEXITCODE -eq 0) {
      $dockerReady = $true
      break
    }
    Start-Sleep -Seconds 5
  }

  if (-not $dockerReady) {
    throw 'Docker Linux engine did not become ready after restart.'
  }

  $env:Path = (Split-Path -Parent $dockerExe) + ';' + $env:Path
  & powershell.exe -NoProfile -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'setup.ps1')
  if ($LASTEXITCODE -ne 0) {
    throw 'ZITADEL setup failed after restart.'
  }

  if (-not (Wait-Url 'http://localhost:8080/.well-known/openid-configuration')) {
    throw 'ZITADEL OIDC discovery endpoint is unavailable.'
  }

  if (-not (Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue)) {
    Start-Process `
      -FilePath $nodeExe `
      -ArgumentList @('server/index.js') `
      -WorkingDirectory $workspace `
      -WindowStyle Hidden
  }

  $env:NODE_OPTIONS = '--max-old-space-size=8192'
  if (-not (Get-NetTCPConnection -LocalPort 5002 -State Listen -ErrorAction SilentlyContinue)) {
    Start-Process `
      -FilePath $nodeExe `
      -ArgumentList @('node_modules/vite/bin/vite.js', '--host', '0.0.0.0', '--port', '5002') `
      -WorkingDirectory $workspace `
      -WindowStyle Hidden
  }

  if (-not (Wait-Url 'http://localhost:8000/api/health' 80)) {
    throw 'FFAX API health endpoint is unavailable.'
  }

  if (-not (Wait-Url 'http://localhost:5002/authentication/default/jwt/login' 80)) {
    throw 'FFAX frontend is unavailable.'
  }

  $unauthorizedProtectedRoute = $false
  try {
    Invoke-WebRequest `
      -Uri 'http://localhost:8000/api/auth/profile' `
      -UseBasicParsing `
      -TimeoutSec 5 | Out-Null
  }
  catch {
    if ([int]$_.Exception.Response.StatusCode -eq 401) {
      $unauthorizedProtectedRoute = $true
    }
  }

  if (-not $unauthorizedProtectedRoute) {
    throw 'FFAX API protected route did not enforce authentication.'
  }

  $success = $true
  Start-Process 'http://localhost:5002/authentication/default/jwt/login'
}
finally {
  if ($success) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
  }
}
