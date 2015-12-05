
angular.module('ALapp.services').factory('publicService', ['$http', function ($http) {

    var factory = {};

    //Get Posts
    factory.getPosts= function (findBy,skip,sort) {
        var promise = $http({
            method: 'GET',
            url: '/getPosts',
            params: { findBy : findBy, skip : skip, sort : sort }
        });
        return promise;
    }

    factory.getMonths= function () {
        var promise = $http({
            method: 'GET',
            url: '/getMonths',
            params: {}
        });
        return promise;
    }

    factory.getCategories= function () {
        var promise = $http({
            method: 'GET',
            url: '/getCategories',
            params: {}
        });
        return promise;
    }

    factory.getAllPlaylists= function () {
        var promise = $http({
            method: 'GET',
            url: '/getAllPlaylists',
            params: {}
        });
        return promise;
    }

    factory.getPlaylist= function (id,owner) {
        var promise = $http({
            method: 'GET',
            url: '/getPlaylist',
            params: { id : id, owner : owner}
        });
        return promise;
    }

    //Get Post by id
    factory.getPost= function (id) {
        var promise = $http({
            method: 'GET',
            url: '/getPost',
            params: { id : id }
        });
        return promise;
    }

    //Send contact message
    factory.sendMessage = function(from,subject,text){
        var promise = $http({
            method: 'POST',
            url: '/sendMessage',
            params: { from : from, subject : subject, text : text}
        });
        return promise;
    }
   
    factory.getImages = function(){
        var promise = $http({
            method: 'GET',
            url: '/getImages'
        });
        return promise;
    }

    //BTC-Payments
    factory.getAddressesWaiting = function(){
        var promise = $http({
            method: 'GET',
            url: '/getPoolAddresses',
            params: { type : 'waiting', limit : 10 }
        });
        return promise;
    }
    factory.getAddressesFree = function(){
        var promise = $http({
            method: 'GET',
            url: '/getPoolAddresses',
            params: { type : 'free', limit : 10 }
        });
        return promise;
    }
	factory.getPaymentsDone = function(){
        var promise = $http({
            method: 'GET',
            url: '/getPaymentsDone'
        });
        return promise;
    }
	factory.getPaymentsWaiting = function(){
        var promise = $http({
            method: 'GET',
            url: '/getPaymentsWaiting'
        });
        return promise;
    }
	factory.getPaymentDone = function(){
        var promise = $http({
            method: 'GET',
            url: '/getPaymentDone'
        });
        return promise;
    }
	factory.getPaymentWaiting = function(){
        var promise = $http({
            method: 'GET',
            url: '/getPaymentWaiting'
        });
        return promise;
    }
	factory.getPaymentFuctions = function(){
        var promise = $http({
            method: 'GET',
            url: '/getPaymentFuctions'
        });
        return promise;
    }
    factory.createBTCPayment = function(operation,quantity,message){
        var promise = $http({
            method: 'POST',
            url: '/createBTCPayment',
            params: { operation : operation, quantity : quantity, message : message}
        });
        return promise;
    }

    return factory;
}]);