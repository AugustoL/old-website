var request = require('request');

module.exports = function(logger,app){

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
    }

    module.renderIndex = function(req,res){
        var url = req.protocol + '://' + req.get('host') + req.originalUrl
        res.render('index.html', {
            url : url,
            title : 'AugustoLemble.com',
            description : 'Personal website with my works, music, journeys, etc.',
            ogimage : "http://augustolemble.com/getImage?name=yo2"
        });
    };

    module.templates = function(req,res){
        res.render('templates/' + req.params.name);
    };

    module.directives = function(req,res){
        res.render('directives/' + req.params.name);
    };

    module.renderPost = function (req, res) {
        var url = req.protocol + '://' + req.get('host') + req.originalUrl;
        getRequestBackend('/getPost?id='+req.query.id,function(err, httpResponse, body){
            body = JSON.parse(body);
            res.render('index.html', {
                url : url,
                title : JSON.parse(body.post).titleEn,
                description : JSON.parse(body.post).bodyEn,
                ogimage : "http://augustolemble.com:3000/getImage?name="+JSON.parse(body.post).img,
            });
        })
    };

    function getRequestBackend(url,callback){
        request.get({url:'http://127.0.0.1:3000'+url}, function(err, httpResponse, body) {
            if (callback)
                callback(err, httpResponse, body);
        });
    }

    function postRequestBackend(url,formData,callback){
        request.post({url:'http://127.0.0.1:3000/'+url, formData: formData}, function(err, httpResponse, body) {
            if (callback)
                callback(err, httpResponse, body);
        });
    }

    return module;

}