using Dapper;
using Microsoft.Extensions.Options;
using StationeryList.Model;
using StationeryList.Repository.Exceptions;
using StationeryList.Service;
using System.Data;
using System.Data.SqlClient;

namespace StationeryList.Repository
{
    public class ItemData : IItemsService
    {
        private readonly Database _database;
        private readonly StoredProcedure _storedProcedure;
        private readonly ExceptionHandling _exceptionHandling;

        public ItemData(IOptions<Database> database, StoredProcedure storedProcedure, ExceptionHandling exceptionHandling)
        {
            _database = database.Value;
            _storedProcedure = storedProcedure;
            _exceptionHandling = exceptionHandling;
        }

        public async Task Delete(int id)
        {

            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = $"{_storedProcedure.SPItemDelete} {id}";
                var rowsAffected = await connection.ExecuteAsync(sql, CommandType.StoredProcedure);

                await _exceptionHandling.CheckForNull(rowsAffected);
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
                var item = await connection.QueryFirstAsync<Item>(sql, CommandType.StoredProcedure);

                return item;
            }
        }

        public async Task InsertItem(Item item)
        {            
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var rowsAffected = await connection.ExecuteAsync(
                    _storedProcedure.SPItemCreate, 
                    item, 
                    commandType: CommandType.StoredProcedure);

                await _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task Update(Item item)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var rowsAffected = await connection.ExecuteAsync(
                    _storedProcedure.SPItemUpdate, 
                    item, 
                    commandType: CommandType.StoredProcedure);

                await _exceptionHandling.CheckForNull(rowsAffected);
            }
        }
    }
}
