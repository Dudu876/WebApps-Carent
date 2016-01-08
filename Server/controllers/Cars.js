/**
 * Created by Dudu on 01/01/2016.
 */
var Car = require('../models/Car');

exports.getAllCars = function (req, res) {
    Car.find({})
        .populate('branch')
        .exec(function(error,cars){
            res.json(cars);
        });
};

exports.searchCar = function(req,res){
    var query = {};

    if (req.body.number != null && req.body.number != ''){
        var regexNumber = new RegExp(req.body.number, 'i');
        query.number = {$regex: regexNumber};
    }
    if (req.body.model != null && req.body.model != ''){
        var regexModel = new RegExp(req.body.model, 'i');

        query.$or = [];
        query.$or.push({"type.model":{$regex: regexModel}});
        query.$or.push({"type.manufacturer":{$regex: regexModel}});

    }
    if (req.body.category != null && req.body.category != ''){
        query.category = req.body.category;
    }

    var myAggregation = Car.find(query).populate('branch').exec(function(error,cars){
        res.json(cars);
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
    Car.findById(req.body._id, function (err, car) {
        if (!err) {
            car.number = req.body.number;
            car.type.manufacturer = req.body.type.manufacturer;
            car.type.model = req.body.type.model;
            car.type.year = new Date(req.body.type.year).getFullYear();
            car.category = req.body.category;
            car.price = req.body.price;
            car.gearbox = req.body.gearbox;
            car.branch = req.body.branch;

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
    Car.remove({number: req.params.number}, function (err) {
        if (!err) {
            res.json(req.params.number);
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.createCar = function (req, res) {
    var car = new Car();
    car.number = req.body.number;
    car.type.manufacturer = req.body.type.manufacturer;
    car.type.model = req.body.type.model;
    car.type.year = new Date(req.body.type.year).getFullYear();
    car.category = req.body.category;
    car.price = req.body.price;
    car.gearbox = req.body.gearbox;
    car.branch = req.body.branch;

    car.save(function (err) {
        if (!err) {

            res.json('car created');
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};


