/**
 * Created by Dudu on 05/01/2016.
 */

// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    startDate: Date,
    endDate: Date,
    carNumber: String,
    price: Number
});

// define our order model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Order', orderSchema );

