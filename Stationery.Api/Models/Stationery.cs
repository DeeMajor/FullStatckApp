namespace StationeryList.Models
{
    public class Stationery
    {
        public int ListId { get; set; }
        public string Grade { get; set; }
        public ICollection<Item> Items { get; set; }
        public string Child { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
        public string Comment { get; set; }
    }
}
