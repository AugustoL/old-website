
angular.module('ALapp.services').factory('publicService', ['$http','$window', function ($http,$window) {

    var backendDomain = "http://"+$window.location.hostname+":3000";
    var factory = {};

    //Get Posts
    factory.getPosts= function (findBy,skip,sort) {
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getPosts',
            params: { findBy : findBy, skip : skip, sort : sort }
        });
        return promise;
    }

    factory.getMonths= function () {
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getMonths',
            params: {}
        });
        return promise;
    }

    factory.getCategories= function () {
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getCategories',
            params: {}
        });
        return promise;
    }

    factory.getAllPlaylists= function () {
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getAllPlaylists',
            params: {}
        });
        return promise;
    }

    factory.getPlaylist= function (id,owner) {
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getPlaylist',
            params: { id : id, owner : owner}
        });
        return promise;
    }

    //Get Post by id
    factory.getPost= function (id) {
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getPost',
            params: { id : id }
        });
        return promise;
    }

    //Send contact message
    factory.sendMessage = function(from,subject,text){
        var promise = $http({
            method: 'POST',
            url: backendDomain+'/sendMessage',
            params: { from : from, subject : subject, text : text}
        });
        return promise;
    }
   
    factory.getImages = function(){
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getImages'
        });
        return promise;
    }

    //BTC-Payments
    factory.getAddressesWaiting = function(){
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getPoolAddresses',
            params: { type : 'waiting', limit : 10 }
        });
        return promise;
    }
    factory.getAddressesFree = function(){
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getPoolAddresses',
            params: { type : 'free', limit : 10 }
        });
        return promise;
    }
	factory.getPaymentsDone = function(){
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getPaymentsDone'
        });
        return promise;
    }
	factory.getPaymentsWaiting = function(){
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getPaymentsWaiting'
        });
        return promise;
    }
	factory.getPaymentDone = function(){
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getPaymentDone'
        });
        return promise;
    }
	factory.getPaymentWaiting = function(){
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getPaymentWaiting'
        });
        return promise;
    }
	factory.getOnCompleteFuctions = function(){
        var promise = $http({
            method: 'GET',
            url: backendDomain+'/getOnCompleteFuctions'
        });
        return promise;
    }
    factory.createBTCPayment = function(operation,quantity,message){
        var promise = $http({
            method: 'POST',
            url: backendDomain+'/createBTCPayment',
            params: { operation : operation, quantity : quantity, message : message}
        });
        return promise;
    }

    return factory;
}]);