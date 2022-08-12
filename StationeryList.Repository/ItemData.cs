using Dapper;
using Microsoft.Extensions.Options;
using StationeryList.Model;
using StationeryList.Service;
using System.Data;
using System.Data.SqlClient;

namespace StationeryList.Repository
{
    public class ItemData : IItemsService
    {
        private readonly Database _database;
        private readonly StoredProcedure _storedProcedure;

        public ItemData(IOptions<Database> database, StoredProcedure storedProcedure)
        {
            _database = database.Value;
            _storedProcedure = storedProcedure;
        }

        public async Task<int> Delete(int id)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = $"{_storedProcedure.SPItemDelete} {id}";
                var rowsAffected = await connection.ExecuteAsync(sql, CommandType.StoredProcedure);

                return rowsAffected;
            }
        }

        public async Task<List<Item>> GetAllItems()
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var items = (List<Item>)await connection.QueryAsync<Item>(
                    _storedProcedure.SPItemGetAll, 
                    CommandType.StoredProcedure);

                return items.ToList();
            }
        }

        public async Task<Item> GetItem(int id)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = $"{_storedProcedure.SPItemGetById} {id}";
                var items = await connection.QueryAsync<Item>(sql, CommandType.StoredProcedure);

                return items.FirstOrDefault();
            }
        }

        public async Task<int> InsertItem(Item item)
        {            
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var rowsAffected = await connection.ExecuteAsync(
                    _storedProcedure.SPItemCreate, 
                    item, 
                    commandType: CommandType.StoredProcedure);

                return rowsAffected;
            }
        }

        public async Task<int> Update(Item item)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var rowsAffected = await connection.ExecuteAsync(
                    _storedProcedure.SPItemUpdate, 
                    item, 
                    commandType: CommandType.StoredProcedure);

                return rowsAffected;
            }
        }
    }
}
