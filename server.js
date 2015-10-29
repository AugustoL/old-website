//Dependencies
var express = require('express');
var favicon = require('serve-favicon');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var async = require('async');
var cors = require('cors');

//Configuration
var config = new require('./config');

//Logger
var logger = new require('just-a-logger')(config.logLevel,__dirname+'/logs');

//Get arguments
var args = process.argv.slice(2);

/*
//Cretaing BTC-Payments
var btcPayments = require('btc-payments');
var btcPaymentsConfig = {
    logLevel : 'debug', // none, normal, debug
    dbURI : 'mongodb://user:user@ds043694.mongolab.com:43694/btcpayments', //URI to use to connect to db
    network : 'testnet', // testnet or livenet
    seedBytes : "testingseed22", // String of the seed master key
    btcMainAddress : "mqyp4A44N1ekc2LzoAjasMo4SToZUrwfrG", // Address to receive the payments
    paymentTimeout : 120, // In minutes
    limitBalance : 0.005,
    txFee : 0.00001,
    functionTimeout : 10 // In seconds
};
var btcPaymentsFunctions = {
	0 : function(callback){
		console.log('Type one tx done');
		callback(null,'Success');
	}
};

var BTC = new btcPayments(btcPaymentsConfig,btcPaymentsFunctions);
BTC.start(function(err){
	if (err){
		logger.error(err);
	} else {
		for (var i in args)
    		if (args[i] == '-createTX'){
				BTC.createTX(0,0.02,{},function(err,newTX){
					if (err)
						logger.error(err);
				});
			}

	}	
});
*/

//Connect
mongoose.connect(config.dbURI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Once connected do actions
db.once('open', function callback () {
    logger.important('Connected to DB: '+config.dbURI); 
});

//Launch express
var app = express();
process.env.PORT = 80;

//Config Express
app.set('port', process.env.PORT);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(favicon(__dirname + '/public/img/handWhite.ico'));  
app.use(favicon(__dirname + '/public/img/handRed.ico')); 
app.use('/public',express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

//Schemas
require('./schemas/posts')(db,logger);
require('./schemas/months')(db,logger);
require('./schemas/images')(db,logger);
require('./schemas/categories')(db,logger);

//Add routes
require('./routes/spotify')(logger,app,db,config.spotifyCredentials).addRoutes();
require('./routes/routes')(logger,app,db).addRoutes();

app.all('/internalError',function(req,res) { res.render('error500.html') });
//app.all('*',function(req,res) { res.render('error404.html') });

//Start the server
var server = app.listen(app.get('port'), function() {
    logger.important('Augusto\'s website started at port '+app.get('port'));
})

//PeerJS Server
var ExpressPeerServer = require('peer').ExpressPeerServer;
var peerjsOptions = { debug : true };

//PeerJS API 
app.use('/peerapi', ExpressPeerServer(server, peerjsOptions));

process.on('SIGINT', function() {
    process.exit();
});

