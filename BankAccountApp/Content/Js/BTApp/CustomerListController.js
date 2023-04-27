BT.App.controller('CustomerListController', function ($scope, $http) {

    $scope.title = "Customer List";
    $http.get('/CustomerList')
        .then(function (response) {
            $scope.customers = response.data;
        });
});