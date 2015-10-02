var app = angular.module('ALapp', ['ALapp.controllers','ALapp.directives','ALapp.services', 'ngRoute','flow','LocalStorageModule','720kb.socialshare']);

//Controllers mudule
angular.module('ALapp.controllers', ['flow']);
//Services Module
angular.module('ALapp.services', ['LocalStorageModule']);
//Directives Module
angular.module('ALapp.directives', []);

//LocalStorage Configuraton
app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('augustol')
    .setStorageType('localStorage')
    .setNotify(true, true)
});

app.filter('msToMinutes', function() {
  	 return function(millseconds) {
        var seconds = Math.floor(millseconds / 1000);
        var h = 3600;
        var m = 60;
        var minutes = Math.floor( (seconds % h)/m );
        var scnds = Math.floor( (seconds % m) );
        var timeString = '';
        if(scnds < 10) scnds = "0"+scnds;
        if(minutes < 10) minutes = "0"+minutes;
        timeString = minutes +":"+scnds;
        return timeString;
    }
});

app.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);