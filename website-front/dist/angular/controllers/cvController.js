/*
 AugustoLemble 2016-01-14 
*/
angular.module("ALapp.controllers").controller("cvController",["$scope","sessionService",function(a,b){console.log("cvController init"),a.words=b.getStrings(),a.language=a.words.language}]);