param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^[0-9]{8}-[0-9]{6}$')]
  [string]$Stamp
)

$ErrorActionPreference = 'Stop'

$workspaceRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$expectedRoot = 'E:\FAA\workspace'
if ($workspaceRoot -ne $expectedRoot) {
  throw "Production packages may only be created from $expectedRoot"
}

function Assert-FrontendBundle {
  param(
    [Parameter(Mandatory = $true)][string]$BundleRoot,
    [Parameter(Mandatory = $true)][string]$PublicPrefix,
    [Parameter(Mandatory = $true)][int]$MinimumAssetCount
  )

  $indexPath = Join-Path $BundleRoot 'index.html'
  $assetsPath = Join-Path $BundleRoot 'assets'
  $brandIconPath = Join-Path $BundleRoot 'ffax.svg'
  $legacyIconPath = Join-Path $BundleRoot 'aurora.svg'
  if (-not (Test-Path -LiteralPath $indexPath -PathType Leaf)) {
    throw "Missing frontend entry: $indexPath"
  }
  if (-not (Test-Path -LiteralPath $assetsPath -PathType Container)) {
    throw "Missing frontend asset directory: $assetsPath"
  }
  if (-not (Test-Path -LiteralPath $brandIconPath -PathType Leaf)) {
    throw "Missing FFA-X brand icon: $brandIconPath"
  }
  if (Test-Path -LiteralPath $legacyIconPath) {
    throw "Legacy Aurora brand icon remains in frontend bundle: $legacyIconPath"
  }

  $assetCount = @(Get-ChildItem -LiteralPath $assetsPath -File -Recurse).Count
  if ($assetCount -lt $MinimumAssetCount) {
    throw "Incomplete frontend bundle: $BundleRoot contains only $assetCount asset files"
  }

  $indexHtml = Get-Content -LiteralPath $indexPath -Raw
  $forbiddenBranding = @(
    'aurora.svg',
    'Aurora, the intuitive',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'prium.github.io/aurora'
  )
  foreach ($forbiddenValue in $forbiddenBranding) {
    if ($indexHtml.Contains($forbiddenValue, [StringComparison]::OrdinalIgnoreCase)) {
      throw "Legacy or remote template dependency remains in $indexPath`: $forbiddenValue"
    }
  }
  $references = [regex]::Matches($indexHtml, '(?:src|href)="([^"]+)"')
  foreach ($reference in $references) {
    $url = $reference.Groups[1].Value -replace '[?#].*$', ''
    if (-not $url.StartsWith("${PublicPrefix}assets/", [StringComparison]::Ordinal)) {
      continue
    }
    $relative = $url.Substring($PublicPrefix.Length).Replace('/', [IO.Path]::DirectorySeparatorChar)
    $assetPath = Join-Path $BundleRoot $relative
    if (-not (Test-Path -LiteralPath $assetPath -PathType Leaf)) {
      throw "Missing frontend asset referenced by $indexPath`: $url"
    }
  }
}

Assert-FrontendBundle -BundleRoot (Join-Path $workspaceRoot 'dist') -PublicPrefix '/workbench/' -MinimumAssetCount 20
Assert-FrontendBundle -BundleRoot (Join-Path $workspaceRoot 'dist-root') -PublicPrefix '/' -MinimumAssetCount 20

$archivePath = "E:\FAA\ffax-release-${Stamp}.tar.gz"
if (Test-Path -LiteralPath $archivePath) {
  Remove-Item -LiteralPath $archivePath -Force
}

$excludePatterns = @(
  '--exclude=.git',
  '--exclude=.DS_Store',
  '--exclude=.idea',
  '--exclude=node_modules',
  '--exclude=.nx',
  '--exclude=.next',
  '--exclude=.turbo',
  '--exclude=.vite',
  '--exclude=coverage',
  '--exclude=playwright-report',
  '--exclude=test-results',
  '--exclude=*.test.ts',
  '--exclude=*.test.tsx',
  '--exclude=*.spec.ts',
  '--exclude=*.spec.tsx',
  '--exclude=*.snap',
  '--exclude=*.log',
  '--exclude=*.tar',
  '--exclude=*.tar.gz',
  '--exclude=*.tgz',
  '--exclude=*.zip',
  '--exclude=*.7z',
  '--exclude=*.bak',
  '--exclude=*.old',
  '--exclude=*.orig',
  '--exclude=.env',
  '--exclude=*.env.local',
  '--exclude=*.env.production',
  '--exclude=*.env.prod',
  '--exclude=*.env.test',
  '--exclude=infra/zitadel/generated'
)

& tar @excludePatterns -czf $archivePath -C $workspaceRoot .
if ($LASTEXITCODE -ne 0) {
  throw 'tar failed while creating the production archive'
}

$entries = @(& tar -tzf $archivePath)
if ($LASTEXITCODE -ne 0) {
  throw 'Unable to inspect the production archive'
}

$distAssetCount = @($entries | Where-Object { $_ -like './dist/assets/*' -and -not $_.EndsWith('/') }).Count
$rootAssetCount = @($entries | Where-Object { $_ -like './dist-root/assets/*' -and -not $_.EndsWith('/') }).Count
if ($distAssetCount -lt 20 -or $rootAssetCount -lt 20) {
  throw "Archive verification failed: workbench=$distAssetCount, root=$rootAssetCount"
}
$forbiddenEntries = $entries | Where-Object {
  if ($_ -match '\.env(?:\.[^/]+)*\.(example|template)$') {
    return $false
  }
  $_ -match '(^|/)(node_modules|\.git|\.idea|logs?)(/|$)|(^|/)\.DS_Store$|\.(test|spec)\.(ts|tsx|js|jsx)$|\.snap$|(^|/)(\.env|[^/]+\.env(?:\.[^/]+)?$)|\.(log|tar|tar\.gz|tgz|zip|7z|bak|old|orig)$'
}
if ($forbiddenEntries) {
  throw 'Archive contains a forbidden backup, log, secret, dependency, or nested archive entry'
}

Write-Output $archivePath
Write-Output "workbench-assets=$distAssetCount"
Write-Output "root-assets=$rootAssetCount"
