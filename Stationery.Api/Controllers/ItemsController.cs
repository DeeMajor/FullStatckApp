using Microsoft.AspNetCore.Mvc;
using Stationery.Application.Services;
using Stationery.Domain.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Stationery.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemsService _itemService;
        public ItemsController(IItemsService itemService)
        {
            _itemService = itemService;
        }


        // GET: api/<ItemsController>
        [HttpGet]
        public async Task<IResult> Get()
        {

            return await Task.FromResult(Results.Ok(_itemService.GetAllItems().Result));
        }

        // GET api/<ItemsController>/5
        [HttpGet("{id}")]
        public async Task<IResult> Get(int id)
        {

            return await Task.FromResult(Results.Ok(_itemService.GetItem(id).Result));

        }

        // POST api/<ItemsController>
        [HttpPost]
        public async Task<IResult> Post([FromBody] Item item)
        {
            await _itemService.InsertItem(item);

            return Results.Ok("Item Created Succesfully");
        }

        // PUT api/<ItemsController>/5
        [HttpPut]
        public async Task<IResult> Put([FromBody] Item item)
        {
            await _itemService.Update(item);

            return Results.Ok("Item Updated Successfully");
        }

        // DELETE api/<ItemsController>/5
        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            await _itemService.Delete(id);

            return Results.Ok("Item Deleted Succesfully");
        }
    }
}
