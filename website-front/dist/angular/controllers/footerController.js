/*
 AugustoLemble 2016-01-14 
*/
angular.module("ALapp.controllers").controller("footerController",["$scope","sessionService",function(a,b){console.log("footerController init"),a.words=b.getStrings()}]);