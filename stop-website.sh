#!/bin/sh

# Make sure we're in the right place
DIR=$(cd $(dirname "$0"); pwd)
cd $DIR

sudo forever stop website-back  || echo "No forever website-backend procces running to stop";
sudo forever stop website-front  || echo "No forever website-front procces running to stop";