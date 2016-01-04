var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var branchSchema = new Schema({
    id: Number,
    title: String,
    lat: Number,
    long: Number,
    branch: { type: Schema.ObjectId, ref: 'branchSchema' }
});

// define our car model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Branch', branchSchema );
