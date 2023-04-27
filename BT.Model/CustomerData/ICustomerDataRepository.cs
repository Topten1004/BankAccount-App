using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BT.Model.CustomerData
{
	public interface ICustomerDataRepository
	{
        Task Save(Customer customer);
        Task Delete(long customerId);
        Task<IEnumerable<Customer>> GetList();
        Task<Customer> GetNewCustomer();
        Task<Customer> GetCustomerById(long customerId);
    }
}
