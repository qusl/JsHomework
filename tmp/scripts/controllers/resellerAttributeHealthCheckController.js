var app = angular.module("appResellerAttributesHealthCheck", []);
app.controller('resellerAttributeHealthCheckController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    var fullUrl = CmpToolStatic.apiUrl + "Api/ResellerAttributesHealthCheck/GetResellerAttributeHealthCheck/";

    $http.get(fullUrl).then(function (response) {
        $scope.resellerAttributeHealthCheckHTML = $sce.trustAsHtml(response.data);
    });
}]);