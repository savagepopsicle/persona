var myApp = angular.module('like', ['like.services', 'like.register', 'like.browse', 'like.dashboard', 'like.login', 'ngRoute']);
myApp.controller('likeCtrl', function () {

});

myApp.config(function ($routeProvider) {
  $routeProvider
    //for now we will just redirect use to the login page.
    .when('/', {
      templateUrl : './app/templates/login.html',
      controller : 'loginCtrl'
    })
    .when('/login', {
      templateUrl : './app/templates/login.html',
      controller : 'loginCtrl'
    })
    .when('/register', {
      templateUrl : './app/templates/register.html',
      controller : 'registerCtrl'
    })
    .when('/browse', {
      templateUrl : './app/templates/browse.html',
      controller : 'browseCtrl' 
    })
    .when('/dashboard', {
      templateUrl : './app/templates/dashboard.html',
      controller: 'dashboardCtrl'
    });
});
