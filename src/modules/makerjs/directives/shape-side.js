.directive('makeShapeSide', function() {
	return {
		restrict: "E",
		scope: {
			shape: '=shape',
			controls: '=controls',
			index: '=index'
		},
		transclude: true,
		replace: true,
		template: "<div class = 'side' ng-style = 'style'></div>",
		controller: function($scope, $element, $filter) {

			$scope.$watchGroup(['shape.width', 'shape.height', 'shape.depth', 'shape.material'], function() {
				update();
			});
			
			var update = function() {
				
				//console.log($scope.controls.material);
				
				var base = {
					width: '100%',
					height: '100%',
					left: 'auto',
					top: 'auto',
					bottom: '0',
					background: '#' + $scope.shape.material.color,
					rotateX: 0,
					rotateY: 0,
					rotateZ: 0,
					translateX: 0,
					translateY: 0,
					translateZ: 0
				}
				
				switch($scope.controls.type) {
					
					case 'r': //rectangle
						switch($scope.index) {
							
							case 0: //front
								base.width = $scope.shape.width + 'px';
								base.height = $scope.shape.height + 'px';
								base.background = $filter('tintcolor')('#' + $scope.shape.material.color, 20);
								base.translateZ = $scope.shape.depth/2;
								break;
							case 1: //back
								base.width = $scope.shape.width + 'px';
								base.height = $scope.shape.height + 'px';
								base.background = $filter('tintcolor')('#' + $scope.shape.material.color, 20);
								base.rotateX = -180;
								base.rotateZ = 180;
								base.translateZ = $scope.shape.depth/2;
								break;
							case 2: //right
								base.left = ($scope.shape.width - $scope.shape.depth)/2 + 'px';
								base.width = $scope.shape.depth + 'px';
								base.height = $scope.shape.height + 'px';
								base.background = $filter('tintcolor')('#' + $scope.shape.material.color, -20);
								base.rotateY = 90;
								base.translateZ = $scope.shape.width/2;
								break;
							case 3: //left
								base.left = ($scope.shape.width - $scope.shape.depth)/2 + 'px';
								base.width = $scope.shape.depth + 'px';
								base.height = $scope.shape.height + 'px';
								base.background = $filter('tintcolor')('#' + $scope.shape.material.color, -20);
								base.rotateY = -90;
								base.translateZ = $scope.shape.width/2;
								break;
							case 4: //top
								base.top = ($scope.shape.height - $scope.shape.depth)/2 + 'px';
								base.height = $scope.shape.depth + 'px';
								base.rotateX = 90;
								base.translateZ = $scope.shape.height/2;
								break;
							case 5: //bottom
								base.bottom = ($scope.shape.height - $scope.shape.depth)/2 + 'px';
								base.height = $scope.shape.depth + 'px';
								base.rotateX = -90;
								base.translateZ = $scope.shape.height/2;
								break;
						}
						break;
				}
				
				$scope.style = {
					position: 'absolute',
					top: base.top,
					left: base.left,
					bottom: base.bottom,
					width: base.width,
					height: base.height,
					background: base.background,
					//opacity: 0.5,
					webkitTransform: 'rotateX(' + base.rotateX + 'deg) rotateY(' + base.rotateY + 'deg) rotateZ(' + base.rotateZ + 'deg) translate3d(' + base.translateX + 'px, ' + base.translateY + 'px, ' + base.translateZ + 'px)',
				}
			
			} 
			
		},
	}
})