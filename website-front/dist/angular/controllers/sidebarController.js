/*
 AugustoLemble 2016-01-14 
*/
angular.module("ALapp.controllers").controller("sidebarController",["$scope","$window","publicService","sessionService",function(a,b,c,d){console.log("sidebarController init"),a.words=d.getStrings(),c.getMonths().then(function(b){a.months=b.data}),c.getCategories().then(function(b){a.categories=b.data}),a.searchPost=function(){b.location.assign("/home?title="+a.titleSearch)}}]);