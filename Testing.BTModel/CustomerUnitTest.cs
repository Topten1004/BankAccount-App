using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Data;
using Dapper;
using System.Linq;
using System;
using System.Data.SQLite;
using BT.Model.CustomerData;
using System.Threading.Tasks;

namespace Testing.BTModel
{

    [TestClass]
    public class CustomerRepositoryTests
    {
        private IDbConnection _db;

        private CustomerDataRepo _repo;

        [TestInitialize]
        public void TestInitialize()
        {
            // Set up the database connection for testing
            _db = new SQLiteConnection("Data Source=:memory:");
            _db.Open();

            // Create the Customers table for testing
            var sql = @"CREATE TABLE Customers (
                        Id INTEGER PRIMARY KEY AUTOINCREMENT,
                        FirstName TEXT,
                        LastName TEXT,
                        CompanyName TEXT,
                        Street TEXT,
                        City TEXT,
                        State TEXT,
                        Zip TEXT
                    )";
            _db.Execute(sql);

            // Insert some test data into the Customers table
            sql = @"INSERT INTO Customers (FirstName, LastName, CompanyName, Street, City, State, Zip)
                VALUES ('John', 'Doe', 'Acme Inc.', '123 Main St', 'Anytown', 'CA', '12345'),
                       ('Jane', 'Doe', 'Widgets LLC', '456 Elm St', 'Othertown', 'NY', '67890')";
            _db.Execute(sql);

            _repo = new CustomerDataRepo(_db);
        }

        [TestMethod]
        public async Task GetList_ReturnsListOfCustomers()
        {
            // Act
            var results = await _repo.GetList();

            var customers = results.ToList();

            // Assert
            Assert.AreEqual(2, customers.Count);
            Assert.AreEqual("John", customers[0].FirstName);
            Assert.AreEqual("Doe", customers[0].LastName);
            Assert.AreEqual("Acme Inc.", customers[0].CompanyName);
            Assert.AreEqual("123 Main St", customers[0].Address.Street);
            Assert.AreEqual("Anytown", customers[0].Address.City);
            Assert.AreEqual("CA", customers[0].Address.State);
            Assert.AreEqual("12345", customers[0].Address.Zip);
            Assert.AreEqual("Jane", customers[1].FirstName);
            Assert.AreEqual("Doe", customers[1].LastName);
            Assert.AreEqual("Widgets LLC", customers[1].CompanyName);
            Assert.AreEqual("456 Elm St", customers[1].Address.Street);
            Assert.AreEqual("Othertown", customers[1].Address.City);
            Assert.AreEqual("NY", customers[1].Address.State);
            Assert.AreEqual("67890", customers[1].Address.Zip);
        }

        [TestMethod]
        public async Task Save_InsertsNewCustomer()
        {
            // Arrange
            var _repository = CustomerDataFactory.Create(_db);

            var customer = new Customer();

            customer.FirstName = "Bob";
            customer.LastName = "Smith";
            customer.CompanyName = "Gizmos Inc.";
            customer.Address = new Address()
            {
                Street = "789 Oak St",
                City = "Somewhere",
                State = "TX",
                Zip = "54321"
            };

            // Act
            await _repository.Save(customer);

            var results = await _repository.GetList();

            var customers = results.ToList();

            // Assert

            Assert.AreEqual(3, customers.Count);
            Assert.AreEqual("Bob", customers[2].FirstName);
            Assert.AreEqual("Smith", customers[2].LastName);
            Assert.AreEqual("Gizmos Inc.", customers[2].CompanyName);
            Assert.AreEqual("789 Oak St", customers[2].Address.Street);
            Assert.AreEqual("Somewhere", customers[2].Address.City);
            Assert.AreEqual("TX", customers[2].Address.State);
            Assert.AreEqual("54321", customers[2].Address.Zip);
        }

        [TestMethod]
        public void Save_ThrowsExceptionIfLastNameAndCompanyNameAreMissing()
        {
            // Arrange
            var _repository = CustomerDataFactory.Create(_db);
            var customer = new Customer();

            customer.FirstName = "Bob";
            customer.LastName = "";
            customer.CompanyName = "";
            customer.Address = new Address()
            {
                Street = "789 Oak St",
                City = "Somewhere",
                State = "TX",
                Zip = "54321"
            };

            // Act & Assert
            Assert.ThrowsExceptionAsync<Exception>(async () => await _repository.Save(customer));
        }

        [TestMethod]
        public async Task Delete_RemovesCustomerFromList()
        {
            // Arrange
            var _repository = CustomerDataFactory.Create(_db);
            var customerId = 1;

            // Act
            await _repository.Delete(customerId);

            var results = await _repository.GetList();

            var customers = results.ToList();

            // Assert
            Assert.AreEqual(1, customers.Count);
            Assert.AreEqual("Jane", customers[0].FirstName);
            Assert.AreEqual("Doe", customers[0].LastName);
            Assert.AreEqual("Widgets LLC", customers[0].CompanyName);
            Assert.AreEqual("456 Elm St", customers[0].Address.Street);
            Assert.AreEqual("Othertown", customers[0].Address.City);
            Assert.AreEqual("NY", customers[0].Address.State);
            Assert.AreEqual("67890", customers[0].Address.Zip);
        }

        [TestMethod]
        public async Task GetNewCustomer_ReturnsEmptyCustomer()
        {
            // Act
            var _repository = CustomerDataFactory.Create(_db);
            var customer = await _repository.GetNewCustomer();

            // Assert
            Assert.AreEqual("", customer.FirstName);
            Assert.AreEqual("", customer.LastName);
            Assert.AreEqual("", customer.CompanyName);
            Assert.AreEqual("", customer.Address.Street);
            Assert.AreEqual("", customer.Address.City);
            Assert.AreEqual("", customer.Address.State);
            Assert.AreEqual("", customer.Address.Zip);
        }

        [TestMethod]
        public async Task GetCustomerById_ReturnsCorrectCustomer()
        {
            // Arrange
            var _repository = CustomerDataFactory.Create(_db);
            var customerId = 2;

            // Act
            var customer = await _repo.GetCustomerById(customerId);

            // Assert
            Assert.AreEqual("Jane", customer.FirstName);
            Assert.AreEqual("Doe", customer.LastName);
            Assert.AreEqual("Widgets LLC", customer.CompanyName);
            Assert.AreEqual("456 Elm St", customer.Address.Street);
            Assert.AreEqual("Othertown", customer.Address.City);
            Assert.AreEqual("NY", customer.Address.State);
            Assert.AreEqual("67890", customer.Address.Zip);
        }

        [TestCleanup]
        public void TestCleanup()
        {
            // Clean up the database connection after testing
            _db.Close();
        }
    }
}