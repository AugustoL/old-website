/*
 AugustoLemble 2016-01-14 
*/
angular.module("ALapp.directives").directive("imagen",function(){return{restrict:"E",scope:!0,transclude:!0,link:function(a,b,c){var d="<div class='img img-"+c.size+"'><img src='/getImage?name="+c.name+"'></div>";b.replaceWith(d)}}});