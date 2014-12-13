module.exports = (function(){

	var shapeTool = true;
	function Toolbar($el) {
		//make 2 buttons
		//handlebars gebruiken maar is overkill momenteel. :)
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