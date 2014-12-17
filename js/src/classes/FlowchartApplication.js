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
			//location.reload();
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