module.exports = (function(){
	var size = [];
	//var clicks = 0;


	function Shape(event) {
		console.log('creating shape');
		this.x = 100;
		this.y = 50;
		if(event != undefined){
			this.x = event.offsetX;
			this.y = event.offsetY;
		}
		this.$el = $(document.createElement('div'));
		this.$el.css('top',this.y - 50 + 'px');
		this.$el.css('left',this.x - 100 + 'px');
		this.$el.css('width',200);
		this.$el.css('height',100);
		this.$el.css('z-index',0);
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
		this._mMoveHandler = this.mMoveHandler.bind(this);
		this._mUpHandler = this.mUpHandler.bind(this);
		this._mDownHandler = this.mDownHandler.bind(this);

		this.$el.mousedown(this._mDownHandler);
		this.clicks = 0;
		
		
		

	}
	Shape.prototype.xPos = function(xPos){
		this.x = xPos;
		this.$el.style.left = xPos + 'px';
	};
	Shape.prototype.yPos = function(yPos){
		this.y = xPos;
		this.$el.style.top = yPos + 'px';
	};
	Shape.prototype.mDownHandler = function(event){
		console.log(this);
		this.offsetX = event.offsetX;
		this.offsetY = event.offsetY;
		this.clicks++;
		this.$el.css('z-index', this.clicks);
		window.addEventListener('mousemove',this._mMoveHandler);
		window.addEventListener('mouseup',this._mUpHandler);
		

		console.log('down');
		
	};
	Shape.prototype.mMoveHandler = function(event){

		console.log(parseInt(this.$el.css("width")));
		this.x = event.x - this.offsetX - parseInt(this.$el.css("width"))/2;
		this.$el.css('left',this.x + 'px');
		//this.xPos(event.x - this.offsetX);
		this.y = event.y - this.offsetY - parseInt(this.$el.css("height"))/2;
		this.$el.css('top',this.y + 'px');
		//this.yPos(event.y - this.offsetY);


		
	};
	Shape.prototype.mUpHandler = function(event){
		window.removeEventListener('mousemove',this._mMoveHandler);
		window.removeEventListener('mouseup',this._mUpHandler);
		console.log('up');
	};
	Shape.prototype.create = function(x,y,width,height,color,type,content) {
		console.log('recreating shape');
		this.x = x;
		this.y = y;
		this.$el.css('top',y + 'px');
		this.$el.css('left',x +'px');
		this.$el.css('width',width);
		this.$el.css('height',height);
		
		this.$el.addClass('draggable');

		this.input.type = 'text';
		this.text = content;
		this.input.innerText = content;
		this.type = type;
		this.$el.css('value', this.text);
		this.$el.append(this.input);
		//save input value
		

	};
	/*Shape.prototype.changeSize = function(event){
		this.$el.css('width',event.offsetX);
		this.$el.css('height',event.offsetY);

	};*/
	Shape.prototype.remove = function(){
		//this.square.remove();

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
		this.$el.css('top',this.y + 'px');
		this.$el.css('left',this.x +'px');

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