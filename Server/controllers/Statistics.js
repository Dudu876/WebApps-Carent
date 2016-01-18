/**
 * Created by Michael on 1/15/2016.
 */


var server = require('../server.js')
var Order = require('../models/Order');
var Car = require('../models/Car');


exports.carsByCategory = function (req, res) {
    Car.aggregate([
        {
            $group: {
                _id: '$category',
                carsCount: { $sum: 1 }
            }
        }
        ],
        function(err, carsByCat) {
            if (!err)
            {
                res.json(carsByCat);
            }
            else
            {

            }
    });
};

exports.rentTimeByCategory = function (req, res){
    Order.find().populate('car').exec(function (err, orders) {
        if (!err) {
            var categoryRentTime = {};

            for (var index = 0; index < orders.length; index++)
            {
                var timeDiff = Math.abs(orders[index].startDate.getTime() - orders[index].endDate.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                if (!categoryRentTime[orders[index].car.category]) {
                    categoryRentTime[orders[index].car.category] = diffDays;
                }
                else
                {
                    categoryRentTime[orders[index].car.category] += diffDays;
                }
            }

            res.json(categoryRentTime);
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
}
