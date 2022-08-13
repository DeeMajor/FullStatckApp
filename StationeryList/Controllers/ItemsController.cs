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
        public async Task<IResult> Get()
        {
            try
            {
                return await Task.FromResult(Results.Ok(_itemService.GetAllItems().Result));
            }
            catch (Exception ex)
            {

                return await Task.FromException<IResult>(ex);
            }
        }

        // GET api/<ItemsController>/5
        [HttpGet("{id}")]
        public async Task<IResult> Get(int id)
        {
            try
            {
                return await Task.FromResult(Results.Ok(_itemService.GetItem(id).Result));
            }
            catch (Exception ex)
            {

                return await Task.FromException<IResult>(ex);
            }
        }

        // POST api/<ItemsController>
        [HttpPost]
        public async Task<IResult> Post([FromBody] Item item)
        {
            try
            {
                await _itemService.InsertItem(item);

                return Results.Ok("Item Created Succesfully");
            }
            catch (Exception ex)
            {

                return await Task.FromException<IResult>(ex);
            }
        }

        // PUT api/<ItemsController>/5
        [HttpPut]
        public async Task<IResult> Put([FromBody] Item item)
        {
            try
            {
                await _itemService.Update(item);

                return Results.Ok("Item Updated Successfully");
            }
            catch (Exception ex)
            {

                return await Task.FromException<IResult>(ex);
            }
        }

        // DELETE api/<ItemsController>/5
        [HttpDelete("{id}")]
        public async Task<IResult> Delete(int id)
        {

            try
            {
                await _itemService.Delete(id);

                return Results.Ok("Item Deleted Succesfully");
            }
            catch (Exception ex)
            {

                return await Task.FromException<IResult>(ex);
            }
        }
    }
}
