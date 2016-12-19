var app = angular.module("appHealthCheck", []);
app.controller('healthCheckController', ['$scope', '$http', function ($scope, $http) {
    var fullUrl = CmpToolStatic.apiUrl + "csm.aspx";
    $http.get(fullUrl).then(function (response) {

        var automationApiHealthCheck = response.data
        if (automationApiHealthCheck.includes("EVERYTHINGISOK"))
            $scope.healthCheckText = "EVERYTHINGISOK";
    }).catch(function (e) {
        $scope.healthCheckText = "Cannnot connect with Automation Api";
    });
}]);