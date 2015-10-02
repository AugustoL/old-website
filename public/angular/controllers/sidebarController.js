
angular.module('ALapp.controllers').controller('sidebarController',['$scope','$window','publicService','sessionService', function($scope,$window,publicService,sessionService){
    console.log("sidebarController init");
    $scope.words = sessionService.getStrings();

    publicService.getMonths().then(function(promise){
        //console.log(promise.data);
        $scope.months = promise.data;
    })

    publicService.getCategories().then(function(promise){
        //console.log(promise.data);
        $scope.categories = promise.data;
    })
}]);