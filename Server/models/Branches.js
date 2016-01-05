/**
 * Created by Michael on 05/01/2016.
 */


// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var branchSchema = new Schema({
    id: Number,
    phoneNumber : String,
    city: String,
    lat: Number,
    long: Number
});

// define our car model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Car', carSchema );