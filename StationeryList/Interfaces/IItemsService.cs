using StationeryList.Models;

namespace StationeryList.Interfaces
{
    public interface IItemsService
    {
        Task<List<Item>> GetAllItems();
        Task<Item> GetItem(int id);
        Task Update(Item item);
        Task Delete(int id);
    }
}
