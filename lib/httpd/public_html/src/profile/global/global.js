(function(mod) {
	mod.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/profile/global', {
			templateUrl: 'src/profile/global/global.html',
			controller: 'globalCtrl'
		});
	}]);

	mod.controller('globalCtrl', function($scope,$http,$location, profileService) {

		profileService.get('global').then(function(data) {
			if(data=='null') {
				$location.path("/profile/init");
			}
			$scope.tree = [data];
		});

		$scope.nameFromPath = function(path) {
			if(!path) return '';
			return (path.substr(path.lastIndexOf('.') + 1, path.length));
		}

		$scope.cancel = function(node) {
			unSelect(node);
			profileService.get(node.path).then(function(data) {
				clone(node, data);
			});
		}

		$scope.add = function(parent) {
			var newNode = {};
			newNode.path = parent.path + "." + new Date().getTime();
			newNode.type = parent.type;

			profileService.get(parent.path + "[]").then(function(data) {
				data.push(newNode);
				parent.nodes = data;
			});
		};

		$scope.refresh = function(node) {
			unSelect(node);
			profileService.get(node.path + '[]').then(function(d) {
				node.nodes = d;
			});
		}

		$scope.save = function(node) {
			delete node.showDetails;
			delete node.removed;
			profileService.update(node).then(function(data) {
			});
		}

		$scope.remove = function(node) {
			profileService.delete(node).then(function(data) {
				node.showDetails = false;
				node.removed = true;
			});
		}

		var unSelect = function(node) {
			node.showDetails = false;
		}

		var clone = function (destination, source) {
			for (var property in source) {
				if (typeof source[property] === "object" && source[property] !== null && destination[property]) { 
					clone(destination[property], source[property]);
				} else {
					destination[property] = source[property];
				}
			}
		};


	});
})(angular.module('profile.global', ['ngRoute', 'profile']));
