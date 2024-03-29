﻿using Dapper;
using Stationery.Application.Services;
using System.Data;

namespace Stationery.Api.Repository.Mapper
{
    /* This is not part of the scope. I am doing this just to explore. I want to see if I will be able to switch ORMs as I learn different types */
    public class DapperWrapper : IMapper
    {
        public async Task<int> ExecuteDeleteAsync(IDbConnection connection, string sql)
        {
            return await connection.ExecuteAsync(sql, CommandType.StoredProcedure);
        }

        public async Task<int> ExecuteUpdateAsync<T>(IDbConnection connection, string sql, T model)
        {
            return await connection.ExecuteAsync(sql, model, commandType: CommandType.StoredProcedure);
        }

        public async Task<int> ExecuteInsertAsync<T>(IDbConnection connection, string sql, T model)
        {
            return await connection.ExecuteAsync(sql, model, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<T>> QueryAsync<T>(IDbConnection connection, string sql)
        {
            return (List<T>)await connection.QueryAsync<T>(sql, CommandType.StoredProcedure);
        }

        public async Task<T> QueryFirstAsync<T>(IDbConnection connection, string sql)
        {
            return await connection.QueryFirstAsync<T>(sql, CommandType.StoredProcedure);
        }

        public async Task<SqlMapper.GridReader> QueryMultipleAsync(IDbConnection connection, string sql)
        {
            return await connection.QueryMultipleAsync(sql, CommandType.StoredProcedure);
        }
    }
}
