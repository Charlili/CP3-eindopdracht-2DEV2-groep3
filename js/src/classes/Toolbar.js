module.exports = (function(){

	var shapeTool = true;
	function Toolbar($el) {

		//bean.fire(this, 'remove', this);
		//bean.fire(this,'create-item',this.input.value);
		//make 2 buttons
		//handlebars gebruiken maar is overkill momenteel. :)

		this.$elToolbar = $('<div class="toolbar" value="Shape Tool">');
		this.$elSelect = $('<input type="button" class="active" id="Select"/>');
		this.$elSelect = $('<input type="button" class=" active" id="Select"/>');
		this.$elShape = $('<input type="button" class="button2 active" id="Shape"/>');
		this.$elLine = $('<input type="button" class="button2" id="Line"/>');
		this.$elFile = $('<form id="uploadWrapper" enctype="multipart/form-data" action="index.php?page=uploadFile"><input type="file" class="button2" id="File"/></div>');
		this.$elDelete = $('<a class="button2" id="Delete"/>');

		this.$elColor = $('<div class="changeColor">');
		this.$elColorUl = $('<ul class="dropdown">');
		this.$elColorOptions = 
		$('<li><div id="groen"></li>' + '<li><div id="geel"></li>' + '<li><div id="oranje"></li>');
		
		this.$elSize = $('<div class="changeSize">');
		this.$elSizeUl = $('<ul class="dropdown">');
		this.$elSizeOptions = $('<a href="#"><li>S</li></a>' + '<a href="#"><li>M</li></a>' + '<a href="#"><li>L</li></a>');

		this.$elAlign = $('<div class="changeAlign">');
		this.$elAlignUl = $('<ul class="dropdown">');
		this.$elAlignOptions = $('<li><div id="left"></li>' + '<li><div id="right"></li>' + '<li><div id="center"></li>');

		this.$elColorUl.append(this.$elColorOptions);
		this.$elColor.append(this.$elColorUl);

		this.$elSizeUl.append(this.$elSizeOptions);
		this.$elSize.append(this.$elSizeUl);

		this.$elAlignUl.append(this.$elAlignOptions);
		this.$elAlign.append(this.$elAlignUl);

		this.$elToolbar.append(this.$elSelect, this.$elShape, this.$elLine, this.$elFile, this.$elDelete, this.$elColor, this.$elSize, this.$elAlign);
		
		$el.parent().prepend(this.$elToolbar);

		//this.$elShape.click(this.changeTool);
		//this.$elDelete.click(this.changeTool);
		//addEventListener for button: changeTool
		//bean.on($('.toolbar input'), 'click', this.changeTool);
		//$('.toolbar input').click(this.changeTool.bind(this));			
		//this.$elToolbar.click(this.changeTool);
		//addEventListener for button: changeTool

		this.$elAlign.click(this.dropTool);			
		this.$elSize.click(this.dropTool);			
		this.$elColor.click(this.dropTool);			
		$('.toolbar input[type="button"]').click(this.changeTool.bind(this));	
		this.$elDelete.click(this.deleteTool.bind(this));
		$('#File').change(function(){
			bean.fire(this, 'uploadFile', event.target.files);
		}.bind(this));			
	}
	Toolbar.prototype.deleteTool = function(e){
		bean.fire(this, 'delete', this);
	}
	Toolbar.prototype.fileTool = function(e){
		bean.fire(this, 'delete', this);
	}
	Toolbar.prototype.changeTool = function(e){
		e.stopPropagation();
		console.log('clicking '+e.currentTarget.getAttribute('id') + ' button');
		this.tool = e.currentTarget.getAttribute('id').toLowerCase();
		if(this.tool === 'line'){
			//$('canvas').css('z-index','0');
			//$('.app').css('z-index','-1');
			$('canvas').css('pointer-events', 'auto');
		}else{
			$('canvas').css('pointer-events', 'none');
			//$('canvas').css('z-index','-1');
			//$('.app').css('z-index','0');
		}
		bean.fire(this, 'changeTool', this);
		//console.log(this);
		// switch between makeShape or makeLine tool
		/*shapeTool = !shapeTool;
		if(shapeTool){
			this.value = 'Shape Tool';
			$('canvas').css('z-index','-1');
			$('.app').css('z-index','0');

		}else{
			this.value = 'Line Tool';
			$('canvas').css('z-index','0');
			$('.app').css('z-index','-1');
		}*/
		//use bean.fire to communicate this change to FlowchartApplication

	};

	Toolbar.prototype.dropTool = function(e){
		this.drop = e.currentTarget.querySelector('ul').classList.toggle('open');
	}
	
	return Toolbar;
})();