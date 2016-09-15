/**
 * Created by Dudu on 13/09/2016.
 */
carentApp.controller('orderScheduler', ['$scope', 'OrderService', 'carFactory', 'branchService', '$timeout', '$http', function ($scope, OrderService, carFactory, branchService, $timeout, $http) {

    //var scheduler = new DayPilot.Scheduler("dp");
    //scheduler.theme = "scheduler_traditional";
    //scheduler.events.list = [
    //    { id: 1, start: "2015-01-01T00:00:00", end: "2015-01-01T15:00:00", text: "Event 1", resource: "R1" }
    //];
    //scheduler.resources = [
    //    { id: "R1", name: "Resource 1" }
    //];
    //scheduler.init();
    //scheduler.scrollTo("2015-01-01");

    $scope.events = [];

    $scope.click = function(){
        console.log("sa");
    };

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

            minDate = minDate.subtract(7, 'days');
            $scope.config.startDate = new DayPilot.Date(minDate.toISOString());
            $scope.config.days = maxDate.diff(minDate, 'days') + 14;
        });
    });

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
        resources: []
    };

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