.factory('Shape', [function() {
	
	//constructor
	var Shape = function(id, type, width, depth, height, material) {
		this.id = id;
		this.type = type;
		this.width = width;
		this.depth = depth;
		this.height = height;
		this.material = material;
	}
	
	//public methods
	Shape.prototype = {
		
		
		
	}
	
	return Shape;
	
}])