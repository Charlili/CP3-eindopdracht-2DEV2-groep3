module.exports = (function(){

	function Line(x1,y1,x2,y2) {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		
		//create 2 circles, this.c1 & this.c2
		//create line

		//add event listener for clicking on the c1, c2: moveHandler	
	}
	Line.prototype.addText = function(this){
		//add event listener for when input loses focus:

		//save input value
		this.text = this.value;
	};
	Line.prototype.hoverHandler = function(e){
		//show move and scale tool

		//add click listener for move and scale thingy.


	}
	Line.prototype.moveHandler = function(e){
		//is currentTarget c1 or c2?

		//event handler for mouseMove

		//move to new position
		//if currentTarget c1:	
		this.x1 = offset.x;
		this.y1 = offset.y;	
		//else if currentTarget c2:
		this.x2 = offset.x;
		this.y2 = offset.y;	

		//update line?
	}
	
	return Line;
})();