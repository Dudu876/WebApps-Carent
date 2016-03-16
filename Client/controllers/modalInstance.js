/**
 * Created by Dudu on 06/01/2016.
 */

carentApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, OrderService, car, date) {

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
        var now = angular.copy(date);
        $scope.dates.start = now.format(FORMAT);
        $scope.dates.end = now.add(1, 'days').format(FORMAT);
    };
    $scope.today();

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && (  date.getDay() === 6 ) );
    };

    $scope.ok = function () {
        //$scope.dates.start = moment($('#startDate').val(), FORMAT).toISOString();
        //$scope.dates.end = moment($('#endDate').val(), FORMAT).toISOString();
        var startDate = moment($('#startDate').val(), FORMAT).format();
        var endDate = moment($('#endDate').val(), FORMAT).format();
        var order = {
            startDate: startDate,
            endDate: endDate,
            car_id: $scope.car._id,
            mission: $scope.mission,
            client_name: $scope.client_name,
            phone: $scope.phone
        };

        OrderService.create(order).success(function(data){
            $uibModalInstance.close();
        }).error(function(data){
            alert(data);
        });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});