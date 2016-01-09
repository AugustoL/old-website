var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(db,logger) {
	
	var category = new Schema({
		nameEn : String,
		nameEs : String,
		quantity : Number
	});

	category.methods.create = function(nameEn,nameEs,quantity){
		this.nameEn = nameEn;
		this.nameEs = nameEs
		this.quantity = quantity;
	}

	db.categories = db.model('categories', category)

};
