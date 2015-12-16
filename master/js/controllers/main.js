.controller('MainCtrl', ['$scope', 'Spoilers', 'OMDb', '$timeout',
	function($scope, Spoilers, OMDb, $timeout) {
		$scope.agreed = false
		var smartList = []
		$scope.generateSpoiler = function() {
			$scope.ready = false
			$timeout(function() {
				if (smartList.length == 0) {
					generateSmartList($scope.spoilers.length)
				}
				var index = Math.floor(Math.random() * smartList.length)
				$scope.index = smartList[index]
				smartList.splice(index, 1)
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

		var generateSmartList = function(size) {
			for (var i = 0; i < size; i++) {
				smartList[i] = i
			}
		}

		var spoilers = Spoilers.query(function() {
			$scope.spoilers = spoilers
		})
	}
])