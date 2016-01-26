var Imagemin = require('imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var fs = require('fs');
var mongoose = require('mongoose');

module.exports = function(logger,app,db){

    var module = {};

    module.addRoutes = function(){

        //Get requests
        app.get('/getPosts', module.getPosts);
        app.get('/getPost', module.getPost);
        app.get('/getMonths', module.getMonths);
        app.get('/getCategories', module.getCategories);
        app.get('/getImage', module.getImage);
        app.get('/getImages', module.getImages);

        app.post('/commentPost', module.commentPost);
        
    }

    // Get months 
    // Values on query: {formDate,page}
    module.getMonths = function(req,res){
        var data = req.query;
        db.months.find().sort('-date').exec(function(err, months){
            res.json(months);
        });
    }

    // Get categories 
    // Values on query: {formDate,page}
    module.getCategories = function(req,res){
        var data = req.query;
        db.categories.find().sort('-quantity').exec(function(err, categories){
            res.json(categories);
        });
    }

    // Get posts 
    // Values on query: {formDate,page}
    module.getPosts = function(req,res){
        var data = req.query;
        logger.log('Find by: ',data.findBy);
        var toReturn = {};
        if (data.skip == -10){
            db.posts.count({}, function( err, count){
                var lastPage = Math.floor(count/10);             
                db.posts.find({ $and: [{ $where: "this.draft != true" }, JSON.parse(data.findBy) ]}).sort(data.sort).skip(lastPage*10).limit(10).exec(function(err, result){
                    if (result)
                        res.json({success : true, lastPage : lastPage, posts : result });
                    else
                        res.json({success : true, posts : [] });
                });
            });
        } else {
            db.posts.find({ $and: [{ $where: "this.draft != true" }, JSON.parse(data.findBy) ]}).sort(data.sort).skip(data.skip).limit(10).exec(function(err, result){
                if (result)
                    res.json({success : true, posts : result });
                else
                    res.json({success : true, posts : [] });
            });
        }
    }

    // Get post by id
    // Values on query: {id}
    module.getPost = function(req,res){
        var data = req.query;
        db.posts.findOne({ '_id' : new mongoose.Types.ObjectId(data.id)}, {}, function (err, post) {
            if (err)
                res.json({success : false, message : err.toString() });
            else
                res.json({success : true, post : JSON.stringify(post) });
        });
    }

    //Image requests
    module.getImage = function(req,res){
        var data = req.query;
        db.images.findOne({name : data.name}, function (err, image) {
            if (err)
                res.json({success : false, message :err});
            if (image){
                if (image.data.indexOf('data:image/jpeg;base64,') > -1) {
                    var img = new Buffer(image.data.replace('data:image/jpeg;base64,',''), 'base64');
                    new Imagemin().src(img).use(imageminJpegRecompress({ target : 0.88, loops : 3, max : 90 })).run(function(err, files) {        
                        if (err)             
                            return next(err);        
                        res.writeHead(200, {
                            'Content-Type': 'image/jpeg',
                            'Content-Length': files[0].contents.length
                        });
                        res.end(files[0].contents);
                    }); 
                } else if (image.data.indexOf('data:image/png;base64,') > -1) {
                    var img = new Buffer(image.data.replace('data:image/png;base64,',''), 'base64');
                    new Imagemin().src(img).use(Imagemin.optipng({optimizationLevel: 3})).run(function(err, files) {        
                        if (err)            
                            return next(err);        
                        res.writeHead(200, {
                            'Content-Type': 'image/png',
                            'Content-Length': files[0].contents.length
                        });
                        res.end(files[0].contents);
                    }); 
                }
            } else {
                res.json({success : false, message :'Image dont exist'});
            }
        });
    }

    // Add comment on post
    // Values on query: {postID,name,text}
    module.commentPost = function(req,res){
        var data = req.query;
        var userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||req.connection.socket.remoteAddress;
        db.posts.findOne({ '_id' : new mongoose.Types.ObjectId(data.postID)}, {}, function (err, post) {
            if (err)
                res.json({success : false, message : err.toString() });
            else{
                var allowed = true;
                for (var i = 0; i < post.comments.length; i++) {
                    console.log(post.comments[i].ip +"=="+ userIP);
                    var time = (((new Date(post.comments[i].date.getTime() + 600000))-new Date())/60000);
                    if ( (post.comments[i].ip == userIP) && (time > 0) ){
                        allowed = false;
                    }
                };
                if (allowed){
                    post.addComment(data.name, data.text, userIP);
                    post.save(function(err){
                        if (err)
                            res.json({success : false, message : err.toString() });
                        else
                            res.json({success : true});
                    });
                } else {
                    res.json({success : false, message : 'You have to wait '+time+' minutes to comment again.' });
                }
            };
        });
    }

    module.getImages = function(req,res){
        db.images.find({}).select('name').exec(function(err, images){
            if(err)
                res.json({success : false, error : err.toString()});
            else
                res.json({success : true, images : images});
        });        
    }

    return module;

}