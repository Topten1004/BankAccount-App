using System;
using System.Collections.Generic;
using System.Data.SQLite;
using Dapper;
using System.Data;
using System.Linq;
using BT.Model.AccountData;
using System.Threading.Tasks;
using System.Security.Authentication;

namespace BT.Model.CustomerData
{
	public class CustomerDataRepo : ICustomerDataRepository
	{
        private readonly IDbConnection _db;

        public async Task<Customer> GetNewCustomer()
        {
            return new Customer();
        }

        public CustomerDataRepo(IDbConnection db)
        {
            _db = db;
        }

        public async Task Save(Customer customer)
        {
            if (string.IsNullOrEmpty(customer.LastName) || string.IsNullOrEmpty(customer.CompanyName))
            {
                throw new ArgumentNullException("Last name and company name are required.");
            }

            var sql = @"INSERT INTO Customers (FirstName, LastName, CompanyName, Street, City, State, Zip) 
                    VALUES (@FirstName, @LastName, @CompanyName, @Street, @City, @State, @Zip)";

            await _db.ExecuteAsync(sql, new { FirstName = customer.FirstName, LastName = customer.LastName, CompanyName = customer.CompanyName, Street = customer.Address.Street, City = customer.Address.City, State = customer.Address.State, Zip = customer.Address.Zip});
        }

        public async Task Delete(long customerId)
        {
            var sql = "DELETE FROM Customers WHERE Id = @Id";
            await _db.ExecuteAsync(sql, new { Id = customerId });
        }

        public async Task<IEnumerable<Customer>> GetList()
        {
            var sql = "SELECT * FROM Customers";
            return await _db.QueryAsync<Customer>(sql);
        }

        public async Task<Customer> GetCustomerById(long customerId)
        {
            var sql = "SELECT * FROM Customers WHERE Id = @Id";
            return await _db.QueryFirstAsync<Customer>(sql, new { Id = customerId });
        }

    }
}
