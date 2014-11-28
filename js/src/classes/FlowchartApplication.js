module.exports = (function(){

	//var Toolbar = require('./Toolbar.js');
	var Shape = require('./Shape.js');
	var Line = require('./Line.js');

	var shapes = [];
	var lines = [];
	var tempArray = [];
	
	function FlowchartApplication($el) {
		console.log('Making app....');

		this.$el = $el;
		this.tool = 'shape';
		

		/*this.$el.mousedown(this.clickHandler);
		this.$el.mouseup(function(event) {
			creating=false;
		});*/
		
		var shape;
		/*this.$el.click(function(e) { 
			shape = new Shape(e); 
			shape.addText();
			shapes.push(shape);
		});	*/
		this.$el.click(this.clickHandler);

	}
	FlowchartApplication.prototype.clickHandler = function(e){
		
		var shape = new Shape(e); 
		//shape.addText();
		shapes.push(shape);
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
		//this.tool = tool;
	};
	return FlowchartApplication;
})();