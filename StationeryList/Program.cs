using StationeryList.Model;
using StationeryList.Repository;
using StationeryList.Service;

var builder = WebApplication.CreateBuilder(args);


ConfigureServices(builder.Services);

void ConfigureServices(IServiceCollection services)
{
    services.Configure<Database>(
        builder.Configuration.GetSection("DefaultConnectionString")
        );

    services.AddTransient<IItemsService, ItemData>();
    services.AddTransient<IStationeryService, StationeryData>();
    services.AddTransient<StoredProcedure>();
}
    // Add services to the container.

    builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
