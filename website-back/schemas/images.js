var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(db,logger) {
	
	var image = new Schema({
		name : String,
		data : String
	});
	image.methods.create = function(name,data){
		this.name = name;
		this.data = data;
	}

	db.images = db.model('images', image);

};
