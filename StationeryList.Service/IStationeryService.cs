using StationeryList.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StationeryList.Service
{
    public interface IStationeryService
    {
        Task<List<Stationery>> GetAllStationery();
        Task<Stationery> GetStationery(int id);
        Task<int> InsertStationery(Stationery stationery);
        Task<int> UpdateStationery(Stationery stationery);
        Task<int> DeleteStationery(int id);
    }
}
