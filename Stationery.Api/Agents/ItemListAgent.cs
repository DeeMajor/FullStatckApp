using Stationery.Api.Interfaces;
using Stationery.Api.Models.Entities;

namespace Stationery.Api.Agents
{
    public class ItemListAgent
    {
        private IItemListService _itemListService;

        public ItemListAgent(IItemListService itemListService)
        {
            _itemListService = itemListService;
        }

        public async Task<List<Item>> GetItemList(int id)
        {
            return await _itemListService.GetItemList(id);
        }

        public async Task<List<ItemList>> GetItemLists()
        {
            return await _itemListService.GetAllItemLists();
        }

        public async Task<int> UpdateItemList(ItemList itemList)
        {
            return await _itemListService.UpdateItemList(itemList);
        }

        public async Task<int> DeleteItemList(int id)
        {
            return await _itemListService.DeleteItemList(id);
        }

        public async Task<int> InsertItemList(ItemList itemList)
        {
            return await _itemListService.InsertItemList(itemList);
        }
    }
}
