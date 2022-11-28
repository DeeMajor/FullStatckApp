namespace Stationery.Api.Models.Entities
{
    public class ItemList
    {
        public int? Id { get; set; }
        public int FK_StationeryList_Id { get; set; }
        public int FK_ItemId_Id { get; set; }
        public int? Quantity { get; set; }
        public string? Unit { get; set; }
        public bool? Bought { get; set; }
    }
}
