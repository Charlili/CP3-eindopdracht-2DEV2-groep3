module.exports = (function(){

	var shapeTool = true;
	function Toolbar($el) {
		//make 2 buttons
		this.$el = $('<input type="button" class="button" value="Draw Shapes" />');
		
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
			this.value = 'Draw Shapes';
		}else{
			this.value = 'Draw Lines';
		}
		//use bean.fire to communicate this change to FlowchartApplication

	};
	
	return Toolbar;
})();