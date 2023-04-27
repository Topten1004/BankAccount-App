using System;
using System.Collections.Generic;
using System.Text;

namespace BT.Model.AccountData
{
	internal class SampleItem:ISampleItem 
	{
		private CustomerDto _record;

		public SampleItem(CustomerDto record = null) {
			if(record==null){ record = new CustomerDto(); }
			_record = record;
		}

		public long Id { 
			get { return _record.Id; }
			set { _record.Id = value; } 
		}
		public string Nm {
			get { return _record.Nm; }
			set { _record.Nm = value; }
		}

		public bool Delete() {
			throw new NotImplementedException();
		}

		public bool Save() {
			throw new NotImplementedException();
		}
	}
}
