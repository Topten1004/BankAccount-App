BT.Angular = BT.Angular ? BT.Angular : { };
BT.Angular.Controllers = BT.Angular.Controllers ? BT.Angular.Controllers : { };

BT.Angular.Controllers.dialogGeneric = function(p_app) {

	p_app.controller('dialogGenericController', ['$scope', 'dialog', function($scope, dialog) {

		BT.Angular.picklist($scope);

		$scope.close = function(p_result) {
			dialog.close(p_result);
		};

	}]);

};

BT.Angular.Controllers.modalGeneric = function(p_app) {

	p_app.controller('modalGenericController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {

		BT.Angular.picklist($scope);

		$scope.close = function(p_result) {
			$uibModalInstance.close(p_result);
		};

	}]);

};

