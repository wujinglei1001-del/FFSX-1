param(
  [Parameter(Mandatory = $true)]
  [ValidatePattern('^v[0-9]+\.[0-9]+\.[0-9]+-ffax\.[0-9]+$')]
  [string]$ReleaseVersion
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
  if (-not (Test-Path -LiteralPath $indexPath -PathType Leaf)) {
    throw "Missing frontend entry: $indexPath"
  }
  if (-not (Test-Path -LiteralPath $assetsPath -PathType Container)) {
    throw "Missing frontend asset directory: $assetsPath"
  }

  $assetCount = @(Get-ChildItem -LiteralPath $assetsPath -File -Recurse).Count
  if ($assetCount -lt $MinimumAssetCount) {
    throw "Incomplete frontend bundle: $BundleRoot contains only $assetCount asset files"
  }

  $indexHtml = Get-Content -LiteralPath $indexPath -Raw

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

$archivePath = "E:\FAA\ffax-release-${ReleaseVersion}.tar.gz"
$tarPath = "E:\FAA\ffax-release-${ReleaseVersion}.tar"
if (Test-Path -LiteralPath $archivePath) {
  Remove-Item -LiteralPath $archivePath -Force
}
if (Test-Path -LiteralPath $tarPath) {
  Remove-Item -LiteralPath $tarPath -Force
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
  '--exclude=./src/layouts/main-layout/ComboLayout.jsx',
  '--exclude=.env',
  '--exclude=*.env.local',
  '--exclude=*.env.production',
  '--exclude=*.env.prod',
  '--exclude=*.env.test',
  '--exclude=infra/zitadel/generated'
)

& tar @excludePatterns -cf $tarPath -C $workspaceRoot .
if ($LASTEXITCODE -ne 0) {
  throw 'tar failed while creating the production archive'
}

# Windows bsdtar can misidentify this Aurora layout file as the output archive.
# Copy it to a scoped staging path so it receives a fresh file identity, then append it.
$appendRoot = [IO.Path]::GetFullPath("E:\FAA\.ffax-release-staging-${ReleaseVersion}")
if (-not $appendRoot.StartsWith('E:\FAA\.ffax-release-staging-', [StringComparison]::OrdinalIgnoreCase)) {
  throw "Unexpected release staging path: $appendRoot"
}
if (Test-Path -LiteralPath $appendRoot) {
  Remove-Item -LiteralPath $appendRoot -Recurse -Force
}
$appendDirectory = Join-Path $appendRoot 'src\layouts\main-layout'
New-Item -ItemType Directory -Path $appendDirectory -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $workspaceRoot 'src\layouts\main-layout\ComboLayout.jsx') -Destination $appendDirectory
try {
  & tar -rf $tarPath -C $appendRoot 'src/layouts/main-layout/ComboLayout.jsx'
  if ($LASTEXITCODE -ne 0) {
    throw 'Unable to append the Aurora ComboLayout source to the production archive'
  }
} finally {
  Remove-Item -LiteralPath $appendRoot -Recurse -Force
}

$source = [IO.File]::OpenRead($tarPath)
try {
  $destination = [IO.File]::Create($archivePath)
  try {
    $gzip = [IO.Compression.GZipStream]::new(
      $destination,
      [IO.Compression.CompressionLevel]::Optimal,
      $true
    )
    try {
      $source.CopyTo($gzip)
    } finally {
      $gzip.Dispose()
    }
  } finally {
    $destination.Dispose()
  }
} finally {
  $source.Dispose()
  Remove-Item -LiteralPath $tarPath -Force
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
if (
  $entries -notcontains './src/layouts/main-layout/ComboLayout.jsx' -and
  $entries -notcontains 'src/layouts/main-layout/ComboLayout.jsx'
) {
  throw 'Archive verification failed: Aurora ComboLayout source is missing'
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
