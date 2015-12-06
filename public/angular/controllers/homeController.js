
angular.module('ALapp.controllers').controller('homeController',['$scope','$window','publicService','sessionService','$routeParams','$location','$sce', function($scope,$window,publicService,sessionService,$routeParams,$location,$sce){
    console.log("homeController init");
    $scope.posts = [];
    $scope.words = sessionService.getStrings();
    $scope.language = $scope.words.language;
    $scope.findBy = {};
    $scope.page = 0*10;
    if ($routeParams.page && $routeParams.page != -1)
        $scope.page = $routeParams.page;
    
    if ($routeParams.title){
        $scope.findBy.titleEn = {"$regex" : $routeParams.title, "$options" : "i"};
        $scope.findBy.titleEs = {"$regex" : $routeParams.title, "$options" : "i"};
    }

    if (($routeParams.month&&$routeParams.year)&&(parseInt($routeParams.month)<13 && parseInt($routeParams.month)>0)&&(parseInt($routeParams.year)>2013))
        $scope.findBy.date = { $lt: new Date($routeParams.year+','+$routeParams.month+',31'), $gt: new Date($routeParams.year+','+(parseInt($routeParams.month)-1)+',31') }
    
    if ($routeParams.categories)
        $scope.findBy.categories = { "$in" : $routeParams.categories.split(',') };

    $scope.loading = true;
    publicService.getPosts($scope.findBy,$scope.page*10,'-date').then(function(promise){
    	$scope.loading = false;
    	if (promise.data.success){
			$scope.posts = promise.data.posts;
            if (promise.data.lastPage){
                $scope.page = promise.data.lastPage;
                $routeParams.page = promise.data.lastPage;
            }
        }
    });

    $scope.goPage = function(page){
        switch(page){
            case 'previous':
                $routeParams.page = parseInt($scope.page)-1;
            break;
            case 'first' :
                $routeParams.page = 0;
            break;
            case 'next':
                $routeParams.page = parseInt($scope.page)+1;
            break;
            case 'last':
                $routeParams.page = -1;
            break;
        }
        $location.search($routeParams);
    }

    $scope.goPost = function(id){
        $window.location.assign('/post?id='+id);
    }

    $scope.toTrusted = function(html_code) {
        return $sce.trustAsHtml(html_code);
    }

    
}]);