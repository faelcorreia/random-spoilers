.controller('MainCtrl', ['$scope', 'Spoilers', 'OMDb',
	function($scope, Spoilers, OMDb) {
		$scope.generateSpoiler = function() {
			$scope.index = Math.floor(Math.random() * spoilers.length)
			console.log($scope.spoilers[$scope.index].imdb)
			var movie = OMDb.get({
				i: $scope.spoilers[$scope.index].imdb
			}, function() {
				$scope.movie = movie
			})
		}

		var spoilers = Spoilers.query(function() {
			$scope.spoilers = spoilers
			$scope.generateSpoiler()
		})
	}
])