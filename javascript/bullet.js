Updatable.extend('Bullet',
{
	activeBullets : 0,

	init : function ()
	{

	}

},
{
	pos: {},
	size: {},
	gameBoard: null,
	strenght : 1,
	
	init: function (gameBoard, initPos, initSize, strenght)
	{
		this.pos = initPos;
		this.size = initSize;
		this.gameBoard = gameBoard;
		this.strenght = strenght;
	},
	
	draw: function (context) 
	{
		context.fillStyle = "rgba(255, 255, 0, 1)"; // set canvas background color
		context.fillRect  (this.pos.x-(this.size.width/2), this.pos.y - this.size.height, this.size.width, this.size.height);  // now fill the canvas
	},
	
	update: function (now, elapsed) 
	{
		this.pos.y -= elapsed * 300;
		if (this.pos.y < 50)
		{
			this.gameBoard.removeObject(this);
		}
		else
			this.detectImpact();
	},
	
	detectImpact: function ()
	{
		this.gameBoard.detectImpact(this);
	}
	
});