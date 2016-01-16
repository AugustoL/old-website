angular.module('ALapp.directives').directive('imagen', function () {
    return {
        restrict: 'E',
        scope: true,
        transclude : true,
        link: function (scope, element, attrs) {  
        	var e = "<div class='img img-"+attrs.size+"'><img src='/getImage?name="+attrs.name+"'></div>";
            element.replaceWith(e);
        }
    }
});