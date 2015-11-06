angular.module('ALapp.controllers').controller('postController',['$scope','$routeParams','$location','publicService','sessionService','$sce','$rootScope','metaService', function($scope,$routeParams,$location,publicService,sessionService,$sce,$rootScope,metaService){
    console.log('postController init.');
    $scope.words = sessionService.getStrings();
    $scope.language = $scope.words.language;
    if ($routeParams.id){
    	publicService.getPost($routeParams.id).then(function(promise){
            if (promise.data.success&&!promise.data.post.draft){
                $scope.post = promise.data.post;
                $rootScope.metaService = metaService;
                $rootScope.metaService.set("AugustoLemble",promise.data.post.titleEn,"Augusto Lemble",promise.data.post.titleEn,"",promise.data.post.bodyEn);
            } else
                $location.path('/home');
    	})
    } else {
        $location.path('/home');
    }

    $scope.toTrusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    }
}]);