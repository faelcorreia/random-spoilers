.controller('MainCtrl', ['$scope', 'Spoilers', 'OMDb', '$timeout',
	function($scope, Spoilers, OMDb, $timeout) {
		$scope.agreed = false
		$scope.generateSpoiler = function() {
			$scope.ready = false
			$timeout(function() {
				$scope.index = Math.floor(Math.random() * spoilers.length)
				var movie = OMDb.get({
					i: $scope.spoilers[$scope.index].imdb
				}, function() {
					$scope.movie = movie
					$scope.ready = true
				})
			}, 1000)
		}

		$scope.continue = function() {
			$scope.agreed = true
			$scope.generateSpoiler()
		}

		var spoilers = Spoilers.query(function() {
			$scope.spoilers = spoilers
		})
	}
])