var colors = require('colors');
var fs = require('fs');

module.exports = function(logLevel){
	var module = {};
	var now = new Date();
	var fileName = now.getDate()+'-'+now.getMonth()+'-'+now.getYear()+';'+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+'.html';
    var stream = fs.createWriteStream('logs/'+fileName, { flags : 'w+' });

    stream.write("<html>");
    stream.write("<link rel='stylesheet' href='bootstrap/bootstrap.css'>");
    stream.write("<link rel='stylesheet' href='bootstrap/bootstrap-theme.css'>");
	stream.write("<div class='container text-center'><h2 clas='text-center'>Log started on "+now.getDate()+'/'+now.getMonth()+'/'+now.getYear()+' on hour '+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+"</h2><br><div class='jumbotron text-left'>");

    module.log = function(message){
    	if ((logLevel == 'normal')||(logLevel == 'debug'))
    		console.log(message);
		stream.write("<p class='text-primary'  style='font-size:15px;margin-bottom:0px;'>"+message+"</p>");  		
	}
	module.warning = function(message){
		if (logLevel == 'debug')
			console.log(message.yellow);
		stream.write("<p class='text-warning'  style='font-size:15px;margin-bottom:0px;'>"+message+"</p>");
	}
	module.success = function(message){
		if (logLevel == 'debug')
			console.log(message.green);
		stream.write("<p class='text-success'  style='font-size:15px;margin-bottom:0px;'>"+message+"</p>");
	}
	module.error = function(message){
		if (logLevel == 'debug')
			console.log(message.red);
		stream.write("<p class='text-danger'  style='font-size:15px;margin-bottom:0px;'>"+message+"</p>");
	}
	module.important = function(message){
		console.log(message.black.bgWhite);
		stream.write("<p class='text-primary' style='font-size:15px;margin-bottom:0px;'><strong>"+message+"</strong></p>");
	}
	module.close = function(){
		stream.write("</div></div>");
		stream.write("</html>");
		stream.end();
	}

    return module;

}