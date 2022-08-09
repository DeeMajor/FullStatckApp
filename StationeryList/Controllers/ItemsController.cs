using Microsoft.AspNetCore.Mvc;
using StationeryList.Model;
using StationeryList.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StationeryList.Controllers
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
        public Task<IResult> Get()
        {
     
            return Task.FromResult(Results.Ok(_itemService.GetAllItems().Result));
        }

        // GET api/<ItemsController>/5
        [HttpGet("{id}")]
        public Task<IResult> Get(int id)
        {

            return Task.FromResult(Results.Ok(_itemService.GetItem(id).Result));
        }

        // POST api/<ItemsController>
        [HttpPost]
        public Task<IResult> Post([FromBody] Item item)
        {
            _itemService.InsertItem(item);

            return Task.FromResult(Results.Ok());
        }

        // PUT api/<ItemsController>/5
        [HttpPut]
        public Task<IResult> Put([FromBody] Item item)
        {
            _itemService.Update(item);

            return Task.FromResult(Results.Ok());
        }

        // DELETE api/<ItemsController>/5
        [HttpDelete("{id}")]
        public Task<IResult> Delete(int id)
        {

            _itemService.Delete(id);

            return Task.FromResult(Results.Ok());
        }
    }
}
