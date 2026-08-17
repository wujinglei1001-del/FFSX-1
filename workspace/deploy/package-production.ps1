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
    [Parameter(Mandatory = $true)][string]$PublicPrefix
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
  if ($assetCount -lt 200) {
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

Assert-FrontendBundle -BundleRoot (Join-Path $workspaceRoot 'dist') -PublicPrefix '/workbench/'
Assert-FrontendBundle -BundleRoot (Join-Path $workspaceRoot 'dist-root') -PublicPrefix '/'

$archivePath = "E:\FAA\ffax-release-${Stamp}.tar.gz"
if (Test-Path -LiteralPath $archivePath) {
  Remove-Item -LiteralPath $archivePath -Force
}

$excludePatterns = @(
  '--exclude=.git',
  '--exclude=node_modules',
  '--exclude=.nx',
  '--exclude=.next',
  '--exclude=.turbo',
  '--exclude=.vite',
  '--exclude=coverage',
  '--exclude=playwright-report',
  '--exclude=test-results',
  '--exclude=infra/zitadel/custom-login/apps/login/screenshots',
  '--exclude=infra/zitadel/custom-login/apps/login/acceptance',
  '--exclude=infra/zitadel/custom-login/apps/login/dockerized',
  '--exclude=infra/zitadel/custom-login/apps/login/test-mocks',
  '--exclude=infra/zitadel/custom-login/apps/login/test-setup.ts',
  '--exclude=infra/zitadel/custom-login/apps/login/test-theme.js',
  '--exclude=infra/zitadel/custom-login/apps/login/vitest.config.ts',
  '--exclude=infra/zitadel/custom-login/apps/login/vitest.config.dockerized.ts',
  '--exclude=infra/zitadel/custom-login/apps/login/src/app/otel-test',
  '--exclude=*.test.ts',
  '--exclude=*.test.tsx',
  '--exclude=*.spec.ts',
  '--exclude=*.spec.tsx',
  '--exclude=*.snap',
  '--exclude=*.log',
  '--exclude=*.tar',
  '--exclude=*.tar.gz',
  '--exclude=*.zip',
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
if ($distAssetCount -lt 200 -or $rootAssetCount -lt 200) {
  throw "Archive verification failed: workbench=$distAssetCount, root=$rootAssetCount"
}
$forbiddenEntries = $entries | Where-Object {
  if ($_ -match '\.env(?:\.[^/]+)*\.(example|template)$') {
    return $false
  }
  $_ -match '(^|/)(node_modules|\.git|logs?)(/|$)|infra/zitadel/custom-login/apps/login/(screenshots|acceptance|dockerized|test-mocks|src/app/otel-test)(/|$)|infra/zitadel/custom-login/apps/login/(test-setup\.ts|test-theme\.js|vitest\.config(?:\.dockerized)?\.ts)$|\.(test|spec)\.(ts|tsx|js|jsx)$|\.snap$|(^|/)(\.env|[^/]+\.env(?:\.[^/]+)?$)|\.log$|\.tar\.gz$'
}
if ($forbiddenEntries) {
  throw 'Archive contains a forbidden backup, log, secret, dependency, or nested archive entry'
}

Write-Output $archivePath
Write-Output "workbench-assets=$distAssetCount"
Write-Output "root-assets=$rootAssetCount"
