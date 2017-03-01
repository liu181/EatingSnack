/*
* @Author: Administrator
* @Date:   2017-01-16 21:11:54
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-27 21:15:25
*/

// 'use strict';
(function (Eating) {
	var Fruit = function (obj) {
		this.ctx = obj.ctx; 
		this.sArr = obj.sArr; //存储距离
		this.num = 8;
		// 存放图片
		this.arrPic = []
		// 水果对象 用来放水果的各种属性
		this.arrfruit = obj.message.fruit.arrfruit || [];
		this.orange = null; 
		this.blue = null;
		this.size = 16; 
		this.distance = [];
		this.fruitCount = obj.message.fruit.fruitCount || 0;
	}
	Fruit.fn = Fruit.prototype;
	Fruit.fn.init = function (list) {
		for(var k in list){
			this.arrPic.push(list[k])
		}
	}
	Fruit.fn.render = function () {
		// 对每个水果进行遍历
		for(var i = 0; i < this.num; i++){
			// 计算距离
			this.arrfruit[i].distance = Math.pow(Math.pow(this.sArr[this.sArr.length - 1].x - this.arrfruit[i].indexx, 2)+Math.pow(this.sArr[this.sArr.length - 1].y - this.arrfruit[i].indexy, 2), 0.5)
			// 如果活着 就绘制
			if(this.arrfruit[i].alive) {
				ctx.drawImage(this.arrfruit[i].img,this.arrfruit[i].indexx - this.size / 2, this.arrfruit[i].indexy - this.size / 2, this.size, this.size)
			}
			if(this.fruitCount >= this.num * 0.7){
				this.arrfruit[i] = null;
				this.fruitCount = 0;
				this.createFruit();
			}
			
		}
	}
	Fruit.fn.die = function (index) {
		this.arrfruit[index].alive = false;
		this.fruitCount += 1
		// this.dateUpLeve = 1
	}
	Fruit.fn.createFruit = function () {
		for(var i = 0; i < this.num; i++){
			var num = Math.floor(Eating.random(0, this.arrPic.length));
			this.arrfruit[i] = {};
			this.arrfruit[i].img = this.arrPic[num]
			this.arrfruit[i].indexx = Eating.random(20, 480);
			this.arrfruit[i].indexy = Eating.random(20, 480);
			this.arrfruit[i].alive = true;
			this.arrfruit[i].distance = 100;
		}
	}
	Eating.Fruit = Fruit;
})(Eating)