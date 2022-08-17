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
    public class ItemData : IItemsService
    {
        private readonly Database _database;
        private readonly StoredProcedure _storedProcedure;
        private readonly ExceptionHandling _exceptionHandling;
        private readonly IDapperWrapper _dapperWrapper;

        public ItemData(IOptions<Database> database, StoredProcedure storedProcedure, ExceptionHandling exceptionHandling, IDapperWrapper dapperWrapper)
        {
            _database = database.Value;
            _storedProcedure = storedProcedure;
            _exceptionHandling = exceptionHandling;
            _dapperWrapper = dapperWrapper;
        }

        public async Task<int> Delete(int id)
        {

            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = $"{_storedProcedure.SPItemDelete} {id}";
                var rowsAffected = await _dapperWrapper.ExecuteDeleteAsync(connection, sql);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task<List<Item>> GetAllItems()
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var items = await _dapperWrapper.QueryAsync<Item>(connection, _storedProcedure.SPItemGetAll);

                return items.ToList();
            }
        }

        public async Task<Item> GetItem(int id)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var sql = $"{_storedProcedure.SPItemGetById} {id}";
                var item = await _dapperWrapper.QueryFirstAsync<Item>(connection, sql);

                return item;
            }
        }

        public async Task<int> InsertItem(Item item)
        {            
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var rowsAffected = await _dapperWrapper.ExecuteInsertAsync(connection, _storedProcedure.SPItemCreate, item);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task<int> Update(Item item)
        {
            using (IDbConnection connection = new SqlConnection(_database.ConnectionString))
            {
                var rowsAffected = await _dapperWrapper.ExecuteUpdateAsync(connection, _storedProcedure.SPItemUpdate, item);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }
    }
}
