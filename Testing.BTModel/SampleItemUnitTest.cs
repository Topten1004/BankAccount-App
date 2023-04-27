using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Testing.BTModel
{
	[TestClass]
	public class SampleItemUnitTest
	{
		[TestMethod]
		public void SampleDataCreate()
		{
			var myRepo = BT.Model.AccountData.AccountDataFactory.Create();
			var sampleItem = myRepo.GetSampleItem();
			Assert.IsNotNull(sampleItem);

		}

		[TestMethod]
		public void SampleDataRead()
		{
			var myRepo = BT.Model.AccountData.AccountDataFactory.Create();
			var sampleItem = myRepo.GetSampleItem();
			if (sampleItem == null) { Assert.Inconclusive("Unable to create a new sample item, so we can't test READ"); }

			sampleItem.Id = 12324;
			sampleItem.Nm = "Test Item";

			Assert.AreEqual(12324, sampleItem.Id);
			Assert.AreEqual("Test Item", sampleItem.Nm);

		}

		[TestMethod]
		public void SampleDataUpdate()
		{
			var myRepo = BT.Model.AccountData.AccountDataFactory.Create();
			var sampleItem = myRepo.GetSampleItem();
			if (sampleItem == null) { Assert.Inconclusive("Unable to create a new sample item, so we can't test READ"); }

			sampleItem.Id = 12324;
			sampleItem.Nm = "Test Item";
			Assert.AreEqual("Test Item", sampleItem.Nm);
			sampleItem.Nm = "Test Item22";
			Assert.AreEqual("Test Item22", sampleItem.Nm);

		}

	}
}
