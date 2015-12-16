.factory('Spoilers', ['$resource',
	function($resource) {
		return $resource('/json/spoilers.json')
	}
])