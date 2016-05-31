app.controller('ChatCtrl', [
	'$scope', 
	'$rootScope', 
	'ChatService', 
	'$ionicScrollDelegate', 
	'$ionicHistory',
	'UserStorageService',
	'UserService',
	function ($scope, $rootScope, ChatService, $ionicScrollDelegate, $ionicHistory, UserStorageService, UserService) {
    $('body').fadeIn(3000);
	$('#home').addClass('animated');
	var vm = this;
	
	$ionicHistory.clearCache();
	$rootScope.isChat = true;
	
	try{
		var user = UserStorageService.getUser();
		if (user && user.token && !user.deviceToken && deviceToken){
			console.log('user authenticated. Try setting token for the second time !');
			UserService.update({
				deviceToken: deviceToken
			});
			UserService.init();
		}
	} 
	catch(err){
		console.log(err);
	}
	
	$rootScope.users = vm.users = ChatService.users;
	vm.messages = ChatService.messages;
	
	ChatService.setUpdateCallback(function(){
		if(!$scope.$$phase){
			$scope.$apply();
		}
		$ionicScrollDelegate.scrollBottom(false);
	});
	ChatService.getMessages();
	
	vm.submit = function(msg){
		ChatService.newMessage(msg);
		vm.msg = '';
	};	
	
	vm.getPictureUser = function(user){
		return apiUrl + '/users/' + user._id + '/picture';
	};
	
	vm.getPicture = function(msg){
		return apiUrl + '/users/' + msg.userId + '/picture';
	};
	
	vm.lastMessage;
	vm.showUserInfos = function(message){
		if(vm.lastMessage && message.userId == vm.lastMessage.userId){
			return false;
		}
		vm.lastMessage = message;
		return true;
	}
}]);