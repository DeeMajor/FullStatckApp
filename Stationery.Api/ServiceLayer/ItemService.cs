using StationeryList.Data.Access;
using StationeryList.Models;

namespace StationeryList.ServiceLayer
{
    public class ItemService
    {
        private ItemData _itemData;

        public ItemService(ItemData itemData)
        {
            _itemData = itemData;
        }
        public async Task<List<Item>> GetAllItems()
        {

            return await _itemData.GetAllItems();
        }

        public async Task<Item> GetItem(int id)
        {
            var item =  await _itemData.GetItem(id);

            return item;
        }

        public async Task Update(Item item)
        {
                      
        }

        public async Task Delete(int id)
        {

        }
    } 
}
