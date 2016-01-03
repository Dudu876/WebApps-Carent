/**
 * Created by Dudu on 30/12/2015.
 */
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
            templateUrl: 'views/carsAvailable.html',
            controller: 'MainController'
        })

        // cars page that will use the CarsController
        .when('/Cars', {
            templateUrl: 'views/carsManager.html',
            controller: 'CarController'
        });

    $locationProvider.html5Mode(true);

}]);
