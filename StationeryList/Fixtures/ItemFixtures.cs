using StationeryList.Models;

namespace StationeryList.Fixtures
{
    public class ItemFixtures
    {
        List<Item> items = new List<Item>();
        public async Task<List<Item>> GetAllItems()
        {
            AddItems();

            return items;
        }

        public async Task<Item> GetItem(int id)
        {
            AddItems();

            var item = items.FirstOrDefault(x => x.ItemId == id);

            return item;
        }

        public void UpDate(int id, Item item)
        {
            
        }

        public void Delete(int id)
        {

        }
        public void AddItems()
        {
            items.Add(new Item
            {
                ItemId = 1,
                ItemName = "Glue"
            });

            items.Add(new Item
            {
                ItemId = 1,
                ItemName = "Glue"
            });
        }
    }
}
