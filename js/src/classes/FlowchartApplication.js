module.exports = (function(){

	//var Toolbar = require('./Toolbar.js');
	var Shape = require('./Shape.js');
	var Line = require('./Line.js');

	paper.install(window);
	paper.setup('cnvs');
	var shapes = [];
	var lines = [];
	var tool = new Tool();
	var creating = false;
	var tempArray = [];
	
	function FlowchartApplication($el) {
		console.log('Making app....');

		this.$el = $el;
		this.tool = 'shape';
		//this.$el.mousedown(this.clickHandler).bind(this);

		//this.$el.mousedown(this.mouseDownHandler).bind(this);
		//create toolbar and add to the canvas
		//this.$toolbar = new Toolbar();
		
		// Define a mousedown and mousedrag handler
		
	}
	tool.onMouseDrag = function(event){
		console.log('downdown ');
		var shape = new Shape(event,true);
		tempArray.push(shape);
		creating = true;
	};
	tool.onMouseUp = function(event){
		//console.log(tempArray);
		$(tempArray).each(function(index,temp){
			temp.remove(this);
		});
		var shape = new Shape(event,false);
		creating = false;
	};
	FlowchartApplication.prototype.clickHandler = function(e){
		console.log('down');
		
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