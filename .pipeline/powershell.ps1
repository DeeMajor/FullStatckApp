$ErrorActionPreference = "Stop"
$configuration = "release"
$projectDir = ".\Stationery.Api"
$uiDir = ".\Stationery.UI"
$projectName = "StationeryApp"

dotnet restore --packages .\packages
dotnet build --no-restore -c $configuration /p:WarningLevel=0 .\StationeryList.sln
dotnet test --no-restore -c $configuration /p:WarningLevel=0 .\StationerAppTests\StationerAppTests.csproj
dotnet publish --no-restore -c $configuration /p:PublishDir=.\publish $projectDir\Stationery.Api.csproj

push-location $uiDir
npm install
npm run build
pop-location
copy-item -r -Path $uiDir\build -Destination $projectDir\publish\build

compress-archive -Path $projectDir\publish\* -Destination .\$projectName