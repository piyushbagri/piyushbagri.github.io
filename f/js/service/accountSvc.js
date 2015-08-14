//angular.module('AccountSvc',[])
app.factory('AccountSvc', ['$q',  function($q) {  
        var _db;    
        var _dbname='accounts';
        var _accounts;

        return {
            initDB: initDB,
            getAccounts: getAccounts,
            getAccount: getAccount,
            addAccount: addAccount,
            updateAccount: updateAccount,
            deleteAccount: deleteAccount
        };
        
        function getAccount(docId) {
        	return $q.when(_db.get(docId)).then(function(doc) {
                
                // Dates are not automatically converted from a string.
                doc.CreatedAt = new Date(doc.CreatedAt);
                if(typeof doc.image === 'undefined' || doc.image == '')
                {    
                  doc.image= "http://2.bp.blogspot.com/-sEkHyZzKNXU/VPFXFKxRiBI/AAAAAAAACuA/9aZ-D9jQ-j4/s400-c/captain_america_avengers_2-1280x720.jpg"
                } 
                console.log(doc);               
                return doc;
            });
            
        };        

        function initDB() {
            // Creates the database or opens if it already exists
       //     _db = new PouchDB('accounts', {adapter: 'websql'});
            
			            _db = new PouchDB(_dbname);
         				console.log('db initailize : '+ _dbname);          
            
			            
        };
        
        function destroytDB() {
			_db.destroy().then(function() { 
			console.log('ALL YOUR BASE ARE BELONG TO US') }); 
		};

        function addAccount(account) {
			var _dt=new Date().toISOString();
			var _id=account.name + '-' +_dt;
            account.CreatedAt=new Date().toISOString();
			account._id= _id;
		//	console.log(account);
            return $q.when(_db.put(account));
        };

        function updateAccount(account) {
            account.UpdatedAt=new Date().toISOString();
            return $q.when(_db.put(account));
        };

        function deleteAccount(account) {
            return $q.when(_db.remove(account));
        };

        function getAccounts() {

            if (!_accounts) {
                return $q.when(_db.allDocs({ include_docs: true}))
                          .then(function(docs) {

                            // Each row has a .doc object and we just want to send an 
                            // array of account objects back to the calling controller,
                            // so let's map the array to contain just the .doc objects.
                            _accounts = docs.rows.map(function(row) {
                                // Dates are not automatically converted from a string.
                                row.doc.CreatedAt = new Date(row.doc.CreatedAt);
                                if(typeof row.doc.image === 'undefined' || row.doc.image == '')
                                {    
                                row.doc.image= "http://2.bp.blogspot.com/-sEkHyZzKNXU/VPFXFKxRiBI/AAAAAAAACuA/9aZ-D9jQ-j4/s400-c/captain_america_avengers_2-1280x720.jpg"
                            	}
                                return row.doc;
                            });

                            // Listen for changes on the database.
                            _db.changes({ live: true, since: 'now', include_docs: true})
                               .on('change', onDatabaseChange);

                           return _accounts;
                         });
            } else {
                // Return cached data as a promise
                return $q.when(_accounts);
            }
        };

        function onDatabaseChange(change) {
            var index = findIndex(_accounts, change.id);
            var account = _accounts[index];

            if (change.deleted) {
                if (account) {
                    _accounts.splice(index, 1); // delete
                }
            } else {
                if (account && account._id === change.id) {
                    _accounts[index] = change.doc; // update
                } else {
                    _accounts.splice(index, 0, change.doc) // insert
                }
            }
        }
        
        function findIndex(array, id) {
          var low = 0, high = array.length, mid;
          while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid
          }
          return low;
        }
    }]);


