/*
* @Author: Administrator
* @Date:   2017-01-14 20:36:14
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-11 18:30:52
*/

'use strict';
(function (Eating) {
	var Backgrounds = function (obj) {
		this.ctx = obj.ctx; 
		this.color = obj.color;
		
	}
	Backgrounds.fn = Backgrounds.prototype;
	Backgrounds.fn.render = function () {
		var ctx = this.ctx;
		ctx.fillStyle = this.color;
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}
	Eating.Backgrounds = Backgrounds;
})(Eating)