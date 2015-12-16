.factory('OMDb', ['$resource',
	function($resource) {
		return $resource('http://www.omdbapi.com')
	}
])