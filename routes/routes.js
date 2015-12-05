var async = require('async');

module.exports = function(logger,app,db,BTCPayments){

    var module = {};

    module.addRoutes = function(){
        //Index, templates and directives
        app.get('/', module.renderIndex);
        app.get('/templates/:name',module.templates);
        app.get('/directives/:name',module.directives);

        //Views
        app.get('/home', module.renderIndex);
        app.get('/post', module.renderPost);
        app.get('/cv', module.renderIndex);
        app.get('/play', module.renderIndex);
        app.get('/music', module.renderIndex);
        app.get('/projects', module.renderIndex);
        app.get('/videoCall', module.renderIndex);
        app.get('/btcPayments', module.renderIndex);
        app.get('/error404', module.renderIndex);

        app.get('/getPosts', module.getPosts);
        app.get('/getPost', module.getPost);
        app.get('/getMonths', module.getMonths);
        app.get('/getCategories', module.getCategories);
        app.get('/getImage', module.getImage);
        app.get('/getImages', module.getImages);

        //BTC-Payments
        app.get('/getPoolAddresses', module.getPoolAddresses);
		app.get('/getPaymentsDone', module.getPaymentsDone);
		app.get('/getPaymentsWaiting', module.getPaymentsWaiting);
		app.get('/getPaymentDone', module.getPaymentDone);
		app.get('/getPaymentWaiting', module.getPaymentWaiting);
		app.get('/getPaymentFuctions', module.getPaymentFuctions);
		app.post('/createBTCPayment', module.createBTCPayment);
    }

    module.renderIndex = function(req,res){
        var url = req.protocol + '://' + req.get('host') + req.originalUrl
        res.render('index.html', {
            url: url,
            title: 'AugustoLemble.com',
            description: 'Personal website with my works, music, journeys, etc.',
            ogimage: "http://augustolemble.com/getImage?name=yo2"
        });
    };

    module.templates = function(req,res){
        res.render('templates/' + req.params.name);
    };

    module.directives = function(req,res){
        res.render('directives/' + req.params.name);
    };

    module.renderPost = function (req, res) {
        var url = req.protocol + '://' + req.get('host') + req.originalUrl; // points to this endpoint
        db.posts.findOne({'_id' : req.query.id}, {}, function (err, post) {
            if (post)
                res.render('index.html', {
                    url: url,
                    title: post.titleEn,
                    description: post.bodyEn,
                    ogimage: "http://augustolemble.com/getImage?name="+post.img,
                });
        });
    };

    // Get months 
    // Values on query: {formDate,page}
    module.getMonths = function(req,res){
        var data = req.query;
        db.months.find().sort('-date').exec(function(err, months){
            res.json(months);
        });
    }

    // Get categories 
    // Values on query: {formDate,page}
    module.getCategories = function(req,res){
        var data = req.query;
        db.categories.find().sort('-quantity').exec(function(err, categories){
            res.json(categories);
        });
    }

    // Get posts 
    // Values on query: {formDate,page}
    module.getPosts = function(req,res){
        var data = req.query;
        logger.log('Find by1:');
        logger.log(data.findBy);
        var toReturn = {};
        if (data.skip == -10){
            db.posts.count({}, function( err, count){
                var lastPage = Math.floor(count/10);             
                db.posts.find({ $and: [{ $where: "this.draft != true" }, JSON.parse(data.findBy) ]}).sort(data.sort).skip(lastPage*10).limit(10).exec(function(err, result){
                    if (result)
                        res.json({success : true, lastPage : lastPage, posts : result });
                    else
                        res.json({success : true, posts : [] });
                });
            });
        } else {
            db.posts.find({ $and: [{ $where: "this.draft != true" }, JSON.parse(data.findBy) ]}).sort(data.sort).skip(data.skip).limit(10).exec(function(err, result){
                if (result)
                    res.json({success : true, posts : result });
                else
                    res.json({success : true, posts : [] });
            });
        }
    }

    // Get post by id
    // Values on query: {id}
    module.getPost = function(req,res){
        var data = req.query;
        logger.log('Getting post '+data.id);
        var toReturn = {};
        db.posts.findOne({'_id' : data.id}, {}, function (err, post) {
            if (post)
                res.json({success : true, post : post });
            else
                res.json({success : true, post : {} });
        });
    }

    //Image requests
    module.getImage = function(req,res){
        var data = req.query;
        db.images.findOne({name : data.name}, function (err, image) {
            if (err)
                res.json({success : false, message :err});
            if (image){
                if (image.data.indexOf('data:image/jpeg;base64,') > -1) {
                    var img = new Buffer(image.data.replace('data:image/jpeg;base64,',''), 'base64');
                    res.writeHead(200, {
                      'Content-Type': 'image/jpeg',
                      'Content-Length': img.length
                    });
                    res.end(img);
                } else if (image.data.indexOf('data:image/png;base64,') > -1) {
                    var img = new Buffer(image.data.replace('data:image/png;base64,',''), 'base64');
                    res.writeHead(200, {
                      'Content-Type': 'image/png',
                      'Content-Length': img.length
                    });
                    res.end(img);
                }
            } else {
                res.json({success : false, message :'Image dont exist'});
            }
        });
    }

    module.getImages = function(req,res){
        db.images.find({}).select('name').exec(function(err, images){
            if(err)
                res.json({success : false, message : err});
            else
                res.json({success : true, images : images});
        });        
    }

    //BTC-Payments
    module.getPoolAddresses = function(req,res){
        BTCPayments.getPoolAddresses(req.query.type,req.query.limit,function(err,addresses){
        	if (err)
        		res.json({ success : false, message : err});
        	else
        		res.json({ success : true, addresses : addresses});
        })
    }

    module.getPaymentsDone = function(req,res){
    	BTCPayments.getPaymentsDone(req.query.limit,function(err,payments){
        	if (err)
        		res.json({ success : false, message : err});
        	else
        		res.json({ success : true, payments : payments});
        })
    }

    module.getPaymentsWaiting = function(req,res){
    	BTCPayments.getPaymentsWaiting(req.query.limit,function(err,payments){
        	if (err)
        		res.json({ success : false, message : err});
        	else
        		res.json({ success : true, payments : payments});
        })
    }

    module.getPaymentDone = function(req,res){
    	BTCPayments.getPaymentDone(req.query.id,function(err,payment){
        	if (err)
        		res.json({ success : false, message : err});
        	else
        		res.json({ success : true, payment : payment});
        })
    }

    module.getPaymentWaiting = function(req,res){
    	BTCPayments.getPaymentWaiting(req.query.id,function(err,payment){
        	if (err)
        		res.json({ success : false, message : err});
        	else
        		res.json({ success : true, payment : payment});
        })
    }

    module.getPaymentFuctions = function(req,res){
    	var functions = BTCPayments.getPaymentFuctions();
    	var toReturn = [];
    	for (i in functions)
    		toReturn.push({
    			name : i,
    			code : functions[i].toString()
    		})
        res.json({ success : true, functions : toReturn});
    }

    module.createBTCPayment = function(req,res){
    	console.log(req.query);
        var otherData = {
            message : req.query.message
        }
        BTCPayments.createTX(req.query.operation,req.query.quantity,otherData,function(err,newTX){
			if (err)
				res.json({ success : false, message : err});
			else
				res.json({ success : true, newTX : newTX});
		});
}

    return module;

}