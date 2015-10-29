
app.config(['$routeProvider', function ($routeProvider) {
	
    //ALapp
    $routeProvider.when('/',{ templateUrl: '/templates/home.html', controller : 'homeController' });
    $routeProvider.when('/home',{ templateUrl: '/templates/home.html', controller : 'homeController' });
    $routeProvider.when('/post',{ templateUrl: '/templates/post.html', controller : 'postController' });
    $routeProvider.when('/projects',{ templateUrl: '/templates/projects.html', controller : 'projectsController' });
    $routeProvider.when('/music',{ templateUrl: '/templates/music.html', controller : 'musicController' });
    $routeProvider.when('/play',{ templateUrl: '/templates/play.html', controller : 'playController' });
    $routeProvider.when('/cv',{ templateUrl: '/templates/cv.html', controller : 'cvController' });
    $routeProvider.when('/videoCall',{ templateUrl: '/templates/videoCall.html', controller : 'videoCallController' });
    //Otherwise
    $routeProvider.otherwise({redirectTo: '/'});

}]).config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);
