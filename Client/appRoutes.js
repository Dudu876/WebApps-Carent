/**
 * Created by Dudu on 30/12/2015.
 */
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/carsAvailable.html',
            controller: 'carsAvailable'
        })
        // cars page that will use the CarsController
        .when('/CarsManager', {
            templateUrl: 'views/carsManager.html',
            controller: 'carsManager'
        })
        .when('/Branches', {
            templateUrl: 'views/branchesManager.html',
            controller: 'branchesManager'
        });

    $locationProvider.html5Mode(true);

}]);
