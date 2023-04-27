using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace BT.Model.CustomerData
{
    public interface ICustomerRecord
	{
		long Id { get; set; }
        string FirstName { get; set; }
        string LastName { get; set; }
        string CompanyName { get; set; }
        Address Address { get; set; }
    }

    public interface ICustomer : ICustomerRecord
    {
        void Save();
        void Delete();

    }


}
