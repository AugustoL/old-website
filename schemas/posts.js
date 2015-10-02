var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(db,logger) {
	
	var post = new Schema({
		titleEs : String,
		titleEn : String,
		categories : [String], // travel,music,bitcoin,linux,programing,other,games,movies,series
		img : String,
		date : Date,
		draft : Boolean,
		bodyEs : String,
		bodyEn : String
	});
	post.methods.create = function(){
		this.titleEs = "";
		this.titleEn = "";
		this.img = "";
		this.date = new Date();
		this.categories = [];
		this.draft = true;
		this.bodyEs = "";
		this.bodyEn = "";
	}
	post.methods.edit = function(titleEs,titleEn,img,categories,bodyEs,bodyEn){
		this.titleEs = titleEs;
		this.titleEn = titleEn;
		this.bodyEs = bodyEs
		this.bodyEn = bodyEn;
		this.img = img;
		var self = this;
		console.log(categories);
		if (self.draft)
			this.categories = categories;
 		else if (categories&&(categories.length > 0)&&(self.categories != categories)){
            var index = 0;
            self.categories.forEach( function(catInPost) {
                isThere = false;
                categories.forEach( function(newCat) {
                    if (newCat == catInPost)
                        isThere = true;
                });
                if (!isThere){
                    self.categories.splice(index, 1);
                    db.categories.findOne({"name" : catInPost }, {}, function (err, cat) {
                        if (err){
                            callback(err);
                        } else {    
                            cat.quantity = cat.quantity - 1;
                            cat.save();
                        }
                    });
                }
                index ++;
            });
            categories.forEach( function(newCat) {
                isThere = false;
                if (self.categories.length > 0)
	                self.categories.forEach( function(catInPost) {
	                    if (newCat == catInPost)
	                        isThere = true;
	                });
                if (!isThere){
                    self.categories.push(newCat);
                    db.categories.findOne({"name" : newCat }, {}, function (err, cat) {
                        if (err){
                            callback(err);
                        } else {         
                            cat.quantity = cat.quantity + 1;
                            cat.save();
                        }
                    });
                }
            });
        }
	}

	db.posts = db.model('posts', post);

};
