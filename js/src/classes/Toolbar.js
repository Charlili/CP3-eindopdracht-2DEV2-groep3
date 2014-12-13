module.exports = (function(){

	var shapeTool = true;
	function Toolbar($el) {

		//bean.fire(this, 'remove', this);
		//bean.fire(this,'create-item',this.input.value);
		//make 2 buttons
		//handlebars gebruiken maar is overkill momenteel. :)
		//this.$el = $('<input type="button" class="button" value="Shape Tool" />');

		this.$elToolbar = $('<div class="toolbar" value="Shape Tool">');
		this.$elSelect = $('<input type="button" class="button2" id="Select"/>');
		this.$elShape = $('<input type="button" class="button2 active" id="Shape"/>');
		this.$elLine = $('<input type="button" class="button2" id="Line"/>');
		this.$elFile = $('<input type="button" class="button2" id="File"/>');
		this.$elDelete = $('<input type="button" class="button2" id="Delete"/>');

		this.$elColor = $('<select class="button2" id="changeColor">');
		this.$elColorOptions = 
		$('<option value=""></option>' + '<option value="groen"></option>' + '<option value="geel"></option>' + '<option value="oranje"></option>');

		this.$elSize = $('<select class="button2" id="changeSize">');
		this.$elSizeOptions = $('<option value=""></option>' + '<option value="s">S</option>' + '<option value="m">M</option>' + '<option value="l">L</option>');

		this.$elAlign = $('<select class="button2" id="changeAlign"/>');
		this.$elAlignOptions = $('<option value=""></option>' + '<option value="left"><img src="images/left.jpg"></option>' + '<option value="right"><img src="images/right.jpg"></option>' + '<option value="center"><img src="images/center.jpg"></option>');

		this.$elColor.append(this.$elColorOptions);
		this.$elSize.append(this.$elSizeOptions);
		this.$elAlign.append(this.$elAlignOptions);

		this.$elToolbar.append(this.$elSelect, this.$elShape, this.$elLine, this.$elFile, this.$elDelete, this.$elColor, this.$elSize, this.$elAlign);
		
		$el.parent().prepend(this.$elToolbar);

		this.$elShape.click(this.changeTool);
		//addEventListener for button: changeTool
		//bean.on($('.toolbar input'), 'click', this.changeTool);
		$('.toolbar input').click(this.changeTool.bind(this));			
	}
	Toolbar.prototype.changeTool = function(e){
		e.stopPropagation();
		console.log('clicking '+e.currentTarget.getAttribute('id') + ' button');
		this.tool = e.currentTarget.getAttribute('id').toLowerCase();
		if(this.tool === 'line'){
			$('canvas').css('z-index','0');
			$('.app').css('z-index','-1');
		}else{
			$('canvas').css('z-index','-1');
			$('.app').css('z-index','0');
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
	
	return Toolbar;
})();