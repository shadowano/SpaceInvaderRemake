$.Class.extend('LevelGenerator',
{
},
{
	levels : [],

	init : function ()
	{
		this.generate();
	},

	generate : function ()
	{
		// aliens, alienRows, alienSpeed, alienStrength, invaderBulletCount, obstacles, obstacleStrength
		
		this.levels.push(new LevelInfo(10, 1, 10, 1, 1, 0, 0));
		this.levels.push(new LevelInfo(10, 1, 20, 1, 1, 0, 0));
		this.levels.push(new LevelInfo(10, 1, 10, 1, 1, 5, 5));
		this.levels.push(new LevelInfo(10, 1, 25, 1, 3, 0, 0));
		this.levels.push(new LevelInfo(10, 2, 20, 1, 1, 0, 0));
		this.levels.push(new LevelInfo(10, 2, 10, 1, 1, 4, 5));
		this.levels.push(new LevelInfo(10, 2, 25, 1, 1, 0, 0));
		this.levels.push(new LevelInfo(10, 1, 20, 2, 1, 0, 0));
		this.levels.push(new LevelInfo(10, 3, 20, 1, 3, 0, 0));
		this.levels.push(new LevelInfo(10, 3, 20, 1, 3, 5, 10));
		this.levels.push(new LevelInfo(10, 3, 30, 3, 5, 0, 0));
	},

	getLevels : function ()
	{
		return this.levels;
	}

});




$.Class.extend('LevelInfo',
{
},
{
	aliens : 10,
	alienRows : 1,
	alienSpeed : 10,
	alienStrength : 1,
	invaderBulletCount : 1,
	obstacles : 0,
	obstacleStrength: 50,

	init : function (aliens, alienRows, alienSpeed, alienStrength, invaderBulletCount, obstacles, obstacleStrength)
	{
		this.aliens = aliens;
		this.alienRows = alienRows;
		this.alienSpeed = alienSpeed;
		this.alienStrength = alienStrength;

		this.invaderBulletCount = invaderBulletCount;

		this.obstacles = obstacles;		
		this.obstacleStrength = obstacleStrength;
	}

});