/**
 * Created by Dudu on 01/01/2016.
 */
var path = require('path');

var carController = require('./controllers/Cars');
var branchController = require('./controllers/Branches');

module.exports = function (app) {

    app.route('/api/cars')
        .get(carController.getAllCars)
        .post(carController.createCar);

    app.route('/api/cars/:car_id')
        .get(carController.getCarById)
        .put(carController.updateCar)
        .delete(carController.deleteCar);

    app.route('/api/branches/:branch_id')
        .delete(branchController.deleteBranch);

    // route to handle all angular requests
    app.get('/', function (req, res) {
        res.sendFile('index.html', {root: path.join(__dirname, '../Client')}); // load our public/index.html file
    });
};
