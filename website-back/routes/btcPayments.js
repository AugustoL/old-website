var mongoose = require('mongoose');
var sendgrid  = require('sendgrid')("augustolemble", "lemblenaitor8");

module.exports = function(logger,app,db,config){

    var module = {};
    //Cretaing BTC-Payments
    var btcPaymentsConfig = {
        logLevel : 'debug',
        dbURI : config.dbURI,
        network : 'testnet',
        seedBytes : "testingseed24",
        btcMainAddress : "mqyp4A44N1ekc2LzoAjasMo4SToZUrwfrG", 
        paymentTimeout : 120,
        limitBalance : 0.01,
        txFee : 0.0001,
        functionTimeout : 10, 
        warningTimeout : 30
    };
    var BTCPayments = new require('btc-payments')(btcPaymentsConfig,[],[],[],[]);

    BTCPayments.addOnCreate('Test',function(payment,callback){
        sendgrid.send({
            to : payment.otherData.email,
                from : 'btcPayments@augustolemble.com',
                subject : 'BTC-Payment created',
                html : "<h4>A payment under this email has been created:<br>Payment ID: "+payment.id.toString()+"<br>Quantity: "+payment.quantity+"<br>Addres: "+payment.toAddress+"<br>Payment type: "+payment.opName+"</h4>"
            }, function(err, json) {
                if (err) { 
                    logger.error(err.toString());
                } else {
                    logger.success('BTCPayment created email Sent'); 
                }
        });
        callback(null,'Success');
    });
    BTCPayments.addOnComplete('Test',function(payment,callback){
        sendgrid.send({
            to : payment.otherData.email,
                from : 'btcPayments@augustolemble.com',
                subject : 'BTC-Payment completed',
                html : "<h4>A payment under this email has been completed:<br>Payment ID: "+payment.id.toString()+"<br>Quantity: "+payment.quantity+"<br>Addres: "+payment.toAddress+"<br>Payment type: "+payment.opName+"</h4>"
            }, function(err, json) {
                if (err) { 
                    logger.error(err.toString());
                } else {
                    logger.success('BTCPayment complete email Sent'); 
                }
        });
        callback(null,'Success');
    });
    BTCPayments.addOnCancel('Test',function(payment,callback){
        sendgrid.send({
            to : payment.otherData.email,
                from : 'btcPayments@augustolemble.com',
                subject : 'BTC-Payment canceled',
                html : "<h4>A payment under this email has been canceled:<br>Payment ID: "+payment.id.toString()+"<br>Quantity: "+payment.quantity+"<br>Addres: "+payment.toAddress+"<br>Payment type: "+payment.opName+"</h4>"
            }, function(err, json) {
                if (err) { 
                    logger.error(err.toString());
                } else {
                    logger.success('BTCPayment canceled email Sent'); 
                }
        });
        callback(null,'Success');
    });
    BTCPayments.addOnWarning('Test',function(payment,callback){
        sendgrid.send({
            to : payment.otherData.email,
                from : 'btcPayments@augustolemble.com',
                subject : 'BTC-Payment warning',
                html : "<h4>A payment under this email has 30 minutes to be completed:<br>Payment ID: "+payment.id.toString()+"<br>Quantity: "+payment.quantity+"<br>Addres: "+payment.toAddress+"<br>Payment type: "+payment.opName+"</h4>"
            }, function(err, json) {
                if (err) { 
                    logger.error(err.toString());
                } else {
                    logger.success('BTCPayment warning email Sent'); 
                }
        });
        callback(null,'Success');
    });
    BTCPayments.start();

    module.addRoutes = function(){

        app.get('/getPoolAddresses', module.getPoolAddresses);
        app.get('/getPaymentsDone', module.getPaymentsDone);
        app.get('/getPaymentsWaiting', module.getPaymentsWaiting);
        app.get('/getPaymentDone', module.getPaymentDone);
        app.get('/getPaymentWaiting', module.getPaymentWaiting);
        app.get('/getOnCreateFunctions', module.getOnCreateFunctions);
        app.get('/getOnCompleteFunctions', module.getOnCompleteFunctions);
        app.get('/getOnCancelFunctions', module.getOnCancelFunctions);
        app.get('/getOnWarningFunctions', module.getOnWarningFunctions);
        app.post('/createBTCPayment', module.createBTCPayment);
    }

    module.getPoolAddresses = function(req,res){
        BTCPayments.getPoolAddresses(req.query.type,req.query.limit,function(err,addresses){
            if (err)
                res.json({ success : false, error : err.toString()});
            else
                res.json({ success : true, addresses : addresses});
        })
    }

    module.getPaymentsDone = function(req,res){
        BTCPayments.getPaymentsDone(req.query.limit,function(err,payments){
            if (err)
                res.json({ success : false, error : err.toString()});
            else
                res.json({ success : true, payments : payments});
        })
    }

    module.getPaymentsWaiting = function(req,res){
        BTCPayments.getPaymentsWaiting(req.query.limit,function(err,payments){
            if (err)
                res.json({ success : false, error : err.toString()});
            else
                res.json({ success : true, payments : payments});
        })
    }

    module.getPaymentDone = function(req,res){
        BTCPayments.getPaymentDone(req.query.id,function(err,payment){
            if (err)
                res.json({ success : false, error : err.toString()});
            else
                res.json({ success : true, payment : payment});
        })
    }

    module.getPaymentWaiting = function(req,res){
        BTCPayments.getPaymentWaiting(req.query.id,function(err,payment){
            if (err)
                res.json({ success : false, error : err.toString()});
            else
                res.json({ success : true, payment : payment});
        })
    }

    module.getOnCreateFunctions = function(req,res){
        var functions = BTCPayments.onCreateFunctions();
        var toReturn = [];
        for (i in functions)
            toReturn.push({
                name : i,
                code : functions[i].toString()
            })
        res.json({ success : true, functions : toReturn});
    }

    module.getOnCompleteFunctions = function(req,res){
        var functions = BTCPayments.onCompleteFunctions();
        var toReturn = [];
        for (i in functions)
            toReturn.push({
                name : i,
                code : functions[i].toString()
            })
        res.json({ success : true, functions : toReturn});
    }

    module.getOnCancelFunctions = function(req,res){
        var functions = BTCPayments.onCancelFunctions();
        var toReturn = [];
        for (i in functions)
            toReturn.push({
                name : i,
                code : functions[i].toString()
            })
        res.json({ success : true, functions : toReturn});
    }

    module.getOnWarningFunctions = function(req,res){
        var functions = BTCPayments.onWarningFunctions();
        var toReturn = [];
        for (i in functions)
            toReturn.push({
                name : i,
                code : functions[i].toString()
            })
        res.json({ success : true, functions : toReturn});
    }

    module.createBTCPayment = function(req,res){
        BTCPayments.createTX(req.query.operation,req.query.quantity,{ email : req.query.email },function(err,newTX){
            if (err)
                res.json({ success : false, error : err.toString()});
            else
                res.json({ success : true, newTX : newTX});
        });
    }

    return module;

}