
angular.module('ALapp.services').factory('publicService', ['$http','$window', function ($http,$window) {

    var factory = {};

    //Get Posts
    factory.getPosts= function (findBy,skip,sort) {
        var promise = $http({method: 'GET',
            url: '/getPosts',
            params: { findBy : findBy, skip : skip, sort : sort }
        });
        return promise;
    }

    factory.getMonths= function () {
        var promise = $http({method: 'GET',
            url: '/getMonths',
            params: {}
        });
        return promise;
    }

    factory.getCategories= function () {
        var promise = $http({method: 'GET',
            url: '/getCategories',
            params: {}
        });
        return promise;
    }

    factory.getAllPlaylists= function () {
        var promise = $http({method: 'GET',
            url: '/getAllPlaylists',
            params: {}
        });
        return promise;
    }

    factory.getPlaylist= function (id,owner) {
        var promise = $http({method: 'GET',
            url: '/getPlaylist',
            params: { id : id, owner : owner}
        });
        return promise;
    }

    //Get Post by id
    factory.getPost= function (id) {
        var promise = $http({method: 'GET',
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

    return factory;
}]);