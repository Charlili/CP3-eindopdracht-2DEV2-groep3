(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
	console.log('Goed bezig Charlotte.');

	//
	function init() {
		console.log('test');
		if(getParameterByName('page') != null && (getParameterByName('page') === 'overview' || getParameterByName('page') === 'group')){
			console.log('Time to make apps');
			var FlowchartApplication = require('./classes/FlowchartApplication.js');
			var flowchartApplication = new FlowchartApplication($('canvas'));
		}
	}
	init();

	//function to get $_GET values
	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
})();
},{"./classes/FlowchartApplication.js":2}],2:[function(require,module,exports){
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
},{"./Line.js":3,"./Shape.js":4}],3:[function(require,module,exports){
module.exports = (function(){

	function Line(event) {
		
		//create 2 circles, this.c1 & this.c2
		//create line

		//add event listener for clicking on the c1, c2: moveHandler	
	}
	Line.prototype.addText = function(){
		//add event listener for when input loses focus:

		//save input value
		//this.text = this.value;
	};
	Line.prototype.hoverHandler = function(e){
		//show move and scale tool

		//add click listener for move and scale thingy.


	};
	Line.prototype.moveHandler = function(e){
		//is currentTarget c1 or c2?

		//event handler for mouseMove

		//move to new position
		//if currentTarget c1:	
		//this.x1 = offset.x;
		//this.y1 = offset.y;	
		//else if currentTarget c2:
		//this.x2 = offset.x;
		//this.y2 = offset.y;	

		//update line?
	};
	
	return Line;
})();
},{}],4:[function(require,module,exports){
module.exports = (function(){
	var size = [];


	function Shape(event,temp) {
		//this.$el = $(document.createElement('input'));
		
		this.bTemp = temp;
		//this.$el.addClass('shape');
		//this.$el.css('value', this.text);

		this.square = new Path.Rectangle(event.downPoint,event.point);
		this.square.opacity = '1';
		this.square.fillColor = 'white';
		if(!temp){
			this.square.opacity = 0.4;
			this.square.fillColor = 'black';
			this.textShape = new PointText({
				point: this.square.point,
				bounds: this.square.bounds,
				content: 'THIS IS CONTENT',
				fillColor: 'black',
				fontFamily: 'Courier New',
			    fontWeight: 'normal',
			    fontSize: 12
			});
		}

	}
	function onMouseDown(event){
		console.log('down 2');
	}
	Shape.prototype.changeSize = function(event){
		this.square('width',event.point);

	};
	Shape.prototype.remove = function(){
		this.square.remove();

	};
	Shape.prototype.addText = function(){
		//add event listener for when input loses focus:

		//save input value
		this.text = this.value;
	};
	Shape.prototype.hoverHandler = function(e){
		//show move and scale tool

		//add click listener for move and scale thingy.


	};
	Shape.prototype.moveHandler = function(e){
		//event handler for mouseMove

		//move to new position	
		this.x = offset.x;
		this.y = offset.y;	

		//update shape?
	};
	Shape.prototype.scaleHandler = function(e){
		//event handler for mouseMove
		//scale to new position
		this.width = offset.x;
		this.height = offset.y;	

		//update shape?	
	};
	/* //example function
	Shape.prototype.removeHandler = function(){
		console.log('trying to delete the mutherfucker');
		bean.fire(this, 'remove', this);
	}; */
	
	return Shape;
})();
},{}]},{},[1])


//# sourceMappingURL=script.dist.js.map