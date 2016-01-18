/**
 * Created by Dudu on 18/01/2016.
 */
carentApp.controller('ordersManager', ['$scope', 'OrderService', function ($scope, OrderService) {

    OrderService.getActive().success(function (response) {
        $scope.orders = response;
    });

    $scope.deleteOrder = function(id) {
        OrderService.delete(id).success(function () {
            alert('Order Deleted');
            $scope.orders = $scope.orders.filter(function (order) { return order._id !== id });
        });
    };
}]);

