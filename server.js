//Dependencies
var express = require('express');
var favicon = require('serve-favicon');
var mailer = require('./express-mailer');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var async = require('async');

//Configuration
var config = new require('./config');

//var btcPayments = require('btc-payments');
//var btc = new btcPayments();

//Get arguments
var args = process.argv.slice(2);

//Logger
var logger = new require('./logger')(config.logLevel);

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
app.use(express.static('public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//MAILER
mailer.extend(app, config.mailer);

//Schemas
require('./schemas/posts')(db,logger);
require('./schemas/months')(db,logger);
require('./schemas/images')(db,logger);
require('./schemas/categories')(db,logger);

//Add routes
require('./routes/spotify')(logger,app,db,config.spotifyCredentials).addRoutes();
require('./routes/routes')(logger,app,db).addRoutes();

app.all('/internalError',function(req,res) { res.render('error500.html') });
app.all('*',function(req,res) { res.render('error404.html') });

//Start the server
app.listen(app.get('port'), function() {
    logger.important('Augusto\'s website started at port '+app.get('port'));
})

