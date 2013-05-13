$.Class.extend('LevelManager',
{
},
{
	levelList : [],
	currentLevelNumber : 1,

	init : function ()
	{

	},

	addLevel : function (levelInfo)
	{
		this.levelList.push(levelInfo);
	},

	addLevels : function (levelArray)
	{
		this.levelList = levelArray;
	},

	levelDone : function ()
	{
		this.levelList[this.currentLevelNumber-1].done = true;
		this.currentLevelNumber += 1;
	},

	nextLevel : function ()
	{
		return this.levelList[this.currentLevelNumber-1];
	},

	hasNextLevel : function ()
	{
		return this.levelList[this.currentLevelNumber] ? true : false;
	}

});