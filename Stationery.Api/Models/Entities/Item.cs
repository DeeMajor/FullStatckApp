namespace Stationery.Api.Models.Entities
{
    public class Item
    {
        public int? Id { get; set; }
        public int? Item_Id { get; set; }
        public string ItemName { get; set; }
        public decimal ItemPrice { get; set; }
        public string ItemStore { get; set; }
        public string ItemDescription { get; set; }
        public string? PictureUrl { get; set; }
        public int? Quantity { get; set; }
        public string? Unit { get; set; }
        public bool? Bought { get; set; }
    }
}
