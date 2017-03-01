var express = require('express');
var router = express.Router();
var fs = require('fs')
var connect=require('../package.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  	fs.readFile('./public/index1.html',function (err, data) {
		res.end(data)
	})
});
router.get('/:name/', function (req, res, next) {
	
  	connect(function(db){
	    var col= db.collection("gamer");
	    // var where = { name : req.body.name }
	    // var set = {$set : {value : req.body.value}}
	    // col.updateMany(where,set, function(err, result) {
	    // 	db.close()
	    // })
	    console.log(req.params.name)
	    col.findOne({name: req.params.name}, function(error, bar){
	    	console.log('123')
	    	console.log(bar)
	    	res.send(bar.value)
	    	db.close()
	    	// console.log(bar)
	    });

	    // col.find().toArray(function (err, docs) {
	    // 	for(var i = 0; i < docs.length; i++){
	    		
	    // 		if(docs[i].name === req.body.name){
	    // 			console.log(1)
	    // 		}
	    		
	    // 		if(docs[i].name === req.body.name && docs[i].passworld === req.body.passworld){
	    // 			console.log(3)
					// res.send('{"url":"/game"}')
					// db.close();
					// return;
	    // 		}
	    // 	}
	    // 	res.send('{"data":""}');
	    // 	db.close();
	    // });
	})
});
router.post('/', function (req, res) {
	console.log(req.body.value)
	connect(function(db){
	    var col= db.collection("gamer");
	    var where = { name : req.body.name }
	    var set = {$set : {value : req.body.value}}
	    col.updateMany(where,set, function(err, result) {
	    	db.close()
	    })
	    // col.find().toArray(function (err, docs) {
	    // 	for(var i = 0; i < docs.length; i++){
	    		
	    // 		if(docs[i].name === req.body.name){
	    // 			console.log(1)
	    // 		}
	    // 		if(docs[i].passworld === req.body.passworld){
	    // 			console.log(2)
	    // 		}
	    // 		if(docs[i].name === req.body.name && docs[i].passworld === req.body.passworld){
	    // 			console.log(3)
					// res.send('{"url":"/game"}')
					// db.close();
					// return;
	    // 		}
	    // 	}
	    // 	res.send('{"url":""}');
	    // 	db.close();
	    // });
	})
})
module.exports = router;
