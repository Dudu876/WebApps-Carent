carentApp.controller('rentStatistics', ['$scope', 'OrderService', 'carFactory',
    function($scope, OrderService, carFactory) {
        var ordersPromise = OrderService.get();

        ordersPromise.success(function(orders)
        {
            var totalCategoryTimeOfRent = {};
            var totalCategoryNumberOfRents = {};
            var totalCatgeoryAverage = [];

            for (i = 0; i < orders.length; i++)
            {
                var timeDiff = Math.abs(orders[i].startDate - orders[i].endDate);
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                if(!totalCategoryTimeOfRent[orders[i].car.category])
                {
                    totalCategoryTimeOfRent[orders[i].car.category] = diffDays;
                    totalCategoryNumberOfRents[orders[i].car.category] = 1;
                }
                else
                {
                    totalCategoryTimeOfRent[orders[i].car.category] += diffDays;
                    totalCategoryNumberOfRents[orders[i].car.category]++;
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
    }]);