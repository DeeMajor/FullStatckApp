using Microsoft.AspNetCore.Mvc;
using StationeryList.Model;
using StationeryList.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StationeryList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StationeryController : ControllerBase
    {
        private readonly IStationeryService _stationeryService;

        public StationeryController(IStationeryService stationeryService)
        {
            _stationeryService = stationeryService;
        }

        // GET: api/<StationeryController>
        [HttpGet]
        public async Task<IResult> Get()
        {
            try
            {
                return await Task.FromResult(Results.Ok(_stationeryService.GetAllStationery().Result));
            }
            catch (Exception ex)
            {
                
                return await Task.FromException<IResult>(ex);
            }

        }

        // GET api/<StationeryController>/5
        [HttpGet("{id}")]
        public async Task<IResult> Get(int id)
        {
            try
            {
                return await Task.FromResult(Results.Ok(_stationeryService.GetStationery(id).Result));
            }
            catch (Exception ex)
            {

                return await Task.FromException<IResult>(ex);
            }
        }

        // POST api/<StationeryController>
        [HttpPost]
        public async Task<IResult> Post([FromBody] Stationery stationeryList)
        {
            try
            {
                await _stationeryService.InsertStationery(stationeryList);

                return Results.Ok("Created stationery list successfully");
            }
            catch (Exception ex)
            {

                return await Task.FromException<IResult>(ex);
            }
        }

        // PUT api/<StationeryController>/5
        [HttpPut]
        public async Task<IResult> Put(Stationery stationeryList)
        {
            try
            {
                await _stationeryService.UpdateStationery(stationeryList);

                return Results.Ok("Stationery list updated successfully");
            }
            catch (Exception ex)
            {

                return await Task.FromException<IResult>(ex);
            }
        }

        // DELETE api/<StationeryController>/5
        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            try
            {
                await _stationeryService.DeleteStationery(id);

                return Results.Ok("Stationery list deleted successfully");
            }
            catch (Exception ex)
            {

                return await Task.FromException<IResult>(ex);
            }
        }
    }
}
