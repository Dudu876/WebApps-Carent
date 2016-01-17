/**
 * Created by Michael on 1/15/2016.
 */


var server = require('../server.js')
var Order = require('../models/Order');
var Car = require('../models/Car');


exports.carsByCategory = function (req, res) {
    Car.find().exec(function(error,cars){
        res.json(cars);
    });
};
