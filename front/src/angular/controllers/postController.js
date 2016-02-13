angular.module('ALapp.controllers').controller('postController',['$scope','$routeParams','$location','publicService','sessionService','$sce', function($scope,$routeParams,$location,publicService,sessionService,$sce){
    console.log('postController init.');
    $('#commentAlert').hide();
    $scope.words = sessionService.getStrings();
    $scope.language = $scope.words.language;
    console.log($scope.words);
    if ($routeParams.id){
        $scope.newComment = {
            postID : $routeParams.id,
            name : '',
            text : ''
        };
    	publicService.getPost($routeParams.id).then(function(promise){
            if (promise.data.success&&!promise.data.post.draft)
                $scope.post = angular.fromJson(promise.data.post);
                
            else
                $location.path('/home');
    	})
    } else {
        $location.path('/home');
    }

    $scope.toTrusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    }

    $scope.submitComment = function(){
        publicService.commentPost($scope.newComment).then(function(promise){
            if (!promise.data.success)
                $('#commentAlert').show();
            else
                window.location.reload();    
        })
    }
}]);