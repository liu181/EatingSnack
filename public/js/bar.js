(function () {
	var Bar = function (obj) {
		this.ctx = obj.ctx;
		this.color = obj.color;
		this.obstacleW = obj.obstacleW || 10;
		this.obstacleH = obj.obstacleH || 10;
		this.step = obj.step 
	}
	Bar.fn = Bar.prototype;
	Bar.fn.render = function () {
		var oW = this.obstacleW;
		var oH = this.obstacleH; 
		
		this.step++;
		this.createBar('#333', 'up', 1);
		this.createBar('#666', 'up', 0, oW / 2);
		this.createBar('#333', 'down', 0)
		this.createBar('#666', 'down', 1, oW / 2)
		this.createBar('#333', 'left', 1)
		this.createBar('#666', 'left', 0, oW / 2)
		this.createBar('#333', 'right', 0)
		this.createBar('#666', 'right', 1, oW / 2)
	}
	Bar.fn.createBar = function (color, pos, direct, other) {
		var other = other || 0,
			p1,p2,p3,i,
			ctx = this.ctx,
			w = ctx.canvas.width,
			h = ctx.canvas.height;
			oW = this.obstacleW;
			oH = this.obstacleH;
		if(direct == 1){
			direct = Math.sin(this.step / 10);
		} else if (direct == 0){
			direct = Math.cos(this.step / 10);
		}
		for(i = 0; i < w / 10; i++){
			p1 = oW * i ;
			p2 = oW * (i + 1);
			p3 = oW / 2 + oW * i;
			ctx.beginPath();
			ctx.fillStyle = color;
			if(pos == 'up'){
				ctx.moveTo(p1 + other - direct, 0);
				ctx.lineTo(p2 + other - direct, 0);
				ctx.lineTo(p3 + other - direct, oH);
			}
			if(pos == 'down'){
				ctx.moveTo(p1 + other - direct, h);
				ctx.lineTo(p2 + other - direct, h);
				ctx.lineTo(p3 + other - direct, h - oH);
			}
			if(pos == 'left'){
				ctx.moveTo(0, p1 - direct + other);
				ctx.lineTo(0, p2 - direct + other);
				ctx.lineTo( oH, p3 - Math.sin(this.step / 10) + other);
			}
			if(pos == 'right'){
				ctx.moveTo(w, p1 - direct + other);
				ctx.lineTo(w, p2 - direct + other);
				ctx.lineTo(w - oH, p3 - direct + other);
			}
			ctx.fill();
		}

	}
	Eating.Bar = Bar
})(Eating)