module.exports = (function(){
	var size = [];


	function Shape(event,temp) {
		//this.$el = $(document.createElement('input'));
		
		this.bTemp = temp;
		//this.$el.addClass('shape');
		//this.$el.css('value', this.text);

		this.square = new Path.Rectangle(event.downPoint,event.point);
		this.square.opacity = '1';
		this.square.fillColor = 'white';
		if(!temp){
			this.square.opacity = 0.4;
			this.square.fillColor = 'black';
			this.textShape = new PointText({
				point: this.square.point,
				bounds: this.square.bounds,
				content: 'THIS IS CONTENT',
				fillColor: 'black',
				fontFamily: 'Courier New',
			    fontWeight: 'normal',
			    fontSize: 12
			});
		}

	}
	function onMouseDown(event){
		console.log('down 2');
	}
	Shape.prototype.changeSize = function(event){
		this.square('width',event.point);

	};
	Shape.prototype.remove = function(){
		this.square.remove();

	};
	Shape.prototype.addText = function(){
		//add event listener for when input loses focus:

		//save input value
		this.text = this.value;
	};
	Shape.prototype.hoverHandler = function(e){
		//show move and scale tool

		//add click listener for move and scale thingy.


	};
	Shape.prototype.moveHandler = function(e){
		//event handler for mouseMove

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