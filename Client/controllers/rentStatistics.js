carentApp.controller('rentStatistics', ['$scope', 'StatisticsService',
    function($scope, StatisticsService) {
        var carsByCategoryPromise = StatisticsService.carsByCategory();
        var rentTimeByCategoryPromise = StatisticsService.rentTimeByCategory();

        carsByCategoryPromise.success(function(carsByCategory)
        {
            var carsByCategoryValues = [];

            for (i = 0; i < carsByCategory.length; i++)
            {
                carsByCategoryValues[i] = { "label": carsByCategory[i]._id,
                                            "value": carsByCategory[i].carsCount};
            }

            var pie = new d3pie("pieChart", {
                "header": {
                    "title": {
                        "text": "Number of cars by category",
                        "fontSize": 24,
                        "font": "open sans"
                    }
                },
                "data": {
                    "content": carsByCategoryValues
                },
                "labels": {
                    inner: {
                        format: "value"
                    },
                    value: {
                        color: "#ffffff"
                    }
                }
            });
        });

        rentTimeByCategoryPromise.success(function(rentTimeByCategory)
        {
            var rentTimeByCategoryValues = [];
            var i = 0;
            for (key in rentTimeByCategory) {
                rentTimeByCategoryValues[i] = { "label": key,
                    "value": rentTimeByCategory[key]};
                i++;
            }

            var pie = new d3pie("pieChart", {
                "header": {
                    "title": {
                        "text": "Days of rent by category",
                        "fontSize": 24,
                        "font": "open sans"
                    }
                },
                "data": {
                    "content": rentTimeByCategoryValues
                },
                "labels": {
                    inner: {
                        format: "value"
                    },
                    value: {
                        color: "#ffffff"
                    }
                }
            });
        });
    }]);