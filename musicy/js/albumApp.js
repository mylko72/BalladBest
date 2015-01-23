(function(){
	'use strict';

	angular.module('albumApp', ['paginationDirective', 'youTubeApp']);

	angular.module('albumApp')
		.controller('AlbumListCtrl', SongListController)
		/**
		 @filter pagination 
		 ������ ��ȣ ����� ���� ����
		 @returnVal function - ���� ���� �Լ��� ��ȯ 
		 ***@param inputArray - ���͸� �� �Է°�
		 ***@param selectedPage - ���õ� ������ �ε���
		 ***@param pageSize - �� �������� ǥ���� ����� ��
		**/
		.filter('pagination', function(){
			return function(inputArray, selectedPage, pageSize) {
				var start = selectedPage*pageSize;
				return inputArray.slice(start, start + pageSize);
			};
		})
		.filter('trim', function(limitToFilter){
			return function(input, limit) {
				//console.log(input.length, limit);
				if (input.length > limit) {
					return limitToFilter(input, limit-3) + '...';
				}
				return input;
			};
		});


	//�뷡 ����Ʈ�� �����ִ� ��Ʈ�ѷ�
	function SongListController($scope, $http, $document){

		$scope.songs = [];
		$scope.played = false;
		
		$http.get('dance.json')
			.success(function(data){
				$scope.songs = data;
			}).then(function(){
				if($scope.songs.length>0){
					filteredController();
					//YouTubeController();
				}

				$scope.toTheTop = function(){
					$document.scrollTop(0, 500);
				}
			});


		function filteredController(){


			//filtering
			$scope.filteredSongs = $scope.songs;

			$scope.playYouTube = function(song){
				$scope.played = true;	
				$scope.videoId = song.videoid;
			};

			$scope.closeYouTube = function(){
				$scope.played = false;
			}

			//sorting
			$scope.sortField = undefined;
			$scope.reverse = false;

			$scope.sort = function (fieldName) {
				if ($scope.sortField === fieldName) {
					$scope.reverse = !$scope.reverse;
				} else {
					$scope.sortField = fieldName;
					$scope.reverse = false;
				}
			};

			$scope.isSortUp = function (fieldName) {
				return $scope.sortField === fieldName && !$scope.reverse;
			};
			$scope.isSortDown = function (fieldName) {
				return $scope.sortField === fieldName && $scope.reverse;
			};

			//pagination
			$scope.pages = [];
			$scope.pageSize = 20;
			$scope.currentPage = 0;
			$scope.$watch('filteredSongs.length', function(filteredSize){
			  console.log(filteredSize);
			  $scope.numPages = Math.ceil(filteredSize / $scope.pageSize);
			  for (var i=0; i<$scope.numPages; i++) {
				console.log(i);
				$scope.pages.push(i);
			  }
			});

			$scope.setActivePage = function (pageNo) {
			  if (pageNo >=0 && pageNo < $scope.pages.length) {
				$scope.currentPage = pageNo;
			  }
			};
		}

	}

})();
