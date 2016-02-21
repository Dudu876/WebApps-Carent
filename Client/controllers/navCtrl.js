/**
 * Created by Dudu on 21/02/2016.
 */
carentApp.controller('navCtrl', function($scope, $log, carFactory, branchService) {
    branchService.get().success(function(response) {
        $scope.branches = response;
        branchService.selectedBranch = $scope.branches[0].title;
        $scope.selectedBranch = branchService.selectedBranch;
    });

     $scope.selectedBranch = branchService.selectedBranch;

    $scope.changeBranch = function(branch) {
        branchService.selectedBranch = branch.title;
        $scope.selectedBranch = branchService.selectedBranch;
    };
});