module.exports = {
	logLevel : 'debug', // none, normal, debug
	dbURI : 'mongodb://user:user@ds059712.mongolab.com:59712/augusto', //URI to use to connect to db
	mailer : {
	    from: 'admin@augustolemble.com',
	    host: 'smtp.augustolemble.com', // hostname
	    secureConnection: true, // use SSL
	    port: 465, // port for secure SMTP
	    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
	    auth: {
	        user: 'admin@augustolemble.com',
	        pass: 'v)xyYIw8'
	    }
	},
	spotifyCredentials : {
        clientId : '52448dda6b344eac852886a2bfa52b93',
        clientSecret : '6d04e343e08d4bfb8f7e7abdd00a6135',
        myUser : '11120104543'
    }
};