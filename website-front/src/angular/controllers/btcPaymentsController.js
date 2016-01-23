
angular.module('ALapp.controllers').controller('btcPaymentsController',['$scope','sessionService','publicService','$window', function($scope,sessionService,publicService,$window){
    console.log("btcPaymentsController init");
    $scope.words = sessionService.getStrings();
    $scope.language = $scope.words.language;
    $scope.paymentsWaiting = [];
    $scope.paymentsDone = [];
    $scope.addressesFree = [];
    $scope.addressesWaiting = [];
    $scope.paymentQuantity = 0.001;
    $scope.paymentOperation = "";
    $scope.paymentMessage = "";
    $scope.onCompleteFunctions = [];
    $scope.onWarningFunctions = [];
    $scope.onCancelFunctions = [];

    publicService.getAddressesWaiting().then(function(promise){
    	console.log('Addresses waiting:');
    	$scope.addressesWaiting = promise.data.addresses;
    	console.log($scope.addressesWaiting);
    })
    publicService.getAddressesFree().then(function(promise){
  	    console.log('Addresses free:');
    	$scope.addressesFree = promise.data.addresses;
    	console.log($scope.addressesFree);
    })
	publicService.getPaymentsDone().then(function(promise){
    	console.log('Payments done:');
		$scope.paymentsDone = promise.data.payments;
		console.log($scope.paymentsDone);
	})
	publicService.getPaymentsWaiting().then(function(promise){
    	console.log('Payments waiting:');
		$scope.paymentsWaiting = promise.data.payments;
		console.log($scope.paymentsWaiting);
	})
	publicService.getOnCompleteFunctions().then(function(promise){
    	console.log('Payment complete functions:');
    	$scope.onCompleteFunctions = promise.data.functions;
		console.log($scope.onCompleteFunctions);
		if ($scope.onCompleteFunctions[0])
			$scope.paymentOperation = $scope.onCompleteFunctions[0].name;	
	})
    publicService.getOnWarningFunctions().then(function(promise){
        console.log('Payment warning functions:');
        $scope.onWarningFunctions = promise.data.functions;
        console.log($scope.onWarningFunctions);
    })
    publicService.getOnCancelFunctions().then(function(promise){
        console.log('Payment cancel functions:');
        $scope.onCancelFunctions = promise.data.functions;
        console.log($scope.onCancelFunctions);  
    })

	$scope.createPayment = function(){
		publicService.createBTCPayment($scope.paymentOperation,$scope.paymentQuantity,$scope.paymentMessage).then(function(promise){
			if (promise.data.success)
				$window.location.reload();		
		})
	}
}]);

