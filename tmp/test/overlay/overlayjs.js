
var app = angular.module("myApp", ['dx']);
app.controller("myContrl", [
    '$scope', function($scope) {
        $scope.employeeInfo = {};
        $scope.loadingVisible = false;
        $scope.showIndicator = true;
        $scope.showPane = true;
        $scope.shading = true;

        $scope.loadOptions = {
            shadingColor: "rgba(0,0,0,0.4)",
            position: { of: "#employee" },
            bindingOptions: {
                visible: "loadingVisible",
                showIndicator: "showIndicator",
                showPane: "showPane",
                shading: "shading",
                closeOnOutsideClick: false
            },
            onShown: function() {
                setTimeout(function() {
                    $scope.$apply(function() {
                        $scope.loadingVisible = false;
                    });
                }, 2000);
            },
            onHidden: function() {
                $scope.employeeInfo = employee;
            }
        };
    }
]);