/*
* @Author: Administrator
* @Date:   2017-01-14 20:23:33
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-01 20:25:50
*/

'use strict'; 
(function (Eating) { 
	function Game (ctx) {
		this.ctx = ctx;
		this.isP = false;
		this.isGameOver = false;
		this.lastTime = new Date() - 0; 
		this.current = 0;
		this.dt = 0;
		this.picList = [];
		this.date;
		this.backgrounds;
		this.snack;
		this.obstacle; 
		this.gameOver;
		this.snackdata; 
		this.fruit;
		this.gameOverOpacity = 0;
		this.picArr = ['blue', 'fruit'];
		// 存放数据
		this.user = ''
		this.message = null
	}	
	Game.fn = Game.prototype;
	Game.fn.init = function () {
		var that = this
		this.picList = ['fruit', 'blue'];
		this.snack = Eating.factory('snack',{
			ctx: this.ctx,
			color: 'pink',
			width: 10,
			message: that.message
		})
		
		this.snack.init()
		this.date = Eating.factory('data',{
			ctx: this.ctx,
			message: that.message
		})
		this.fruit = Eating.factory('fruit', {
			ctx: this.ctx,
			sArr: this.snack.arr,
			date: this.date,
			message: that.message
		})
		
		// 订阅事件的调用顺序
		// 1 调用snack的add方法 添加 回调函数(要执行的方法)
		// 2 
		
		this.backgrounds = Eating.factory('backgrounds',{
			ctx: this.ctx,
			color: '#001'
		})
		this.obstacle = Eating.factory('bar',{
			ctx: this.ctx,
			color: ['#666','#ccc'],	
			obstacleW: 10,
			obstacleH: 10,
			step: 1
		})
		this.snack.addListener('eat', function (index) {
			that.fruit.die(index)
			that.date.scrollUp(100)
			that.snack.grow()
			that.date.judgeLevel()
		})
		this.snack.addListener('die', function () {
			that.endGame()
		})
		this.date.addListener(function () {
			that.date.levelUp()
			that.snack.speedUp()
		})
		this.addEvent()
	}
	Game.fn.render = function () {
			var that = this;
			Eating.isLoaded(this.picArr, function (list) {
				that.fruit.init(list)
				that.fruit.createFruit();
				var render = function () {
					that.current = new Date() - 0;
					that.dt = that.current - that.lastTime
					if(!that.isP && !that.isGameOver){
						that.backgrounds.render()
						that.snack.render({
							ctx: that.ctx,
							dt: that.dt,
							obstacleW: that.obstacle.obstacleW,
							width: that.snack.width,
							fruitPos: that.fruit.arrfruit,
							fruitNum: that.fruit.num,
							fruitArr: that.fruit.arrfruit
						});
						that.obstacle.render();
						that.fruit.render();
						that.date.render();
					}
					if(that.isGameOver){
						that.gameOver()
					}
					requestAnimationFrame(render)
				}
				requestAnimationFrame(render)
			})
	}
	Game.fn.addEvent = function () {
		var that = this;
		addEventListener('keydown', function (e) {
			var arr = that.snack.arr;
			console.log(e.keyCode)
			if(e.keyCode == 40) {
				if(arr[arr.length - 1].direct === 'up') return;
				that.snack.turn('down')
			} else if (e.keyCode == 37) {
				//左
				if(arr[arr.length - 1].direct === 'right') return;
				that.snack.turn('left')
			} else if (e.keyCode == 39) {
				//右
				if(arr[arr.length - 1].direct === 'left') return;
				that.snack.turn('right')
			} else if (e.keyCode == 38) {
				//上
				if(arr[arr.length - 1].direct === 'down') return;
				that.snack.turn('up')
			} else if (e.keyCode == 80) {
				// 暂停
				that.pause()
			} else if (e.keyCode == 83) {
				// 存储
				that.setItem()
			}

		})
	}
	Game.fn.setItem = function () {
		if(!this.isGameOver) {
			this.message = {
				date: {
					isLevelUp: this.date.isLevelUp,
					opacity: this.date.opacity,
					scroll: this.date.scroll,
					level: this.date.level
				},
				fruit: {
					arrfruit: this.fruit.arrgruit,
					fruitCount: this.fruit.fruitCount
				},
				snack: {
					arr: this.snack.arr,
					isgrow: this.snack.isgrow,
					growCount: this.snack.growCount,
					distance: this.snack.distance,
					flag: this.snack.flag,
					dt: this.snack.dt
				}
			}
		} else {
			this.message = {
				date: {
					isLevelUp: false,
					opacity: 0,
					scroll: 0,
					level: 1
				},
				fruit: {
					arrfruit: [],
					fruitCount: 0
				},
				snack: {
					arr: [{x:100,y:100, direct: 'right',move: true},{x:200,y:100, direct: 'right', move: true}],
					isgrow: false,
					growCount: 0,
					distance: 0,
					flag: 80,
					dt: 0
				}
			}
		}
		ajax({
			url:'http://192.168.25.88:3000/game',
			// url:'http://192.168.23.4:3000/game',
			// url: '/register',
			method: 'POST',
			data: {'name': this.user, 'value': JSON.stringify(this.message)},
			success: function (data) {
			}
		})
	}
	Game.fn.getItem = function (callback) {
		
		var name1 = this.user
		var that = this
		ajax({
			url:'http://192.168.25.88:3000/game/' + name1,
			// url:'http://192.168.23.4:3000/game',
			// url: '/register',
			method: 'GET',
			data: null,
			success: function (data) {
				
				if(data === '{}') {
					that.message = {
						date: {
							isLevelUp: false,
							opacity: 0,
							scroll: 0,
							level: 1
						},
						fruit: {
							arrfruit: [],
							fruitCount: 0
						},
						snack: {
							arr: [{x:100,y:100, direct: 'right',move: true},{x:200,y:100, direct: 'right', move: true}],
							isgrow: false,
							growCount: 0,
							distance: 0,
							flag: 80,
							dt: 0
						}
					}
				} else {
					that.message = JSON.parse(data);
				}
				
				callback()
			}
		})
	}

	Game.fn.getName = function () {
		this.user = localStorage.getItem('user')
	}
	Game.fn.startGame = function () {
		var that = this
		this.getName()
		this.getItem(function () {
			
			that.init();
			that.render();
		})
		
	}
	Game.fn.endGame = function () {
		// 1 停止
		this.isGameOver = true;
		this.setItem()
		// 2 渲染
	}
	Game.fn.gameOver = function () {
		if(this.isGameOver){
			if(this.gameOverOpacity <= 80){
				this.gameOverOpacity ++
			} else {
				this.isP = true;
				this.isGameOver = false;
			}
			ctx.beginPath();
			ctx.font = "40px Verdana ";
			ctx.fillStyle = "rgba(0,0,255," + this.gameOverOpacity /100 + ")";
			ctx.fillText('Fight Again', this.ctx.canvas.width / 2, 200)
			ctx.fill();
			ctx.closePath(); 
		}
	}
	Game.fn.pause = function () {
		this.isP = this.isP ? false : true;
	}
	// game 唯一实例
	var instanceGame = null;
	Eating.getGame = function (ctx) {
		if(instanceGame === null){
			instanceGame = new Game(ctx);
		}
		return instanceGame;
	}
})(Eating)