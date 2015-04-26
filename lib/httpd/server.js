var express = require("express");

var profilManager = require('../managers/ProfilManager.js').profilManager;

var app = express();
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
	}
}
module.exports.run();
