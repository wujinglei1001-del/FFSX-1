[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$infraPath = $PSScriptRoot
$workspacePath = Resolve-Path (Join-Path $infraPath '..\..')
$envPath = Join-Path $infraPath '.env'
$examplePath = Join-Path $infraPath '.env.example'
$generatedPath = Join-Path $infraPath 'generated'

function New-RandomHex([int]$ByteCount) {
  $bytes = [byte[]]::new($ByteCount)
  $generator = [System.Security.Cryptography.RandomNumberGenerator]::Create()
  try {
    $generator.GetBytes($bytes)
  }
  finally {
    $generator.Dispose()
  }

  return -join ($bytes | ForEach-Object { $_.ToString('x2') })
}

function Merge-EnvFile([string]$SourcePath, [string]$DestinationPath) {
  $updates = [ordered]@{}
  foreach ($line in Get-Content -LiteralPath $SourcePath) {
    if ($line -match '^([^#=]+)=(.*)$') {
      $updates[$Matches[1]] = $Matches[2]
    }
  }

  $result = [System.Collections.Generic.List[string]]::new()
  $written = [System.Collections.Generic.HashSet[string]]::new()
  if (Test-Path -LiteralPath $DestinationPath) {
    foreach ($line in Get-Content -LiteralPath $DestinationPath) {
      if ($line -match '^([^#=]+)=(.*)$' -and $updates.Contains($Matches[1])) {
        $key = $Matches[1]
        $result.Add("$key=$($updates[$key])")
        [void]$written.Add($key)
      }
      else {
        $result.Add($line)
      }
    }
  }

  foreach ($key in $updates.Keys) {
    if (-not $written.Contains($key)) {
      $result.Add("$key=$($updates[$key])")
    }
  }

  $destinationDirectory = Split-Path -Parent $DestinationPath
  if (-not (Test-Path -LiteralPath $destinationDirectory)) {
    New-Item -ItemType Directory -Path $destinationDirectory | Out-Null
  }
  [System.IO.File]::WriteAllLines(
    $DestinationPath,
    $result,
    [System.Text.UTF8Encoding]::new($false)
  )
}

function Get-EnvValue([string]$Path, [string]$Name) {
  foreach ($line in Get-Content -LiteralPath $Path) {
    if ($line -match "^$([Regex]::Escape($Name))=(.*)$") {
      return $Matches[1].Trim()
    }
  }

  return ''
}

if (-not (Test-Path -LiteralPath $envPath)) {
  $content = Get-Content -Raw -LiteralPath $examplePath
  $content = $content.Replace('replace-with-32-character-secret', (New-RandomHex 16))
  $content = $content.Replace('replace-with-a-strong-password', (New-RandomHex 24))
  $content = $content.Replace(
    'replace-with-a-strong-admin-password',
    ('Aa1!' + (New-RandomHex 14))
  )
  [System.IO.File]::WriteAllText($envPath, $content, [System.Text.UTF8Encoding]::new($false))
}

Push-Location $infraPath
try {
  $composeFiles = @('-f', 'docker-compose.yml')
  if (Get-EnvValue -Path $envPath -Name 'ZITADEL_SMTP_HOST') {
    $composeFiles += @('-f', 'docker-compose.smtp.yml')
  }

  docker compose --env-file .env @composeFiles up -d --wait postgres zitadel-api proxy
  if ($LASTEXITCODE -ne 0) { throw 'ZITADEL services failed to start.' }

  docker compose --env-file .env @composeFiles --profile setup run --rm zitadel-provision
  if ($LASTEXITCODE -ne 0) { throw 'ZITADEL FFAX provisioning failed.' }

  Merge-EnvFile `
    -SourcePath (Join-Path $generatedPath 'frontend.env.local') `
    -DestinationPath (Join-Path $workspacePath '.env.local')
  Merge-EnvFile `
    -SourcePath (Join-Path $generatedPath 'server.env') `
    -DestinationPath (Join-Path $workspacePath 'server\.env')
}
finally {
  Pop-Location
}

Write-Host 'ZITADEL is configured and FFAX environment files are connected.'
