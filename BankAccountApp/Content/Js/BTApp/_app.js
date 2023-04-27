if (typeof BT === 'undefined') { BT = {}; }
BT.App = angular.module('MainApp', ['ngResource', 'ui.bootstrap', 'ngRoute']);
//loads all of the bigtime angular COMMON input filters into the app
BT.Angular.Validators.inject(BT.App);
//Loads all of the bigtime angular COMMON directives into the app
//BT.Angular.Directives.inject(BT.App);

//Added to location provider so that angular routes are #Route (instead of #!Route)
BT.App.config(['$locationProvider', function ($locationProvider) {
	$locationProvider.hashPrefix('');
}]);