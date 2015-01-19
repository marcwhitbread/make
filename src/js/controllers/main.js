.controller('MainCtrl', ['$scope', 'Shape', function($scope, Shape) {
	
	$scope.shapes = [new Shape(1, 'r', 100, 100, 100, '999999')];
	$scope.selectedShape = $scope.shapes[0];
	
	$scope.controls = {
		perspective: {
			x: -20,
			y: -55,
			z: 0	
		},
		type: $scope.selectedShape.type,
		width: $scope.selectedShape.width,
		height: $scope.selectedShape.height,
		depth: $scope.selectedShape.depth,
		color: $scope.selectedShape.color
	}
	
	$scope.select = function(shape) {
		
		$scope.shapes.forEach(function(obj, i) {
			
			if(obj == shape) {
				$scope.selectedShape = shape;
				return false;
			}
			
		});
	}
	
}])