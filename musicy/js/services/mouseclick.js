angular.module('mouseClickServices', [])

.provider('MouseClickPos', function(){
	var evt;
	var addXy = {'x': 0, 'y': 0};

	processClick = function(event){
		//event 객체에 접근
		evt = event || window.event;
		var loc = {'x': 0, 'y': 0};
		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;


		//console.log('width :' + width);

		//event 객체가 pageX 속성을 포함하고 있다면
		//pageX와 pageY를 사용해서 위치를 구함
		if(evt.pageX){
			(width>992) ? loc.x = evt.pageX + addXy.x : loc.x = 0;
			loc.y = evt.pageY + addXy.y;

			console.log('x : '+loc.x);

			//event 객체가 clientX 속성을 포함하고 있다면
		}else if(evt.clientX){
			var offsetX = 0,
				offsetY = 0;

			//documentElement.scrollLeft를 지원하면
			if(document.documentElement.scrollLeft){
				offsetX = document.documentElement.scrollLeft;
				offsetY = document.documentElement.scrollTop;
			}else if(document.body){
				offsetX = document.body.scrollLeft;
				offsetY = document.body.scrollTop;
			}

			(width>992) ? loc.x = evt.clientX + offsetX + addXy.x : loc.x = 0;
			loc.y = evt.clientY + offsetY + addXy.y;
		}
		return loc; 
	};

	this.setAddValueXY = function(x, y){
		addXy.x = x;
		addXy.y = y;
	};

	this.$get = [function(){
		return {
			getCurrentPos: function(){
				var currentLoc = processClick();
				return currentLoc;
			}
		};
	}];
});
