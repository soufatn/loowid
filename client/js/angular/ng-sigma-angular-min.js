(function() {
	'use strict';
	angular.module('sigmajs-ng', []).directive('sigmajs', function() {
		//over-engineered random id, so that multiple instances can be put on a single page
		var divId = 'sigmjs-dir-container-'+Math.floor((Math.random() * 999999999999))+'-'+Math.floor((Math.random() * 999999999999))+'-'+Math.floor((Math.random() * 999999999999));
		return {
			restrict: 'E',
			template: '<div id="'+divId+'" style="width: 100%;height: 100%;"></div>',
			scope: {
				//@ reads the attribute value, = provides two-way binding, & works with functions
				graph: '=',
				width: '@',
				height: '@',
				releativeSizeNode: '='
			},
			link: function (scope, element, attrs) {
				// Let's first initialize sigma:
				
				
var i,
    s,
    img,
    N = 10,
    E = 50,
    g = {
      nodes: [],
      edges: []
    },
    urls = [
      'img/img1.png',
      'img/img2.png',
      'img/img3.png',
      'img/img4.png'
    ],
    colors = [
      '#617db4',
      '#668f3c',
      '#c6583e',
      '#b956af'
    ];

// Generate a random graph, going through the different edge shapes
for (i = 0; i < N; i++) {
  g.nodes.push({
    id: 'n' + i,
    label: 'Node ' + i,
    x: Math.random(),
    y: Math.random(),
    size: Math.random(),
    color: colors[Math.floor(Math.random() * colors.length)]
  });
}

for (i = 0; i < E; i++) {
  g.edges.push({
    id: 'e' + i,
    source: 'n' + (Math.random() * N | 0),
    target: 'n' + (Math.random() * N | 0),
    type: [
      'line',
      'curve',
      'arrow',
      'curvedArrow',
      'dashed',
      'dotted',
      'parallel',
      'tapered'
    ][Math.round(Math.random()*8)],
    size: Math.random()
  });
}

				s = new sigma({
				  graph: g,
				  renderer: {
					container: document.getElementById(divId),
					type: 'canvas'
				  },
				  settings: {
					minNodeSize: 1,
					maxNodeSize: 10,
					minEdgeSize: 0.1,
					maxEdgeSize: 2,
					minArrowSize: 8,
					enableEdgeHovering: true,
					edgeHoverSizeRatio: 2
				  }
				});
	
				scope.$watch('graph', function(newVal,oldVal) {
					s.graph.clear();
					s.graph.read(scope.graph);
					s.refresh();
					if(scope.releativeSizeNode) {
						//this feature needs the plugin to be added
						sigma.plugins.relativeSize(s, 2);
					}
				});
	
				scope.$watch('width', function(newVal,oldVal) {
					console.log("graph width: "+scope.width);
					element.children().css("width",scope.width);
					s.refresh();
					window.dispatchEvent(new Event('resize')); //hack so that it will be shown instantly
				});
				scope.$watch('height', function(newVal,oldVal) {
					console.log("graph height: "+scope.height);
					element.children().css("height",scope.height);
					s.refresh();
					window.dispatchEvent(new Event('resize'));//hack so that it will be shown instantly
				});
	
				element.on('$destroy', function() {
					s.graph.clear();
				});
			}
		};
	});
})();	