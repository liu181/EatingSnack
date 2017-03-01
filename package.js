/*
* @Author: Administrator
* @Date:   2017-02-26 09:00:26
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-26 18:51:57
*/


// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017/snack';
// module.exports = function (callback) {
// 	MongoClient.connect(url, function (err, db) {
// 		console.log(db)
// 		callback(db);
// 	})
// }

//引入mongodb这个包,调用里面MongoClient属性
var MongoClient = require('mongodb').MongoClient;
//url指向mongo应用程序里面的一个数据库taobao
//localhost指向的我的本机，192.168.xx.oo 通过ip找服务器
//通过27017端口号找到mongo应用程序
//taobao是数据库的名字
var url = 'mongodb://localhost:27017/user';
module.exports=function(callback){
   MongoClient.connect(url, function (err, db) {
      callback(db);
   }); 
}
