module.exports = (function(){

	var Toolbar = require('./Toolbar.js');
	var Shape = require('./Shape.js');
	var Line = require('./Line.js');

	var shapes = [];
	var lines = [];
	var tempArray = [];
	
	function FlowchartApplication($el) {
		console.log('Making app....');

		this.$el = $el;
		this.tool = 'shape';
		this.toolbar = new Toolbar($el);

		var shape;
		this.$el.click(this.clickHandler);

	}
	FlowchartApplication.prototype.clickHandler = function(e){
		//will replace this with bean event later
		if($('.button').attr('value') == 'Draw Shapes'){
			var shape = new Shape(e); 
			shapes.push(shape);
		}else{
			//create lines with canvas
			var line = new Line(e); 
			lines.push(line);
		}
		
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