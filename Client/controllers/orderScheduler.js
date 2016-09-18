/**
 * Created by Dudu on 13/09/2016.
 */
carentApp.controller('orderScheduler', ['$scope', 'OrderService', 'carFactory', 'branchService', '$timeout', '$http', function ($scope, OrderService, carFactory, branchService, $timeout, $http) {

    $scope.events = [];

    $scope.config = {
        scale: "Day",
        visible: true,
        theme: "scheduler_traditional",
        //days: new DayPilot.Date().daysInMonth(),
        days: 90,
        startDate: new DayPilot.Date().firstDayOfMonth(),
        cellWidth: 20,
        //cellWidthSpec: "Auto",
        timeHeaders: [
            { groupBy: "Month" },
            { groupBy: "Day", format: "d" }
        ],
        onBeforeCellRender: onBeforeCellRender,
        onEventMoved: onEventMoved,
        resources: []
    };

    function onBeforeCellRender(args) {
        if (args.cell.start <= DayPilot.Date.today() && DayPilot.Date.today() < args.cell.end) {
            args.cell.backColor = "#FF7F50";
        }
    }

    function onEventMoved(args) {
        debugger;
        var params = {
            id: args.e.id(),
            newStart: args.newStart.toString(),
            newEnd: args.newEnd.toString(),
            newResource: args.newResource
        };
        // need to create update option in the order factory
        //$http.post("backend_move.php", params).success(function() {
        //    $scope.scheduler.message("Moved.");
        //});
    }

    $scope.$watch( function() { return branchService.selectedBranch} , function(newVal,oldVal) {
        refresh();
    });

    carFactory.get().success(function(cars) {
        $scope.cars = cars;
        refresh();

        var minDate = moment();
        var maxDate = moment();
        OrderService.get().success(function (orders) {
            $scope.orders = orders;
            for (var i in $scope.orders) {
                var startTime = moment($scope.orders[i].startDate).format("HH:mm");
                var endTime = moment($scope.orders[i].endDate).format("HH:mm");
                $scope.events.push({
                    "id": $scope.orders[i]._id,
                    "text": startTime + ' - ' + $scope.orders[i].client_name + " ; " + $scope.orders[i].phone + ' - ' + endTime,
                    "start": $scope.orders[i].startDate,
                    "end": $scope.orders[i].endDate,
                    "resource": $scope.orders[i].car.number
                });
                minDate = moment($scope.orders[i].startDate) < minDate ? moment($scope.orders[i].startDate) : minDate;
                maxDate = moment($scope.orders[i].endDate) > maxDate ? moment($scope.orders[i].startDate) : maxDate;
            }

            //minDate = minDate.subtract(7, 'days');
            $scope.config.startDate = new DayPilot.Date(minDate.toISOString());
            $scope.config.days = maxDate.diff(minDate, 'days') + 7;
        });
    });


    function refresh() {
        $scope.config.resources = [];
        for (var i in $scope.cars) {
            if (branchService.selectedBranch == $scope.cars[i].branch.title) {
                $scope.config.resources.push({
                    "name": $scope.cars[i].type.manufacturer + " " + $scope.cars[i].type.model,
                    "id": $scope.cars[i].number
                })
            }
        }
    }
}]);