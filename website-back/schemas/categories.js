module.exports = function(db,mongoose) {
	
	var category = new mongoose.Schema({
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
