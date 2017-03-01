/*
* @Author: Administrator
* @Date:   2017-01-14 21:56:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-27 21:09:52
*/

// 'use strict'; 
(function (Eating) {  
	var Snack = function (obj) {
		console.log(obj.message.snack)
		this.ctx = obj.ctx
		this.width = obj.width;
		this.arr = obj.message.snack.arr || [];
		this.isgrow = obj.message.snack.isgrow || false;
		this.growCount = 0;
		this.gameOver = false;
		this.color = obj.color 
		// 第一个点和第二个点之间的距离
		this.distance = obj.message.snack.distance || 0; 
		this.flag = obj.message.snack.flag || 100
		this.dt = obj.message.snack.dt || 0 
		this.eatListenerList = [];
		this.dieListenerList = [];
		this.distance = []
		console.log(this)
	} 
	Snack.fn = Snack.prototype;
	Snack.fn.addListener = function (act, callback) {
		switch(act) {
			case 'eat': 
				this.eatListenerList.push(callback);
				break;
			case 'die':
				this.dieListenerList.push(callback);
				break;
		}
		
	}
	Snack.fn.speedUp = function () {
		this.flag -= 13
	}
	Snack.fn.init = function () {
		// this.arr = [{x:100,y:100, direct: 'right',move: true},{x:200,y:100, direct: 'right', move: true}];
	}
	Snack.fn.turn = function (dir) {
		var arr = this.arr
		arr.push({x: arr[arr.length - 1].x, y:arr[arr.length - 1].y, direct: dir, move: true, growCount: 0})
		arr[arr.length - 2].move = false;
	}
	Snack.fn.del = function () {
		if(this.arr[0].x - this.arr[1].x + this.arr[0].y - this.arr[1].y == 0){
			this.arr.splice(0, 1)
			this.arr[0].move = true;

			this.arr[0].direct = this.arr[1].direct;
		}

	}
	Snack.fn.render = function (obj) {
		this.move(obj)

		ctx.beginPath();
		ctx.fillStyle = '#001';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		ctx.beginPath();
		ctx.lineWidth = this.width;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round'
		ctx.strokeStyle = this.color;
		ctx.moveTo(this.arr[0].x, this.arr[0].y);
		for(var i =1; i < this.arr.length; i++){
			ctx.lineTo(this.arr[i].x, this.arr[i].y)
		}
		ctx.stroke();
	}
	Snack.fn.move = function (obj) { 

		// 1 判断是否相撞
		this.collision(obj)
		// 2 判断是否迟到果实
		this.collisionFruit(obj)
		// 3 判断是否成长
		var step = 2;
		this.dt += obj.dt
		this.del();
		if(this.dt > this.flag){
			this.dt = 0;
			if(this.arr[0].move) {
				switch (this.arr[0].direct) {
					case 'right':
						!this.isgrow && (this.arr[0].x = this.arr[0].x + step)
						break;
					case 'left':
						!this.isgrow && (this.arr[0].x = this.arr[0].x - step)
						break;
					case 'up':
						!this.isgrow && (this.arr[0].y = this.arr[0].y - step)
						break;
					case 'down':
						!this.isgrow && (this.arr[0].y = this.arr[0].y + step)
						break;
				}
			}
				switch (this.arr[this.arr.length-1].direct) {
					case 'right':
						if(this.isgrow){
							this.growCount++
						}
						if(this.growCount >= 5){
							//  迟到果实的时候 让他的isgrow属性为true;
							this.isgrow = false;
						}
						// this.arr[this.arr.length-1].x++;
						this.arr[this.arr.length - 1].x = this.arr[this.arr.length-1].x + step
						break;
					case 'left':
						if(this.isgrow){
							this.growCount++
						}
						if(this.growCount >= 5){
							this.growCount = 0;
							this.isgrow = false;
						}
						// this.arr[this.arr.length-1].x--;
						this.arr[this.arr.length - 1].x = this.arr[this.arr.length-1].x - step
						break;
					case 'up':
						if(this.isgrow){
							this.growCount++
						}
						if(this.growCount >= 5){
							this.growCount = 0;
							this.isgrow = false;
						}
						// this.arr[this.arr.length-1].y--;
						
						this.arr[this.arr.length - 1].y = this.arr[this.arr.length-1].y - step
						break;
					case 'down':
						if(this.isgrow){
							this.growCount++
						}
						if(this.growCount >= 5){
							this.growCount = 0;
							this.isgrow = false;
						}
						// this.arr[this.arr.length-1].y++;
						this.arr[this.arr.length - 1].y = this.arr[this.arr.length-1].y + step
						break;
				}
			}
				
			// }
		
	}
	Snack.fn.collisionFruit = function (obj) {
		var ctx = obj.ctx, i;
		for( i = 0; i < obj.fruitNum; i++){
			this.distance[i] = Math.pow(Math.pow(this.arr[this.arr.length - 1].x - obj.fruitPos[i].indexx, 2) + Math.pow(this.arr[this.arr.length - 1].y - obj.fruitPos[i].indexy, 2),0.5)
		}
		for(i = 0; i < this.distance.length; i++){
			if(this.distance[i] < 10 && obj.fruitArr[i].alive){
				this.trigger('eat',i)

			}
		}
	}
	Snack.fn.collision = function (obj) {
		
		// 先是对蛇自身的判断  只有当数组的长度 大于等于以后才需要判断
		// 对自身的碰撞进行判断
		var ctx = obj.ctx,w = ctx.canvas.width,h = ctx.canvas.height,arr = this.arr, len = arr.length, obstacleW = obj.obstacleW, obstacleH = obstacleW,width = obj.width
		// 先判断蛇自身相撞
		
		if(len >= 5){ 
			// 分为两种情况 1，最后一个点向上下移动。 2 最后一个点向左右移动
			// 当5个点的时候 只需要判断一段 6个点两断
			if(arr[len - 1].direct == 'right' || arr[len - 1].direct == 'left'){
				for(var i = 0; i < len - 4; i++){
					if(arr[len - 1].x == arr[i].x && ((arr[len - 1].y > arr[i].y && arr[len - 1].y < arr[i +1].y) || (arr[len - 1].y < arr[i].y && arr[len - 1].y > arr[i+1].y))){
					
						// this.isDead()
						this.trigger('die')
						
					}
				}
			}
			if(arr[len - 1].direct == 'up' || arr[len - 1].direct == 'down'){
				for(var i = 0; i < len - 4; i++){
					if(arr[len - 1].y == arr[i].y && ((arr[len - 1].x > arr[i].x && arr[len - 1].x < arr[i +1].x) || (arr[len - 1].x < arr[i].x && arr[len - 1].x > arr[i+1].x))){
						this.trigger('die')
						// this.isDead()
					}
				}
			}
		}
		// 再判断蛇与边框相撞
		if(arr[len - 1].x < obstacleH - width / 2 || arr[len - 1].x > w - obstacleH - width / 2 || arr[len - 1].y < obstacleH - width / 2 || arr[len - 1].y > h - obstacleH + width / 2){
			// this.isDead()
			this.trigger('die')
		}
	}
	Snack.fn.trigger = function (act,index) {
		switch(act) {
			case 'eat': 
				this.eatListenerList.forEach(function (val) {
					val(index)
				})
				break;
			case 'die':
				this.dieListenerList.forEach(function (val) {
					val()
				})
				break;
		}
	}
	Snack.fn.grow = function () {
		this.isgrow = true;
	}
	Snack.fn.isDead = function () {
		this.trigger();
	}
	Eating.Snack = Snack;
})(Eating)


// 1 在不是暂停 并且 不是over的情况下不断调用render
// 2 在snack 的render中 调用 move 和draw方法
// 3 在move中调用 掉用 与bar相撞 和与fruit相撞的方法
// 4 在fruit相撞中 调用trigger(eat)方法