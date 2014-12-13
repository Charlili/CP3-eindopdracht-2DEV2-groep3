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
		this.$el.addClass('shape');
		this.$el.addClass('draggable');

		this.input = document.createElement('textarea');
		this.input.type = 'text';
		this.$el.css('value', this.text);
		this.$el.append(this.input);
		//save input value
		this.text = this.value;
		
		

		this.$resizeBox = $(document.createElement('div'));
		this.$resizeBox.addClass('resizable');
		//this.$resizeBox.css('top','50px');
		//this.$resizeBox.css('left','150px');

		this.$el.append(this.$resizeBox);

		$('.app').append(this.$el);
		$('.shape').click(function(e) {
			e.stopPropagation();
		});

		

		this._mMoveHandler = this.mMoveHandler.bind(this);
		this._mUpHandler = this.mUpHandler.bind(this);
		this._mDownHandler = this.mDownHandler.bind(this);

		this.$el.mousedown(this._mDownHandler);

		this._rMoveHandler = this.rMoveHandler.bind(this);
		this._rUpHandler = this.rUpHandler.bind(this);
		this._rDownHandler = this.rDownHandler.bind(this);

		this.$resizeBox.mousedown(this._rDownHandler);

		this.clicks = 0;
		
		
		

	}
	Shape.prototype.rDownHandler = function(event){
		
		//console.log('down on the scaler');
		this.offsetX = event.pageX;
		this.offsetY = event.pageY;

		this.width = parseInt(this.$el.css('width'));
		this.height = parseInt(this.$el.css('height'));
		window.addEventListener('mousemove',this._rMoveHandler);
		window.addEventListener('mouseup',this._rUpHandler);
		event.stopPropagation();		
	};
	Shape.prototype.rMoveHandler = function(event){
		//console.log('movin');

		width = event.pageX - this.offsetX;
		this.$el.css('width',this.width + width + 'px');
		height = event.pageY - this.offsetY;
		this.$el.css('height',this.height + height + 'px');
		this.$resizeBox.css('right',-parseInt(this.$el.css('width')) + 7 + 'px');
		//console.log(width+","+height);

		
	};
	Shape.prototype.rUpHandler = function(event){
		window.removeEventListener('mousemove',this._rMoveHandler);
		window.removeEventListener('mouseup',this._rUpHandler);

	};
	Shape.prototype.mDownHandler = function(event){
		//console.log(this)
		//console.log('down on the mover');
		this.offsetX = event.pageX;
		this.offsetY = event.pageY;
		this.left = parseInt(this.$el.css('left'));
		this.top = parseInt(this.$el.css('top'));
		this.clicks++;
		this.$el.css('z-index', this.clicks);
		window.addEventListener('mousemove',this._mMoveHandler);
		window.addEventListener('mouseup',this._mUpHandler);
				
	};
	Shape.prototype.mMoveHandler = function(event){
		//console.log(parseInt(this.$el.css("width")));
		this.x = event.pageX - this.offsetX + this.left;
		this.$el.css('left',this.x + 'px');
		this.y = event.pageY - this.offsetY + this.top;
		this.$el.css('top',this.y + 'px');
		
	};
	Shape.prototype.mUpHandler = function(event){
		window.removeEventListener('mousemove',this._mMoveHandler);
		window.removeEventListener('mouseup',this._mUpHandler);
		//console.log('up');
	};
	Shape.prototype.create = function(x,y,width,height,color,type,content) {
		console.log('recreating shapes');
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