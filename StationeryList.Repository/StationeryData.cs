using Dapper;
using Microsoft.Extensions.Options;
using StationeryList.Model;
using StationeryList.Service;
using System.Data;
using System.Data.SqlClient;

namespace StationeryList.Repository
{
    public class StationeryData : IStationeryService
    {
        private readonly Database _database;

        public StationeryData(IOptions<Database> database)
        {
            _database = database.Value;
        }


        public Task<int> DeleteStationery(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Stationery>> GetAllStationery()
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = "spStationery_GetAll";

                List<Stationery> stationery = (List<Stationery>)await connection.QueryAsync<Stationery>(sql, CommandType.StoredProcedure);

                return stationery.ToList();
            }

            return null;
        }

        public async Task<Stationery> GetStationery(int id)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = $"dbo.spStationery_GetByID {id}";
                var stationery = await connection.QueryAsync<Stationery>(sql, CommandType.StoredProcedure);

                return stationery.FirstOrDefault();
            }

            throw new NotImplementedException();
        }

        public async Task<int> InsertStationery(Stationery stationery)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = "spStationeryList_Create";

                var rowsAffected = await connection.ExecuteAsync(sql, stationery, commandType: CommandType.StoredProcedure);

                return rowsAffected;
            }

            throw new NotImplementedException();
        }

        public async Task<int> UpdateStationery(Stationery stationery)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = "spStationeryList_Update";

                var rowsAffected = await connection.ExecuteAsync(sql, stationery, commandType: CommandType.StoredProcedure);

                return rowsAffected;
            }

            throw new NotImplementedException();
        }
    }
}
