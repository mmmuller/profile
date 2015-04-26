var Q = require('q');

var Engine = require('tingodb')();
var db = new Engine.Db(__dirname + '/data', {});

var isValidObject = function(p, deferred) {
	if(!p.path) {
		deferred.reject(new Error("Missing path. " + JSON.stringify(p)));
		return false;
	}

	var prefix = p.path.substring(0, p.path.indexOf("."));
	if(["global", "sys"].indexOf(prefix) == -1){
		deferred.reject(new Error("Not allowed profile prefix " + prefix + ". " + JSON.stringify(p)));
		return false;
	}

	if(["string", "int", "long", "link", "bool"].indexOf(p.type) == -1) {
		deferred.reject(new Error("Not allowed type " + p.type + ". " + JSON.stringify(p)));
		return false;
	}

	return true;
}

exports.dao = {
	tableName : 'globalProfile',
	add : function(p) {
		var deferred = Q.defer();

		if(!isValidObject(p, deferred)) {
			return deferred.promise;
		}

		p.type = p.type || "string";  

		console.log("Add function invoked");
		var collection = db.collection(this.tableName);
		collection.update( { path : p.path }, p, { upsert: true }, function(err, result) {
			if(err){
				deferred.reject(new Error(err));
			} else {
				deferred.resolve(result);
			}
		});
		return deferred.promise;
	},
	get : function(path) {
		var deferred = Q.defer();
		var collection = db.collection(this.tableName);
		collection.findOne({ path : path } , function(err, item) {
			if(err) {
				deferred.reject(new Error(error))
			} else {
				deferred.resolve(item);
			}

		})
		return deferred.promise;
	},
	//global.test without brackets
	getChildren : function(path) {
		var deferred = Q.defer();
		var collection = db.collection(this.tableName);
		path = path.replace(".", "\.");
		collection.find({ path : {$regex: "^" + path + "\.[^\.]*$"} }).toArray(function(err, items) {
			if(err) {
				deferred.reject(new Error(error))
			} else {
				deferred.resolve(items);
			}
		});
		return deferred.promise;
	}
}





sys = {
	path : "sys.name",
	type : "string", // string , bool, int, long, link
	value : "Janiiii",
}

/*exports.dao.add(sys).then(function(ll) {
	consolel.log(ee);
}, function(e){
	console.log(e);
});*/


sys = {
	path : "sys.surname",
	type : "striing",
	value : "Kowalski",
}

/*
exports.dao.get('sys.test').then(function(item) {
	console.log(item.value);
});
*/

/*
exports.dao.get("sds.d").then(function(items){
	console.log(items);
}, function(e){
	console.log("error" + e);
});

*/