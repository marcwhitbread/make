.factory('Shape', [function() {
	
	//constructor
	var Shape = function(id, type, width, depth, height, color) {
		this.id = id;
		this.type = type;
		this.width = width;
		this.depth = depth;
		this.height = height;
		this.color = color;
	}
	
	//public methods
	Shape.prototype = {
		
		
		
	}
	
	return Shape;
	
}])