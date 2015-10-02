angular.module('ALapp.directives').directive('sidebar', function () {
    return {
        restrict: 'E',
        templateUrl: '/directives/sidebar.html',
        controller: 'sidebarController'
    };
});