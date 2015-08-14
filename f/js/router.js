'use strict';
app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/accounts');
    
  //accounts
  $stateProvider.state('accounts', {
      url: '/accounts',
      templateUrl: 'templates/account/accountLst.html',
      controller: 'AccountCtrl'
  });
  
    $stateProvider.state('account', {
    url: '/accounts/:_id',
    templateUrl: 'templates/account/accountDtl.html',
    controller: 'AccountCtrl'
    }); 
  
  
	 $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
		  controller: 'LoginCtrl'
    });
	 $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'templates/sign-up.html',
		  controller: 'SignUpCtrl'
    });
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'templates/home-feed.html',
		  controller: 'HomeCtrl'
    });
	 $stateProvider.state('post', {
        url: '/post/:Id',
        templateUrl: 'templates/post.html',
		  controller: 'PostCtrl'
    });
	 $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'templates/profile.html',
		  controller: 'ProfileCtrl'
    });
	 $stateProvider.state('photos', {
        url: '/photos',
        templateUrl: 'templates/photos.html',
		  controller: 'PhotosCtrl'
    });
	 $stateProvider.state('photosgrid', {
        url: '/photosgrid',
        templateUrl: 'templates/photos-grid.html',
		  controller: 'PhotosCtrl'
    });
	 $stateProvider.state('photo', {
        url: '/photo/:Id',
        templateUrl: 'templates/photo.html',
		  controller: 'PhotoCtrl'
    });
	 
	 $stateProvider.state('contact', {
        url: '/contact',
        templateUrl: 'templates/contact.html',
		  controller: 'ContactCtrl'
    });
	 $stateProvider.state('forms', {
        url: '/forms',
        templateUrl: 'templates/forms.html',
		  controller: 'FormsCtrl'
    });
	 
	 $stateProvider.state('loginsample', {
        url: '/loginsample',
        templateUrl: 'templates/login-sample.html',
		  controller: 'LoginSampleCtrl'
    });
	 $stateProvider.state('registersample', {
        url: '/registersample',
        templateUrl: 'templates/register-sample.html',
		  controller: 'RegisterSampleCtrl'
    });
	 $stateProvider.state('commentform', {
        url: '/commentform',
        templateUrl: 'templates/comment-form.html',
		  controller: 'CommentFormCtrl'
    });
	 $stateProvider.state('commentformfooter', {
        url: '/commentformfooter',
        templateUrl: 'templates/comment-form-footer.html',
		  controller: 'CommentFormFooterCtrl'
    });
	 $stateProvider.state('formwitheverything', {
        url: '/formwitheverything',
        templateUrl: 'templates/form-with-everything.html',
		  controller: 'FormWithEverythingCtrl'
    });
	 $stateProvider.state('formtitlesave', {
        url: '/formtitlesave',
        templateUrl: 'templates/form-title-save.html',
		  controller: 'FormTitleSaveCtrl'
    });
	 $stateProvider.state('camera', {
        url: '/camera',
        templateUrl: 'templates/camera.html',
		  controller: 'CameraCtrl'
    });
	 $stateProvider.state('camerafile', {
        url: '/camerafile',
        templateUrl: 'templates/camera.html',
		  controller: 'CameraFileCtrl'
    });
	 $stateProvider.state('admob', {
        url: '/admob',
        templateUrl: 'templates/admob.html',
		  controller: 'AdmobCtrl'
    });
	 $stateProvider.state('push', {
        url: '/push',
        templateUrl: 'templates/push.html',
		  controller: 'PushCtrl'
    });
	 $stateProvider.state('friends', {
        url: '/friends',
        templateUrl: 'templates/friends.html',
		  controller: 'FriendsCtrl'
    });
}]);