angular.module('MakerCreatorStudio', ['MakerJS'])
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
.directive('makeCompass', function() {
	return {
		restrict: "E",
		scope: {
			controls: '=controls'
		},
		transclude: true,
		replace: true,
		template: "<div class = 'compass' ng-style = 'style'><div class = 'axis'><span>X</span></div><div class = 'axis'><span>Z</span></div><div class = 'axis'><span>Y</span></div></div>",
		controller: function($scope, $element) {
			
			$scope.$watchGroup(['controls.perspective.x', 'controls.perspective.y', 'controls.perspective.z'], function() {
				update();
			});
			
			var update = function() {
				
				$scope.style = {
					webkitTransform: 'rotateX(' + $scope.controls.perspective.x + 'deg) rotateY(' + $scope.controls.perspective.y + 'deg) rotateZ(' + $scope.controls.perspective.z + 'deg)'
				}
				
			}
			
		}
	}
})


