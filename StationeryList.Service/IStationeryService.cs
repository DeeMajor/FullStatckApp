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
        Task InsertStationery(Stationery stationery);
        Task UpdateStationery(Stationery stationery);
        Task DeleteStationery(int id);
    }
}
