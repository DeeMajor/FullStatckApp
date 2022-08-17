using Microsoft.Extensions.Options;
using NSubstitute;
using NUnit.Framework;
using Stationery.Application.Services;
using Stationery.Domain.Database;
using Stationery.Domain.Entities;
using Stationery.Infrastructure.Exceptions;
using Stationery.Infrastructure.Repositories;
using System.Data;

namespace StationerAppTests.ServiceTests
{
    internal class ItemServicesTests
    {
        private ItemRepository _itemData;
        private ExceptionHandling _exception;
        private StoredProcedure _storedProcedure;
        private IMapper _dapperWrapper;

        Database database = new Database()
        {
            ConnectionString = "Server=localhost;Database=DbStationeryList;Trusted_Connection=True;"
        };

        [SetUp]
        public void SetUp()
        {
            _exception = Substitute.For<ExceptionHandling>();
            _storedProcedure = Substitute.For<StoredProcedure>();
            _dapperWrapper = Substitute.For<IMapper>();
            IOptions<Database> databaseConnection = Options.Create(database);
            _itemData = new ItemRepository(databaseConnection, _storedProcedure, _exception, _dapperWrapper);
        }

        [Test]
        public async Task Given_GetItemsQuery_Return_AllItems()
        {
            var expectedItems = await Items();

            _dapperWrapper.QueryAsync<Item>(Arg.Any<IDbConnection>(), Arg.Any<string>()).Returns(expectedItems);

            var results = await _itemData.GetAllItems();

            Assert.That(results, Is.EqualTo(expectedItems));
        }

        [Test]
        public async Task Given_GetAnItemQuery_Return_AnItem()
        {
            var expectedItem = await Items();

            _dapperWrapper.QueryFirstAsync<Item>(Arg.Any<IDbConnection>(), Arg.Any<string>()).Returns(expectedItem[0]);

            var results = await _itemData.GetItem(1);
            
            Assert.That(results, Is.EqualTo(expectedItem[0]));
        }

        [Test]
        public async Task Given_ExecuteInsertItem_Return_RowsAffected()
        {
            var expectedRowsAffected = 1;
            var itemToInsert = await Items();

            _dapperWrapper.ExecuteInsertAsync<Item>(Arg.Any<IDbConnection>(), Arg.Any<string>(), itemToInsert[0]).Returns(1);

            var results = await _itemData.InsertItem(itemToInsert[0]);

            Assert.That(results, Is.EqualTo(expectedRowsAffected));
        }

        [Test]
        public async Task Given_ExecuteUpdateItem_Return_RowsAffected()
        {
            var expectedRowsAffected = 1;
            var itemToUpdate = await Items();

            _dapperWrapper.ExecuteUpdateAsync<Item>(Arg.Any<IDbConnection>(), Arg.Any<string>(), itemToUpdate[0]).Returns(1);

            var results = await _itemData.Update(itemToUpdate[0]);

            Assert.That(results, Is.EqualTo(expectedRowsAffected));
        }

        [Test]
        public async Task Given_ExecutDeleteItem_Return_RowsAffected()
        {
            var expectedRowsAffected = 1;

            _dapperWrapper.ExecuteDeleteAsync(Arg.Any<IDbConnection>(), Arg.Any<string>()).Returns(1);

            var results = await _itemData.Delete(1);

            Assert.That(results, Is.EqualTo(expectedRowsAffected));
        }

        [Test]
        public async Task Given_ExecuteDeleteFails_Return_Exception()
        {
            _dapperWrapper.ExecuteDeleteAsync(Arg.Any<IDbConnection>(), Arg.Any<string>()).Returns(0);

            Assert.That(async () =>await _itemData.Delete(1), Throws.TypeOf<Exception>());
        }

        private async Task<List<Item>> Items()
        {
            List<Item> items = new List<Item>();

            for (int x = 1; x < 11; x++)
            {
                Item item = new Item()
                {
                    Item_Id = x,
                    ItemName = $"Name {x}",
                    ItemDescription = $"Description {x}",
                    ItemPrice = x,
                    ItemStore = $"ItemStore {x}",
                    Quantity = x,
                    Bought = true,
                    Unit = "KG",
                    FK_StationeryList_Id = null
                };

                items.Add(item);
            }

            return items;
        }
    }
}
