Updatable.extend('Alien',
{
},
{
	pos: {},
	size: {},
	removeCB : null,
	health : 1,
	speed : 50,
	
	init: function(initPos, initSize, speed, strength, cb)
	{
		this.pos = initPos;
		this.size = initSize;
		this.speed = speed;
		this.removeCB = cb;
		this.health = strength;
	},
	
	draw: function(context) {
		context.fillStyle = "rgba(255, 0, 255, 1)"; // set canvas background color
		context.fillRect  (this.pos.x-(this.size.width/2), this.pos.y - this.size.height, this.size.width, this.size.height);  // now fill the canvas
		
		var base_image = new Image();
		base_image.src = 'img/alien.jpg';

		context.drawImage(base_image, this.pos.x-(this.size.width/2), this.pos.y - this.size.height);
	},
	
	update: function(now, elapsed, heroPos) {
		this.pos.y += elapsed * this.speed;
		
		if (this.pos.y >= heroPos.y)
		{
			this.removeCB([]);
		}
	},
	
	detectImpact: function(pos)
	{
		if (pos.x >= this.pos.x - this.size.width / 2 && pos.x < this.pos.x + this.size.width / 2 && pos.y <= this.pos.y && pos.y > this.pos.y - this.size.height)
		{
			this.health--;
			return true;
		}
		
		return false;   
	}
	
});