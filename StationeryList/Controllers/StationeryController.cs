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
        public Task<IResult> Get()
        {
            return Task.FromResult(Results.Ok(_stationeryService.GetAllStationery().Result));
        }

        // GET api/<StationeryController>/5
        [HttpGet("{id}")]
        public Task<IResult> Get(int id)
        {
            return Task.FromResult(Results.Ok(_stationeryService.GetStationery(id).Result));
        }

        // POST api/<StationeryController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<StationeryController>/5
        [HttpPut]
        public Task<IResult> Put(Stationery stationeryList)
        {
            _stationeryService.UpdateStationery(stationeryList);

            return Task.FromResult(Results.Ok());
        }

        // DELETE api/<StationeryController>/5
        [HttpDelete("{id}")]
        public Task<IResult> Delete(int id)
        {
            _stationeryService.DeleteStationery(id);

            return Task.FromResult(Results.Ok());
        }
    }
}
