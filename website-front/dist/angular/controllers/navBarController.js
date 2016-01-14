/*
 AugustoLemble 2016-01-14 
*/
angular.module("ALapp.controllers").controller("navBarController",["$scope","$window","sessionService",function(a,b,c){console.log("navBarController init"),a.words=c.getStrings(),a.language=a.words.language,a.changeLang=function(b){a.words=c.getStrings(b),a.language=b}}]);