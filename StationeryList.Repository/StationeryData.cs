using Dapper;
using Microsoft.Extensions.Options;
using StationeryList.Model;
using StationeryList.Repository.Dapper;
using StationeryList.Repository.Exceptions;
using StationeryList.Service;
using System.Data;
using System.Data.SqlClient;

namespace StationeryList.Repository
{
    public class StationeryData : IStationeryService
    {
        private readonly Database _database;
        private readonly StoredProcedure _storedProcedure;
        private readonly ExceptionHandling _exceptionHandling;
        private readonly IDapperWrapper _dapperWrapper;

        public StationeryData(IOptions<Database> database, StoredProcedure storedProcedure, ExceptionHandling exceptionHandling, IDapperWrapper dapperWrapper)
        {
            _database = database.Value;
            _storedProcedure = storedProcedure;
            _exceptionHandling = exceptionHandling;
            _dapperWrapper = dapperWrapper;
        }


        public async Task<int> DeleteStationery(int id)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = $"{_storedProcedure.SPStationeryDelete} {id}";
                var rowsAffected = await _dapperWrapper.ExecuteDeleteAsync(connection, sql);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task<List<Stationery>> GetAllStationery()
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {                
                var stationery = await _dapperWrapper.QueryAsync<Stationery>(connection, _storedProcedure.SPStationeryGetAll);

                foreach (Stationery stat in stationery)
                {
                    var ItemsSql = $"{_storedProcedure.SPStationeryGetItemsForList} {stat.Id}";
                    var items = await _dapperWrapper.QueryAsync<Item>(connection, ItemsSql);
                    stat.Items = items;
                }

                return stationery.ToList();
            }
        }

        public async Task<Stationery> GetStationery(int id)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = $"{_storedProcedure.SPStationeryGetById} {id}";
                var multiQueries = await _dapperWrapper.QueryMultipleAsync(connection, sql);
                var stationery = multiQueries.Read<Stationery>().First();
                stationery.Items = multiQueries.Read<Item>().ToList();

                return stationery;
            }
        }

        public async Task<int> InsertStationery(Stationery stationery)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var rowsAffected = await _dapperWrapper.ExecuteInsertAsync(connection, _storedProcedure.SPStationeryCreate, stationery);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task<int> UpdateStationery(Stationery stationery)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var rowsAffected = await _dapperWrapper.ExecuteUpdateAsync(connection, _storedProcedure.SPStationeryUpdate, stationery);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }
    }
}
