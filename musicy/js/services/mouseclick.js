angular.module('mouseClickServices', [])

.provider('MouseClickPos', function(){
	var evt;
	var addXy = {'x': 0, 'y': 0};

	processClick = function(event){
		//event ��ü�� ����
		evt = event || window.event;
		var loc = {'x': 0, 'y': 0};
		var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;


		//console.log('width :' + width);

		//event ��ü�� pageX �Ӽ��� �����ϰ� �ִٸ�
		//pageX�� pageY�� ����ؼ� ��ġ�� ����
		if(evt.pageX){
			(width>992) ? loc.x = evt.pageX + addXy.x : loc.x = 0;
			loc.y = evt.pageY + addXy.y;

			//console.log('x : '+loc.x);

			//event ��ü�� clientX �Ӽ��� �����ϰ� �ִٸ�
		}else if(evt.clientX){
			var offsetX = 0,
				offsetY = 0;

			//documentElement.scrollLeft�� �����ϸ�
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
