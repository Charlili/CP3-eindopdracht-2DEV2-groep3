module.exports = (function(){
	
	function Line(event) {
		//var tool = new Tool();
		
		//create first circle, this.c1 & this.c2
		console.log('creating first circle');
	
		this.$c1 = new Shape.Circle(new Point(event.offsetX,event.offsetY), 5);
		this.x1 = event.offsetX;
		this.y1 = event.offsetY;
		this.$c1.fillColor = 'black';

		//tool.onMouseDrag = this.moveHandler.bind(this);
		//console.log(this.$c1);
		//$('canvas').append(this.$c1);

	}
	Line.prototype.addCircle = function(event){
		//add 2nd circle
		
		this.$c2 = new Shape.Circle(new Point(event.offsetX,event.offsetY), 5);
		this.$c2.fillColor = 'black';
		this.x2 = event.offsetX;
		this.y2 = event.offsetY;

		//draw line between the two circles
		this.$line = new Path.Line([this.x1,this.y1], [this.x2,this.y2]);
		this.$line.strokeColor = 'black';
		this.$line.strokeWidth = 2;
		//console.log(this);



		//$('canvas').append(this.$c2);
		//$('canvas').append(this.$line);
		//save input value
		//this.text = this.value;
	};
	Line.prototype.hoverHandler = function(e){
		//show move and scale tool

		//add click listener for move and scale thingy.


	};
	Line.prototype.moveHandler = function(e){
		e.stopPropagation();
		console.log('draggin');
		console.log(this);
		console.log('movin the bugger');
		//is currentTarget c1 or c2?

		//event handler for mouseMove

		//move to new position
		//if currentTarget c1:	
		//this.x1 = offset.x;
		//this.y1 = offset.y;	
		//else if currentTarget c2:
		//this.x2 = offset.x;
		//this.y2 = offset.y;	

		//update line?
	};
	
	return Line;
})();