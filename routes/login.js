var express = require('express');
var router = express.Router();
var connect=require('../package.js');

var fs = require('fs')
/* GET users listing. */

// var connect = require('./package.js');
// connect(function (db) {
// 	var col = db.collection('user');
// 	col.find().toArray(function (err,docs) {
// 		console.log(docs)
// 		db.close();
// 	})
// })
router.get('/', function(req, res, next) {
	fs.readFile('./public/login.html',function (err, data) {
		res.end(data)
	})
	
});
router.post('/', function(req, res, next) {
 	connect(function(db){
	    var col= db.collection("gamer");
	    col.find().toArray(function (err, docs) {
	    	for(var i = 0; i < docs.length; i++){
	    		
	    		if(docs[i].name === req.body.name){
	    			console.log(1)
	    		}
	    		if(docs[i].passworld === req.body.passworld){
	    			console.log(2)
	    		}
	    		if(docs[i].name === req.body.name && docs[i].passworld === req.body.passworld){
	    			console.log(3)
					res.send('{"url":"/game"}')
					db.close();
					return;
	    		}
	    	}
	    	res.send('{"url":""}');
	    	db.close();
	    });
	})
	
});

module.exports = router;


