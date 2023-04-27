using System;
using System.Collections.Generic;
using System.Text;

namespace BT.Model.CustomerData
{
	public class CustomerDto : ICustomerRecord
	{
		public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public Address Address { get; set; }

        public CustomerDto() {

            FirstName = "";
            LastName = "";
            CompanyName = "";
        }
    }
    
}
