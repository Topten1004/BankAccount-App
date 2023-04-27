using System;
using System.Collections.Generic;
using System.Text;

namespace BT.Model.AccountData
{
	public interface ISampleItemRecord
	{
		long Id { get; set; }
		string Nm { get; set; }
	}

	public interface ISampleItem:ISampleItemRecord {
		bool Save();
		bool Delete();

	}

}
