using Dapper;
using System.Data;

namespace StationeryList.Repository.Dapper
{
    public interface IDapperWrapper
    {
        Task<List<T>> QueryAsync<T>(IDbConnection connection, string sql);
        Task<T> QueryFirstAsync<T>(IDbConnection connection, string sql);
        Task<int> ExecuteDeleteAsync(IDbConnection connection, string sql);
        Task<int> ExecuteInsertAsync<T>(IDbConnection connection, string sql, T model);
        Task<int> ExecuteUpdateAsync<T>(IDbConnection connection, string sql, T model);
        Task<SqlMapper.GridReader> QueryMultipleAsync(IDbConnection connection, string sql);
    }
}
