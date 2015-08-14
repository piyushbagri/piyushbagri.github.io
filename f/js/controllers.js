
//myservice device registration id to localstorage
app.service('myService', function($http) {
   this.registerID = function(regID, platform) {
		localStorage.device_token_syt = regID;
		//alert(regID);
   }
});


app.controller('DailogCtrl', function ($mdDialog, obj,title,action) {
        var dlg = this;

        if (typeof obj === 'undefined') {
            obj = {};
        }
        if (typeof action === 'undefined') {
            action ='add';
        }  
        if (typeof title === 'undefined') {
            title ='Create new';
        }      
    
        dlg.action    = action;
        dlg.account    = obj;
        dlg.title   = title;
        dlg.cancel  = cancel;
        dlg.success = success;
     
        function cancel() {
            $mdDialog.cancel();
        }

        function success(obj) {
            $mdDialog.hide(obj);
        }
    
});


// main controller -- where we will render web pages here
app.controller('MainCtrl', function($scope, $mdSidenav, $state, SideBar, myPushNotification){
	//go back function -- go back to revious state
	$scope.goBackSingle = function(){
		window.history.back();
	}
	// sidebar toggle function
	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};
	// array menu sidebar
	$scope.links = SideBar.items;
	// swipe left to close sidebar menu
	$scope.onSwipeLeftMenu = function(){
		$scope.toggleSidenav('left');
	}
	// open link items from side bar -- close menu on link click
	$scope.openLinkMaterial = function(index){
		$scope.toggleSidenav('left');
		$scope.selectedLink = $scope.links[index].datahref;
		$state.go($scope.selectedLink);
	}
	// sharing plugin
	$scope.shareMain = function(){
		var title = "Download Smove For Android";
		var url = "https://play.google.com/store/apps/details?id=com.myspecialgames.swipe";
		window.plugins.socialsharing.share(title, null, null, url)
	}
});
// demo login controller -- but can access values from $scope.login[]
app.controller('LoginCtrl', function( $scope, $state, $interval, myPushNotification ){
	
	//login --
	$scope.login = [];
	$scope.login.email = "";
	$scope.login.password = "";
	// login function -- 
	$scope.loginAccount = function(){
		// write validation here and then redirect
		$state.go('home');
	}
  
});
// sign up controller
app.controller('SignUpCtrl', function( $scope, $state ){
  	$scope.createAccount = function(){
		// create account and redirect here
		$state.go('home');
	}
});
/*
home page -- feed page -- 
a demo page similar to latest news page of a social media app
just a sample design with like box and comment
*/
app.controller('HomeCtrl', function($scope, HomeFeeds, $state){
	
	
	// setting heading of page
	$scope.title_head = 'Home';
	// define posts
	$scope.posts = [];
	// get posts function -- should modify here according to your needs
	$scope.getPosts = function(){
		HomeFeeds.getPosts()
		.success(function (posts) {
			$scope.posts = $scope.posts.concat(posts);
			HomeFeeds.posts = $scope.posts
		})
		.error(function (error) {
			$scope.posts = [];
		});
	}
	// calling get posts -- on page load
   $scope.getPosts();
	// a demmo like button -- to shoe case how you can implement in it -- 
	$scope.liked = true;
	// like post function
	$scope.likeThisPost = function(status){
		if(status == true){
			$scope.liked = false;
		} else {
			$scope.liked = true;
		}
	}
	// function to navigate to post -- 
	// getting index of array and redirecting post
	$scope.showPost = function(index){
		$state.go('post',{
			Id:index
		});
	}
});
// single post page
app.controller('PostCtrl', function( $scope, $state, $stateParams, HomeFeeds, Comments, $anchorScroll ){
	// getting post id from Id stateParams
	var postId = $stateParams.Id;
    
	// user
	$scope.user = [];
	// posts
	$scope.posts = [];
	// comments
	$scope.comments = [];
	// setting user name and profile image -- should do it dynamically in your app
	$scope.user.username = 'Admin';
	$scope.user.userImage = 'img/profile.jpg';
	/* getting comments of a photo */
	$scope.getComments = function(id){
		Comments.getComments()
		.success(function (comments) {
			$scope.comments = $scope.comments.concat(comments);
		})
		.error(function (error) {
			$scope.comments = [];
		});
	}
	/* photos from temperory url */
	$scope.getPosts = function(){
		HomeFeeds.getPosts()
		.success(function (posts) {
			$scope.posts = $scope.posts.concat(posts);
			// selecting a particular post from posts json data
			// we recommend to you to fetch details from server using a key
			// cache or saving data in a scope variable will also be fine
			$scope.myPost = $scope.posts[postId];
			$scope.title_head = $scope.myPost.title;
			// getting comments -- demo comments -- postId here is not using
			$scope.getComments(postId);
		})
		.error(function (error) {
			$scope.posts = [];
		});
	}
   $scope.getPosts();
	// go to profile function
	$scope.goToProfile = function(){
		$state.go('profile');
	}
	$scope.liked = true;
	$scope.likeThisPost = function(status){
		if(status == true){
			$scope.liked = false;
		} else {
			$scope.liked = true;
		}
	}
	// always keep content at top -- avoding scroll issues
  	$anchorScroll();
});

// sign up controller
app.controller('ProfileCtrl', function( $scope, $state ){
	// its all demo data
  	$scope.phones = [
      { type: 'Home', number: '(555) 251-1234' },
      { type: 'Cell', number: '(555) 786-9841' },
   ];
	$scope.Emails = [
      { type: 'Office', number: 'admin@skyafar.com' },
      { type: 'Personal', number: 'info@skyafar.com' },
		{ type: 'Support', number: 'weblogtemplatesnet@gmail.com' },
   ];
});
// photos controller grid -- how it will look
app.controller('PhotosCtrl', function( $scope, $state, Photos ){
  	$scope.posts = [];
	$scope.title_head = 'Photos';
	$scope.getPosts = function(){
		Photos.getPosts()
		.success(function (posts) {
			$scope.posts = $scope.posts.concat(posts);
		})
		.error(function (error) {
			$scope.posts = [];
		});
	}
   $scope.getPosts();
	$scope.navigateToPhoro = function(index){
		$state.go('photo',{Id:index});
	}
});
// single photos page
app.controller('PhotoCtrl', function( $scope, $state, $stateParams, Photos, Comments ){
	
	var photoId = $stateParams.Id;
	$scope.user = [];
	$scope.posts = [];
	$scope.comments = [];
	
	$scope.user.username = 'Admin';
	$scope.user.userImage = 'img/profile.jpg';
	/* getting comments of a photo */
	$scope.getComments = function(id){
		Comments.getComments()
		.success(function (comments) {
			$scope.comments = $scope.comments.concat(comments);
		})
		.error(function (error) {
			$scope.comments = [];
		});
	}
	/* photos from temperory url */
	$scope.getPosts = function(){
		Photos.getPosts()
		.success(function (posts) {
			$scope.posts = $scope.posts.concat(posts);
			$scope.myPost = $scope.posts[photoId];
			$scope.title_head = $scope.myPost.title;
			$scope.getComments(photoId);
		})
		.error(function (error) {
			$scope.posts = [];
		});
	}
   $scope.getPosts();
	
	$scope.goToProfile = function(){
		$state.go('profile');
	}
	$scope.liked = true;
	$scope.likeThisPost = function(status){
		if(status == true){
			$scope.liked = false;
		} else {
			$scope.liked = true;
		}
	}
  	
});
// show ad mob here in this page
app.controller('AdmobCtrl', function($scope, ConfigAdmob){
	// if admob create and show admob banner
	$scope.title_head = 'Admob';
	if(AdMob) {
		// show admob banner ad 
		AdMob.createBanner( {
			adId: ConfigAdmob.banner, 
			position: AdMob.AD_POSITION.BOTTOM_CENTER, 
			autoShow: true 
		} );
		// preparing admob interstitial ad
		AdMob.prepareInterstitial( {
			adId:ConfigAdmob.interstitial, 
			autoShow:false
		} );
	}
	// show admob Interstitial ad
	$scope.showInterstitial = function(){
		if(AdMob) AdMob.showInterstitial();
	}
});
// friends listing page
app.controller('FriendsCtrl', function( $scope, $state, Friends ){
  	$scope.friends = [];
	$scope.title_head = 'Friends';
	$scope.getPosts = function(){
		Friends.getFriends()
		.success(function (posts) {
			$scope.friends = $scope.friends.concat(posts);
		})
		.error(function (error) {
			$scope.friends = [];
		});
	}
   $scope.getPosts();
});
// sample form listing page
app.controller('FormsCtrl', function( $scope, $state, Forms ){
	$scope.title_head = 'Forms';
	$scope.forms = Forms;
});
// sample login form -- example
app.controller('LoginSampleCtrl', function( $scope ){
	$scope.title_head = 'Login';
});
// sample register form -- example
app.controller('RegisterSampleCtrl', function( $scope ){
	$scope.title_head = 'Register';
});
// comment form -- example
app.controller('CommentFormCtrl', function( $scope ){
	$scope.title_head = 'Comment';
});
// a sticky simple comment form -- example
app.controller('CommentFormFooterCtrl', function( $scope ){
	$scope.title_head = 'Comment';
});
//contact form controller -- real example
app.controller('ContactCtrl', function($scope, ConfigContact) {
	
	$scope.title_head = 'Contact Us';
	$scope.user = [];
	// contact form submit event
	$scope.submitForm = function(isValid) {
		if (isValid) {
			cordova.plugins.email.isAvailable(
				function (isAvailable) {
					window.plugin.email.open({
						to:      [ConfigContact.EmailId],
						subject: ConfigContact.ContactSubject,
						body:    '<h1>'+$scope.user.email+'</h1><br><h2>'+$scope.user.name+'</h2><br><p>'+$scope.user.details+'</p>',
						isHtml:  true
					});
				}
			);
		}
	}
})
// a sticky simple comment form -- example
app.controller('FormWithEverythingCtrl', function( $scope ){
	$scope.title_head = 'Sample Form';
});
// a sticky simple comment form -- example
app.controller('FormTitleSaveCtrl', function( $scope, $mdToast, $animate ){
	
	$scope.title_head = 'Title Bar Save';
	$scope.toastPosition = {
    	bottom: false,
    	top: true,
    	left: false,
    	right: true
  	};
	$scope.getToastPosition = function() {
  		return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  	};
  	$scope.showCustomToast = function() {
    	$mdToast.show({
      	controller: 'ToastCtrl',
      	templateUrl: 'templates/partials/toast-template.html',
      	hideDelay: 6000,
      	position: $scope.getToastPosition()
    	});
  	};
	
});
// a toast controller
app.controller('ToastCtrl', function($scope, $mdToast) {
  $scope.closeToast = function() {
    $mdToast.hide();
  };
});
// push controller
app.controller('PushCtrl', function($scope, SendPush){
	
	$scope.title_head = 'Test Push Notification';
	$scope.device_token = $scope.get_device_token();
	$scope.sendNotification = function(){
		SendPush.android($scope.device_token)
		.success(function () {
		})
		.error(function (error) {
		});
	}
});
// camera controller
app.controller('CameraCtrl', function( $scope, Camera ) {
	$scope.imageCamera = '';
	$scope.title_head = 'Camera';
	$scope.type_file = 'camera';
	$scope.getPhoto = function () {
      Camera.getPicture(2).then(function (imageURI) {
			$scope.imageCamera = imageURI;
      }, function (err) {
         alert(err);
      });
   }
});
// camera controller
app.controller('CameraFileCtrl', function( $scope, Camera ) {
	$scope.imageCamera = '';
	$scope.title_head = 'File Uploader';
	$scope.type_file = 'file';
	$scope.getPhoto = function () {
      Camera.getPicture(1).then(function (imageURI) {
			$scope.imageCamera = imageURI;
      }, function (err) {
         alert(err);
      });
   }
});
//