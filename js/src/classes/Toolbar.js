module.exports = (function(){

	var shapeTool = true;
	function Toolbar($el) {

		//bean.fire(this, 'remove', this);
		//bean.fire(this,'create-item',this.input.value);
		//make 2 buttons
		//handlebars gebruiken maar is overkill momenteel. :)

		this.$elToolbar = $('<div class="toolbar" value="Shape Tool">');
		this.$elSelect = $('<input type="button" class="button2" id="Select"/>');
		this.$elSelect = $('<input type="button" class="button2 active" id="Select"/>');
		this.$elShape = $('<input type="button" class="button2 active" id="Shape"/>');
		this.$elLine = $('<input type="button" class="button2" id="Line"/>');
		this.$elFile = $('<input type="button" class="button2" id="File"/>');
		this.$elDelete = $('<input type="button" class="button2" id="Delete"/>');

		this.$elColor = $('<div class="changeColor"><a href="#"><img src="images/color.jpg"></a>');
		this.$elColorUl = $('<ul class="testhidden">');
		this.$elColorOptions = 
		$('<li><a href="#"><img src="images/groen.jpg"></a></li>' + '<li><a href="#"><img src="images/geel.jpg"></a></li>' + '<li><a href="#"><img src="images/oranje.jpg"></a></li>');
		
		this.$elSize = $('<div class="changeSize"><a href="#"><img src="images/size.jpg"></a>');
		this.$elSizeUl = $('<ul class="testhidden">');
		this.$elSizeOptions = $('<li><a href="#">S</a></li>' + '<li><a href="#">M</a></li>' + '<li><a href="#">L</a></li>');

		this.$elAlign = $('<div class="changeAlign"><a href="#"><img src="images/align.jpg"></a><ul class="hidden">');
		this.$elAlignUl = $('<ul class="testhidden open">');
		this.$elAlignOptions = $('<li><a href="#"><img src="images/left.jpg"></a></li>' + '<li><a href="#"><img src="images/right.jpg"></a></li>' + '<li><a href="#"><img src="images/center.jpg"></a></li>');

		this.$elColorUl.append(this.$elColorOptions);
		this.$elColor.append(this.$elColorUl);

		this.$elSizeUl.append(this.$elSizeOptions);
		this.$elSize.append(this.$elSizeUl);

		this.$elAlignUl.append(this.$elAlignOptions);
		this.$elAlign.append(this.$elAlignUl);

		this.$elToolbar.append(this.$elSelect, this.$elShape, this.$elLine, this.$elFile, this.$elDelete, this.$elColor, this.$elSize, this.$elAlign);
		
		$el.parent().prepend(this.$elToolbar);

		this.$elShape.click(this.changeTool);
		//addEventListener for button: changeTool
		//bean.on($('.toolbar input'), 'click', this.changeTool);
		$('.toolbar input').click(this.changeTool.bind(this));			
		this.$elToolbar.click(this.changeTool);
		//addEventListener for button: changeTool			
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