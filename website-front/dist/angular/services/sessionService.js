angular.module('ALapp.services').factory('sessionService', ['localStorageService','$http','$rootScope', function (localStorageService,$http,$rootScope) {

	var factory = {};

    factory.addItem = function(key, value){
        return localStorageService.set(key, value);
    }
    factory.getItem = function(key, value){
        return localStorageService.get(key);
    }
    factory.removeItem = function(key){
        localStorageService.remove(key);
    }

    factory.getStrings = function(lang){
        console.log('Getting strings');
        if (lang && (lang == 'es' || lang == 'en')){
            localStorageService.set('lang',lang);
            return getWords(lang);
        } else if (localStorageService.get('lang') == "en" || localStorageService.get('lang') == "es"){
            return getWords(localStorageService.get('lang'))
        } else {
            var userLang = navigator.language || navigator.userLanguage;
            if (userLang.indexOf("es") === 0){
                localStorageService.set('lang','es');
                return getWords("es");
            } else {
                localStorageService.set('lang','en');
                return getWords("en");
            }
        }
    }

    return factory;
}]);