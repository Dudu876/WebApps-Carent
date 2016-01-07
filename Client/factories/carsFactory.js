/**
 * Created by Dudu on 30/12/2015.
 */
var carURL = '/api/cars/';
var searchURL = '/api/searchCar/';
carentApp.factory('carFactory', ['$http', function($http) {

    return {
        // call to get all cars
        get : function() {
            return $http.get(carURL);
        },
        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new car
        create : function(carData) {
            return $http.post(carURL, carData);
        },
        // these will work when more API routes are defined on the Node side of things
        // call to put and edit branch
        update : function(carData) {
            return $http.put(carURL, carData);
        },
        // call to DELETE a car
        delete : function(number) {
            return $http.delete(carURL + number);
        },
        // search Car
        searchCar : function(search) {
            return $http.post(searchURL, search);
        },
    }
}]);
