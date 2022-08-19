using Dapper;
using Microsoft.Extensions.Options;
using Stationery.Application.Services;
using Stationery.Domain.Entities;
using Stationery.Infrastructure.Database;
using Stationery.Infrastructure.Exceptions;
using System.Data;
using System.Data.SqlClient;

namespace Stationery.Infrastructure.Repositories
{
    public class ItemRepository : IItemsService
    {
        private readonly Connection _connecta;
        private readonly IExceptionHandling _exceptionHandling;
        private readonly IMapper _dapperWrapper;

        public ItemRepository(IOptions<Connection> connecta, IExceptionHandling exceptionHandling, IMapper dapperWrapper)
        {
            _connecta = connecta.Value;
            _exceptionHandling = exceptionHandling;
            _dapperWrapper = dapperWrapper;
        }

        public async Task<int> Delete(int id)
        {

            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var sql = $"{StoredProcedure.SPItemDelete} {id}";
                var rowsAffected = await _dapperWrapper.ExecuteDeleteAsync(connection, sql);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task<List<Item>> GetAllItems()
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var items = await _dapperWrapper.QueryAsync<Item>(connection, StoredProcedure.SPItemGetAll);

                return items.ToList();
            }
        }

        public async Task<Item> GetItem(int id)
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var sql = $"{StoredProcedure.SPItemGetById} {id}";
                var item = await _dapperWrapper.QueryFirstAsync<Item>(connection, sql);

                return item;
            }
        }

        public async Task<int> InsertItem(Item item)
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var rowsAffected = await _dapperWrapper.ExecuteInsertAsync(connection, StoredProcedure.SPItemCreate, item);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task<int> Update(Item item)
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var rowsAffected = await _dapperWrapper.ExecuteUpdateAsync(connection, StoredProcedure.SPItemUpdate, item);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }
    }
}
