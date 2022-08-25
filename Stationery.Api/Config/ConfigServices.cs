using Stationery.Api.Agents;
using Stationery.Api.Interfaces;
using Stationery.Api.Models.Common;
using Stationery.Api.Repository.Exceptions;
using Stationery.Api.Repository.Mapper;
using Stationery.Application.Services;
using Stationery.Infrastructure.Repositories;

namespace Stationery.Api.Config
{
    public class ConfigServices
    {
        public static void ConfigureServices(IServiceCollection services, WebApplicationBuilder builder)
        {
            services.Configure<Connection>(
                builder.Configuration.GetSection("DefaultConnectionString")
                );

            services.AddTransient<IItemsService, ItemRepository>();
            services.AddTransient<IStationeryService, StationeryRepository>();
            services.AddTransient<IMapper, DapperWrapper>();
            services.AddTransient<IExceptionHandling, ExceptionHandling>();
            services.AddTransient<ItemAgent>();
        }
    }
}
