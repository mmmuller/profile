(function(mod){

	mod.service('profileService', function($http) {
		return {
			get : function(path) {
				return $http.get('/profile', { params : { 'p' : path }}).then(function(data) {

					return data == null ? null : data.data;
				});
			},
			update : function(node) {
				return $http.post('/profile', node);
			},
			delete : function(node) {
				return $http.delete('/profile', { params : { 'p' : node.path }});
			}
		}
	});

})(angular.module("profile", []));