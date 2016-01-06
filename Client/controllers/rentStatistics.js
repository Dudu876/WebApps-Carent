carentApp.controller('rentStatistics', ['$scope', 'OrderService', 'carFactory',
    function($scope, OrderService, carFactory) {
        var ordersPromise = OrderService.get();

        ordersPromise.success(function(orders)
        {
            var carsPromise = carFactory.get();
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
            carsPromise.success(function (cars){
                var totalCategoryTimeOfRent = {};
                var totalCategoryNumberOfRents = {};
                var totalCatgeoryAverage = [];

                for (i = 0; i < orders.length; i++)
                {
                    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    var currentCar = $.grep(cars, function(e){ return e.number == orders.number; })[0];
                    if(!totalCategoryTimeOfRent[currentCar.category])
                    {
                        totalCategoryTimeOfRent[currentCar.category] = diffDays;
                        totalCategoryNumberOfRents[currentCar.category] = 1;
                    }
                    else
                    {
                        totalCategoryTimeOfRent[currentCar.category] += diffDays;
                        totalCategoryNumberOfRents[currentCar.category]++;
                    }
                }

                var indexOfCategories = 0;
                for(var category in totalCategoryTimeOfRent) {
                    totalCatgeoryAverage[indexOfCategories] = { "label": category,
                                                                "value": totalCategoryTimeOfRent[category] / totalCategoryNumberOfRents[category]};
                    indexOfCategories++;
                }

                var pie = new d3pie("pieChart", {
                    "header": {
                        "title": {
                            "text": "Category Average Time Of Rent",
                            "fontSize": 24,
                            "font": "open sans"
                        },
                        "subtitle": {
                            "text": "A full pie chart to show off label collision detection and resolution.",
                            "color": "#999999",
                            "fontSize": 12,
                            "font": "open sans"
                        },
                        "titleSubtitlePadding": 9
                    },
                    "footer": {
                        "color": "#999999",
                        "fontSize": 10,
                        "font": "open sans",
                        "location": "bottom-left"
                    },
                    "size": {
                        "canvasWidth": 590,
                        "pieOuterRadius": "90%"
                    },
                    "data": {
                        "sortOrder": "value-desc",
                        "content": totalCatgeoryAverage
                    },
                    "labels": {
                        "outer": {
                            "pieDistance": 32
                            },
                        "inner": {
                            "hideWhenLessThanPercentage": 3
                            },
                        "mainLabel": {
                            "fontSize": 11
                        },
                        "percentage": {
                            "color": "#ffffff",
                                "decimalPlaces": 0
                        },
                        "value": {
                            "color": "#adadad",
                                "fontSize": 11
                        },
                        "lines": {
                            "enabled": true
                        },
                        "truncation": {
                            "enabled": true
                        }
                    },
                    "effects": {
                        "pullOutSegmentOnClick": {
                            "effect": "linear",
                                "speed": 400,
                                "size": 8
                        }
                    },
                    "misc": {
                        "gradient": {
                            "enabled": true,
                                "percentage": 100
                        }
                    }
                });
            });
        });
    }]);