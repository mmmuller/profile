var Q = require('q');
var profilDao = require('../db/ProfilDao.js');

var getSimple = function(path, deferred) {
	profilDao.dao.get(path).then(function(p){
		deferred.resolve(p);
	}, function(err){
		deferred.reject(err);
	});
}

var getChildren = function(path, deferred) {
	profilDao.dao.getChildren(path).then(function(p){
		deferred.resolve(p);
	}, function(err){
		deferred.reject(err);
	});
}

var isArrayPath = function(path) {
	var val =  (path && path.length > 2 && (path.substring(path.length-2, path.length) == "[]"));
	return val ? (path.substring(0, path.length - 2)) : false;
}

exports.profilManager = {
	add : function(p) {
		var deferred = Q.defer();
		profilDao.dao.add(p).then(function(p) {
			deferred.resolve(p);
		}, function(e) {
			deferred.reject(e);
		});
		return deferred.promise;
	},
	get : function(path) {
		var deferred = Q.defer();

		var p = isArrayPath(path);
		if(p) {
			getChildren(p, deferred);
		} else {
			getSimple(path, deferred);
		}
		return deferred.promise;
	},
	remove : function(path) {
		var deferred = Q.defer();
		profilDao.dao.remove(path).then(function(p) {
			deferred.resolve(p);
		}, function(e) {
			deferred.reject(e);
		});
		return deferred.promise;
	}
}

p = { 
	path: "global",
	type : "string"
}


/*exports.profilManager.add(p).then(function() {
}, function(e) {
	console.log(e);
});*/




/*
exports.profilManager.get("global").then(function(p) {
	console.log("yyy " + JSON.stringify(p));
}, function() {
	console.log("error");
});
*/

//p = "global.test[]";

//console.log(isArrayPath("global.ssa[]"));