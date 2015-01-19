.directive('makeShape', function() {
	return {
		restrict: "E",
		scope: {
			shape: '=shape',
			controls: '=controls',
			select: '&'
		},
		transclude: true,
		replace: false,
		template: "<div ng-style = 'style' ng-click = 'select(shape);'><make-shape-side index = '$index' shape = 'shape' controls = 'controls' ng-repeat = 'side in sides'></make-shape-side></div>",
		controller: function($scope, $element) {

			$scope.$watchGroup(['shape.width', 'shape.height', 'controls.perspective.x', 'controls.perspective.y', 'controls.perspective.z'], function() {
				update();
			});
			
			var update = function() {
				
				var num_sides = 0;
			
				switch($scope.controls.type) {
					case 'r':
						num_sides = 6;
						break;
				}
				
				$scope.sides = [];
				
				for(var i = 0; i < num_sides; i++) {
					$scope.sides.push(i);
				}
				
				$scope.style = {
					transformStyle: 'preserve-3d',
					position: 'absolute',
					left: '50%',
					top: '50%',
					marginTop: -$scope.shape.height/2 + 'px',
					marginLeft: -$scope.shape.width/2 + 'px',
					width: $scope.shape.width + 'px',
					height: $scope.shape.height + 'px',
					webkitTransform: 'rotateX(' + $scope.controls.perspective.x + 'deg) rotateY(' + $scope.controls.perspective.y + 'deg) rotateZ(' + $scope.controls.perspective.z + 'deg)'
				}
				
			}
			
		}
	}
})