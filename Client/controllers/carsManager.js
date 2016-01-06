/**
 * Created by Dudu on 30/12/2015.
 */

carentApp.controller('carsManager', function($scope, carFactory, branchService) {
    $scope.mode = "Adding new car";
    $scope.cars = [{
        number: 123,
        type: { manufacturer: "פיג'ו", model: "107", year: 2011},
        category: "A",
        price: 125,
        gearbox: "ידני",
        entryDate: "09/09/2010",
        branch:{city:"Netanya"}
    },{
        number: 124,
        type: { manufacturer: "פיג'ו", model: "108", year: 2015},
        category: "A",
        price: 180,
        gearbox: "ידני",
        entryDate: "09/09/2015",
        branch:{city:"Tel-aviv"}
    }];

    $scope.branches = branchService.get();

    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.openEntryDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.openedEntryDate = true;
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.formatEntryDate = $scope.formats[2];

    $scope.datepickerOptions = {
        datepickerMode:"'year'",
        minMode:"'year'",
        minDate:"minDate",
        showWeeks:"false",
    };

    $scope.datepickerEntryOptions = {

    };

});
