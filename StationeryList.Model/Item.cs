namespace StationeryList.Model
{
    public class Item
    {
        public int? Item_Id { get; set; }
        public string ItemName { get; set; }
        public decimal ItemPrice { get; set; }
        public string ItemStore { get; set; }
        public string ItemDescription { get; set; }       
        public int Quantity { get; set; }
        public string Unit { get; set; }
        public bool Bought { get; set; }
        public int? FK_StationeryList_Id { get; set; }
    }
}
