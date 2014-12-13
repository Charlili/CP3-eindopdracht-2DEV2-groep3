(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
	console.log('Goed bezig Charlotte.');

	//
	function init() {
		console.log('test');
		if(getParameterByName('page') != null && (getParameterByName('page') === 'overview' || getParameterByName('page') === 'group')){
			console.log('Time to make apps');
			var FlowchartApplication = require('./classes/FlowchartApplication.js');
			var flowchartApplication = new FlowchartApplication($('.app'));
		}
		//console.log(getParameterByName('page'));
		//login klik
		if(getParameterByName('page') == '' || getParameterByName('page') === 'home' ){
			var login = document.querySelector('.login');
			login.addEventListener('click',clickHandlerLogin);
		}

		if(getParameterByName('page') == '' || getParameterByName('page') === 'listgroups' ){
			var addgroup = document.querySelector('.addgroup');
			addgroup.addEventListener('click',clickHandlerAddgroup);
			var myform = document.getElementById('myform');
		}

		if(getParameterByName('page') == '' || getParameterByName('page') === 'add' || getParameterByName('page') === 'overview'  ){
			//title live change
			$('#viewerchanger').keyup(function(){
				var str = $(this).val();
				$("#viewer").text(str);
			});

		}

	}

	function clickHandlerLogin(){
		event.preventDefault();
		console.log(this);
		var loginform = document.querySelector('.hidden');
		loginform.classList.toggle('open');
	}

	function clickHandlerAddgroup(){
		event.preventDefault();
		var searchgroup = document.querySelector('.searchgroup');
		searchgroup.classList.toggle('test');
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
		var tool = new Tool();
		console.log('Making app....');

		this.$el = $el;
		this.tool = 'shape';
		this.toolbar = new Toolbar($el);

		var shape;
		this.$el.click(this.clickHandler);
		tool.onMouseDown = this.clickHandler;

		$('.save-flowchart').click(this.save);
		if(getParameterByName('id') != ''){
			$.get('index.php?page=loadFlowchart&id='+getParameterByName('id'),function(data){
				this.createFlowchart(data);
			}.bind(this));	
		}
		

	}
	FlowchartApplication.prototype.createFlowchart = function(data){
		console.log(data);
		var shapes = data.shapes;
		for(var i = 0; i < shapes.length;i++){
			var shape = new Shape();
			shape.create(shapes[i].x,shapes[i].y,shapes[i].width,shapes[i].height,shapes[i].color,shapes[i].type,shapes[i].content);
			//shapes.push(shape);
		}
		var lines = data.lines;
		var tool = new ToolEvent;
		tool.point = [0,0];
		for(var i = 0; i < lines.length;i++){

			var line = new Line();
			line.create(lines[i].x1,lines[i].y1,lines[i].x2,lines[i].y2,lines[i].color);
			//lines.push(line);
			line.$c1.onMouseDrag = line.moveHandler.bind(line);
			line.$c2.onMouseDrag = line.moveHandler.bind(line);
		}
		


	}
	FlowchartApplication.prototype.clickHandler = function(e){
		//will replace this with bean event later
		if($('.button').attr('value') == 'Shape Tool'){
			console.log('click');
			var shape = new Shape(e); 
			shapes.push(shape);

		}else{
			if(project.hitTest(e.point) == null){	
				//create lines with canvas
				if(!creatingLine){
					console.log('first create Line');
					//point = [e.offsetX,e.offsetY]
					var line = new Line(e);
					lines.push(line);
					line.$c1.onMouseDrag = line.moveHandler.bind(line);

				}else{
					console.log('second create Line');
					var line = lines[lines.length-1];
					line.addCircle(e);
					line.$c2.onMouseDrag = line.moveHandler.bind(line);
				}
				console.log(lines);
				creatingLine = !creatingLine;
			}
		}
		
		//make Shape or Line, depending on this.tool
		//while get x,y coordinates from release click
	};
	
	FlowchartApplication.prototype.save = function(event){
		event.preventDefault();
		//data doorsturen via eigen post
		//eigen var aanmaken, object dus {}
		var $shapes2 = [];
		$(shapes).each(function(id,shape){
			$shapes2.push(
				{
					'x':shape.input.parentNode.style.left,
					'y':shape.input.parentNode.style.top,
					'width':shape.input.parentNode.style.width,
					'height':shape.input.parentNode.style.height,
					'type':'text',
					'content':shape.input.value

				});
		});
		
		var $lines2 = [];
		$(lines).each(function(id,line){
			$lines2.push(
				{
					'x1':line.x1,
					'y1':line.y1,
					'x2':line.x2,
					'y2':line.y2,
				});
		});
		
		var dataFlowchart = {
			'name': $("#viewerchanger").val(),
			'shapes': $shapes2,
			'lines': $lines2
		};

		$.post('index.php?page=saveFlowchart',dataFlowchart)
		.success(function(data){
			console.log('posted');
		});
		
		console.log('Save it yo');
};
	FlowchartApplication.prototype.changeTool = function(tool){
		//change tool
		//this.tool = tool;
	};
	function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
	return FlowchartApplication;
})();
},{"./Line.js":3,"./Shape.js":4,"./Toolbar.js":5}],3:[function(require,module,exports){
module.exports = (function(){
	
	function Line(event) {
		//var tool = new Tool();
		this.x1 = 0;
		this.y1 = 0;
		if(event != undefined){
			this.x1 = event.point.x;
			this.y1 = event.point.y;

		}
		//create first circle, this.c1 & this.c2
		console.log('creating first circle');
	
		this.$c1 = new Shape.Circle([this.x1,this.y1], 5);
		this.$c1.fillColor = 'black';

		
		//console.log(this.$c1);
		//$('canvas').append(this.$c1);

	}
	Line.prototype.create = function(x1,y1,x2,y2,color) {

		console.log('creating first circle');
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.$c2 = new Shape.Circle([x2,y2], 5);
		this.$c1.position = [x1,y1];
		this.$c2.position = [x2,y2];
		this.$line = new Path.Line(this.$c1.position,this.$c2.position);
		this.$line.strokeColor = 'black';
		this.$line.strokeWidth = 2;
		this.$c1.fillColor = 'black';
		this.$c2.fillColor = 'black';

	};
	Line.prototype.addCircle = function(event){
		//add 2nd circle
		
		this.$c2 = new Shape.Circle(event.point, 5);
		this.$c2.fillColor = 'black';
		this.x2 = event.point.x;
		this.y2 = event.point.y;

		//draw line between the two circles
		this.$line = new Path.Line([this.x1,this.y1], [this.x2,this.y2]);
		this.$line.strokeColor = 'black';
		this.$line.strokeWidth = 2;
		//console.log(this);



		//$('canvas').append(this.$c2);
		//$('canvas').append(this.$line);
		//save input value
		//this.text = this.value;
	};
	Line.prototype.hoverHandler = function(e){
		//show move and scale tool

		//add click listener for move and scale thingy.


	};
	Line.prototype.moveHandler = function(e){
		//e.stopPropagation();
		console.log('draggin');
		//console.log(this);
		//console.log(e.target);
		if(e.target == this.$c1){
			//console.log(this.$c2.position);
			this.$line.remove();
			this.$line = new Path.Line(e.point,this.$c2.position);
		}else if(e.target == this.$c2){
			this.$line.remove();
			this.$line = new Path.Line(this.$c1.position,e.point);
		}
		this.$line.strokeColor = 'black';
		this.$line.strokeWidth = 2;
		e.target.position = e.point;
		//this.position = e.point;
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


	function Shape(event) {
		console.log('creating shape');
		this.x = 100;
		this.y = 50;
		if(event != undefined){
			this.x = event.offsetX;
			this.y = event.offsetY;
		}
		this.$el = $(document.createElement('div'));
		this.$el.css('top',this.y - 50 + 'px');
		this.$el.css('left',this.x - 100 + 'px');
		this.$el.css('width',200);
		this.$el.css('height',100);
		this.$el.addClass('shape');
		this.$el.addClass('draggable');

		this.input = document.createElement('textarea');
		this.input.type = 'text';
		this.$el.css('value', this.text);
		this.$el.append(this.input);
		//save input value
		this.text = this.value;
		
		$('.app').append(this.$el);
		$('.shape').click(function(e) {
			e.stopPropagation();
		});
		$('.draggable').draggable().resizable({ autoHide: false, handles: "se" });
		
		

	}
	Shape.prototype.create = function(x,y,width,height,color,type,content) {
		console.log('recreating shape');
		this.x = x;
		this.y = y;
		this.$el.css('top',y + 'px');
		this.$el.css('left',x +'px');
		this.$el.css('width',width);
		this.$el.css('height',height);
		
		this.$el.addClass('draggable');

		this.input.type = 'text';
		this.text = content;
		this.input.innerText = content;
		this.type = type;
		this.$el.css('value', this.text);
		this.$el.append(this.input);
		//save input value
		

	};
	/*Shape.prototype.changeSize = function(event){
		this.$el.css('width',event.offsetX);
		this.$el.css('height',event.offsetY);

	};*/
	Shape.prototype.remove = function(){
		this.square.remove();

	};
	Shape.prototype.addText = function(){
		//add event listener for when input loses focus:
		
	};
	Shape.prototype.hoverHandler = function(e){
		//show move and scale tool

		//add click listener for move and scale thingy.


	};
	Shape.prototype.moveHandler = function(e){
		//event handler for mouseMove
		//console.log(this);
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
},{}],5:[function(require,module,exports){
module.exports = (function(){

	var shapeTool = true;
	function Toolbar($el) {
		//make 2 buttons
		this.$el = $('<input type="button" class="button" value="Shape Tool" />');
		
		$el.append(this.$el);
		this.$el.click(this.changeTool);
		//addEventListener for button: changeTool			
	}
	Toolbar.prototype.changeTool = function(e){
		e.stopPropagation();
		console.log('clicking tha button');
		// switch between makeShape or makeLine tool
		shapeTool = !shapeTool;
		if(shapeTool){
			this.value = 'Shape Tool';
			$('canvas').css('z-index','-1');
			$('.app').css('z-index','0');

		}else{
			this.value = 'Line Tool';
			$('canvas').css('z-index','0');
			$('.app').css('z-index','-1');
		}
		//use bean.fire to communicate this change to FlowchartApplication

	};
	
	return Toolbar;
})();
},{}]},{},[1])


//# sourceMappingURL=script.dist.js.map