var express = require('express');
var router = express.Router();
var connect=require('../package.js');

var fs = require('fs')

router.get('/', function(req, res, next) {

	fs.readFile('./public/register.html',function (err, data) {
		
		res.end(data)
	})
	
});
router.post('/', function(req, res, next) {
 	connect(function(db){

	    var col= db.collection("gamer");
	    //  判断用户是否已经注册 
	    //  若没有注册 则将数据存储到数据库
	    col.find().toArray(function (err, docs) {
	    	for(var i = 0; i < docs.length; i++){
	    		if(docs[i].name === req.body.name){
					res.send('{"value":"该账户已被注册"}')
					db.close();
					return;
	    		}
	    	}
	    	col.insert({name:req.body.name,passworld:req.body.passworld});
	    	res.send('{"value":"注册成功"}')
	    	db.close();
	    });
	})
});
module.exports = router;



