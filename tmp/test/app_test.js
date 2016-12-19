
angular.module('myAppTest', ['dx', 'ngRoute'])

    // ngRoute
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/sys', {
                templateUrl: 'index.html'
            })
            .when('/item', {
                templateUrl: 'views/item.html'
            })
            .otherwise({
                redirectTo: '/item'
            });
        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});
    })

    // first-letter capitalize ('shuang lin' change to 'Shuang Lin')
    .filter('titlecase', function() {
        return function(str) {
            return str.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        };
    });


