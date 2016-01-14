module.exports = function(db,mongoose) {

	var month = new mongoose.Schema({
		name : String,
		date : Date,
		quantity : Number
	});

	db.months = db.model('months', month);

};
