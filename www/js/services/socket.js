app.factory('SocketService', ['UserStorageService', function(UserStorageService) {  
	
	var service = {};
	var hasAuthenticated = false;
	
	var socket = service.socket = io(baseUrl);
	
	service.authenticate = function(){
		var token = UserStorageService.getToken();
		if(token && ! hasAuthenticated){			
			socket.emit('authenticate', {token: token}); // send the jwt	
			hasAuthenticated = true;
		}	
	}
	
	service.Connect = function(){		
		if(!socket.connected){
			socket.connect();
		}
	}	
	
	service.Disconnect = function(){		
		if(socket.connected){
			socket.disconnect();
			hasAuthenticated = false;
		}
	}
	
	return service;
}]);