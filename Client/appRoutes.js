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
        .when('/Calendar', {
            templateUrl: 'views/calender.html',
            controller: 'caleController'
        })
        .when('/CarsManager', {
            templateUrl: 'views/carsManager.html',
            controller: 'carsManager'
        })
        .when('/Scheduler', {
            templateUrl: 'views/orderScheduler.html',
            controller: 'orderScheduler'
        })
        .when('/OrdersManager', {
            templateUrl: 'views/ordersManager.html',
            controller: 'ordersManager'
        })
        .when('/Branches', {
            templateUrl: 'views/branchesManager.html',
            controller: 'branchesManager'
        })
        .when('/Statistics', {
            templateUrl: 'views/rentStatistics.html',
            controller: 'rentStatistics'
        })
        .when('/support', {
            templateUrl: 'views/support.html'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

}]);
