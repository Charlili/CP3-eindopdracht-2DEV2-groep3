module.exports = (function(){


	function Shape(x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.text = "";
		//create shape

		//create input in the shape

		//when Shape.input becomes active: addText
		//when Shape.input loses focus
	}
	Shape.prototype.addText = function(this){
		//add event listener for when input loses focus:

		//save input value
		this.text = this.value;
	};
	Shape.prototype.hoverHandler = function(e){
		//show move and scale tool

		//add click listener for move and scale thingy.


	}
	Shape.prototype.moveHandler = function(e){
		//event handler for mouseMove

		//move to new position	
		this.x = offset.x;
		this.y = offset.y;	

		//update shape?
	}
	Shape.prototype.scaleHandler = function(e){
		//event handler for mouseMove
		//scale to new position
		this.width = offset.x;
		this.height = offset.y;	

		//update shape?	
	}
	/* //example function
	Shape.prototype.removeHandler = function(){
		console.log('trying to delete the mutherfucker');
		bean.fire(this, 'remove', this);
	}; */
	
	return Shape;
})();