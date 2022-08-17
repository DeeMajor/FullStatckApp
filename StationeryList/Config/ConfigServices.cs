﻿using Stationery.Application.Services;
using Stationery.Domain.Database;
using Stationery.Infrastructure.Exceptions;
using Stationery.Infrastructure.Mapper;
using Stationery.Infrastructure.Repositories;

namespace Stationery.Api.Config
{
    public class ConfigServices
    {
        public static void ConfigureServices(IServiceCollection services, WebApplicationBuilder builder)
        {
            services.Configure<Database>(
                builder.Configuration.GetSection("DefaultConnectionString")
                );

            services.AddTransient<IItemsService, ItemRepository>();
            services.AddTransient<IStationeryService, StationeryRepository>();
            services.AddTransient<IMapper, DapperWrapper>();
            services.AddTransient<StoredProcedure>();
            services.AddTransient<IExceptionHandling, ExceptionHandling>();
        }
    }
}
