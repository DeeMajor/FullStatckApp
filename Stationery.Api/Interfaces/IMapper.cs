using Dapper;
using System.Data;

namespace Stationery.Application.Services
{
    /* This is not part of the scope. I am doing this just to explore. I want to see if I will be able to switch ORMs as I learn different types */
    public interface IMapper
    {
        Task<List<T>> QueryAsync<T>(IDbConnection connection, string sql);
        Task<T> QueryFirstAsync<T>(IDbConnection connection, string sql);
        Task<int> ExecuteDeleteAsync(IDbConnection connection, string sql);
        Task<int> ExecuteInsertAsync<T>(IDbConnection connection, string sql, T model);
        Task<int> ExecuteUpdateAsync<T>(IDbConnection connection, string sql, T model);
        Task<SqlMapper.GridReader> QueryMultipleAsync(IDbConnection connection, string sql);
    }
}
