/**
 * Created by Dudu on 30/12/2015.
 */
carentApp.controller('carsAvailable', ['$scope', '$uibModal', 'OrderService', 'carFactory', function ($scope, $uibModal, OrderService, carFactory) {

    $scope.categories = ["","A","B","C","D"];
    $scope.carReturning = [];
    carFactory.get().success(function (response) {
        $scope.cars = response;
        OrderService.getActive().success(function (response) {
            $scope.orders = response;
            organizeData();
        });
    });

    function organizeData() {
        if ($scope.orders === undefined)
            return 0;
        $scope.orders.forEach(function (element, index, array) {
            var orderedCar = getCarByNumber($scope.cars, element.car._id)[0];
            if (orderedCar !== undefined) {
                $scope.cars = deleteCarByNumber($scope.cars, element.car._id);
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

    function getCarByNumber(cars, id) {
        return cars.filter(function (car) {
            return car._id === id;
        });
    }

    function deleteCarByNumber(cars, id) {
        return cars.filter(function (car) {
            return car._id !== id;
        });
    }

    $scope.searchCar = function(){
        carFactory.searchCar($scope.searchCarObj).success(function(res){
            $scope.cars = res;
        });
    }

    var socket = io.connect('http://localhost:8080');
    socket.on('connect', function (data) {
        //socket.emit('newScreen', { "screen_id": screen_id});
    });
    socket.on('newOrder', function(data) {
        var order = angular.copy(data);
        order.car = {};
        order.car._id = data.car;
        $scope.orders.push(order);
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

