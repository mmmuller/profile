(function(mod) {
	mod.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/profile/init', {
			templateUrl: 'src/profile/init/init.html',
			controller: 'profileInitCtrl'
		});
	}]);




	mod.controller('profileInitCtrl', function($scope, $http, $location, $q, profileService) {

		profileService.get("global").then(function(data) {
			$scope.globalProfilExist = data!='null';
		});

		$scope.createGlobalProfile = function() {
			var promises  = []
			promises.push(profileService.update({ path: "global",type : "string"}));
			promises.push(profileService.update({ path: "global.systems",type : "string"}));
			promises.push(profileService.update({ path: "global.systems.portal_pl",type : "string"}));
			promises.push(profileService.update({ path: "global.systems.portal_pl.domain",type : "string", value="portal.pl"}));

			$q.all(promises).then(function(data){
				$location.path("/profile/global");
			});
		}

	});
})(angular.module('profile.init', ['ngRoute', 'profile']));



//$location.path("/profile/global");