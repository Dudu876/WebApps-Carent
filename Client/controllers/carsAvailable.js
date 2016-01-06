/**
 * Created by Dudu on 30/12/2015.
 */
carentApp.controller('carsAvailable', ['$scope', '$uibModal', 'OrderService', function ($scope, $uibModal, OrderService) {

    $scope.cars = [{
        number: 123,
        type: {manufacturer: "פיג'ו", model: "107", year: 2011},
        category: "A",
        price: 125,
        gearbox: "ידני",
        entryDate: "09/09/2010"
    }, {
        number: 124,
        type: {manufacturer: "פיג'ו", model: "108", year: 2015},
        category: "A",
        price: 180,
        gearbox: "ידני",
        entryDate: "09/09/2015"
    }];

    $scope.carReturning = [];

    OrderService.getActive().success(function (response) {
        $scope.orders = response;
        organizeData();
    });

    function organizeData() {
        $scope.orders.forEach(function (element, index, array) {
            var orderedCar = getCarByNumber($scope.cars, element.carNumber)[0];
            $scope.cars = deleteCarByNumber($scope.cars, element.carNumber);
            orderedCar.returning = '';
            var now = new Date();
            var diffDays = 0;
            var diffHours = Math.round((Date.parse(element.endDate) - now.getTime()) / 3600000);
            if (diffHours > 24) {
                diffDays = Math.floor(diffHours / 24);
                diffHours = diffHours % 24;
                orderedCar.returning =
                    diffDays.toString() + ((diffDays == 1) ? ' day ' : ' days ');
            }
            orderedCar.returning += (diffHours.toString() + ((diffHours == 1) ? ' hour' : ' hours'));
                $scope.carReturning.push(orderedCar);
        });
    }

    function getCarByNumber(cars, number) {
        return cars.filter(function (car) {
            return car.number === number;
        });
    }

    function deleteCarByNumber(cars, number) {
        return cars.filter(function (car) {
            return car.number !== number;
        });
    }

    $scope.openModal = function (size, carNumber, price) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/orderModal.html',
            controller: 'ModalInstanceCtrl',
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

