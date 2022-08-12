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

            try
            {
                return Task.FromResult(Results.Ok(_itemService.GetAllItems().Result));
            }
            catch (Exception ex)
            {

                return Task.FromException<IResult>(ex);
            }
        }

        // GET api/<ItemsController>/5
        [HttpGet("{id}")]
        public Task<IResult> Get(int id)
        {

            try
            {
                return Task.FromResult(Results.Ok(_itemService.GetItem(id).Result));
            }
            catch (Exception ex)
            {

                return Task.FromException<IResult>(ex);
            }
        }

        // POST api/<ItemsController>
        [HttpPost]
        public Task<IResult> Post([FromBody] Item item)
        {
            try
            {
                _itemService.InsertItem(item);

                return Task.FromResult(Results.Ok());
            }
            catch (Exception ex)
            {

                return Task.FromException<IResult>(ex);
            }
        }

        // PUT api/<ItemsController>/5
        [HttpPut]
        public Task<IResult> Put([FromBody] Item item)
        {
            try
            {
                _itemService.Update(item);

                return Task.FromResult(Results.Ok());
            }
            catch (Exception ex)
            {

                return Task.FromException<IResult>(ex);
            }
        }

        // DELETE api/<ItemsController>/5
        [HttpDelete("{id}")]
        public Task<IResult> Delete(int id)
        {

            try
            {
                _itemService.Delete(id);

                return Task.FromResult(Results.Ok());
            }
            catch (Exception ex)
            {

                return Task.FromException<IResult>(ex);
            }
        }
    }
}
