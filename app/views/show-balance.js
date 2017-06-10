'use strict';

angular.module('Tinizen.checkbalance', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/show-balance', {
			templateUrl:'./tinizen/show-balance.html', controller:'TinizenCtrl'
		})
		.when('/show-landing', {
			templateUrl:'./tinizen/landing-screen.html', controller:'LandingCtrl'
		})

}])

.controller('TinizenCtrl', ['$scope', '$location', function($scope, $location) {
	console.log("Tinizen!");
}])


.controller('LandingCtrl', function() {
	

	var todoList = this;
    todoList.todos = [
      {text:'learn AngularJS', done:true},
      {text:'build an AngularJS app', done:false}];
 
    todoList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };
 
    todoList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };
 
    todoList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };

    console.log("Show default landing stuffs..!", todoList.todos);

})


