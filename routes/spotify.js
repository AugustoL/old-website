var async = require('async');
var spotifyWebApi = require('spotify-web-api-node');

module.exports = function(logger,app,db,spotifyCredentials){

    var spotifyApi = new spotifyWebApi({
        clientId : spotifyCredentials.clientId,
        clientSecret : spotifyCredentials.clientSecret
    });
    var spotifyUser = spotifyCredentials.myUser;

    var module = {};

    //Connect to spotify
    spotifyApi.clientCredentialsGrant().then(function(data) {
        logger.log('The access of spotify token is ' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        logger.error('Something went wrong!', err);
    });

    module.addRoutes = function(){
        app.get('/getAllPlaylists', module.getAllPlaylists);
        app.get('/getPlaylist', module.getPlaylist);
    }

    module.getAllPlaylists = function(req,res){
        logger.log('Getting playlists');
        spotifyApi.getUserPlaylists(spotifyUser).then(function(data) {
            res.json({success : true, body : data.body});
        },function(err) {
            logger.error('Something went wrong!', err);
            res.json({success : false, message : err});
        });
    }

    module.getPlaylist = function(req,res){
        var data = req.query;
        logger.log('Getting playlist '+data.id);
        spotifyApi.getPlaylist(data.owner,data.id).then(function(data) {
            res.json({success : true, body : data.body});
        },function(err) {
            logger.error('Something went wrong!', err);
            res.json({success : false, message : err});
        });
    }

    return module;

}