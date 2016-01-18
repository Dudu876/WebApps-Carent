carentApp.controller('rentStatistics', ['$scope', 'StatisticsService',
    function($scope, StatisticsService) {
        var ordersPromise = StatisticsService.carsByCategory();

        ordersPromise.success(function(carsByCategory)
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
    }]);