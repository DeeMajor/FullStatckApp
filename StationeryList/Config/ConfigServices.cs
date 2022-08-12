using StationeryList.Model;
using StationeryList.Repository;
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
            services.AddTransient<StoredProcedure>();
        }
    }
}
