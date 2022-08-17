using Stationery.Domain.Entities;

namespace Stationery.Application.Services
{
    public interface IStationeryService
    {
        Task<List<StationeryList>> GetAllStationery();
        Task<StationeryList> GetStationery(int id);
        Task<int> InsertStationery(StationeryList stationery);
        Task<int> UpdateStationery(StationeryList stationery);
        Task<int> DeleteStationery(int id);
    }
}
