using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using System.Data.SQLite;
using System.Data;

namespace BT.Model.CustomerData
{
	public static class CustomerDataFactory
	{

		public static ICustomerDataRepository Create(IDbConnection db)
		{
            return new CustomerDataRepo(db);
		}
	}
}
