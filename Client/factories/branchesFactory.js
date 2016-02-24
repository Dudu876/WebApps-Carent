/**
 * Created by Michael on 1/4/2016.
 */
carentApp.factory('branchService', ['$http', function($http) {

    var _selectedBranch;
    var _allBrunches;

    return {
        // call to get all branches
        get : function() {
            return $http.get('/api/branch/');
        },
        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new car
        upsert : function(branchData) {
            return $http.post('/api/branch/' + branchData._id, branchData);
        },

        // call to DELETE a car
        delete : function(id) {
            return $http.delete('/api/branch/' + id);
        },

        selectedBranch : _selectedBranch,
        allBranches : _allBrunches,

        getBranchName : function(branchId) {
            if (this.allBranches === undefined) {
                $http.get('/api/branch/').success(function(data){
                    _allBrunches = data;

                    var branch = this.allBranches.filter(function (branch) {
                        return branch._id === branchId;
                    });

                    return branch[0].title;
                });
            }
            else {
                var branch = this.allBranches.filter(function (branch) {
                    return branch._id === branchId;
                });

                return branch[0].title;
            }
        }
    }
}]);