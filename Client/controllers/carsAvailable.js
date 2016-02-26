/**
 * Created by Dudu on 30/12/2015.
 */
carentApp.controller('carsAvailable', ['$scope', '$location', '$uibModal', 'OrderService', 'carFactory', 'branchService', function ($scope, $location, $uibModal, OrderService, carFactory, branchService) {

    $scope.selectedDay = {};
    $scope.selectedDay.date = moment().add(2,'hours'); //@dudu
    //$scope.selectedDay.date = moment();
    $scope.search = {};
    $scope.search.branch = {};
    $scope.categories = ["","A","B","C","D","E","F","G"];
    $scope.carReturning = [];
    $scope.events = [];

    carFactory.get().success(function (response) {
        $scope.allCars = response;
        OrderService.get().success(function (response) {
            $scope.allOrders = response;
            $scope.orders = getActiveOrders($scope.allOrders, $scope.selectedDay.date);
            organizeData();
            calendarEvents();
        });
    });

    $scope.$watch( function() { return branchService.selectedBranch} , function(newVal,oldVal) {
        $scope.search.branch.title = branchService.selectedBranch;
    });

    function organizeData() {
        $scope.carReturning = [];
        $scope.freeCars = $scope.allCars;
        if ($scope.orders === undefined || $scope.orders.length == 0) {
            $scope.freeCars = $scope.allCars;

            return 0;
        }

        $scope.orders.forEach(function (element, index, array) {
            var orderedCar = getCarByNumber($scope.allCars, element.car._id)[0];
            if (orderedCar !== undefined) {
                $scope.freeCars = deleteCarByNumber($scope.freeCars, element.car._id);
                orderedCar.order_id = element._id;
                orderedCar.returning = "";
                orderedCar.mission = element.mission;
                //var now = new Date();
                var now = $scope.selectedDay.date;
                var diffDays = 0;
                //var diffHours = Math.round((Date.parse(element.endDate) - now.getTime()) / 3600000);
                //if (now.isBefore(moment(element.endDate).add(2,'hours'))) {
                    var diffHours = Math.round(moment(element.endDate).add(2, 'hours').diff(now, 'minutes') / 60);
                    orderedCar.hours = diffHours;
                    if (diffHours > 24) {
                        diffDays = Math.floor(diffHours / 24);
                        diffHours = diffHours % 24;
                        orderedCar.returning =
                            diffDays.toString() + ((diffDays == 1) ? ' day ' : ' days ');
                    }
                    orderedCar.returning += (diffHours.toString() + ((diffHours == 1) ? ' hour' : ' hours'));
                    $scope.carReturning.push(orderedCar);
                //}
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

    function getActiveOrders(allOrders, date) {
        return allOrders.filter(function (order) {
            return date.isBetween(order.startDate, order.endDate, 'minute');
        });
    }

    var connection = $location.protocol() + '://' + $location.host() + ':' + $location.port();
    var socket = io.connect(connection);
    socket.on('connect', function (data) {
    });
    socket.on('newOrder', function(data) {
        var order = angular.copy(data);
        if (moment().isBetween(order.startDate, order.endDate)) {
            order.car = {};
            order.car._id = data.car;
            $scope.orders.push(order);
            organizeData();
            $scope.$apply();
        }
    });
    socket.on('deleteOrder', function(data) {
        $scope.carReturning = $scope.carReturning.filter(function (car) { return car.order_id !== data });
        $scope.$apply();
    });

    $scope.options = {
        weekOffset: 1,
        daysOfTheWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        constraints: {
            startDate: moment().subtract(1, 'months').format('YYYY-MM-15'),
            endDate: moment().add(2, 'months').format('YYYY-MM-15')
        }
    };

    function calendarEvents(){
        $scope.allOrders.forEach(function (element, index, array) {
            var event = {};
            //event.date = moment(element.endDate).toISOString();
            event.date = moment(element.endDate).subtract(2,'hours').format(); //@dudu
            //event.date = moment(element.endDate).format();
            event.mission = element.mission;
            var car = angular.copy(element.car);
            car.branch = branchService.getBranchName(element.car.branch);
            event.car = car;
            //event.title = car.type.manufacturer + ' ' + car.type.model + ' - ' + car.type.year + ' (' + car.branch + ')';
            $scope.events.push(event);
        });
    };

    $scope.showEvents = function(day) {
        //alert(events.map(function(e) { return e.title }).join("\n"));
        $scope.dayEvents = day.events;
        //$scope.selectedDay = angular.copy(day);
        var tempday = angular.copy(day);
        //$scope.selectedDay.date.add(2, 'hours'); // @dudu
        //$scope.selectedDay.date = day.date.add(2,'hours');
        $scope.selectedDay.date = tempday.date.add(2,'hours');
        if (day.date.get('date') == moment().get('date')) $scope.selectedDay.date = moment().add(2,'hours');
        //$scope.selectedDay.date.utcOffset('+0200');
        $scope.orders = getActiveOrders($scope.allOrders, $scope.selectedDay.date);
        organizeData();
    };

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

