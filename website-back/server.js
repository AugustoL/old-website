//Dependencies
var express = require('express');
var favicon = require('serve-favicon');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var async = require('async');
var compression = require('compression');
var cors = require('cors');

//Configuration
var config = new require('../config');

//Logger
var logger = new require('just-a-logger')(config.logLevel,__dirname+'/logs');

//Get arguments
var args = process.argv.slice(2);

//Connect
var db = mongoose.createConnection(config.dbURI);
db.on('error', console.error.bind(console, 'connection error:'));

//Once connected do actions
db.once('open', function callback () {
    logger.important('Connected to DB: '+config.dbURI); 
});

//Launch express
var app = express();
process.env.PORT = 3000;

//Config Express
app.set('port', process.env.PORT);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(compression());
app.use(cors());

//Schemas
require('./schemas/posts')(db,mongoose);
require('./schemas/months')(db,mongoose);
require('./schemas/images')(db,mongoose);
require('./schemas/categories')(db,mongoose);

//Add routes
require('./routes/spotify')(logger,app,db,config.spotifyCredentials).addRoutes();
require('./routes/routes')(logger,app,db).addRoutes();
require('./routes/btcPayments')(logger,app,db,config).addRoutes();

app.all('/internalError',function(req,res) { res.render('error500.html') });
//app.all('*',function(req,res) { res.render('error404.html') });

//Start the server
var server = app.listen(app.get('port'), function() {
    logger.important('Augusto\'s website-backend started at port '+app.get('port'));
})

//PeerJS Server
var ExpressPeerServer = require('peer').ExpressPeerServer;
var peerjsOptions = { debug : true };

//PeerJS API 
app.use('/peerapi', ExpressPeerServer(server, peerjsOptions));

process.on('SIGINT', function() {
    process.exit();
});

