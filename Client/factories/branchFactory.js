/**
 * Created by Michael on 05/01/2016.
 */
carentApp.factory('branchFactory', ['$http', function($http) {

    return {
        // call to get all cars
        get : function() {
            return $http.get('/api/branch');
        },
        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new car
        create : function(carData) {
            return $http.post('/api/branch', carData);
        },
        // these will work when more API routes are defined on the Node side of things
        // call to put and edit branch
        update : function(carData) {
            return $http.put('/api/branch/', carData);
        },
        // call to DELETE a branch
        delete : function(id) {
            return $http.delete('/api/branch/' + id);
        }
    }

}]);