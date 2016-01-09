
angular.module('ALapp.controllers').controller('cvController',['$scope','sessionService', function($scope,sessionService){
    console.log("cvController init");
    $scope.words = sessionService.getStrings();
    $scope.language = $scope.words.language;
}]);