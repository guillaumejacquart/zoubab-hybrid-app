// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', [
	'ionic',
	'ionic.service.core', 
	'LocalStorageModule',
	'angularFileUpload'])

.run(function($ionicPlatform, $rootScope, UserService, UserStorageService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		$rootScope.isChat = toState.name == 'app.chat';
	});
	
	if(typeof(Crittercism) !== 'undefined'){
		Crittercism.init({ 
			'iosAppID' : 'YOUR_IOS_APP_ID',
			'androidAppID' : 'df2a047e565541d4b538c1ec06c46e3a00444503'
		});
	}
	
	var push = new Ionic.Push({
      "debug": true
    });
	
	var deviceToken;
	if(ionic.Platform.isWebView()){
		push.register(function(token) {
			deviceToken = token.token;
			try{
				var user = UserStorageService.getUser();
				if (user && user._id){
					console.log('user authenticated !');
					UserService.update({
						_id: user._id,
						deviceToken: deviceToken
					});
				}
			} 
			catch(err){
				console.log(err);
			}
		});
	}
	
	UserService.init();
  });
})

.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('login', {
    url: '/login',
	templateUrl: 'templates/login.html',
	controller: 'LoginCtrl',
	controllerAs: 'login'
  })

  .state('register', {
      url: '/register',
	  templateUrl: 'templates/register.html',
	  controller: 'RegisterCtrl',
	  controllerAs: 'register'
    })

  .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl',
		  controllerAs: 'profile'
        }
      }
    })
    .state('app.chat', {
      url: '/chat',
      views: {
        'menuContent': {
          templateUrl: 'templates/chat.html',
          controller: 'ChatCtrl',
		  controllerAs: 'chat'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/chat');

  localStorageServiceProvider.setPrefix('zoubab');
});

var baseUrl = "http://www.zoubab.com:80";
var apiUrl = baseUrl + "/api";
