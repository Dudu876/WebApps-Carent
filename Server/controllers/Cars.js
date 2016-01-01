/**
 * Created by Dudu on 01/01/2016.
 */
var Car = require('../models/Car');

exports.getAllCars = function (req, res) {
    Car.find(function (err, cars) {
        if (!err) {
            res.json(cars);
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.getCarById = function (req, res) {
    Car.findById(req.params.car_id, function (err, car) {
        if (!err) {
            res.json(car);
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.updateCar = function (req, res) {
    Car.findById(req.params.car_id, function (err, car) {
        if (!err) {
            car.name = req.body.name;

            car.save(function (err) {
                if (!err) {
                    res.json('car updated');
                }
                else {
                    //Utils.generateResponse(req, res, 0, err);
                }
            });

        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.deleteCar = function (req, res) {
    Car.remove({_id: req.params.car_id}, function (err) {
        if (!err) {
            res.json('car deleted');
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.createCar = function (req, res) {
    var car = new Car();
    car.name = req.body.name;

    car.save(function (err) {
        if (!err) {
            res.json('car created');
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};


