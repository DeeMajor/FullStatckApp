using Microsoft.Extensions.Options;
using NSubstitute;
using NUnit.Framework;
using StationeryList.Model;
using StationeryList.Repository;
using StationeryList.Repository.Exceptions;
using StationeryList.Service;

namespace StationerAppTests.ServiceTests
{
    internal class ItemServicesTests
    {
        private ItemData _itemData;
        private ExceptionHandling _exception;
        private StoredProcedure _storedProcedure;

        Database database = new Database()
        {
            ConnectionString = "Server=localhost;Database=DbStationeryList;Trusted_Connection=True;"
        };

        [SetUp]
        public void SetUp()
        {
            _exception = Substitute.For<ExceptionHandling>();
            _storedProcedure = new StoredProcedure();
            IOptions<Database> databaseConnection = Options.Create(database);
            _itemData = new ItemData(databaseConnection, _storedProcedure, _exception);
        }

        [Test]
        public void Given_GetItemsQuery_Return_AllItems()
        {
            int itemsCount = 4; 

            var results = _itemData.GetAllItems().Result;

            Assert.That(results.Count, Is.EqualTo(itemsCount));

        }

        [Test]
        public async Task Given_GetItemQuery_Return_Item()
        {
            Item expectedItems = new Item()
            {
                Item_Id = 20,
                ItemName = "string",
                ItemPrice = 0.00m,
                ItemStore = "string",
                ItemDescription = "string",
                Bought = false,
                Quantity = 0,
                Unit = "string",
                FK_StationeryList_Id = 5
            };

            var results = await _itemData.GetItem(7);

            Assert.That(results, Is.EqualTo(expectedItems));

        }

        [Test]
        public async Task Given_InsertItemExecution_Return_RowsAffected()
        {
            Item items = new Item()
            {
                Item_Id = null,
                ItemName = "string",
                ItemPrice = 0.00m,
                ItemStore = "string",
                ItemDescription = "string",
                Bought = false,
                Quantity = 0,
                Unit = "string",
                FK_StationeryList_Id = null
            };

            int rowsAffected = 1;

            var results = await _itemData.InsertItem(items);

            Assert.That(results, Is.EqualTo(rowsAffected));

        }
    }
}
