# Website

Source code of my personal website, built using ExpressJS + NodeJS +MongoDB + AngularJS.

This application is built to be managed with [Website-Admin App](https://github.com/AugustoL/website-admin).

## Install the app

Clone the repo, go to the app directory and install the submodules and dependencies:
```
git clone https://github.com/AugustoL/website
cd website
git submodule init
git submodule update
cd website-back
npm install
cd ..
cd website-front
npm install && bower install
cd ..
```

### Config File

You will need to create and set up config.js:
```
module.exports = {
    logLevel : 'debug', // none, normal, debug
    dbURI : 'mongodb://username:password@ds059712.mongolab.com:59712/dbname', // An URI of mongolab.com will look like these
    spotifyCredentials : {
        clientId : 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
        clientSecret : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        myUser : 'xxxxx'
    }
};
```
Make sure that the user on the db has write/read permissions.

## Run the app

By default the app is configured to run over port 8080:
```
sudo sh start-website.sh dev
```
Go to localhost:8080 and you will see the website online.

###Config nginx (Optional)

To run your app over a custom domain like dev.augustolemble.com you have to add the following line on /etc/hots
```
127.0.0.1	dev.augustolemble.com
```

To redirect from port 80 to port 8080 using nginx with the gzip compression and cache expires enabled I edited the following files:

/etc/nginx/nginx.conf
```
user www-data;
worker_processes 4;
pid /run/nginx.pid;

events {
	worker_connections 768;
	# multi_accept on;
}

http {

	# Basic Settings

	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	keepalive_timeout 65;
	types_hash_max_size 2048;
	# server_tokens off;
	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	# Logging Settings

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	# Gzip Settings

	gzip on;
    gzip_http_version 1.1;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_proxied any;
    gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript application/javascript text/x-js;
    gzip_buffers 16 8k;
    gzip_disable "MSIE [1-6].(?!.*SV1)";

	# Virtual Host Configs

	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}
```

/etc/nginx/sites-enabled/default
```
server {

    listen 80;

    server_name dev.augustolemble.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        expires 7d;
    }
    
}
```

After you have your nginx files edited you need to restart nginx service:
```
sudo service nginx restart
```

Now running the website using `sudo sh start-website.sh dev` will start your app on the port 8080 and you will be able to access it on dev.augustolemble.com thanks to nginx.
