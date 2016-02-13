
angular.module('ALapp.controllers').controller('navBarController',['$scope','$window','sessionService', function($scope,$window,sessionService){
    console.log("navBarController init");
    $scope.words = sessionService.getStrings();
    $scope.language = $scope.words.language;
    $scope.changeLang = function(lang){
    	$scope.words = sessionService.getStrings(lang);
    	$scope.language = lang;
    }
}]);