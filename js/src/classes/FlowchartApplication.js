module.exports = (function(){

	var Toolbar = require('./Toolbar.js');
	var Shape = require('./Shape.js');
	var Line = require('./Line.js');

	var shapes = [];
	var lines = [];
	var tempArray = [];
	var creatingLine = false;
	var point = [];

	paper.install(window);
	paper.setup('cnvs');

	
	function FlowchartApplication($el) {
		console.log('Making app....');

		this.$el = $el;
		this.tool = 'shape';
		this.toolbar = new Toolbar($el);

		var shape;
		this.$el.click(this.clickHandler);
		$('canvas').click(this.clickHandler);

	}
	FlowchartApplication.prototype.clickHandler = function(e){
		//will replace this with bean event later
		if($('.button').attr('value') == 'Shape Tool'){
			console.log('click');
			var shape = new Shape(e); 
			shapes.push(shape);
		}else{
				
			//create lines with canvas
			if(!creatingLine){
				console.log('first create Line');
				point = [e.offsetX,e.offsetY]
				var line = new Line(e);
				lines.push(line);

			}else{
				console.log('second create Line');
				var line = lines[lines.length-1];
				line.addCircle(e);
			}
			console.log(lines);
			creatingLine = !creatingLine;
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