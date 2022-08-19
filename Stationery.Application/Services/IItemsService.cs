
using Stationery.Domain.Entities;

namespace Stationery.Application.Services
{
    public interface IItemsService
    {
        Task<List<Item>> GetAllItems();
        Task<Item> GetItem(int id);
        Task<int> InsertItem(Item item);
        Task<int> Update(Item item);
        Task<int> Delete(int id);
    }
}
