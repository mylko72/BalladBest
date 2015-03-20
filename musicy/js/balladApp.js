(function(){
	'use strict';

	//���ø����̼� ��� ����� ������ ����(���� ���, ��Ƽ�� ��� ����)
	angular.module('balladApp', ['paginationDirective', 'youTubeApp','mouseClickServices']);

	angular.module('balladApp')
		//�̺�Ʈ���� ������
		.constant('YT_event', {
			STOP: 0, 
			PLAY: 1,
			PAUSE: 2
		})
		//���� ������ ���� ���ι��̴� ����
		.config(function(MouseClickPosProvider){
			//���� ���ι��̴����� this ��ü�� ����� �޼��� ȣ��
			//���⼭�� �μ��� x, y�� ������ ����
			MouseClickPosProvider.setAddValueXY(320, 10);	
		})
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
	function SongListController($scope, $http, $document, MouseClickPos, YT_event){

		$scope.songs = [];
		$scope.YT_event = YT_event;
		$scope.songInfo = {'singer':'����', 'title':'�뷡����', 'album':'�ٹ��̸�', 'albumImg':'�ٹ��̹���', 'lyrics':'�ۻ�', 'composed':'�۰�', 'release':'�߸���', 'videoId':'������'};
		$scope.played = false;
	
		//������ �޼ҵ� ���� - �÷��̾�â ����
		$scope.playYouTube = function(song, yt_event){
			//���񽺸�⳻ ��ü�� �Լ��� ȣ���Ͽ� ���� Ŭ���� ���콺�� ��ġ������ ��� �ִ� ��ü�� ��ȯ
			var loc = MouseClickPos.getCurrentPos();
			//���콺�� ��ġ������ ��Ÿ�Ϸ� ����
			$scope.locStyle = {'left':loc.x+'px', 'top':loc.y+'px'};

			$scope.played = true;	

			//�÷��̾�â�� ����� �� ����
			$scope.songInfo.singer = song.singer;
			$scope.songInfo.title = song.title;
			$scope.songInfo.album = song.album.name;
			$scope.songInfo.albumImg = song.album.cover;
			$scope.songInfo.lyrics = song.album.Lyrics;
			$scope.songInfo.composed= song.album.Composed;
			$scope.songInfo.release = song.album.Release;
			$scope.songInfo.videoId = song.videoid;

			//�̺�Ʈ�� ��� ���� �������� ����
			//this.$broadcast(YT_event);
		};

		//������ �޼ҵ� ���� - �÷��̾�â �ݱ� 
		$scope.closeYouTube = function(yt_event){
			$scope.played = false;

			//STOP �̺�Ʈ�� ���� �������� �����Ͽ� ������ ����� ����
			this.$broadcast(yt_event);
		}

		$http.get('ballad.json')
			.success(function(data){
				$scope.songs = data;
			}).then(function(){
				if($scope.songs.length>0){
					//���͸� �Լ� ȣ��
					filteredController();
				}

				$scope.toTheTop = function(){
					$document.scrollTop(0, 500);
				}
			});

		function filteredController(){

			//filtering
			$scope.filteredSongs = $scope.songs;


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
