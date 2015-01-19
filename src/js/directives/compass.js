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