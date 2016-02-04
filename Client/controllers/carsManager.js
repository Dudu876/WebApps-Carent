/**
 * Created by Dudu on 30/12/2015.
 */

carentApp.controller('carsManager', function($scope, $uibModal, $log, carFactory, branchService) {
    $scope.cars = [];
    $scope.branches = [];
    $scope.updateMode = "";
    $scope.categories = ["","A","B","C","D","E","F","G"];
    var isUpdateMode = false;
    var updateMode = "Adding new car";
    $scope.showModal = false;
    $scope.searchCarObj = {
      number: "",
        model: "",
        category:""
    };

    $scope.searchCar = function(){
        carFactory.searchCar($scope.searchCarObj).success(function(res){
           $scope.cars = res;
        });
    }

    $scope.init = function(){
        initCars();
        initBranches();
    }

    // init car list
    var initCars = function(){
        carFactory.get().success(function(response){
            $scope.cars = response;
        });
    }

    // init branches list
    var initBranches = function(){
        // get all branches
        branchService.get().success(function(response){
            $scope.branches = response;
        });
    }

    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };
    $scope.openUpdateForm = function(car){
        isUpdateMode = true;
        $scope.updateMode = "Edit car";

        $scope.showModal = !$scope.showModal;

    }

    // remove car from list
    $scope.removeRow = function(number){
        carFactory.delete(number).success(function(response){
            var index = -1;
            var carArr = eval( $scope.cars );
            for( var i = 0; i < carArr.length; i++ ) {
                if( carArr[i].number === parseInt(response) ) {
                    index = i;
                    break;
                }
            }
            if( index === -1 ) {
                alert( "Something gone wrong" );
            }
            $scope.cars.splice( index, 1 );
        }).error(function(data){
            alert( "Something gone wrong" );
        });
    };

    $scope.openModal = function (size,isUpdateMode,car) {
        if (!isUpdateMode)
        {
            car = {
                _id: "",
                number: "",
                type: { manufacturer: "", model: "", year: null},
                category: "",
                price: null,
                gearbox: "",
                branch: ""
            };
            updateMode = "Adding new car";
        }else{
            /*var yearNumber = car.year;
            car.year = new Date();
            car.year.setYear(yearNumber);*/
            updateMode = "Edit car";
        }
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/carModal.html',
            controller: 'ModalInstanceCtrlCar',
            size: size,
            resolve: {
                branchService: function () {
                  return branchService;
                },
                _id: function () {
                    return car._id;
                },
                number: function () {
                    return car.number;
                },
                manufacturer: function () {
                    return car.type.manufacturer;
                },
                model: function () {
                    return car.type.model;
                },
                year: function () {
                    var year = new Date();;
                    if (car.type.year != null){
                        year.setYear(car.type.year);

                    }

                    return year;
                },
                category: function () {
                    return car.category;
                },
                price: function () {
                    return car.price;
                },
                gearbox: function () {
                    return car.gearbox;
                },
                branch: function () {
                    return car.branch;
                },
                updateMode:function(){
                    return updateMode;
                }
            }
        });

        modalInstance.result.then(function (currCar) {
            // In case create new car
            if (!isUpdateMode) {
                carFactory.create(currCar).success(function(response){
                    initCars();
                }).error(function(data){
                    alert( "Something gone wrong" );
                });
            }
            // In case update car
            else {
                carFactory.update(currCar).success(function(response){
                    initCars();
                }).error(function(data){
                    alert( "Something gone wrong" );
                });
            }
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});


carentApp.controller('ModalInstanceCtrlCar', function ($scope, $uibModalInstance, branchService, _id ,number, manufacturer,model,year,category,price,gearbox,branch,updateMode) {
    $scope.categories = ["","A","B","C","D","E","F","G"];
    $scope.gearboxes = ["","Manual","Automatic","Robotics"];
    $scope.currCar = {
        _id: _id,
        number: number,
        type: { manufacturer: manufacturer, model: model, year: year},
        category: category,
        price: price,
        gearbox: gearbox,
        branch: branch
    };
    $scope.updateMode = updateMode;

    $scope.init = function(){
        initBranches();
    }

    // init branches list
    var initBranches = function(){
        // get all branches
        branchService.get().success(function(response){
            $scope.branches = response;
        });
    }

    $scope.saveChanges = function () {
        $uibModalInstance.close($scope.currCar);
    };

    $scope.close = function () {
        $uibModalInstance.dismiss('close');
    };


    $scope.today = function() {
        $scope.currCar.type.year = year;
    };
    $scope.today();

    $scope.clear = function () {
        $scope.currCar.type.year = null;
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
