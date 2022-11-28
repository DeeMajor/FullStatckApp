using Microsoft.AspNetCore.Mvc;
using Stationery.Api.Agents;
using Stationery.Api.Models.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Stationery.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemListsController : ControllerBase
    {
        private ItemListAgent _itemListAgent;
        public ItemListsController(ItemListAgent itemListAgent)
        {
            _itemListAgent = itemListAgent;
        }

        // GET: api/<ItemListsController>
        [HttpGet]
        public async Task<IResult> Get()
        {

            return await Task.FromResult(Results.Ok(_itemListAgent.GetItemLists().Result));
        }

        // GET api/<ItemListsController>/5
        [HttpGet("{id}")]
        public async Task<IResult> Get(int id)
        {
            return await Task.FromResult(Results.Ok(_itemListAgent.GetItemList(id).Result));
        }

        // POST api/<ItemListsController>
        [HttpPost]
        public async Task<IResult> Post([FromBody] ItemList itemList)
        {
            await _itemListAgent.InsertItemList(itemList);

            return Results.Ok("Item Created Succesfully");
        }

        // PUT api/<ItemListsController>/5
        [HttpPut]
        public async Task<IResult> Put([FromBody] ItemList itemList)
        {
            await _itemListAgent.UpdateItemList(itemList);

            return Results.Ok("Item Updated Successfully");
        }

        // DELETE api/<ItemListsController>/5
        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {
            await _itemListAgent.DeleteItemList(id);

            return Results.Ok("Item Deleted Succesfully");
        }
    }
}
