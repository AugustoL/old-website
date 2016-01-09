
angular.module('ALapp.controllers').controller('projectsController',['$scope','sessionService', function($scope,sessionService){
    console.log("projectsController init");
 	$scope.words = sessionService.getStrings();
    $scope.language = $scope.words.language;
}]);