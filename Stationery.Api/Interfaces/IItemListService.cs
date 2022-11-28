using Stationery.Api.Models.Entities;

namespace Stationery.Api.Interfaces
{
    public interface IItemListService
    {
        Task<List<ItemList>> GetAllItemLists();
        Task<List<Item>> GetItemList(int id);
        Task<int> InsertItemList(ItemList itemList);
        Task<int> UpdateItemList(ItemList itemList);
        Task<int> DeleteItemList(int id);
    }
}
