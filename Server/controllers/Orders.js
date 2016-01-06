/**
 * Created by Dudu on 05/01/2016.
 */

var Order = require('../models/Order');

exports.getOrders = function (req, res) {
    if (req.query.active) {
        var now = new Date();
        Order.find({startDate: {$lte: now}, endDate: {$gte: now}}, function (err, orders) {
            if (!err) {
                res.json(orders);
            }
            else {
                //Utils.generateResponse(req, res, 0, err);
            }
        })
    }
    else {
        Order.find(function (err, orders) {
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
    order.carNumber = req.body.carNumber;
    order.price = req.body.price;

    order.save(function (err) {
        if (!err) {
            res.json('order created');
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};

exports.deleteOrder = function (req, res) {
    Order.remove({_id: req.params.order_id}, function (err) {
        if (!err) {
            res.json('order deleted');
        }
        else {
            //Utils.generateResponse(req, res, 0, err);
        }
    });
};



