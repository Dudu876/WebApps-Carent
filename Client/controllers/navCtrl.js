/**
 * Created by Dudu on 21/02/2016.
 */
carentApp.controller('navCtrl', function($scope, $log, carFactory, branchService) {
    branchService.get().success(function(response) {
        $scope.branches = response;
        branchService.selectedBranch = $scope.branches[1].title;
        $scope.selectedBranch = branchService.selectedBranch;
        branchService.allBranches = $scope.branches;
    });

     $scope.selectedBranch = branchService.selectedBranch;

    $scope.changeBranch = function(branch) {
        branchService.selectedBranch = branch.title;
        $scope.selectedBranch = branchService.selectedBranch;
    };
});