$.Class.extend('GameBoard',
{
},
{
	
	context : null,
	invader : null,
	objects : [],
	lastUpdated : null,
	score : 0,
	incrementScore : 5,
	objectList : undefined,
	myInterval : undefined,
	nextLevel : true,
	complimentsList : 
	["Nice!", "Very good!", "You're good!", "Good game!", "You did it!", "Who teached you that?!"],
	levelManager : null,
	currentLevel : null,
	previousLevelNumber : 1,
	previousComplimentIdx : 0,

	invSize : {
		width: 27,
		height: 50
	},

	invPos : {
		x: 20,
		y: 20,
	},

	messageState : 
	{
		text : "",
		show : false,
		color : "#FFFFFF",
		size : "12px",
		timeMS : null,
		textAlign :'center'
	},
	
	init : function()
	{
		this.canvas = $("#spaceCanvas");
		this.context = this.canvas[0].getContext('2d');
		
		this.width = this.canvas.width();
		this.height = this.canvas.height();
		
		this.InitializeBoard();
		//this.draw();
		
		this.tick();
	},
	
	InitializeBoard : function ()
	{
		this.initializeLevels();
		
		this.initalizeLevel();
	},

	initializeLevels : function ()
	{
		var levels = new LevelGenerator().getLevels();
		this.levelManager = new LevelManager();
		this.levelManager.addLevels(levels);

		this.currentLevel = this.levelManager.nextLevel();
	},

	initalizeLevel : function ()
	{
		this.initializeAliens();
		this.initializeObstacles();

		this.initializeInvader();
	},

	initializeInvader : function ()
	{
		this.invSize = {
			width: 27,
			height: 50
		};

		this.invPos = {
			x: this.width / 2,
			y: this.height - this.invSize.height - 10,
		};

		if (!this.invader)
		{
			this.invader = new Invader(this.invSize, this.invPos, this.currentLevel.invaderBulletCount, this);
			this.invader.draw(this.context);
			this.addObject(this.invader);
		}
		else
			this.invader.pos = this.invPos;
	},
	
	initializeAliens : function ()
	{
		var rowsAliens = this.currentLevel.alienRows;
		var countAliens = this.currentLevel.aliens;
		var alienSpeed = this.currentLevel.alienSpeed;
		var alienStrength = this.currentLevel.alienStrength;
		var alienSize = { width: 50, height: 42 };

		var distanceBetween = { x: 10, y: 10 };
		var rowWidth = countAliens * (alienSize.width + distanceBetween.x) - distanceBetween.x;
		
		for (var j = 0; j < rowsAliens; ++j )
		{
			var pos = { x: (this.width - rowWidth) / 2, y: 50 + j * (distanceBetween.y + alienSize.height) };
			for (var i = 0; i < countAliens; ++i)
			{
				var alien = new Alien({ x: pos.x, y: pos.y }, alienSize, alienSpeed, alienStrength,  this.callback("removeObject"));

				pos.x += alienSize.width + distanceBetween.x;
				this.addObject(alien);
			}
		}
	},

	initializeObstacles : function ()
	{
		var countObstacles = this.currentLevel.obstacles;
		var obstacleStrenght = this.currentLevel.obstacleStrength;
		var obstacleSize = { width: 50, height: 50 };

		var distanceBetween = { x: 70, y: 20 };
		var rowWidth = countObstacles * (obstacleSize.width + distanceBetween.x) - distanceBetween.x;

		var pos = { x: (this.width - rowWidth) / 2, y: (this.height - 200) + obstacleSize.height/2 };
		for (var i = 0; i < countObstacles; ++i)
		{
			
			var obstacle = new Obstacle({ x: pos.x, y: pos.y }, obstacleSize, obstacleStrenght);

			pos.x += obstacleSize.width + distanceBetween.x;
			this.addObject(obstacle);
		}
	},
	
	addObject : function (object)
	{
		this.objects.push(object);
	},
	
	removeObject : function (object)
	{
		if (object.length == 0)
			this.objects = [];

		for (var i in this.objects)
		{
			if (this.objects[i] == object)
			{
				if (this.objects[i] instanceof Alien)
					this.score += this.incrementScore;

				if (this.objects[i] instanceof Bullet)
					Bullet.activeBullets--;

				delete this.objects[i];
			}
		}
	},
	
	tick : function ()
	{
		var foundAlien = false;
		var foundInvader = false;
		var won = false;
		
		for (idx in this.objects)
		{
			if (this.objects[idx] instanceof Alien)
				foundAlien = true;

			if (this.objects[idx] instanceof Invader)
				foundInvader = true;
		}
		
		if (!foundAlien)
		{
			if (!foundInvader)
			{
				this.messageState.text = "Game over";
				this.messageState.size = "30px";
				this.messageState.show = true;
				this.messageState.timeMS = null;
				this.messageState.color = "#ff0000";

				this.nextLevel = false;
			}
			else
			{
				if (this.nextLevel && this.levelManager.hasNextLevel())
				{
					this.messageState.text = this.getRandomCompliment() +" Level " + this.levelManager.currentLevelNumber + " completed. Next level loading...";
					this.messageState.size = "20px";
					this.messageState.show = true;
					this.messageState.timeMS = 3000;
					this.messageState.color = "#FFFFFF";
				}
				else
				{
					this.messageState.text = this.getRandomCompliment() +" You won the game! You're a really badass player!";
					this.messageState.size = "20px";
					this.messageState.show = true;
					this.messageState.timeMS = null;
					this.messageState.color = "#FFFFFF";
				}
			}
		}


		this.animate();

		if (this.messageState.show)
			this.showMessage();
	},

	getRandomCompliment : function ()
	{
		/*
		var num = Math.floor((Math.random() * this.complimentsList.length));

		if (this.levelManager.currentLevelNumber != this.previousLevelNumber)
			return this.complimentsList[this.previousComplimentIdx];
		
		this.previousComplimentIdx = num;
		return this.complimentsList[num];
		*/

		return this.complimentsList[1];
		
	},

	showMessage : function ()
	{
		var that = this;
		if (this.messageState.timeMS && !this.myInterval)
		{
			this.myInterval = setInterval(function()
			{
				that.messageState.show = false;
				window.clearInterval(that.myInterval);
				that.myInterval = null;

				if (that.nextLevel)
				{
					that.objects = [];
					that.objects.push(that.invader);
					that.startNextLevel();
				}
			}, this.messageState.timeMS);
		}

		this.context.font = "bold "+ this.messageState.size +" sans-serif";
		this.context.fillStyle = this.messageState.color;
		this.context.textAlign = this.messageState.textAlign;
		this.context.fillText(this.messageState.text, this.width/2, this.height/2);

	},

	startNextLevel : function ()
	{
		this.levelManager.levelDone();

		this.currentLevel = this.levelManager.nextLevel();
		
		this.initalizeLevel();
	},
	
	animate : function ()
	{
		requestAnimationFrame(this.callback("tick"), this.canvas);

		this.update();
		this.draw();
	},

	update : function ()
	{
		var now = new Date().getTime() / 1000;
		if (this.lastUpdated) {
			var elapsed = now - this.lastUpdated;
			
			for (idx in this.objects)
			{
				if (this.objects[idx] instanceof Updatable) {
					if (this.objects[idx] instanceof Alien)
						this.objects[idx].update(now, elapsed, this.invader.pos);
					else
						this.objects[idx].update(now, elapsed);
				}
			}
		}
		this.lastUpdated = now;		
	},
	
	draw : function ()
	{
		this.context.fillStyle = "rgba(0, 0, 0, 1)"; // set canvas background color
		this.context.fillRect  (0, 0, this.width, this.height);  // now fill the canvas
		
		this.context.font = "bold 20px sans-serif";
		this.context.fillStyle = "rgba(255, 255, 255, 1)";
		this.context.textAlign = "right";
		this.context.fillText("Score: " + this.score, this.width-10, 40);

		this.context.font = "bold 20px sans-serif";
		this.context.fillStyle = "rgba(255, 255, 255, 1)";
		this.context.textAlign = "right";
		this.context.fillText("Level: " + this.levelManager.currentLevelNumber, this.width-10, 65);
		
		for (idx in this.objects)
		{
			this.objects[idx].draw(this.context);
		}

	},
	
	detectImpact : function (bullet)
	{
		for (idx in this.objects)
		{
			var gameObject = this.objects[idx];
			if (gameObject instanceof Alien || gameObject instanceof Obstacle )
			{
				if (gameObject.detectImpact(bullet.pos))
				{
					if (gameObject.health == 0)
					{
						
						this.removeObject(gameObject);
					}
					this.removeObject(bullet);
				}
			}
		}
	}
});

$.Model("GameObject", 
{

},
{
	init : function (object)
	{
	}

});


$.Model.List("GameObject.List", 
{

},
{


});