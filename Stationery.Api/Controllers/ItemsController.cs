using Microsoft.AspNetCore.Mvc;
using Stationery.Api.Agents;
using Stationery.Api.Models.Entities;
using Stationery.Application.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Stationery.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private ItemAgent _itemAgent;
        public ItemsController(ItemAgent itemAgent)
        {
            _itemAgent = itemAgent;
        }


        // GET: api/<ItemsController>
        [HttpGet]
        public async Task<IResult> Get()
        {

            return await Task.FromResult(Results.Ok(_itemAgent.GetItems().Result));
        }

        // GET api/<ItemsController>/5
        [HttpGet("{id}")]
        public async Task<IResult> Get(int id)
        {

            return await Task.FromResult(Results.Ok(_itemAgent.GetItem(id).Result));

        }

        // POST api/<ItemsController>
        [HttpPost]
        public async Task<IResult> Post([FromBody] Item item)
        {
            await _itemAgent.InsertItem(item);

            return Results.Ok("Item Created Succesfully");
        }

        // PUT api/<ItemsController>/5
        [HttpPut]
        public async Task<IResult> Put([FromBody] Item item)
        {
            await _itemAgent.UpdateItem(item);

            return Results.Ok("Item Updated Successfully");
        }

        // DELETE api/<ItemsController>/5
        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            await _itemAgent.DeleteItem(id);

            return Results.Ok("Item Deleted Succesfully");
        }
    }
}
