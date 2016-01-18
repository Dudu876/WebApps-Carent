/**
 * Created by Dudu on 06/01/2016.
 */

carentApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, car) {

    var FORMAT = "DD/MM/YYYY HH:mm";

    $scope.init = function () {
        $('.datetimepicker1').datetimepicker({format: FORMAT});
    };

    $scope.car = car;
    $scope.carNumber = car.number;
    $scope.price = car.price;
    $scope.dates = {};

    $scope.today = function() {
        $scope.dates.start = moment().format(FORMAT);
        $scope.dates.end = moment().add(1, 'days').format(FORMAT);
    };
    $scope.today();

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && (  date.getDay() === 6 ) );
    };

    $scope.ok = function () {
        $scope.dates.start = moment($('#startDate').val(), FORMAT).toISOString();
        $scope.dates.end = moment($('#endDate').val(), FORMAT).toISOString();
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