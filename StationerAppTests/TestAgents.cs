using NSubstitute;
using NUnit.Framework;
using Stationery.Api.Agents;
using Stationery.Api.Interfaces;
using Stationery.Api.Models.Entities;

namespace StationerAppTests
{
    internal class TestAgents
    {
        private ItemAgent _itemAgent;
        private IItemsService _itemService;

        [SetUp]
        public void SetUp()
        {
            _itemService = Substitute.For<IItemsService>();
            _itemAgent = new ItemAgent(_itemService);
        }

        [Test]
        public async Task Given_GetItemsRequest_Return_Items()
        {
            var expected = GetItems();

            _itemService.GetAllItems().Returns(expected);

            var actual = await _itemAgent.GetItems();

            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        public async Task Given_GetAnItemRequest_Return_AnItem()
        {
            var expected = GetItems().Where(x => x.Item_Id == 1).First();

            _itemService.GetItem(Arg.Any<int>()).Returns(expected);

            var actual = await _itemAgent.GetItem(1);

            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        public async Task Given_InsertItemRequest_Return_AffectedRow()
        {
            var expected = 1;
            var item = GetItems().Where(x => x.Item_Id == 1).First();
            _itemService.InsertItem(Arg.Any<Item>()).Returns(expected);

            var actual = await _itemAgent.InsertItem(item);

            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        public async Task Given_DeleteItemRequest_Return_AffectedRow()
        {
            var expected = 1;
            var item = GetItems().Where(x => x.Item_Id == 1).First();
            _itemService.Delete(Arg.Any<int>()).Returns(expected);

            var actual = await _itemAgent.DeleteItem(1);

            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        public async Task Given_UpdateItemRequest_Return_AffectedRow()
        {
            var expected = 1;
            var item = GetItems().Where(x => x.Item_Id == 1).First();
            _itemService.Update(Arg.Any<Item>()).Returns(expected);

            var actual = await _itemAgent.UpdateItem(item);

            Assert.That(actual, Is.EqualTo(expected));
        }

        List<Item> GetItems()
        {
            List<Item> items = new List<Item>();

            for (int x = 0; x < 11; x++ )
            {
                Item item = new Item()
                {
                    Item_Id = x,
                    ItemName = $"Item {x}",
                    ItemDescription = $"Description",
                    ItemPrice = x,
                    ItemStore = $"Store",
                    FK_StationeryList_Id = x,
                    Bought = true,
                    Quantity = x,
                    Unit = "Kg"
                };

                items.Add(item);
            }

            return items;
        }
    }
}
