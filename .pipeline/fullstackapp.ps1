$ErrorActionPreference = "Stop"
$configuration = "release"
$projectDir = ".\Stationery.Api"
$uiDir = ".\Stationery.UI"
$projectName = "StationeryApp"

function catcher{
    if ($LASTEXITCODE -ne 0) {Write-Host "ERROR!!!!"; exit}
}


dotnet restore --packages .\packages
catcher
dotnet build --no-restore -c $configuration .\StationeryList.sln
catcher
dotnet test --no-restore -c $configuration .\StationerAppTests\StationerAppTests.csproj
catcher
dotnet publish --no-restore -c $configuration /p:PublishDir=.\publish $projectDir\Stationery.Api.csproj
catcher


push-location $uiDir
npm install
npm run build
pop-location

copy-item -r -Path $uiDir\build -Destination $projectDir\publish\build
compress-archive -Path $projectDir\publish\* -Destination .\$projectName