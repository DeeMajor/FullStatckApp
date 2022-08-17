using StationeryList.Model;
using StationeryList.Repository;
using StationeryList.Repository.Dapper;
using StationeryList.Repository.Exceptions;
using StationeryList.Service;

namespace StationeryList.Config
{
    public class ConfigServices
    {
        public static void ConfigureServices(IServiceCollection services, WebApplicationBuilder builder)
        {
            services.Configure<Database>(
                builder.Configuration.GetSection("DefaultConnectionString")
                );

            services.AddTransient<IItemsService, ItemData>();
            services.AddTransient<IStationeryService, StationeryData>();
            services.AddTransient<IDapperWrapper, DapperWrapper>();
            services.AddTransient<StoredProcedure>();
            services.AddTransient<ExceptionHandling>();
        }
    }
}
