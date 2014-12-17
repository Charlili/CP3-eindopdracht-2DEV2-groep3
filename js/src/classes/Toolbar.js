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