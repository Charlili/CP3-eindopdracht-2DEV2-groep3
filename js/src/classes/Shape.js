module.exports = (function(){
	var size = [];


	function Shape(event) {
		
		this.$el = $(document.createElement('div'));
		this.x = event.offsetX;
		this.y = event.offsetY;
		this.$el.css('top',this.y);
		this.$el.css('left',this.x);
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
		console.log(this);
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