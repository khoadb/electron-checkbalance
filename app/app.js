var request = require('request');
var util = require ('util');
//humanize time
var ago = require('s-ago');

const path = require('path')

var mainApp = angular.module("mainApp", ['ngRoute', 'ngResource']);

mainApp.config(['$routeProvider', function($routeProvider) {
   $routeProvider.
   
   when('/landingPage', {
      templateUrl: 'views/landing-screen.html', controller: 'LandingCtrl'
   }).
   
   when('/showBalance', {
      templateUrl: 'views/show-balance.html', 
      controller: 'BalanceController'
   }).

   when('/showCardInfo', {
      templateUrl: 'views/show-cardInfo.html', 
      controller: 'BalanceController'
   }).

   when('/showVideo', {
      templateUrl: 'views/landing-screen.html', controller: 'VideoController'
   }).
   
   otherwise({
      redirectTo: '/landingPage'
   });
	
}]);


mainApp.controller('LandingCtrl', function($rootScope, $scope, $location, $timeout, nfcPhonesService) {
	
	$scope.message = "This page will be used to display add student form";

	//nfcPhonesService.getPhones();


	var todoList = this;
	//var todoList = {};
    todoList.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];
 
    // todoList.addTodo = function() {
    //   todoList.todos.push({text:todoList.todoText, done:false});
    //   todoList.todoText = '';
    // };
 
    // todoList.remaining = function() {
    //   var count = 0;
    //   angular.forEach(todoList.todos, function(todo) {
    //     count += todo.done ? 0 : 1;
    //   });
    //   return count;
    // };
 
    // todoList.archive = function() {
    //   var oldTodos = todoList.todos;
    //   todoList.todos = [];
    //   angular.forEach(oldTodos, function(todo) {
    //     if (!todo.done) todoList.todos.push(todo);
    //   });
    // };

    console.log("Show default landing stuffs..!", todoList.todos);

    //simulate card tap
 //    $timeout(function(){ 
 //  		logged_in = true;
 //  		$location.path("/showVideo"); 
	// },3000);

})


// // Simple GET request example:
// $http({
//   method: 'GET',
//   url: '/someUrl'
// }).then(function successCallback(response) {
//     // this callback will be called asynchronously
//     // when the response is available
//   }, function errorCallback(response) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });


mainApp.controller('BalanceController', function($rootScope, $scope, $routeParams, $location, $timeout, WCFService, testWCFService) {
	
	$scope.message = "This the balance controller.";
	//WCFService.getCardInfo();

	//reset scope values
	$scope.customer_info = {};
	$scope.customer_trans = {};

	//khd, get the params:
	var param1 = $routeParams.card_id;
	console.log("Paramenter are: ", param1);


    //Get list of transactions
	testWCFService.getCustTrans(param1)
        .then( function(response) {
          console.log('getCustTrans - Raw data: ', response);
          console.log('Data: ', response.data);
          console.log('Data.lenght: ', response.data.length);
          $scope.customer_trans = response.data;
        }, function(response) {
        	console.log("error...");
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        //console.log('nfcUseCasesService response with an error', status);
        });

    //get customer information
 	testWCFService.getCustInfo(param1)
        .then( function(response) {
          console.log('getCustInfo - Raw data: ', response);
          console.log('Data: ', response.data);
          console.log('Data.lenght: ', response.data.length);
          $scope.customer_info = response.data;
        }, function(response) {
        	console.log("error...");
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        //console.log('nfcUseCasesService response with an error', status);
        });       



    //finally set status to 'ready'
    $rootScope.status = 'ready';


	var todoList = this;
	//var todoList = {};
    todoList.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];
 

    console.log("Show Balacne..!");


    //test timer 
 //    $timeout(function(){ 
 //  		logged_in = true;
 //  		$location.path("/landingPage"); 
	// },5000);

})


mainApp.controller('VideoController', function($rootScope, $scope, $location, $timeout, WCFService) {
	
	$scope.message = "This the Show Video controller.";

	//WCFService.getCardInfo();

	var todoList = this;
	//var todoList = {};
    todoList.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];
 

    console.log("Show Video..!");

    // setTimeout(function() {	
    //  	$location.path('/showBalance');
    //  	//$location.path("/");
    //  	console.log('timeer: '); 
    //  	console.log($location.path());
    //  }, 5000);


    $timeout(function(){ 
  		logged_in = true;
  		$location.path("/showBalance"); 
	},10000);

    console.log('end timeer: ');  
    

})


//khd, some customer filter
mainApp.filter('reverse', function() {
  return function(input, uppercase) {
  	//console.log("input a: ", input, uppercase); 
    input = input || '';
    var out = '';
    for (var i = 0; i < input.length; i++) {
      out = input.charAt(i) + out;
    }
    // conditional based on optional argument
    if (uppercase) {
      out = out.toUpperCase();
    }
    return out;
  };
})

//khd, some customer filter
mainApp.filter('ago_filter', function() {
  return function(input, uppercase) {
    //console.log("input a: ", input, uppercase); 
    input = input || '';
    var out = '';

    // for (var i = 0; i < input.length; i++) {
    //   out = input.charAt(i) + out;
    // }
    var now = new Date(); //for test
    var hoursAgo = new Date(now - (6 * 60 * 60 * 1000)); //for test
    var trx_date = new Date(input); //for test
    
    var zeit = ago(trx_date); // 'just now' 

    out = zeit;

    // conditional based on optional argument
    if (uppercase) {
      out = out.toUpperCase();
    }
    return out;
  };
})

//khd, add digits separator, i.e. 1000 -> 1,000
mainApp.filter('currency_digits', function() {
  return function(input, uppercase) {
    //console.log("input: ", input, uppercase); 

    input = input || '';
    var out = '';

    out = input.toLocaleString();
    //return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //out = input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // for (var i = 0; i < input.length; i++) {
    //   out = input.charAt(i) + out;
    // }
    // // conditional based on optional argument
    // if (uppercase) {
    //   out = out.toUpperCase();
    // }

    return out;

  };
})


mainApp.service('WCFService', function () {
  this.getCardInfo = function() {
  	//var filename = path.join(__dirname, '/assets/test.json')
    //console.log('filename: ', filename);

    // existed customer
	//getCustomerInfo("300000000511");
	// transactions of existed customer
    var trans = getCustomerTransactions("1646667492", 20);
    //var mydata = JSON.parse(trans);
    console.log("trans data", trans);
    //return mydata;
  };

});


mainApp.service('nfcPhonesService', function () {
  this.getPhones = function() {
  	var filename = path.join(__dirname, '/assets/test.json')
    console.log('filename: ', filename);
    var mydata = JSON.parse(filename);
    console.log(mydata);
    //return mydata;
  };

});

mainApp.service('testWCFService', function ($http) {
  this.getCustInfo = function(card_id) {

    //test card '1646667492'
  	var cardID = card_id || '12345679';
  	//$httpProvider.defaults.headers.get = { 'My-Header' : 'value' };
  	var auth = { 'Authorization' : 'UI97pEi1rrcjr8lovGNWYC1k975PM9' };
  	var config = { 'headers' : auth };
    
    return $http.get('http://115.75.6.184:2893/RestServiceImpl.svc/cards/' + cardID, config);
  };

  this.getCustTrans = function(card_id) {

  	//test card '1646667492'
  	var cardID = card_id || '12345679';

  	var limit = 200;
  	//$httpProvider.defaults.headers.get = { 'My-Header' : 'value' };
  	var auth = { 'Authorization' : 'UI97pEi1rrcjr8lovGNWYC1k975PM9' };
  	var config = { 'headers' : auth };
    
    var url = 'http://115.75.6.184:2893/RestServiceImpl.svc/transactions/get_by_nfc/' + cardID + '?limit=' + limit;
    console.log("New Strung URL: ", url); 

    return $http.get( url, config ) ;
  };



});




function wcfRequest(method, uriPath, params, callback){
	if (typeof params === 'function') {
    	callback = params;
    	params = {};
	}

  	//params.uri = "http://192.168.8.32:2893/RestServiceImpl.svc" + uriPath;
  	params.uri = "http://115.75.6.184:2893/RestServiceImpl.svc" + uriPath;
  	params.json = true;
  	params.headers = params.headers || {};
  	params.headers.Authorization = "UI97pEi1rrcjr8lovGNWYC1k975PM9";
  	params.method = method.toUpperCase();

  	request(params, callback);
}


/* 
Input params:
	- nfcCode: nfc-code on the customer card
	- limit: number of transactions, default is 10
Response:
	- 200: get success
	- others: get failed. Check body to details
*/
function getCustomerInfo(nfcCode) {
	wcfRequest('get', '/cards/' + nfcCode, callback);

	function callback(err, response, body) {
		if (err) {
			console.log("Some errors occurred: ", err);
			return;
		}

		if (response.statusCode === 200) {
			//console.log("Yup, customer info:", JSON.stringify(body, null, 4))
		} else {
			console.log("Response code", response.statusCode)
			console.log("Response body", body)
		}
	}
}

/* 
Input params:
	- nfcCode: nfc-code on the customer card
	- limit: number of transactions, default is 10. Transansaction was sort from newest to oldest
Response:
	- 200: get success
	- others: get failed. Check body to details
*/
function getCustomerTransactions(nfcCode, limit = 50) {
	var url = util.format("/transactions/get_by_nfc/%s?limit=%d", nfcCode, limit);
	console.log(url);
	wcfRequest('get', url, callback);

	function callback(err, response, body) {
		if (err) {
			console.log("Some errors occurred: ", err);
			return;
		}

		if (response.statusCode === 200) {
			console.log("Yup, customer transactions:", JSON.stringify(body, null, 4))
		} else {
			console.log("Response code", response.statusCode)
			console.log("Response body", body)
		}
	}

}


