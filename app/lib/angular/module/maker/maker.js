angular.module("MakerJS", [])
.controller('ShapeCtrl', ['$scope', function($scope) {
	
	
	
}])
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

			$scope.$watch('controls.width', function() {
				update();
			});
			
			$scope.$watch('controls.height', function() {
				update();
			});
			
			$scope.$watch('controls.depth', function() {
				update();
			});
			
			var update = function() {
				
				var base = {
					width: '100%',
					height: '100%',
					left: 'auto',
					top: 'auto',
					bottom: '0',
					background: '#' + $scope.controls.color,
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
								base.width = $scope.controls.width + 'px';
								base.height = $scope.controls.height + 'px';
								base.background = $filter('tintcolor')('#' + $scope.controls.color, 20);
								base.translateZ = $scope.controls.depth/2;
								break;
							case 1: //back
								base.width = $scope.controls.width + 'px';
								base.height = $scope.controls.height + 'px';
								base.background = $filter('tintcolor')('#' + $scope.controls.color, 20);
								base.rotateX = -180;
								base.rotateZ = 180;
								base.translateZ = $scope.controls.depth/2;
								break;
							case 2: //right
								base.left = ($scope.controls.width - $scope.controls.depth)/2 + 'px';
								base.width = $scope.controls.depth + 'px';
								base.height = $scope.controls.height + 'px';
								base.background = $filter('tintcolor')('#' + $scope.controls.color, -20);
								base.rotateY = 90;
								base.translateZ = $scope.controls.width/2;
								break;
							case 3: //left
								base.left = ($scope.controls.width - $scope.controls.depth)/2 + 'px';
								base.width = $scope.controls.depth + 'px';
								base.height = $scope.controls.height + 'px';
								base.background = $filter('tintcolor')('#' + $scope.controls.color, -20);
								base.rotateY = -90;
								base.translateZ = $scope.controls.width/2;
								break;
							case 4: //top
								base.top = ($scope.controls.height - $scope.controls.depth)/2 + 'px';
								base.height = $scope.controls.depth + 'px';
								base.rotateX = 90;
								base.translateZ = $scope.controls.height/2;
								break;
							case 5: //bottom
								base.bottom = ($scope.controls.height - $scope.controls.depth)/2 + 'px';
								base.height = $scope.controls.depth + 'px';
								base.rotateX = -90;
								base.translateZ = $scope.controls.height/2;
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

			$scope.$watchGroup(['controls.width', 'controls.height', 'controls.perspective.x', 'controls.perspective.y', 'controls.perspective.z'], function() {
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
					marginTop: -$scope.controls.height/2 + 'px',
					marginLeft: -$scope.controls.width/2 + 'px',
					width: $scope.controls.width + 'px',
					height: $scope.controls.height + 'px',
					webkitTransform: 'rotateX(' + $scope.controls.perspective.x + 'deg) rotateY(' + $scope.controls.perspective.y + 'deg) rotateZ(' + $scope.controls.perspective.z + 'deg)'
				}
				
			}
			
		}
	}
})
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
.filter('tintcolor', function() {
    return function(color, percent) {
	    
		var R = parseInt(color.substring(1,3),16);
	    var G = parseInt(color.substring(3,5),16);
	    var B = parseInt(color.substring(5,7),16);
	
	    R = parseInt(R * (100 + percent) / 100);
	    G = parseInt(G * (100 + percent) / 100);
	    B = parseInt(B * (100 + percent) / 100);
	
	    R = (R<255)?R:255;  
	    G = (G<255)?G:255;  
	    B = (B<255)?B:255;  
	
	    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
	    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
	    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
	
	    return "#"+RR+GG+BB;
	   
	}	
})