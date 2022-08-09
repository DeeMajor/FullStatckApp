using Data.Layer.Models;
using Microsoft.Extensions.Options;
using StationeryList.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Layer.Data.Access
{
    public class ItemTransact : IItemsService
    {
        private readonly Database _database;
        //public ItemTransact(IOptions<Database> database)
        //{
        //    _database = database.Value;
        //}
        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Item>> GetAllItems()
        {
            throw new NotImplementedException();
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
