using StationeryList.Models;

namespace StationeryList.Interfaces
{
    public interface IItemData
    {
        Task<List<Item>> GetAllItems();
        Task<Item> GetItem(int id);
    }
}
