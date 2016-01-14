//Dependencies
var express = require('express');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var async = require('async');
var cors = require('cors');
var compression = require('compression');
var grunt = require('grunt');
var path = require('path');

//Configuration
var config = new require('../config');

//Logger
var logger = new require('just-a-logger')(config.logLevel,__dirname+'/logs');

//Get arguments
var args = process.argv.slice(2);

//Launch express
process.env.appDomain = 'augustolemble.com';
var app = express();
process.env.PORT = 8080;
for (var i in args) {
    if (args[i] == '-dev'){
        process.env.appDomain = 'dev.augustolemble.com';
    }
}

//Config Express
app.set('port', process.env.PORT);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(favicon(__dirname + '/dist/img/handWhite.ico'));  
app.use(favicon(__dirname + '/dist/img/handRed.ico')); 
app.use('/dist', express.static(__dirname + '/dist'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

//Add routes
require('./routes/routes')(logger,app).addRoutes();

//app.all('/internalError',function(req,res) { res.render('error500.html') });

//Start the server
var server = app.listen(app.get('port'), function() {
    logger.important('Augusto\'s website started at port '+app.get('port'));
});

if (process.env.appDomain != 'dev.augustolemble.com'){
	grunt.tasks(['clean']);
	grunt.tasks(['ngAnnotate']);
	grunt.tasks(['uglify']);
	grunt.tasks(['cssmin']);
	grunt.tasks(['watch:js','watch:css']);
} else {
	grunt.tasks(['clean']);
	grunt.tasks(['copy']);
	grunt.tasks(['chmod']);
	grunt.tasks(['watch:dev']);
}

process.on('SIGINT', function() {
    process.exit();
});

