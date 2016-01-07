/**
 * Created by Dudu on 30/12/2015.
 */
carentApp.controller('carsAvailable', ['$scope', '$uibModal', 'OrderService', 'carFactory', function ($scope, $uibModal, OrderService, carFactory) {

    $scope.carReturning = [];
    carFactory.get().success(function (response) {
        $scope.cars = response;
        OrderService.getActive().success(function (response) {
            $scope.orders = response;
            organizeData();
        });
    });

    function organizeData() {
        $scope.orders.forEach(function (element, index, array) {
            var orderedCar = getCarByNumber($scope.cars, element.carNumber)[0];
            if (orderedCar !== undefined) {
                $scope.cars = deleteCarByNumber($scope.cars, element.carNumber);
                orderedCar.returning = "";
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
            }
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

    var socket = io.connect('http://localhost:8080');
    socket.on('connect', function (data) {
        //socket.emit('newScreen', { "screen_id": screen_id});
    });
    socket.on('newOrder', function(data) {
        $scope.orders.push(data);
        organizeData();
        $scope.$apply();
    });

    $scope.openModal = function (size, car) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/orderModal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                car: function () {
                    return car;
                }
            }
        });

        modalInstance.result.then(function (order) {
            OrderService.create(order);
        },
            function () {
        });
    };
}]);

