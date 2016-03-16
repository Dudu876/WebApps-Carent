/**
 * Created by Dudu on 05/01/2016.
 */

// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    startDate: Date,
    endDate: Date,
    car: {type: Schema.Types.ObjectId, ref: 'Car' },
    mission: String,
    client_name: String,
    phone: String
});

orderSchema.pre('save', function (next) {
    var self = this;
    mongoose.models["Order"].findOne({ startDate: {$lte: self.endDate}, endDate: {$gte: self.startDate}}, function (err, order) {
        if (order){
            next(new Error("There is an existing order for this car between " +
                order.startDate.toLocaleString() + " - " + order.endDate.toLocaleString() +
                " there for order was not created.\n\nPlease try other dates"));
        }else{
            next();
        }
    });
}) ;

// define our order model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Order', orderSchema );

