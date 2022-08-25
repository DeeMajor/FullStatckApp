using Microsoft.AspNetCore.Mvc;
using Stationery.Api.Interfaces;
using Stationery.Api.Models.Entities;
using Stationery.Application.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Stationery.Api.Controllers
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

            return await Task.FromResult(Results.Ok(_stationeryService.GetAllStationery().Result));
        }

        // GET api/<StationeryController>/5
        [HttpGet("{id}")]
        public async Task<IResult> Get(int id)
        {

            return await Task.FromResult(Results.Ok(_stationeryService.GetStationery(id).Result));
        }

        // POST api/<StationeryController>
        [HttpPost]
        public async Task<IResult> Post([FromBody] StationeryList stationeryList)
        {
            await _stationeryService.InsertStationery(stationeryList);

            return Results.Ok("Created stationery list successfully");
        }

        // PUT api/<StationeryController>/5
        [HttpPut]
        public async Task<IResult> Put(StationeryList stationeryList)
        {
            await _stationeryService.UpdateStationery(stationeryList);

            return Results.Ok("Stationery list updated successfully");
        }

        // DELETE api/<StationeryController>/5
        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            await _stationeryService.DeleteStationery(id);

            return Results.Ok("Stationery list deleted successfully");
        }
    }
}
