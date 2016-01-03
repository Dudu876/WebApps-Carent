/**
 * Created by Dudu on 30/12/2015.
 */

carentApp.controller('carsManager', function($scope) {

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
    }]

});
