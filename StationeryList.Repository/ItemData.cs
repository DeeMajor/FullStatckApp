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

        public ItemData(IOptions<Database> database)
        {
            _database = database.Value;
        }

        public async Task<int> Delete(int id)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = $"dbo.spItem_DeleteItem {id}";

                var rowsAffected = await connection.ExecuteAsync(sql, CommandType.StoredProcedure);

                return rowsAffected;
            }

            throw new NotImplementedException();
        }

        public async Task<List<Item>> GetAllItems()
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = "dbo.spItem_GetAll";

                List<Item> items = (List<Item>)await connection.QueryAsync<Item>(sql, CommandType.StoredProcedure);

                return items.ToList();
            }

            return null;
        }

        public async Task<Item> GetItem(int id)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = $"dbo.spItem_GetById {id}";
                var items = await connection.QueryAsync<Item>(sql, CommandType.StoredProcedure);

                return items.FirstOrDefault();
            }

            throw new NotImplementedException();
        }

        public async Task<int> InsertItem(Item item)
        {            
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = "spItem_CreateItem";

                var rowsAffected = await connection.ExecuteAsync(sql,item, commandType: CommandType.StoredProcedure);

                return rowsAffected;
            }

            throw new NotImplementedException();
        }

        public async Task<int> Update(Item item)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = "spItemUpdateItem";

                var rowsAffected = await connection.ExecuteAsync(sql, item, commandType: CommandType.StoredProcedure);

                return rowsAffected;
            }

            throw new NotImplementedException();
        }
    }
}
