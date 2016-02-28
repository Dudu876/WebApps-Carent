/**
 * Created by Dudu on 06/01/2016.
 */

carentApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, car, date) {

    var FORMAT = "DD/MM/YYYY HH:mm";
    //var missions = ["השכרה","טיפול","תאונה","לא זמין"];
    var missions = ["Rent","Treatment","Accident","Not available"];

    $scope.init = function () {
        $('.datetimepicker1').datetimepicker({format: FORMAT});
    };

    $scope.car = car;
    $scope.carNumber = car.number;
    $scope.dates = {};
    $scope.missions = missions;
    $scope.mission = $scope.missions[0];

    $scope.today = function() {
        $scope.dates.start = date.format(FORMAT);
        $scope.dates.end = date.add(1, 'days').format(FORMAT);
    };
    $scope.today();

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && (  date.getDay() === 6 ) );
    };

    $scope.ok = function () {
        //$scope.dates.start = moment($('#startDate').val(), FORMAT).toISOString();
        //$scope.dates.end = moment($('#endDate').val(), FORMAT).toISOString();
        $scope.dates.start = moment($('#startDate').val(), FORMAT).format();
        $scope.dates.end = moment($('#endDate').val(), FORMAT).format();
        var order = {
            startDate: $scope.dates.start,
            endDate: $scope.dates.end,
            car_id: $scope.car._id,
            mission: $scope.mission
        };
        $uibModalInstance.close(order);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});