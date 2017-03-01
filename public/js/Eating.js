/*
* @Author: Administrator
* @Date:   2017-01-14 20:23:38
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-16 18:46:15
*/

'use strict';  
(function (window) {  
	var Eating = {
		// 工厂函数
		factory: function (objName, reference) {
			switch(objName) {
				case 'data':
					return new Eating.Data(reference)
				case 'backgrounds':
					return new Eating.Backgrounds(reference);
				case 'bar':
					return new Eating.Bar(reference)
				case 'snack':
					return new Eating.Snack(reference);
				case 'fruit' :
					return new Eating.Fruit(reference);
			} 
		},
		// 图片加载
		isLoaded: function (list, callback) {
			var picList = {},
				picCount = 0,
				len = list.length;
			list.forEach(function (val) {
				var img = new Image();
				img.src = 'img/' + val + '.png';
				img.addEventListener('load', function () {
					picCount++;
					picList[val] = this;
					if(picCount >= len){
						callback(picList)
					}
				})
			})
		},
		// 产生随机数
		random: function (start, target) {
			return Math.random() * (target - start) + start
		}   
	}
	window.Eating = Eating;
})(window)