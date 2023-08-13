FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /App

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /App
COPY --from=build-env /App/out .

# Generate a self-signed SSL certificate
# RUN openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout app.key -out app.crt -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# ENV ASPNETCORE_URLS=https://+:443;http://+:80
# ENV ASPNETCORE_HTTPS_PORT=443
# ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/App/app.crt
# ENV ASPNETCORE_Kestrel__Certificates__Default__Password=

ENTRYPOINT ["dotnet", "Stationery.Api.dll"]