module.exports = (function(){

	var Toolbar = require('./Toolbar.js');
	var Shape = require('./Shape.js');
	var Line = require('./Line.js');
	
	function FlowchartApplication($el) {
		this.$el = $el;
		this.tool = 'shape';
		//array of all shapes used in flowchart app
		this.shapes = array();
		//array of all lines used in flowchart app
		this.lines = array();
		//initialize paper.js

		//create toolbar and add to the canvas

		//add event handler for click-drag function

		//listen to bean.on om this.tool aan te passen


		
	}
	//example function
	/*FlowchartApplication.prototype.example = function(){
		return example;
	};*/
	FlowchartApplication.prototype.clickHandler = function(e){
		//get x,y coordinates from start of click

		//add event handler for drag event?

		//make Shape or Line, depending on this.tool
		//while get x,y coordinates from release click
	};
	FlowchartApplication.prototype.save = function(){
		//check if user is logged in with $_SESSION['user']

		//if logged in: save shapes, lines, flowchart to database

		//if not logged in: register popup (when registered, automatic login.)
	};
	FlowchartApplication.prototype.changeTool = function(tool){
		//change tool
		this.tool = tool;
	};
	return FlowchartApplication;
})();