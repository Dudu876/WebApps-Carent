/**
 * Created by Dudu on 30/12/2015.
 */
carentApp.controller('carsAvailable', ['$scope', '$uibModal', 'OrderService', function($scope, $uibModal, OrderService) {

    $scope.cars = [{
        number: 123,
        type: { manufacturer: "פיג'ו", model: "107", year: 2011},
        category: "A",
        price: 125,
        gearbox: "ידני",
        entryDate: "09/09/2010"
    },{
        number: 124,
        type: { manufacturer: "פיג'ו", model: "108", year: 2015},
        category: "A",
        price: 180,
        gearbox: "ידני",
        entryDate: "09/09/2015"
    }];

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.openModal = function (size,carNumber,price) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/orderModal.html',
            controller: 'ModalInstanceCtrlCar',
            size: size,
            resolve: {
                carNumber: function () {
                    return carNumber;
                },
                price: function () {
                    return price;
                }
            }
        });

        modalInstance.result.then(function (order) {
            OrderService.create(order);
            alert('Order Created');
        }, function () {
            alert('Order canceled');
        });
    };

}]);

carentApp.controller('ModalInstanceCtrlCar', function ($scope, $uibModalInstance, carNumber, price) {

    $scope.carNumber = carNumber;
    $scope.price = price;


    $scope.today = function() {
        var today = new Date();
        $scope.dt = new Date().toLocaleString();
        var tomorrow = new Date();
        tommorow = tomorrow.setDate(today.getDate() + 1);
        $scope.dtend = tomorrow.toLocaleString();
    };
    $scope.today();

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && (  date.getDay() === 6 ) );
    };

    $scope.ok = function () {
        var order = {
            startDate: $scope.dt,
            endDate: $scope.dtend,
            carNumber: $scope.carNumber,
            price: $scope.price
        };
        $uibModalInstance.close(order);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    //
    //$scope.openEntryDateStart = function($event) {
    //    $event.preventDefault();
    //    $event.stopPropagation();
    //
    //    $scope.openedEntryDateStart = true;
    //};
    //
    //$scope.openEntryDateEnd = function($event) {
    //    $event.preventDefault();
    //    $event.stopPropagation();
    //
    //    $scope.openedEntryDateEnd = true;
    //};
    //

    //
    //$scope.clear = function () {
    //    $scope.dt = null;
    //};
    //
    //$scope.initDate = new Date('2016-15-20');
    //$scope.formats = ['yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    //$scope.format = $scope.formats[0];
    ////$scope.formatEntryDate = $scope.formats[2];
    ////
    ////$scope.datepickerOptions = {
    ////    datepickerMode:"'year'",
    ////    minMode:"'year'",
    ////    minDate:"minDate",
    ////    showWeeks:"false",
    ////};
    //
    //$scope.datepickerEntryOptions = {
    //
    //};
});
