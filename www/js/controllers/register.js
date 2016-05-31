app.controller('RegisterCtrl', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    
	var vm = this;
	vm.user = {};
	
	vm.submit = function(){
		UserService.register(vm.user).then(function(user){
			$location.path('/app/register');
		}, function(error){
			vm.error = error;
		});
	};
}]);