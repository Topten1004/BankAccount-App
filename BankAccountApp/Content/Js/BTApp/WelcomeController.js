BT.App.controller('WelcomeController', function ($scope) {
    $http.get('/CustomerList')
        .then(function (response) {
            console.log("h111")
            $scope.customers = response.data;
        });
});