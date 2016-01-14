module.exports = function(db,mongoose) {
	
	var image = new mongoose.Schema({
		name : String,
		data : String
	});
	image.methods.create = function(name,data){
		this.name = name;
		this.data = data;
	}

	db.images = db.model('images', image);

};
