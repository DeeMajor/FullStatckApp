using NUnit.Framework;
using StationeryList.Models;
using StationeryList.ServiceLayer;
using System.Collections.Generic;

namespace TestStationeryList.ServicesTests
{
    public class TestStationeryService
    {
        private ItemService _itemService;

        [SetUp]
        public void Setup()
        {
           
        }

        [Test]
        public void Test1()
        {
            //Arrange
            var expected = new List<Item>();
            //Act

            //Assert
            Assert.Pass();
        }
    }
}