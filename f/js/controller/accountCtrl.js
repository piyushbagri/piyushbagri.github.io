app.controller('AccountCtrl', function($scope,  $stateParams, $location, $state,$mdDialog,AccountSvc){
	 
	// setting heading of page
	$scope.title_head = 'Accounts';
	// define posts
	$scope.accounts = [];
	$scope.account = {};
    $scope.dlg={'account':{}};
        
    
    if($stateParams._id )
	{ 
			// Get account records from the database.
			AccountSvc.getAccount($stateParams._id).then(function(account) {
					$scope.account = account;
			});
	}
    
   
	// function to navigate to post -- 
	// getting index of array and redirecting post
	$scope.showAccount = function(account){
   //     $scope.account=account;
		$state.go('account',{
			_id:account._id
		});
	}

 	$scope.getAccounts = function(){
 			// Get all account records from the database.
				AccountSvc.getAccounts().then(function(accounts) {
//						$scope.accounts = $scope.accounts.concat(accounts);
                    	$scope.accounts = accounts;
					},function(){$scope.accounts = [];});    
	}   
    
	// calling get accounts -- on page load
   $scope.getAccounts();
    
	$scope.deleteAccount = function(account) {
			console.log(account);
			AccountSvc.deleteAccount(account);
			$location.path( "/accounts" );
	};
    
	// Perform the login action when the user submits the login form
	$scope.saveAccount = function(account,action) {
			
	  		if (action === 'add') {
				AccountSvc.addAccount(account);
			} else {
				AccountSvc.updateAccount(account);
			}
        //	$scope.getAccounts();
	}    
    
    
    
     
         $scope.cancel = function() {
            $mdDialog.cancel();
        }

         $scope.success = function(obj) {
            $mdDialog.hide(obj);
        }
    
    
	$scope.showAccountDailog = function(ev,obj) { 
            $scope.dlg.account = obj;
        	var title ='Edit Account',
                action='';
        	if (typeof obj === 'undefined') {
            obj = {};
            title = 'Add account';
            action ='add';    
        	}        
            $mdDialog.show({
                controller: 'AccountCtrl',
                controllerAs: 'dlg',
                templateUrl: 'templates/account/accountDialog.html',
                targetEvent: ev,
                /*locals: {
                    obj: obj,
                    title: title,
                    action: action
                }*/
            })
            .then(function(account) {
				$scope.saveAccount(account,action);
            });

	} 
    
});


app.controller('AccountCtrlr', function($scope, $stateParams, $location,$timeout, AccountSvc) {

		$scope.accounts = {};
		$scope.account = {};
        $scope.AccountFormTypeOptions = [
              { id : "agent", name: "Agent" }
             ,{ id : "drawee", name: "Drawee" }
             ,{ id : "drawer"  , name: "Drawer" }
             ];		
        $scope.AccountFormStatusOptions = [
              { id : "active", name: "Active" }
             ,{ id : "inactive", name: "Inactive" }
             ,{ id : "hold"  , name: "Hold" }
             ];	             

		// Initialize the database.

		$ionicPlatform.ready(function() {
				// Get all account records from the database.
				AccountSvc.getAccounts().then(function(accounts) {
						//console.log(accounts)
						$scope.accounts = accounts;
					});
			});

		if($stateParams._id )
		{
			// Get account records from the database.
			AccountSvc.getAccount($stateParams._id).then(function(account) {
					$scope.account = account;
					//$scope.$apply();
				});
		}

		// Initialize the modal view.
		$ionicModal.fromTemplateUrl('templates/account/accountMdl.html', {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
			});

		$scope.showAddAccountModal = function() {
			$scope.account = {};
			$scope.action = 'Add';
			$scope.isAdd = true;
			$scope.modal.show();
		};

		$scope.showEditAccountModal = function(account) {
			$scope.account = account;
			$scope.action = 'Edit';
			$scope.isAdd = false;
			$scope.modal.show();
		};

		$scope.deleteAccount = function(account) {
			console.log(account);
			AccountSvc.deleteAccount(account);
			$location.path( "/accounts" );
			$scope.modal.hide();
		};

		// Triggered in the modal to close it
		$scope.closeAccountModal = function() {
			$scope.modal.hide();
		};

		// Perform the login action when the user submits the login form
		$scope.saveAccount = function(form) {
			console.log(form);
		    if(form.$valid) {
				console.log($scope.account);
	 			if ($scope.isAdd) {
					AccountSvc.addAccount($scope.account);
				} else {
					AccountSvc.updateAccount($scope.account);
				}
			form.$setPristine();
			$scope.modal.hide();
			}
		};

		// A confirm dialog
		$scope.confirmDeleteAccount = function(account) {

			var confirmPopup = $ionicPopup.confirm({
					title: 'Confirm delete account',
					template: 'Do you reaily want to delete this account ?'
				});
			confirmPopup.then(function(res) {
					if(res) {
						console.log('You are sure');
						console.log(account);
						$scope.deleteAccount(account);
					} else {

						$location.path( "/accounts" );
						$scope.modal.hide();
					}
				});
		};



	});
