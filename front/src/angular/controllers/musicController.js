
angular.module('ALapp.controllers').controller('musicController',['$scope','$window','publicService', function($scope,$window,publicService){
    console.log("musicController init");
    $scope.playlists = [];
    $scope.loadingPlaylists = true;
    publicService.getAllPlaylists().then(function(promise){
		if (promise.data.success)
			$scope.playlists = promise.data.body.items
		angular.forEach($scope.playlists, function(playlist){
			playlist.status = 'closed';
		})
		console.log($scope.playlists);
		$scope.loadingPlaylists = false;
	});

	$scope.triggerPlaylist = function(playlist){
		if(playlist.status == 'closed'){
			playlist.status = 'loading';
			publicService.getPlaylist(playlist.id, playlist.owner.id).then(function(promise){
				if (promise.data.success)
					playlist.tracks = promise.data.body.tracks.items
				console.log(playlist.tracks[0]);
				playlist.status = "open";
			});
		} else {
			playlist.status = 'closed';
		}
	}

}]);