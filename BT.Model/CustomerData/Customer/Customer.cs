using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace BT.Model.CustomerData
{
	public class Customer:ICustomer
	{
		private readonly CustomerDto _record;

		public Customer(CustomerDto record = null) {
			if(record==null){ 
                record = new CustomerDto();
                record.Address = new Address();
            }
            _record = record;
		}

        public Customer(long id, string firstName, string lastName, string companyName, string street, string city, string state, string zip)
        {
            _record = new CustomerDto();
            _record.Address = new Address();
            _record.Id = id;
            _record.FirstName = firstName;
            _record.LastName = lastName;
            _record.CompanyName = companyName;
            _record.Address.Street = street;
            _record.Address.City = city;
            _record.Address.State = state;
            _record.Address.Zip = zip;
        }

        public long Id { 
			get { return _record.Id; }
			set { _record.Id = value; } 
		}
		public string FirstName {
			get { return _record.FirstName; }
			set { _record.FirstName = value; }
		}

        public string LastName
        {
            get { return _record.LastName; }
            set { _record.LastName = value; }
        }

        public string CompanyName
        {
            get { return _record.CompanyName; }
            set { _record.CompanyName = value; }
        }

		public Address Address
		{
            get { return _record.Address; }
            set { _record.Address = value; }
        }

        public void Save() { }

        public void Delete() { }
    }
}
