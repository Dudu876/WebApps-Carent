carentApp.controller('caleController', ['$scope', '$http', 'OrderService', 'branchService', function ($scope, $http, OrderService, branchService) {

    $scope.events = [];
    $scope.options = {
        weekOffset: 1,
        daysOfTheWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        constraints: {
            startDate: moment().subtract(1, 'months').format('YYYY-MM-15'),
            endDate: moment().add(2, 'months').format('YYYY-MM-15')
        }
    };

    OrderService.get().success(function(data){
        $scope.orders = data;
        $scope.orders.forEach(function (element, index, array) {
            var event = {};
            event.date = moment(element.endDate).format();
            event.mission = element.mission;
            var car = angular.copy(element.car);
            car.branch = branchService.getBranchName(element.car.branch);
            event.car = car;
            //event.title = car.type.manufacturer + ' ' + car.type.model + ' - ' + car.type.year + ' (' + car.branch + ')';
            $scope.events.push(event);
        });
    });

    $scope.showEvents = function(events) {
        //alert(events.map(function(e) { return e.title }).join("\n"));
        $scope.dayEvents = events;
    };

}]);