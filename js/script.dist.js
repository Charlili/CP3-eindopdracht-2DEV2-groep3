(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(){
	console.log('Goed bezig Charlotte.');

	
	function init() {
		console.log('test');
		if(getParameterByName('page') != undefined && (getParameterByName('page') === 'overview' || getParameterByName('page') === 'group')){
			console.log('Time to make apps');
			var FlowchartApplication = require('./classes/FlowchartApplication.js');
			var flowchartApplication = new FlowchartApplication($('.app'));
		}
		//console.log(getParameterByName('page'));
		//login klik
		if(getParameterByName('page') == undefined || getParameterByName('page') === 'home' ){
			var login = document.querySelector('.login');
			login.addEventListener('click',clickHandlerLogin);
		}

		if(getParameterByName('page') === 'listgroups' ){
			var addgroup = document.querySelector('.addgroup');
			addgroup.addEventListener('click',clickHandlerAddgroup);
			var myform = document.getElementById('myform');
		}

		if(getParameterByName('page') === 'add' || getParameterByName('page') === 'overview'  ){
			//title live change
			$('#viewerchanger').keyup(function(){
				var str = $(this).val();
				$("#viewer").text(str);
			});

		}

		/*if(getParameterByName('page') == 'saveImage'){
			require('../vendor/phantomjs/bin/phantomjs');
			var system = require('system');
 
			// Web Address (URL) of the page to capture
			//var url  = system.args[1];
			 var url = "http://localhost/CPIII/CPIII_whiteboard/index.php?page=overview&id=35";
			 var page = 'testingThis' + '.png';
			// File name of the captured image
			//var file = system.args[2]  + ".png";
			 
			var page = require('webpage').create();
			 
			// Browser size - height and width in pixels
			// Change the viewport to 480x320 to emulate the iPhone
			page.viewportSize = { width: 1200, height : 800 };
			 
			// Set the User Agent String 
			// You can change it to iPad or Android for mobile screenshots
			page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5";
			 
			// Render the screenshot image
			page.open ( url, function ( status ) {
			  if ( status !== "success") {
			       console.log("Could not open web page : " + url);
			       phantom.exit();
			   } else {
			       window.setTimeout ( function() {
			          page.render(file);
			          console.log("Download the screenshot : " + file);
			          phantom.exit();
			       }, 1000);
			   }
			});
		}*/

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
	var id = 1;

	if($('#cnvs').length != 0){
		paper.install(window);
		paper.setup('cnvs');
	}

	
	function FlowchartApplication($el) {
		
		this.selected = 0;
		console.log('Making app....');

		this.$el = $el;
		this.tool = 'shape';
		this.toolbar = new Toolbar($el);
		this.shapeColor = '#bbb';
		this.textSize = '1.5em';
		
		var shape;
		this.$el.click(this.clickHandler.bind(this));
		if($('#cnvs').length != 0){
			var tool = new Tool();
			tool.onMouseDown = this.clickHandler.bind(this);
			tool.onMouseMove = this.hoverHandler.bind(this);
		}

		$('.save-flowchart').click(this.save);
		if(getParameterByName('id') != ''){
			$.get('index.php?page=loadFlowchart&id='+getParameterByName('id'),function(data){
				this.createFlowchart(data);
			}.bind(this));	
		}
		$('.add').click(this.sendInvite).bind(this);
		//bean.on(this.deleteButton, 'click', this.removeHandler.bind(this));
		bean.on(this.toolbar,'changeTool',this.changeTool.bind(this));
		bean.on(this.toolbar,'delete',this.deleteSelected.bind(this));
		bean.on(this.toolbar,'uploadFile',this.uploadFile.bind(this));
		bean.on(this.toolbar,'color',this.changeColor.bind(this));
		//bean.on(this.toolbar,'align',this.changeAlign.bind(this));
		//bean.on(this.toolbar,'size',this.changeSize.bind(this));

	}
	/*FlowchartApplication.prototype.changeSelected = function(obj){
		//change tool
		console.log('selecting');
		this.selected = obj;
		console.log(this.selected);
		//this.tool = tool;
	};*/
	FlowchartApplication.prototype.sendInvite = function(e){
		e.preventDefault();
		if($('.inputInvite').length == 0){
			
			var input = document.createElement('input');
			input.placeholder = "Enter an email to invite friends."
			input.classList.add('inputInvite');
			e.currentTarget.querySelector('p').innerText = 'Send invite';
			console.log(e.currentTarget.querySelector('p'));
			$(e.currentTarget).parent().append(input);
		}else{
			console.log($('.groupinfo h1').html());
			data = {'email' : $('.inputInvite').val(),
					'groupId' : getParameterByName('groupid'),
					'groupName' : $('.groupinfo h1').html()
				};

			$.post('index.php?page=sendInvite',data).success(function(){
				location.reload();

			});
		}


	}
	FlowchartApplication.prototype.uploadFile = function(files){
		console.log(files);
		var error = '';
		if(files.length > 0){
			
			var ratio = 1;
			var type= "text";
			var content = "";
			

			var file = files[0];
			var index = file.type.indexOf("/");
			if (index > 0){
			   type = file.type.substr(0, index);
			   console.log(type);
			}
			var url = URL.createObjectURL(file);

			if(file.type.search("image") == 0){

				var reader = new FileReader();
			    var image  = new Image();

			    reader.readAsDataURL(file);  
			    reader.onload = function(_file) {
			        image.src    = _file.target.result;              // url.createObjectURL(file);
			        image.onload = function() {
			            var w = this.width,
			                h = this.height,
			                t = file.type,                           // ext only: // file.type.split('/')[1],
			                n = file.name,
			                s = ~~(file.size/1024) +'KB';

			                ratio = w / h;
			                type = "image";
			                content = n;
							//console.log(ratio);
			            //$('#uploadPreview').append('<img src="'+ this.src +'"> '+w+'x'+h+' '+s+' '+t+' '+n+'<br>');
			        };
			        image.onerror= function() {
			        	error = 'Invalid file type.';
			            //alert('Invalid file type: '+ file.type);
			        };      
			    };

			}else if(file.type.search("video") == 0){
                type = "video";
			}else{
				console.log('Dit is geeeeeen afbeelding!!!');
				error = 'Invalid file type';
			}
			//console.log(error);
			var sourceFile = url;
			if(error == ''){
				//console.log('ok?');

				var data = new FormData();
			    data.append('SelectedFile', files[0]);

			    var request = new XMLHttpRequest();

				request.onreadystatechange = function(){
				    if(request.readyState == 4){
				        try {
				            var resp = JSON.parse(request.response);
				        } catch (e){
				            var resp = {
				                status: 'error',
				                data: request.responseText
				            };
				        }
				        sourceFile = $($(resp.data).get(0)).val();
				        console.log(sourceFile);
				        var shape = new Shape(undefined,id);
						shape.create(200,200,200,100,'black',type,sourceFile,ratio);
						this.selectHandler(shape);
						++id;
						shapes[id] = shape;
				        //var destFile = $($(resp.data).get(1)).val();
				        //console.log(destFile);
				    }
				}.bind(this);
				request.open('POST', 'index.php?page=uploadFile');
				request.send(data);
			}			

		}

	}
	FlowchartApplication.prototype.deleteSelected = function(){
		if(this.selected != 0){
			if(this.selected.type == 'shape'){
				console.log(this.selected);
				shapes.splice(this.selected.id, 1);
				
			}else if(this.selected.type == 'line'){
				lines.splice(this.selected.id, 1);
				
			}

			this.selected.deleteMe();
			this.selected = 0;
			console.log(this.selected);
		}
	}
	FlowchartApplication.prototype.changeTool = function(tool){
		//change tool
		console.log('tool tool tool');
		this.tool = tool.tool.toLowerCase();
		console.log(this.tool);
		/*if(this.tool == 'delete'){
			this.deleteSelected();
		}*/
	};
	FlowchartApplication.prototype.changeColor = function(color){
		console.log(color);
		switch(color){
			case 'groen':
			this.shapeColor = '#bbb';
			break;
			case 'geel':
			this.shapeColor = '#faf05b';
			break;
			case 'oranje':
			this.shapeColor = '#ff7153';
			break;
		}
		if(this.selected.type == 'shape'){
			console.log('shape color');
			this.selected.changeColor(this.shapeColor);
		}
		//this.shapeColor = '#bbb';
	}
	FlowchartApplication.prototype.createFlowchart = function(data){
		console.log(data);
		var shapesD = data.shapes;
		for(var i = 0; i < shapesD.length;i++){
			//if(shapesD[i] != undefined){
				var shape = new Shape(undefined,id);
				shape.create(shapesD[i].x,shapesD[i].y,shapesD[i].width,shapesD[i].height,shapesD[i].color,shapesD[i].type,shapesD[i].content);
				++id;
				//this.selectHandler(shape);
				bean.on(shape,'changeSelected',this.selectHandler.bind(this));
				//shape.makeSelected();
				shapes[id] = shape;
			//}
			
			//shapes.push(shape);
		}
		var linesD = data.lines;
		//var tool = new ToolEvent;
		//tool.point = [0,0];
		for(var i = 0; i < linesD.length;i++){
			//if(linesD[i] != undefined){
				var line = new Line(undefined,id);
				line.create(linesD[i].x1,linesD[i].y1,linesD[i].x2,linesD[i].y2,linesD[i].color);
				//lines.push(line);
				line.$c1.onMouseDrag = line.moveHandler.bind(line);
				line.$c2.onMouseDrag = line.moveHandler.bind(line);
				bean.on(line,'changeSelected',this.selectHandler.bind(this));
				//line.makeSelected();
				//this.selectHandler(line);
				lines[id] = line;
				++id;
			//}
		}
		view.update();
		


	}
	FlowchartApplication.prototype.selectHandler = function(obj){
		if(this.selected != 0){
			var currSelected = this.selected;
			currSelected.removeSelected();
		}
		this.selected = obj;
		obj.makeSelected();
	}
	FlowchartApplication.prototype.hoverHandler = function(e){
		if(project.hitTest(e.point) != null && this.tool == 'line'){
			$('canvas').css('cursor','move');	
		}else{
			$('canvas').css('cursor','copy');
		}
	}
	FlowchartApplication.prototype.clickHandler = function(e){
		//console.log(this);
		switch(this.tool){
			case 'select':
			break;
			case 'shape':
				console.log('click');
				var shape = new Shape(e,id);
				shape.changeColor(this.shapeColor); 
				shapes[id] = shape;
				++id;
				this.selectHandler(shape);
				bean.on(shape,'changeSelected',this.selectHandler.bind(this));
			break;
			case 'line':
				if(project.hitTest(e.point) == null){
					//$('canvas').css('cursor','copy');	
					//create lines with canvas
					if(!creatingLine){
						console.log('first create Line');
						//point = [e.offsetX,e.offsetY]
						var line = new Line(e,id);
						++id;
						lines[id] = line;
						
						//lines.push(line);
						line.$c1.onMouseDrag = line.moveHandler.bind(line);

					}else{
						console.log('second create Line');
						var line = lines[id];
						line.addCircle(e);
						line.$c2.onMouseDrag = line.moveHandler.bind(line);
						this.selectHandler(line);
						bean.on(line,'changeSelected',this.selectHandler.bind(this));
					}
					console.log(lines);
					creatingLine = !creatingLine;
				}
			break;
			case 'file':
			break;
			case 'delete':
			break;
		}
		
	};
	
	FlowchartApplication.prototype.save = function(event){
		event.preventDefault();
		//data doorsturen via eigen post
		//eigen var aanmaken, object dus {}
		var $shapes2 = [];
		for(var i =0;i<=id;i++){
		//$(shapes).each(function(id,shape){
			if(shapes[i] != undefined){
				var type = shapes[i].input.value;
				console.log(shapes[i].inputType);
				if(shapes[i].inputType != 'text'){
					var type = shapes[i].input.src;
				}
				$shapes2.push(
					{
						'x':parseInt(shapes[i].$el.css('left')),
						'y':parseInt(shapes[i].$el.css('top')),
						'width':parseInt(shapes[i].$el.css('width')),
						'height':parseInt(shapes[i].$el.css('height')),
						'type': shapes[i].inputType,
						'content':type,
						'color':shapes[i].shapeColor

					});
			}
		}
		var $lines2 = [];
		for(var j =0;j <= id+1;j++){
			if(lines[j] != undefined){
				$lines2.push(
					{
						'x1':lines[j].x1,
						'y1':lines[j].y1,
						'x2':lines[j].x2,
						'y2':lines[j].y2,
					});
			}
		}
		console.log($shapes2);
		console.log($lines2);
		var flowchartId = "";
		if(getParameterByName('id') != null){
			flowchartId = getParameterByName('id');
		}
		var groupId = "";
		if(getParameterByName('groupid') != null){
			groupId = getParameterByName('groupid');
		}

		var dataFlowchart = {
			'id': flowchartId,
			'groupId' : groupId,
			'name': $("#viewerchanger").val(),
			'shapes': $shapes2,
			'lines': $lines2
		};
		//TODO: error handling met .error: meegeven aan user dmv evt window alert?
		$.post('index.php?page=saveFlowchart',dataFlowchart)
		.success(function(data){
			//console.log('flowchartId = ' + flowchartId);
			console.log('posted');
			location.reload();
		});
		
		//console.log('Save it yo');
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
	
	function Line(event,id) {
		//var tool = new Tool();
		this.type = 'line';
		this.id = id;
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

		//this.$el;
		//console.log(this.$c1);
		//$('canvas').append(this.$c1);

	}
	Line.prototype.makeSelected = function(){
		this.selectBox = new Shape.Rectangle(this.$c1.position,this.$c2.position);
		this.selectBox.style = {
			strokeColor: 'rgba(0,0,0,.3)',
		    dashArray: [1, 2],
		    strokeWidth: 1,
		    opacity: .1
		}
		//bean.fire(this,'changeSelected',this);
	};
	Line.prototype.removeSelected = function(){
		this.selectBox.remove();
		view.update();
	}
	Line.prototype.deleteMe = function(){
		if(!this.$c2.isEmpty()){this.$c2.remove();}
		if(!this.$c1.isEmpty()){this.$c1.remove();}
		if(!this.$line.isEmpty()){this.$line.remove();}
		if(!this.selectBox.isEmpty()){this.selectBox.remove();}
		view.update();
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
		bean.fire(this,'changeSelected',this);
		this.selectBox.remove();
		this.selectBox = new Shape.Rectangle(this.$c1.position,this.$c2.position);
		this.selectBox.style = {
			strokeColor: 'rgba(0,0,0,.3)',
		    dashArray: [1, 2],
		    strokeWidth: 1,
		    opacity: .1
		}
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
	//var clicks = 0;


	function Shape(event, id) {
		console.log('creating shape');
		this.x = 100;
		this.y = 50;
		if(event != undefined){
			this.x = event.offsetX;
			this.y = event.offsetY;
		}
		this.type = 'shape';
		this.id = id;
		this.shapeColor = '#ddd';
		this.$el = $(document.createElement('div'));
		this.$el.css('top',this.y - 50 + 'px');
		this.$el.css('left',this.x - 100 + 'px');
		this.$el.addClass('shape');
		this.$el.addClass('draggable');

		this.input = document.createElement('textarea');
		this.inputType = 'text';
		this.$el.css('value', this.text);
		this.$el.append(this.input);
		//save input value
		this.text = this.value;
		
		

		this.$resizeBox = $(document.createElement('div'));
		this.$resizeBox.addClass('resizable');
		//this.$resizeBox.css('top','50px');
		//this.$resizeBox.css('left','150px');

		this.$el.append(this.$resizeBox);

		$('.app').append(this.$el);
		$('.shape').click(function(e) {
			e.stopPropagation();
		});

		

		this._mMoveHandler = this.mMoveHandler.bind(this);
		this._mUpHandler = this.mUpHandler.bind(this);
		this._mDownHandler = this.mDownHandler.bind(this);

		this.$el.mousedown(this._mDownHandler);

		this._rMoveHandler = this.rMoveHandler.bind(this);
		this._rUpHandler = this.rUpHandler.bind(this);
		this._rDownHandler = this.rDownHandler.bind(this);

		this.$resizeBox.mousedown(this._rDownHandler);

		this.clicks = 0;
		
		
		

	}
	Shape.prototype.create = function(x,y,width,height,color,type,content,ratio) {
		console.log('recreating shapes');
		this.x = x;
		this.y = y;
		this.$el.css('top',y + 'px');
		this.$el.css('left',x +'px');
		this.$el.css('width',width);
		this.$el.css('height',height);
		this.inputType = 'text';
		this.shapeColor = color;
		this.$el.css('background-color',color);
		//console.log(ratio);
		if(ratio == undefined){
			ratio = width/height;
		}
		
		switch(type){
			case 'image':
				this.input.remove();
				this.input = document.createElement('img');
				this.inputType = type;
				this.input.style.width = '200px';
				//console.log(ratio);
				this.input.style.height = 200 * ratio + 'px';
				this.$el.css('height',200 * ratio + 'px');
				this.input.src = content;
				this.$el.prepend(this.input);
			break;
			case 'video':
				this.input.remove();
				this.input = document.createElement('video');
				this.input.style.width = '200px';
				this.input.style.height = '113px';

				this.$el.css('height','113px');
				this.inputType = type;
				this.input.src = content;
				console.log($('video').innerHeight());
				this.$el.prepend(this.input);
				this.input.play();
			break;
			case 'text':
				//this.input = document.createElement('textarea');
				this.input.innerText = content;
			break;
		}
		//this.$el.css('value', this.text);
		//this.$el.append(this.input);
		//save input value
		

	};
	Shape.prototype.rDownHandler = function(event){

		this.removeSelected();
		this.makeSelected();
		
		//console.log('down on the scaler');
		this.offsetX = event.pageX;
		this.offsetY = event.pageY;

		this.width = parseInt(this.$el.css('width'));
		this.height = parseInt(this.$el.css('height'));
		window.addEventListener('mousemove',this._rMoveHandler);
		window.addEventListener('mouseup',this._rUpHandler);
		event.stopPropagation();		
	};
	Shape.prototype.rMoveHandler = function(event){

		width = event.pageX - this.offsetX;
		this.$el.css('width',this.width + width + 'px');
		height = event.pageY - this.offsetY;
		this.$el.css('height',this.height + height + 'px');
		this.$resizeBox.css('right',-parseInt(this.$el.css('width')) + 7 + 'px');
		
	};
	Shape.prototype.rUpHandler = function(event){
		window.removeEventListener('mousemove',this._rMoveHandler);
		window.removeEventListener('mouseup',this._rUpHandler);

	};
	Shape.prototype.mDownHandler = function(event){
		bean.fire(this,'changeSelected',this);
		//this.removeSelected();
		//this.makeSelected();
		//console.log(this)
		//console.log('down on the mover');
		this.offsetX = event.pageX;
		this.offsetY = event.pageY;
		this.left = parseInt(this.$el.css('left'));
		this.top = parseInt(this.$el.css('top'));
		this.clicks++;
		this.$el.css('z-index', this.clicks);
		window.addEventListener('mousemove',this._mMoveHandler);
		window.addEventListener('mouseup',this._mUpHandler);
				
	};
	Shape.prototype.mMoveHandler = function(event){
		//console.log(parseInt(this.$el.css("width")));
		this.x = event.pageX - this.offsetX + this.left;
		this.$el.css('left',this.x + 'px');
		this.y = event.pageY - this.offsetY + this.top;
		this.$el.css('top',this.y + 'px');
		
	};
	Shape.prototype.mUpHandler = function(event){
		window.removeEventListener('mousemove',this._mMoveHandler);
		window.removeEventListener('mouseup',this._mUpHandler);
		//console.log('up');
	};
	Shape.prototype.makeSelected = function(){
		this.$el.addClass('selected');
		//bean.fire(this,'changeSelected',this);
	}
	Shape.prototype.changeColor = function(color){
		console.log('at shape to change color');
		this.shapeColor = color;
		this.$el.css('background-color',color);

		//bean.fire(this,'changeSelected',this);
	}
	Shape.prototype.removeSelected = function(){
		if($('.selected').length != 0){
			$('.selected').removeClass('selected');
		}
	}
	Shape.prototype.deleteMe = function(){
		this.$el.remove();
	}
	
	/*Shape.prototype.changeSize = function(event){
		this.$el.css('width',event.offsetX);
		this.$el.css('height',event.offsetY);

	};*/
	Shape.prototype.addText = function(){
		//add event listener for when input loses focus:
		
	};
	Shape.prototype.hoverHandler = function(e){
		//show move and scale tool

		//add click listener for move and scale thingy.


	};
	Shape.prototype.moveHandler = function(e){
		//event handler for mouseMove
		console.log(this);
		//move to new position	
		this.x = offset.x;
		this.y = offset.y;	
		//update shape?
		this.$el.css('top',this.y + 'px');
		this.$el.css('left',this.x +'px');

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

		//bean.fire(this, 'remove', this);
		//bean.fire(this,'create-item',this.input.value);
		//make 2 buttons
		//handlebars gebruiken maar is overkill momenteel. :)

		this.$elToolbar = $('<div class="toolbar" value="Shape Tool">');
		this.$elShape = $('<input type="button" class="button2" id="Shape"/>');
		this.$elLine = $('<input type="button" class="button2" id="Line"/>');
		this.$elFile = $('<form id="uploadWrapper" enctype="multipart/form-data" action="index.php?page=uploadFile"><input type="file" class="button2" id="File"/></div>');
		this.$elDelete = $('<a class="button2" id="Delete"/>');

		this.$elColor = $('<div class="changeColor">');
		this.$elColorUl = $('<ul class="dropdown">');
		this.$elColorOptions = 
		$('<li><div id="groen"></li>' + '<li><div id="geel"></li>' + '<li><div id="oranje"></li>');
		
		/*this.$elSize = $('<div class="changeSize">');
		this.$elSizeUl = $('<ul class="dropdown">');
		this.$elSizeOptions = $('<a href="#"><li>S</li></a>' + '<a href="#"><li>M</li></a>' + '<a href="#"><li>L</li></a>');

		this.$elAlign = $('<div class="changeAlign">');
		this.$elAlignUl = $('<ul class="dropdown">');
		this.$elAlignOptions = $('<li><div id="left"></li>' + '<li><div id="right"></li>' + '<li><div id="center"></li>');
		*/
		this.$elColorUl.append(this.$elColorOptions);
		this.$elColor.append(this.$elColorUl);

		/*this.$elSizeUl.append(this.$elSizeOptions);
		this.$elSize.append(this.$elSizeUl);

		this.$elAlignUl.append(this.$elAlignOptions);
		this.$elAlign.append(this.$elAlignUl);
		*/

		this.$elToolbar.append(this.$elSelect, this.$elShape, this.$elLine, this.$elFile, this.$elDelete, this.$elColor/*, this.$elSize, this.$elAlign*/);
		
		$el.parent().prepend(this.$elToolbar);

		//this.$elShape.click(this.changeTool);
		//this.$elDelete.click(this.changeTool);
		//addEventListener for button: changeTool
		//bean.on($('.toolbar input'), 'click', this.changeTool);
		//$('.toolbar input').click(this.changeTool.bind(this));			
		//this.$elToolbar.click(this.changeTool);
		//addEventListener for button: changeTool

		$('.changeColor div').click(this.changeColor.bind(this));
		//$('.changeSize div').click(this.changeSize);
		//$('.changeAlign div').click(this.changeAlign);
		//this.$elAlign.click(this.dropTool);			
		//this.$elSize.click(this.dropTool);			
		this.$elColor.click(this.dropTool);			
		$('.toolbar input[type="button"]').click(this.changeTool.bind(this));	
		this.$elDelete.click(this.deleteTool.bind(this));
		$('#File').change(function(){
			bean.fire(this, 'uploadFile', event.target.files);
		}.bind(this));

		this.$elShape.css('background', "url('images/shape_hover.jpg')");			
	}
	Toolbar.prototype.deleteTool = function(e){
		bean.fire(this, 'delete', this);
	}
	Toolbar.prototype.fileTool = function(e){
		bean.fire(this, 'delete', this);
	}
	Toolbar.prototype.changeColor = function(e){
		console.log('changing color to '+e.currentTarget.getAttribute('id'));
		bean.fire(this, 'color', e.currentTarget.getAttribute('id'));
	}
	/*Toolbar.prototype.changeSize = function(e){
		bean.fire(this, 'size', e.currentTarget.innerText());
	}
	Toolbar.prototype.changeAlign = function(e){
		bean.fire(this, 'align', e.currentTarget.getAttribute('id'));
	}*/
	Toolbar.prototype.changeTool = function(e){
		e.stopPropagation();
		console.log('clicking '+e.currentTarget.getAttribute('id') + ' button');
		this.tool = e.currentTarget.getAttribute('id').toLowerCase();
		switch(this.tool){
			case 'line':
				this.$elLine.css('background', "url('images/line_hover.jpg')");
				this.$elShape.css('background', "url('images/shape.jpg')");
				$('canvas').css('pointer-events', 'auto');
			break;
			case 'shape':
				$('canvas').css('pointer-events', 'none');
				this.$elLine.css('background', "url('images/line.jpg')");
				this.$elShape.css('background', "url('images/shape_hover.jpg')");
			break;
			case 'file':
				$('canvas').css('pointer-events', 'none');
				this.$elLine.css('background', "url('images/line.jpg')");
				this.$elShape.css('background', "url('images/shape_hover.jpg')");
			break;
		}
		bean.fire(this, 'changeTool', this);
		
	};

	Toolbar.prototype.dropTool = function(e){
		this.drop = e.currentTarget.querySelector('ul').classList.toggle('open');
	}
	
	return Toolbar;
})();
},{}]},{},[1])


//# sourceMappingURL=script.dist.js.map