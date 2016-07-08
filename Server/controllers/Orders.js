/**
 * Created by Dudu on 05/01/2016.
 */

var server = require('../server.js');
var Order = require('../models/Order');
var Branch = require('../models/Branch');
var Car = require('../models/Car');

exports.getOrders = function (req, res) {
    var now = new Date();
    now.setDate(now.getDate() - 14);
    if (JSON.parse(req.query.active)) {
        Order.find({startDate: {$lte: now}, endDate: {$gte: now}}).populate('car').exec(function (err, orders) {
            if (!err) {
                res.json(orders);
            }
            else {
                //Utils.generateResponse(req, res, 0, err);
            }
        });
    }
    else {
        Order.find({endDate: {$gte: now}}).populate('car').exec(function (err, orders) {
            if (!err) {
                res.json(orders);
            }
            else {
                //Utils.generateResponse(req, res, 0, err);
            }
        });
    }
};

exports.createOrder = function (req, res) {
    var order = new Order();
    order.startDate = req.body.startDate;
    order.endDate = req.body.endDate;
    order.mission = req.body.mission;
    order.car = req.body.car_id;
    order.price = req.body.price;
    order.client_name = req.body.client_name;
    order.phone = req.body.phone;

    order.save(function (err) {
        if (!err) {
            res.json('order created');
            server.io.sockets.emit('newOrder', order);
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
            res.status(401).send(err.message);
        }
    });
};

exports.deleteOrder = function (req, res) {
    Order.remove({_id: req.params.order_id}, function (err) {
        if (!err) {
            res.json('order deleted');
            server.io.sockets.emit('deleteOrder', req.params.order_id);
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};



