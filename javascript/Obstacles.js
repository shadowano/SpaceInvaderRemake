$.Class.extend("Obstacle", 
{
},
{
	pos : {},
	size : {},
	health : 50,

	init : function (initPos, initSize, strength)
	{
		this.pos = initPos;
		this.size = initSize;
		this.health = strength;
	},

	draw : function (context)
	{
		context.fillStyle = "rgba(200, 200, 200, 1)"; // set canvas background color
		context.fillRect  (this.pos.x-(this.size.width/2), this.pos.y - this.size.height, this.size.width, this.size.height);  // now fill the canvas
	},

	detectImpact: function(pos)
	{
		if (pos.x >= this.pos.x - this.size.width / 2 && pos.x < this.pos.x + this.size.width / 2 && pos.y >= this.pos.y && pos.y < this.pos.y + this.size.height)
		{
			this.health--;
			return true;
		}
		
		return false;   
	}

});

Obstacle.extend("BigBlock", 
{
},
{

	init : function (initPos, initSize, strength)
	{
		this._super(initPos, initSize, strength);
	},

	draw : function (context)
	{
		this._super(context);
	},

	detectImpact: function(pos)
	{
		return this._super(pos);  
	}
	
})