/**
 * Created by Dudu on 30/12/2015.
 */
carentApp.factory('carFactory', ['$http', function($http) {

    return {
        // call to get all cars
        get : function() {
            return $http.get('/api/car/');
        },
        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new car
        create : function(carData) {
            return $http.post('/api/car/', carData);
        },
        // these will work when more API routes are defined on the Node side of things
        // call to put and edit branch
        update : function(carData) {
            return $http.put('/api/car/', carData);
        },
        // call to DELETE a car
        delete : function(id) {
            return $http.delete('/api/car/' + id);
        }
    }

}]);
