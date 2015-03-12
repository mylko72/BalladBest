angular.module('tooltipApp', ['tooltipDirective','mouseClickServices'])

.controller('TooltipCtrl', function($scope, MouseClickPos){
	$scope.pos= {'x':'', 'y':''};
	$scope.showTooltip = function(){
		console.log('mouseover');

		//���񽺸�⳻ ��ü�� �Լ��� ȣ���Ͽ� ���� Ŭ���� ���콺�� ��ġ������ ��� �ִ� ��ü�� ��ȯ
		var loc = MouseClickPos.getCurrentPos();
		//���콺�� ��ġ������ ��Ÿ�Ϸ� ����
		$scope.pos.x = loc.x;
		$scope.pos.y = loc.y;
	}
});
