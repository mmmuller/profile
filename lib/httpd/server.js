var express = require("express");
var bodyParser = require('body-parser');

var profilManager = require('../managers/ProfilManager.js').profilManager;

var app = express();
app.use(bodyParser());

module.exports = {
	run : function() {
		app.use(express.static(__dirname + '/public_html'));
		app.listen('3000',function(){
			console.log("It's Started on PORT 3000" );
		});

		app.get('/profile',function(req,res){
			var p = req.param('p');
			console.log(p);
			if(!p) {
				res.end("use param liket this: p=global.test");
			}
			profilManager.get(p).then(function(items) {
				res.end(JSON.stringify(items));
			});
		});

		app.post('/profile', function(req, res) {
			profilManager.add(req.body).then(function(result) {
				res.end(JSON.stringify(result));
			});
		});

		app.delete('/profile', function(req, res) {
			var p = req.param('p');
			profilManager.remove(p).then(function(result) {
				res.end(JSON.stringify(result));
			});
		});
	}
}
module.exports.run();
