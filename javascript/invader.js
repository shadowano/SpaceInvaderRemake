Updatable.extend('Invader',
{
},
{
	
	context : null,
	size : {},
	pos : {},
	gameBoard : null,
	bulletSize : {
		width: 5,
		height: 5
	},
	speed : 0,
	movingSpeed : 50,
	bulletCount : 1,

	
	init : function (size, initPos, bulletCount, gameBoard)
	{
		this.size = size;
		this.pos = initPos;
		this.gameBoard = gameBoard;
		this.bulletCount = bulletCount;
		
		this.setupEvents();
	},
	
	setupEvents : function ()
	{
		var that = this;
		$(document).keydown(function() 
		{
			var left = 37;
			var right = 39;
			var shoot = 32; // space
						
			if (event.which == left) 
			{
				//that.move({x: 5, y: 0});
				that.speed = -that.movingSpeed;
		  	}
		  	else if (event.which == right)
		  	{
		  		//that.move({x: -5, y: 0});
		  		that.speed = that.movingSpeed; 
		  	}
		  	else if (event.which == shoot)
		  	{
		  		// Only x bullet(s) at a time
		  		if (Bullet.activeBullets <= that.bulletCount)
		  		{
			  		var bullet = new Bullet(that.gameBoard, {x: that.pos.x, y: that.pos.y}, that.bulletSize, 1);	
			  		that.gameBoard.addObject(bullet)

			  		Bullet.activeBullets++;
		  		}
		  	}
		});

		$(document).keyup(function ()
		{
			var left = 37;
			var right = 39;
			
			if ( (event.which == left) || (event.which == right) )
			{
				that.speed = 0;
			}
		});
	},
	
	draw : function (context)
	{
		//context.fillStyle = "rgba(255, 255, 255, 1)"; // set canvas background color
		//context.fillRect  (this.pos.x-(this.size.width/2), this.pos.y, this.size.width, this.size.height);  // now fill the canvas
		  
		  var base_image = new Image();
		  base_image.src = 'img/invador.gif';
		  
		  
		  context.drawImage(base_image, this.pos.x-(this.size.width/2), this.pos.y);
	},
	
	update : function(now, elapsed)
	{
		this.pos.x += this.speed * elapsed;
	},
	
	move : function (delta)
	{
		this.pos.x += delta.x;
		this.pos.y += delta.y;
	}
});