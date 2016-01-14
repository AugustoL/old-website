/*
 AugustoLemble 2016-01-14 
*/
angular.module("ALapp.controllers").controller("projectsController",["$scope","sessionService",function(a,b){console.log("projectsController init"),a.words=b.getStrings(),a.language=a.words.language}]);