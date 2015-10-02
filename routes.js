var async = require('async');
var request = require('request');
var spotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new spotifyWebApi({
  clientId : '52448dda6b344eac852886a2bfa52b93',
  clientSecret : '6d04e343e08d4bfb8f7e7abdd00a6135'
});
var spotifyUser = '11120104543';
var multipart = require('connect-multiparty');


module.exports = function(logger,app,db){

    var module = {};

    //Connect to spotify
    spotifyApi.clientCredentialsGrant().then(function(data) {
        logger.log('The access of spotify token is ' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        logger.error('Something went wrong!', err);
    });

    var multipartMiddleware = multipart();

    module.addRoutes = function(){
        //Index, templates and directives
        app.get('/', module.index);
        app.get('/templates/:name',module.templates);
        app.get('/directives/:name',module.directives);

        //Views
        app.get('/callback', module.index);
        app.get('/home', module.index);
        app.get('/post', module.index);
        app.get('/about', module.index);
        app.get('/play', module.index);
        app.get('/music', module.index);
        app.get('/projects', module.index);
        app.get('/contact',module.index);

        app.get('/getPosts', module.getPosts);
        app.get('/getPost', module.getPost);
        app.get('/getMonths', module.getMonths);
        app.get('/getCategories', module.getCategories);
        app.get('/getAllPlaylists', module.getAllPlaylists);
        app.get('/getPlaylist', module.getPlaylist);
        app.get('/getImage', module.getImage);
        app.get('/getImages', module.getImages);
        app.post('/sendMessage', module.sendMessage);
    }

    module.index = function(req,res){
        res.render('index.html');
    };

    module.templates = function(req,res){
        res.render('templates/' + req.params.name);
    };

    module.directives = function(req,res){
        res.render('directives/' + req.params.name);
    };

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
        logger.log('Find by1:');
        logger.log(data.findBy);
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
        logger.log('Getting post '+data.id);
        var toReturn = {};
        db.posts.findOne({'_id' : data.id}, {}, function (err, post) {
            if (post)
                res.json({success : true, post : post });
            else
                res.json({success : true, post : {} });
        });
    }
    
    //Spotify requests
    module.getAllPlaylists = function(req,res){
        logger.log('Getting playlists');
        spotifyApi.getUserPlaylists(spotifyUser)
          .then(function(data) {
            res.json({success : true, body : data.body});
          },function(err) {
            logger.error('Something went wrong!', err);
            res.json({success : false, message : err});
          });
    }

    module.getPlaylist = function(req,res){
        var data = req.query;
        logger.log('Getting playlist '+data.id);
        spotifyApi.getPlaylist(data.owner,data.id)
          .then(function(data) {
            res.json({success : true, body : data.body});
          },function(err) {
            logger.error('Something went wrong!', err);
            res.json({success : false, message : err});
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
                    res.writeHead(200, {
                      'Content-Type': 'image/jpeg',
                      'Content-Length': img.length
                    });
                    res.end(img);
                } else if (image.data.indexOf('data:image/png;base64,') > -1) {
                    var img = new Buffer(image.data.replace('data:image/png;base64,',''), 'base64');
                    res.writeHead(200, {
                      'Content-Type': 'image/png',
                      'Content-Length': img.length
                    });
                    res.end(img);
                }
            } else {
                res.json({success : false, message :'Image dont exist'});
            }
        });
    }

    module.getImages = function(req,res){
        db.images.find({}).select('name').exec(function(err, images){
            if(err)
                res.json({success : false, message : err});
            else
                res.json({success : true, images : images});
        });        
    }

    module.sendMessage = function(req,res){
        var data = req.query;
        req.app.mailer.send( {"html" : "From: "+data.from+"<br><br>"+data.text}, {to: 'me@augustolemble.com',subject: data.subject}, function (err) {
            if(err){
                logger.error(err);
                res.json({success : false, message : err});
            } else{
                res.json({success : true});
            }
        });   
    }

    return module;

}