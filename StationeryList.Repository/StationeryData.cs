using Dapper;
using Microsoft.Extensions.Options;
using StationeryList.Model;
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

        public StationeryData(IOptions<Database> database, StoredProcedure storedProcedure, ExceptionHandling exceptionHandling)
        {
            _database = database.Value;
            _storedProcedure = storedProcedure;
            _exceptionHandling = exceptionHandling;
        }


        public async Task<int> DeleteStationery(int id)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = $"{_storedProcedure.SPStationeryDelete} {id}";
                var rowsAffected = await connection.ExecuteAsync(sql, CommandType.StoredProcedure);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task<List<Stationery>> GetAllStationery()
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var stationery = (List<Stationery>) await connection.QueryAsync<Stationery>(_storedProcedure.SPStationeryGetAll, CommandType.StoredProcedure);

                foreach (Stationery stat in stationery)
                {
                    var ItemsSql = $"{_storedProcedure.SPStationeryGetItemsForList} {stat.Id}";
                    var items = (List<Item>) await connection.QueryAsync<Item>(ItemsSql, CommandType.StoredProcedure);
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
                var multiQueries = await connection.QueryMultipleAsync(sql, CommandType.StoredProcedure);
                var stationery = multiQueries.Read<Stationery>().First();
                stationery.Items = multiQueries.Read<Item>().ToList();

                return stationery;
            }
        }

        public async Task<int> InsertStationery(Stationery stationery)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var rowsAffected = await connection.ExecuteAsync(
                    _storedProcedure.SPStationeryCreate, 
                    stationery, 
                    commandType: CommandType.StoredProcedure);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task<int> UpdateStationery(Stationery stationery)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {

                var rowsAffected = await connection.ExecuteAsync(
                    _storedProcedure.SPStationeryUpdate, 
                    stationery, 
                    commandType: CommandType.StoredProcedure);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }
    }
}
