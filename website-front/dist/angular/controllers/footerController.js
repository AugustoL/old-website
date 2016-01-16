angular.module('ALapp.controllers').controller('footerController',['$scope','sessionService', function($scope,sessionService){
	console.log("footerController init");
	$scope.words = sessionService.getStrings();
}]);