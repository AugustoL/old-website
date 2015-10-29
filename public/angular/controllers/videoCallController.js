angular.module('ALapp.controllers').controller('videoCallController',['$scope','sessionService', function($scope,sessionService){
	console.log("videoCallController init");
	$scope.words = sessionService.getStrings();
	var peer = new Peer({key: '426byzgxlq9w9udi'});
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    //var peer = new Peer($scope.myID, {host: '107.170.190.132', port: 80, path: '/peerapi/'});

    $scope.myID = '';
    $scope.readyToCall = false;

    peer.on('open', function(id) {
    	$scope.readyToCall = true;
    	$scope.myID = id;
    	console.log('My id: '+$scope.myID)
    	$('#idMessage').text('Your ID to receive calls is '+id);
	});
    peer.on('call', onReceiveCall);

    $scope.startCall = function() {
	    console.log('starting call...');
	    getVideo(
	        function(MediaStream){
	        	myStream(MediaStream);
	            console.log('Now calling ' + $('#callTo').val());
	            var call = peer.call($('#callTo').val(), MediaStream);
	            call.on('stream', receivedStream);
	            $('#stopBtn').prop('disabled',false);
	        },
	        function(err){
	            console.log('an error occured while getting the video');
	            console.log(err);
	        }
	    );
	    peer.on('disconnected', function(id) {
	    	peer.disconnect();
	    	console.log('Videocall was disconnected');
		});
	};

	$scope.stopCall = function() {
		console.log('Disconnecting..');
		peer.disconnect();
		$('#stopBtn').prop('disabled',true);
		document.querySelector('#myVideo').src = "";
		document.querySelector('#otherVideo').src = "";
	}

    function getVideo(successCallback, errorCallback){
	    navigator.getUserMedia({audio: true, video: true}, successCallback, errorCallback);
	}

	function onReceiveCall(call){
	    console.log('peer is calling...');
	    console.log(call);
	    getVideo(
	        function(MediaStream){
	        	myStream(MediaStream);
	            call.answer(MediaStream);
	            console.log('answering call started...');
	            $('#stopBtn').prop('disabled',false);
	        },
	        function(err){
	            console.log('an error occured while getting the video');
	            console.log(err);
	        }
	    );
	    call.on('stream', receivedStream);
	    peer.on('disconnected', function(id) {
	    	peer.disconnect();
	    	console.log('Videocall was disconnected');
		});
	}

	function receivedStream(stream){
	    var receivedVideo = document.querySelector('#otherVideo')
	    receivedVideo.src = window.URL.createObjectURL(stream);
	    receivedVideo.onloadedmetadata = function(){
	        console.log('receivedVideo loaded');
	    };
	}
	/*
	function errorCallback(err) {
		console.log('an error occured while getting the video');
        console.log(err);
	}
	*/
	//navigator.getUserMedia({audio: true, video: true}, myStream, errorCallback);

	function myStream(stream){
	    var sentVideo = document.querySelector('#myVideo');
	    sentVideo.src = window.URL.createObjectURL(stream);
	    sentVideo.onloadedmetadata = function(){
	        console.log('sentVideo loaded');
	    };
	    
	}
}]);