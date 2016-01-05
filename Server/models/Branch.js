var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var branchSchema = new Schema({
    title: String,
    lat: Number,
    long: Number
});

// define our car model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('branches', branchSchema );
