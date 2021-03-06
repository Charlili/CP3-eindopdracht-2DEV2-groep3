module.exports = (function(){
	
	function Line(event,id) {
		//var tool = new Tool();
		this.type = 'line';
		this.id = id;
		this.x1 = 0;
		this.y1 = 0;
		if(event != undefined){
			this.x1 = event.point.x;
			this.y1 = event.point.y;

		}
		//create first circle, this.c1 & this.c2
		console.log('creating first circle');
	
		this.$c1 = new Shape.Circle([this.x1,this.y1], 5);
		this.$c1.fillColor = 'black';

		//this.$el;
		//console.log(this.$c1);
		//$('canvas').append(this.$c1);

	}
	Line.prototype.makeSelected = function(){
		this.selectBox = new Shape.Rectangle(this.$c1.position,this.$c2.position);
		this.selectBox.style = {
			strokeColor: 'rgba(0,0,0,.3)',
		    dashArray: [1, 2],
		    strokeWidth: 1,
		    opacity: .1
		}
		//bean.fire(this,'changeSelected',this);
	};
	Line.prototype.removeSelected = function(){
		this.selectBox.remove();
		view.update();
	}
	Line.prototype.deleteMe = function(){
		if(!this.$c2.isEmpty()){this.$c2.remove();}
		if(!this.$c1.isEmpty()){this.$c1.remove();}
		if(!this.$line.isEmpty()){this.$line.remove();}
		if(!this.selectBox.isEmpty()){this.selectBox.remove();}
		view.update();
	}
	Line.prototype.create = function(x1,y1,x2,y2,color) {

		console.log('creating first circle');
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.$c2 = new Shape.Circle([x2,y2], 5);
		this.$c1.position = [x1,y1];
		this.$c2.position = [x2,y2];
		this.$line = new Path.Line(this.$c1.position,this.$c2.position);
		this.$line.strokeColor = 'black';
		this.$line.strokeWidth = 2;
		this.$c1.fillColor = 'black';
		this.$c2.fillColor = 'black';

	};
	Line.prototype.addCircle = function(event){
		//add 2nd circle
		
		this.$c2 = new Shape.Circle(event.point, 5);
		this.$c2.fillColor = 'black';
		this.x2 = event.point.x;
		this.y2 = event.point.y;

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
		//e.stopPropagation();
		console.log('draggin');
		//console.log(this);
		//console.log(e.target);
		if(e.target == this.$c1){
			//console.log(this.$c2.position);
			this.$line.remove();
			this.$line = new Path.Line(e.point,this.$c2.position);
		}else if(e.target == this.$c2){
			this.$line.remove();
			this.$line = new Path.Line(this.$c1.position,e.point);
		}
		this.$line.strokeColor = 'black';
		this.$line.strokeWidth = 2;
		e.target.position = e.point;
		bean.fire(this,'changeSelected',this);
		this.selectBox.remove();
		this.selectBox = new Shape.Rectangle(this.$c1.position,this.$c2.position);
		this.selectBox.style = {
			strokeColor: 'rgba(0,0,0,.3)',
		    dashArray: [1, 2],
		    strokeWidth: 1,
		    opacity: .1
		}
		//this.position = e.point;
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