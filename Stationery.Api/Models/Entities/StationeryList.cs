namespace Stationery.Api.Models.Entities
{
    public class StationeryList
    {
        public int? Id { get; set; }
        public string? Grade { get; set; }
        public string? Description { get; set; }
        public ICollection<Item>? Items { get; set; }
        public string Child { get; set; }
        public decimal? TotalPrice { get; set; }
        public string Status { get; set; }
        public string? School { get; set; }
        public string? Comment { get; set; }
    }
}
