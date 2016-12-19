
(function () {
    var app = angular.module('myAppItem');
    var apiUrl = CmpToolStatic.wsUrl;
    
    app.service('MegaMenuService', ['$http', function ($http) {
        var fullUrl = apiUrl + "api/MegaMenu/GetMegamenu/1000004/";
        this.getMegaMenu = function () {
            var request = {
                method: 'GET',
                data: null,
                url: fullUrl
            };
            return $http(request);
        }
    }]);

})();
