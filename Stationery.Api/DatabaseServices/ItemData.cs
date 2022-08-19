using Dapper;
using Microsoft.Extensions.Options;
using StationeryList.Interfaces;
using StationeryList.Models;
using System.Data;
using System.Data.SqlClient;

namespace StationeryList.DatabaseServices
{
    public class ItemData : IItemData
    {
        private readonly Database _database;

        public ItemData(IOptions<Database> database)
        {
            _database = database.Value;
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Item>> GetAllItems()
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                List<Item> items = (List<Item>)await connection.QueryAsync<Item>(@"SELECT * FROM [DBO].[tbl_Item]");

                return items.ToList();
            }

            return null;
        }

        public Task<Item> GetItem(int id)
        {
            throw new NotImplementedException();
        }

        public Task Update(Item item)
        {
            throw new NotImplementedException();
        }
    }
}
