using BT.Model.CustomerData;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Results;
using System.Web.Mvc;

namespace BankAccountApp.Controllers
{
    public class CustomerListController : Controller
    {
        private IDbConnection _db;

        private CustomerDataRepo _repo;

        public CustomerListController()
        {
            // Set up the database connection for testing
            _db = new SqliteConnection("Data Source=:memory:");
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
        // GET: CustomerList

        [HttpGet]
        [Route("/CustomerList")]
        public JsonResult GetCustomers()
        {
            var model = _repo.GetList();

            return Json(model);
        }
    }
}