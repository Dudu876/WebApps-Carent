/**
 * Created by Dudu on 01/01/2016.
 */
var path = require('path');

var carController = require('./controllers/Cars');
var orderController = require('./controllers/Orders');
var branchController = require('./controllers/Branches');
var statisticsController = require('./controllers/Statistics');

module.exports = function (app) {

    app.route('/api/cars')
        .get(carController.getAllCars)
        .post(carController.createCar)
        .put(carController.updateCar);

    app.route('/api/searchCar/')
        .post(carController.searchCar);

    app.route('/api/cars/:number')
        .get(carController.getCarById)
        .delete(carController.deleteCar);

    app.route('/api/branch/')
        .get(branchController.getAllBranches);

    app.route('/api/branch/:branch_id')
        .post(branchController.upsertBranch)
        .delete(branchController.deleteBranch);

    app.route('/api/orders')
        .get(orderController.getOrders)
        .post(orderController.createOrder);

    app.route('/api/orders/:order_id')
        .delete(orderController.deleteOrder);

    app.route('/api/stats/carByCat')
        .get(statisticsController.carsByCategory);

    app.route('/api/stats/rentTimeByCat')
        .get(statisticsController.rentTimeByCategory);

    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendFile('index.html', {root: path.join(__dirname, '../Client')}); // load our public/index.html file
    });
};
