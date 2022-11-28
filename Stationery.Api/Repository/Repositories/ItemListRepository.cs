using Microsoft.Extensions.Options;
using Stationery.Api.Interfaces;
using Stationery.Api.Models.Common;
using Stationery.Api.Models.Entities;
using Stationery.Api.Repository.Database;
using Stationery.Application.Services;
using System.Data;
using System.Data.SqlClient;

namespace Stationery.Api.Repository.Repositories
{
    public class ItemListRepository : IItemListService
    {
        private readonly Connection _connecta;
        private readonly IExceptionHandling _exceptionHandling;
        private readonly IMapper _dapperWrapper;

        public ItemListRepository(IOptions<Connection> connecta, IExceptionHandling exceptionHandling, IMapper dapperWrapper)
        {
            _connecta = connecta.Value;
            _exceptionHandling = exceptionHandling;
            _dapperWrapper = dapperWrapper;
        }

        public async Task<int> DeleteItemList(int id)
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var sql = $"{StoredProcedure.SPItemListDelete} {id}";
                var rowsAffected = await _dapperWrapper.ExecuteDeleteAsync(connection, sql);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task<List<ItemList>> GetAllItemLists()
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var itemLists = await _dapperWrapper.QueryAsync<ItemList>(connection, StoredProcedure.SPItemListGetAll);

                return itemLists.ToList();
            }
        }

        public async Task<List<Item>> GetItemList(int id)
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var sql = $"{StoredProcedure.SPItemListGetById} {id}";
                var itemList = await _dapperWrapper.QueryAsync<Item>(connection, sql);

                return itemList;
            }
        }

        public async Task<int> InsertItemList(ItemList itemList)
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var rowsAffected = await _dapperWrapper.ExecuteInsertAsync(connection, StoredProcedure.SPItemListCreate, itemList);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }

        public async Task<int> UpdateItemList(ItemList itemList)
        {
            using (IDbConnection connection = new SqlConnection(_connecta.ConnectionString))
            {
                var rowsAffected = await _dapperWrapper.ExecuteUpdateAsync(connection, StoredProcedure.SPItemListUpdate, itemList);

                return _exceptionHandling.CheckForNull(rowsAffected);
            }
        }
    }
}
