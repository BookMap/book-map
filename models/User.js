const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
	username: String,
},
 {
	timestamps: true,
	strict: false // allow oauth ids and profiles
});

module.exports = mongoose.model( 'User', User );
