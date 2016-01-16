angular.module('ALapp.directives').directive('footer', function () {
    return {
        restrict: 'A',
        templateUrl: '/directives/footer.html',
        scope: true,
        transclude : false,
        controller: 'footerController as footerCtrl'
    };
});