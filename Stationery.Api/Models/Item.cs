namespace StationeryList.Models
{
    public class Item
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string Brand { get; set; }
        public string Store { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public bool IsBought { get; set; }

        public int ListId { get; set; }
        public Stationery Stationery { get; set; }
    }
}
