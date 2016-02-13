#!/bin/sh

# Make sure we're in the right place
DIR=$(cd $(dirname "$0"); pwd)
cd $DIR

sudo forever stop website-back  || echo "No forever website-backend procces running to restart";
sudo forever stop website-front  || echo "No forever website-front procces running to restart";

if [ $1 = 'dev' ]; then
	sudo forever start --workingDir website-back --append --uid "website-back" back/server.js -dev && sudo forever start --workingDir website-front --append --uid "website-front" front/server.js -dev && sudo forever list
else
	sudo forever start --workingDir website-back --append --uid "website-back" back/server.js && sudo forever start --workingDir website-front --append --uid "website-front" front/server.js && sudo forever list
fi
