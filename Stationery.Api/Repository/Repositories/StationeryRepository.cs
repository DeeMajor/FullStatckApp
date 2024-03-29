﻿using Microsoft.Extensions.Options;
using Stationery.Api.Interfaces;
using Stationery.Api.Models.Common;
using Stationery.Api.Models.Entities;
using Stationery.Api.Repository.Database;
using Stationery.Application.Services;
using System.Data;
using System.Data.SqlClient;

namespace Stationery.Api.Repository.Repositories
{
    public class StationeryRepository : IStationeryService
    {
        private readonly Connection _connecta;
        private readonly IExceptionHandling _exceptionHandling;
        private readonly IMapper _dapperWrapper;

        public StationeryRepository(IOptions<Connection> connecta, IExceptionHandling exceptionHandling, IMapper dapperWrapper)
        {
            _connecta = connecta.Value;
            _exceptionHandling = exceptionHandling;
            _dapperWrapper = dapperWrapper;
        }


        public async Task<int> DeleteStationery(int id)
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var sql = $"{StoredProcedure.SPStationeryDelete} {id}";
                var rowsAffected = await _dapperWrapper.ExecuteDeleteAsync(connection, sql);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task<List<StationeryList>> GetAllStationery()
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var stationery = await _dapperWrapper.QueryAsync<StationeryList>(connection, StoredProcedure.SPStationeryGetAll);

                foreach (StationeryList stat in stationery)
                {
                    var ItemsSql = $"{StoredProcedure.SPItemListGetById} {stat.Id}";
                    var items = await _dapperWrapper.QueryAsync<Item>(connection, ItemsSql);
                    stat.Items = items;
                }

                return stationery.ToList();
            }
        }

        public async Task<StationeryList> GetStationery(int id)
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var sql = $"{StoredProcedure.SPItemListGetById} {id}";
                var multiQueries = await _dapperWrapper.QueryMultipleAsync(connection, sql);
                var stationery = multiQueries.Read<StationeryList>().First();
                stationery.Items = multiQueries.Read<Item>().ToList();

                return stationery;
            }
        }

        public async Task<int> InsertStationery(StationeryList stationery)
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var rowsAffected = await _dapperWrapper.ExecuteInsertAsync(connection, StoredProcedure.SPStationeryCreate, stationery);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task<int> UpdateStationery(StationeryList stationery)
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var rowsAffected = await _dapperWrapper.ExecuteUpdateAsync(connection, StoredProcedure.SPStationeryUpdate, stationery);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }
    }
}
