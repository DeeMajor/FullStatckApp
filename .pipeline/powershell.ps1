$configuration = "release"
$projectDir = ".\Stationery.Api"
$uiDir = ".\Stationery.UI"
$projectName = "StationeryApp"

dotnet restore
dotnet build --no-restore -c $configuration .\StationeryList.sln
dotnet test --no-restore .\StationerAppTests\StationerAppTests.csproj
dotnet publish --no-restore -c $configuration -p:PublishDir=.\publish $projectDir\Stationery.Api.csproj

push-location $uiDir
npm install
npm run build
pop-location
copy-item -r -Path $uiDir\build -Destination $projectDir\publish\build

Compress-Archive -Path $projectDir\publish\* -Destination .\$projectName