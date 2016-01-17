/**
 * Created by Dudu on 06/01/2016.
 */

carentApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, car) {

    $scope.car = car;
    $scope.carNumber = car.number;
    $scope.price = car.price;
    $scope.dates = {};

    $scope.today = function() {
        var today = new Date();
        var tomorrow = new Date();
        $scope.dates.start = new Date().toLocaleString();
        tommorow = tomorrow.setDate(today.getDate() + 1);
        $scope.dates.end = tomorrow.toLocaleString();
    };
    $scope.today();

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && (  date.getDay() === 6 ) );
    };

    $scope.ok = function () {
        $scope.dates.start = new Date($('#startDate').val()).toISOString();
        $scope.dates.end = new Date($('#endDate').val()).toISOString();
        var order = {
            startDate: $scope.dates.start,
            endDate: $scope.dates.end,
            car_id: $scope.car._id,
            price: $scope.price
        };
        $uibModalInstance.close(order);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});