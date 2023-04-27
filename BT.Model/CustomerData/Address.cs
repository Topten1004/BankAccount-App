using System;
using System.Collections.Generic;
using System.Text;

namespace BT.Model.CustomerData
{
    public class Address
    {
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }

        public Address()
        {
            Street = "";
            City = "";
            State = "";
            Zip = "";
        }

        public Address(string street, string city, string state, string zip)
        {
            Street = street;
            City = city;
            State = state;
            Zip = zip;
        }

        public string AddressBlock()
        {
            return $"{Street}, {City}, {State} {Zip}";
        }
    }
}
