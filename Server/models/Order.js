/**
 * Created by Dudu on 05/01/2016.
 */

// grab the mongoose module
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    startDate: Date,
    endDate: Date,
    car: {type: Schema.Types.ObjectId, ref: 'Car' },
    mission: String,
    price: Number,
    client_name: String,
    phone: String
});

orderSchema.pre('save', function (next) {
    var self = this;
    mongoose.models["Order"].findOne({car: new ObjectId(self.car), _id: {$ne: new ObjectId(self._id)}, startDate: {$lte: self.endDate}, endDate: {$gte: self.startDate}}, function (err, order) {
        if (order){
            next(new Error("There is an existing order for this car between " +
                order.startDate.toLocaleString() + " - " + order.endDate.toLocaleString() +
                " therefore the order was not created.\n\nPlease try other dates"));
        }else{
            next();
        }
    });
}) ;

// define our order model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Order', orderSchema );

