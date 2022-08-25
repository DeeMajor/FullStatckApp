using Stationery.Api.Interfaces;
using Stationery.Api.Models.Entities;

namespace Stationery.Api.Agents
{
    public class ItemAgent
    {
        private IItemsService _itemService;

        public ItemAgent(IItemsService itemsService)
        {
            _itemService = itemsService;
        }
        public async Task<Item> GetItem(int id)
        {
            return await _itemService.GetItem(id);
        }

        public async Task<List<Item>> GetItems()
        {
            return await _itemService.GetAllItems();
        }

        public async Task<int> UpdateItem(Item item)
        {
            return await _itemService.Update(item);
        }

        public async Task<int> DeleteItem(int id)
        {
            return await _itemService.Delete(id);
        }

        public async Task<int> InsertItem(Item item)
        {
            return await _itemService.InsertItem(item);
        }
    }
}
