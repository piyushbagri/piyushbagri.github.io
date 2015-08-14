// http://techiedreams.com/demos/polymertodo/   https://github.com/bdelaforest/material-pouchdb-todolist
// angular.module is a global place for creating, registering and retrieving Angular modules
var app = angular.module( 'YourApp', [ 'ngMaterial', 'ui.router', 'ngCordova'] )
app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
});

//app run getting device id
app.run(function ($rootScope, myPushNotification,AccountSvc) {
	// app device ready 
    AccountSvc.initDB();
	document.addEventListener("deviceready", function(){
		if(!localStorage.device_token_syt || localStorage.device_token_syt == '-1'){
			myPushNotification.registerPush();
		}
	});
   $rootScope.get_device_token = function () {
      if(localStorage.device_token_syt) {
         return localStorage.device_token_syt;
      } else {
         return '-1';
      }
   }
   $rootScope.set_device_token = function (token) {
      localStorage.device_token_syt = token;
      return localStorage.device_token_syt;
   }
});