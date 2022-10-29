namespace Stationery.Api.Models.Entities
{
    public class ItemList
    {
        public int? Id { get; set; }
        public int FK_StationeryList_Id { get; set; }
        public int FK_ItemId_Id { get; set; }
    }
}
