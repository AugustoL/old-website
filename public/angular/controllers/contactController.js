
angular.module('ALapp.controllers').controller('contactController',['$scope','publicService','sessionService', function($scope,publicService,sessionService){
    console.log("contactController init");
    $scope.posts = [];
    $scope.words = sessionService.getStrings();
    $scope.language = $scope.words.language;
    $scope.from = "";
    $scope.subject = "";
    $scope.text = "";
    
    $scope.$watchGroup(['from','subject','text'], function(newValues,oldValues) {
        if (!newValues[0] || !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(newValues[0])){
            $("#submitButton").prop('disabled', true);
            $scope.errorInForm = 'Inavlid email';
        } else if (!newValues[1] || ((newValues[1].length < 4) || (newValues[1].length > 20))) {
            $("#submitButton").prop('disabled', true);
            $scope.errorInForm = 'Subject length must be between 4 and 20 characters';
        } else if (!newValues[2] || ((newValues[2].length < 25) || (newValues[2].length > 500))) {
            $("#submitButton").prop('disabled', true);
            $scope.errorInForm = 'Text length must be between 25 and 500 characters';
        } else {
            $scope.errorInForm = '';
        }

    });
	
    $scope.submitMessage = function(){
        console.log('yeah');
        publicService.sendMessage($scope.from,$scope.subject,$scope.text).then(function(promise){
        	console.log(promise.data);
        });
    }
}]);