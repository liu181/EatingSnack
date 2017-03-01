/*
* @Author: Administrator
* @Date:   2017-01-19 08:58:15
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-27 21:11:28
*/

'use strict';
(function (Eating) { 
	var Data = function (obj) {
		console.log(obj)
		 this.ctx = obj.ctx;
		 this.scroll = obj.message.date.scroll || 0;
		 this.level = obj.message.date.level || 1
		 this.isLevelUp = obj.message.date.isLevelUp || false;
		 this.opacity = obj.message.date.opacity || 0;
		 this.x = 0;
		 this.y = 0;
		 this.upList = []
	}
	Data.fn = Data.prototype;
	Data.fn.addListener = function (callback) {
		this.upList.push(callback);
	}
	Data.fn.trigger = function (num) {
		this.upList.forEach(function (val) {
			val(num)
		})
	}
	Data.fn.levelUp = function (num) {
			this.level += 1;
			this.isLevelUp = true;
	}
	Data.fn.scrollUp = function (num) {
		this.scroll += num;
	}
	Data.fn.judgeLevel = function () {
		if(this.scroll == 4000 || this.scroll == 2500 || this.scroll == 1500 || this.scroll == 500 || this.scroll == 300){
			this.trigger()
		}
	}
	Data.fn.render = function () {
		this.drawScroll()
		if(this.isLevelUp){
			this.drawLevel();
		}
	}
	// 达到某一分数后  调用升级方法  更新数据 并且显示文字 一次
	Data.fn.drawScroll = function () {
		var ctx = this.ctx,w = this.ctx.canvas.width;
		ctx.beginPath();
		ctx.textAlign = "center";
		ctx.fillStyle = '#fff';
		ctx.font = "25px Courier New ";
		ctx.fillText('分数：' + this.scroll,  8 * w / 10, 50)
		ctx.closePath();
		ctx.beginPath(); 
		ctx.fillStyle = '#fff';
		ctx.font = "20px Courier New ";
		ctx.fillText('等级：' + this.level, 8 * w / 10, 80)
		ctx.closePath();
	}
	Data.fn.drawLevel = function () {
		if(this.opacity < 80){
			this.opacity++;
		} else {
			this.opacity = 0
			this.isLevelUp = false;
		}
		ctx.beginPath();
		ctx.textAlign = "center";
		ctx.font = "40px Verdana";
		ctx.fillStyle = "rgba(255,255,255," + this.opacity /100 + ")";
		ctx.fillText('level Up', this.ctx.canvas.width / 2, 200)
		ctx.fill();
		ctx.closePath();
	}
	Eating.Data = Data
})(Eating)
