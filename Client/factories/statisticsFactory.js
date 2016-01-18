carentApp.factory('StatisticsService', ['$http', function($http) {

    return {
        // call to get all orders
        carsByCategory : function() {
            return $http.get('/api/stats/carByCat');
        },

        rentTimeByCategory : function() {
            return $http.get('/api/stats/rentTimeByCat');
        }
    }
}]);
