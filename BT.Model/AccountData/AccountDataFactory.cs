using System;
using System.Collections.Generic;
using System.Text;

namespace BT.Model.AccountData
{
	public static class AccountDataFactory
	{

		public static IAccountDataRepository Create()
		{
			return new AccountDataRepo();
		}
	}
}
