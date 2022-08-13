using StationeryList.Model;

namespace StationeryList.Service
{
    public interface IItemsService
    {
        Task<List<Item>> GetAllItems();
        Task<Item> GetItem(int id);
        Task InsertItem(Item item);
        Task Update(Item item);
        Task Delete(int id);
    }
}
