var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(db,logger) {

	var month = new Schema({
		name : String,
		date : Date,
		quantity : Number
	});

	db.months = db.model('months', month);

};
