/**
 * Created by Dudu on 13/09/2016.
 */
carentApp.controller('orderScheduler', ['$scope', 'OrderService', 'carFactory', 'branchService', '$uibModal', '$timeout', '$http', '$location', function ($scope, OrderService, carFactory, branchService, $uibModal, $timeout, $http, $location) {

    //var FORMAT = "DD/MM/YYYY HH:mm";
    var FORMAT = "DD/MM/YYYY";

    $scope.dates = {
        start: moment().subtract(7,'days').toDate(),
        end: moment().add(3, 'months').toDate()
    };

    $scope.events = [];
    $scope.oldOrder = false;

    $scope.switchStatus = false;

    var minDate = moment();
    var maxDate = moment();

    var eventMenu = new DayPilot.Menu([
        {text:"Delete Order", onclick: onContextDelete}]);
    var selectionMenu = new DayPilot.Menu([
        {text:"Create Order", onclick: onContextCreate}]);

    $scope.config = {
        scale: "Day",
        visible: true,
        theme: "scheduler_traditional",
        contextMenu: eventMenu,
        contextMenuSelection: selectionMenu,
        //days: new DayPilot.Date().daysInMonth(),
        days: 90,
        startDate: new DayPilot.Date().firstDayOfMonth(),
        cellWidth: 20,
        //cellWidthSpec: "Auto",
        timeHeaders: [
            { groupBy: "Month" },
            { groupBy: "Day", format: "d" },
            { groupBy: "Day", format: "ddd" }
        ],
        MessageBarPosition: "Bottom",
        rowMoveHandling: "Update",
        //onRowMoved: onRowMoved,
        onBeforeCellRender: onBeforeCellRender,
        onEventMoved: onEventMoved,
        onEventResized: onEventResized,
        resources: []
    };

    function onBeforeCellRender(args) {
        if (args.cell.start <= DayPilot.Date.today() && DayPilot.Date.today() < args.cell.end) {
            args.cell.backColor = "#FF7F50";
        }
    }

    function onEventMoved(args) {
        handleOrderChanged(args.e.id(), args.newStart, args.newEnd, args.newResource);
    }

    function onEventResized(args) {
        handleOrderChanged(args.e.id(), args.newStart, args.newEnd, args.e.resource());
    }

    function onContextCreate() {
        var size = '';
        var i = getIndexById($scope.cars, this.source.resource);
        var date = moment(this.source.start.value);
        var endDate = moment(this.source.end.value);
        var car = $scope.cars[i];
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'views/orderModal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                car: function () {
                    return car;
                },
                date: function () {
                    return date;
                },
                endDate: function () {
                    return endDate
                }
            }
        });

        modalInstance.result.then(
            function () {
                console.log('order finished');

            },
            function () {
                console.log('order dismissed');
            }
        );
    }

    function onContextDelete() {
        OrderService.delete(this.source.value()).success(function(data) {
            alert("Order deleted");
        });
    }

    function handleOrderChanged(id, newStart,newEnd, car_id) {
        var newData = {
            id: id,
            startDate: newStart.toString(),
            endDate: newEnd.toString(),
            car_id: car_id
        };

        OrderService.getById(id).success(function(order) {
            $scope.oldOrder = order;

            // Update the order
            OrderService.update(newData).success(function() {
                $scope.scheduler.messageBarPosition = "Bottom";
                //$scope.scheduler.message("Changes Saved <a id='undo' href='#'>Undo</a>");
                $scope.scheduler.message("Changes Saved");
            }).error(function(data){
                alert(data);
            });
        });

    }

    $scope.undo = function() {
        var newData = {
            id: $scope.oldOrder._id,
            startDate: $scope.oldOrder.startDate,
            endDate: $scope.oldOrder.endDate,
            car_id: $scope.oldOrder.car
        };

        // Update the order
        OrderService.update(newData).success(function() {
            //getOrderById($scope.events, newData.id).resource = $scope.oldOrder.car;
            var i = getIndexById($scope.events, newData.id);
            $scope.events[i].start = $scope.oldOrder.startDate;
            $scope.events[i].end = $scope.oldOrder.endDate;
            $scope.events[i].resource = $scope.oldOrder.car;

            $scope.oldOrder = false;

        }).error(function(data){
            alert(data);
        });
        //$scope.oldOrder = false;
    };

    $scope.$watch( function() { return branchService.selectedBranch} , function(newVal,oldVal) {
        refresh();
    });

    $scope.$watch('switchStatus', function(oldVal, newVal) {
        if ($scope.switchStatus)
            refreshDates(moment($scope.dates.start),moment($scope.dates.end));
        else {
            refreshDates(minDate,maxDate);
        }
    });

    $scope.$watch('dates.start', function(newVal, oldVal) {
        console.log('changed');
    }, true);

    var connection = $location.protocol() + '://' + $location.host() + ':' + $location.port();
    var socket = io.connect(connection);
    socket.on('connect', function (data) {
    });
    socket.on('newOrder', function(data) {
        var order = angular.copy(data);
        order.car = {};
        order.car._id = data.car;
        addOrder(order);
    });
    socket.on('deleteOrder', function(data) {
        $scope.events = deleteOrderById($scope.events, data);
        $scope.$apply();
    });

    carFactory.get().success(function(cars) {
        $scope.cars = cars;
        refresh();

        OrderService.get().success(function (orders) {
            $scope.orders = orders;
            for (var i in $scope.orders) {
                addOrder($scope.orders[i]);
                minDate = moment($scope.orders[i].startDate) < minDate ? moment($scope.orders[i].startDate) : minDate;
                maxDate = moment($scope.orders[i].endDate) > maxDate ? moment($scope.orders[i].endDate) : maxDate;
            }

            //minDate = minDate.subtract(7, 'days');
            $scope.config.startDate = new DayPilot.Date(minDate.toISOString());
            $scope.config.days = maxDate.diff(minDate, 'days');
        });
    });

    function addOrder(order) {
        var startTime = moment(order.startDate).format("HH:mm");
        var endTime = moment(order.endDate).format("HH:mm");
        $scope.events.push({
            "id": order._id,
            "text": startTime + ' - ' + order.client_name + " ; " + order.phone + ' - ' + endTime,
            "start": order.startDate,
            "end": order.endDate,
            "resource": order.car._id
        });
    }

    function deleteOrderById(orders, id) {
        return orders.filter(function (order) {
            return order.id !== id;
        });
    }

    function refreshDates(minDate,maxDate) {
        $scope.config.startDate = new DayPilot.Date(minDate.toISOString());
        $scope.config.days = maxDate.diff(minDate, 'days');
    }

    function refresh() {
        $scope.config.resources = [];
        for (var i in $scope.cars) {
            if (branchService.selectedBranch == $scope.cars[i].branch.title) {
                $scope.config.resources.push({
                    "name": $scope.cars[i].type.manufacturer + " " + $scope.cars[i].type.model,
                    "id": $scope.cars[i]._id
                })
            }
        }
    }

    function getOrderById(orders, id) {
        return orders.filter(function (order) {
            return order.id === id;
        });
    }
    function getIndexById(array, id) {
        for (var i in array) {
            if (array[i].id == id || array[i]._id == id)
                return i;
        }
    }
}]);