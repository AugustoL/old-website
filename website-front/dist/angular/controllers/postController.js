/*
 AugustoLemble 2016-01-14 
*/
angular.module("ALapp.controllers").controller("postController",["$scope","$routeParams","$location","publicService","sessionService","$sce",function(a,b,c,d,e,f){console.log("postController init."),a.words=e.getStrings(),a.language=a.words.language,b.id?d.getPost(b.id).then(function(b){b.data.success&&!b.data.post.draft?a.post=b.data.post:c.path("/home")}):c.path("/home"),a.toTrusted=function(a){return f.trustAsHtml(a)}}]);