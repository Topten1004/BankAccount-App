BT.Angular = BT.Angular ? BT.Angular : {};
BT.Angular.Services = {};
BT.Angular.Services.inject = function ($app) {
	$app.service('communicationService', ['$timeout', BT.Angular.Services.communicationService]);
};

BT.Angular.Services.communicationService = function ($timeout) {
	var broadcast = function (eventType, data) {
		if (angular.isUndefined(angular.element('#nav_bar').scope()) || angular.isUndefined(angular.element('.BTAppMainPane').scope())) {
			$timeout(function() {
				angular.forEach([angular.element('#nav_bar').scope(), angular.element('.BTAppMainPane').scope()], function(scope) {
					scope.$broadcast(eventType, { data: data });
				});
			}, 1000);
		} else {
			angular.forEach([angular.element('#nav_bar').scope(), angular.element('.BTAppMainPane').scope()], function (scope) {
				scope.$broadcast(eventType, { data: data });
			});
		}
	};

	var listen = function (eventType, $scope, handler) {
		$scope.$on(eventType, function (event, args) {
			handler(args.data);
		});
	};

	return {
		broadcast: broadcast,
		listen: listen,
		eventType: {
			walkthroughStatusChanged: 'walkthroughStatusChanged'
		}
	};
};