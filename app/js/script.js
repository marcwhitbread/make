angular.module('MakerCreatorStudio', ['MakerJS'])
.controller('MainCtrl', ['$scope', 'Shape', 'Material', function($scope, Shape, Material) {
	
	$scope.materials = [];
	$scope.materials.push(new Material(1, 'Ground', '6d574c'));
	$scope.materials.push(new Material(2, 'Concrete', 'd5d2cd'));
	
	$scope.shapes = [];
	$scope.shapes.push(new Shape(1, 'r', 200, 200, 4, $scope.materials[0]));
	$scope.shapes.push(new Shape(2, 'r', 100, 100, 100, $scope.materials[1]));
	
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
		material_index: 0
	}
	
	$scope.select = function(shape) {
		
		//console.log(shape);
		
		$scope.shapes.forEach(function(obj, i) {
			
			if(obj == shape) {
				console.log('set', shape);
				$scope.selectedShape = shape;
				return false;
			}
			
		});
	}
	
	$scope.$watchGroup(['controls.width', 'controls.height', 'controls.depth', 'controls.material_index'], function() {
		update_selected_shape();
	});
	
	var update_selected_shape = function() {
		
		//$scope.selectedShape.type = $scope.controls.type;
		$scope.selectedShape.width = $scope.controls.width;
		$scope.selectedShape.height = $scope.controls.height;
		$scope.selectedShape.depth = $scope.controls.depth;
		$scope.selectedShape.material = $scope.materials[$scope.controls.material_index];
		
	}
	
	$scope.$watchGroup(['selectedShape'], function() {
		update_controls();
	});
	
	var update_controls = function() {

		$scope.controls.width = $scope.selectedShape.width;
		$scope.controls.height = $scope.selectedShape.height;
		$scope.controls.depth = $scope.selectedShape.depth;
		$scope.controls.material_index = $scope.selectedShape.material.id-1;
		
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


