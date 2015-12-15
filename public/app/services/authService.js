(function () {
  'use strict';

  angular.module('like.login')
  .factory('authService', ['$http', function ($http) {
    var logIn = function (userObj) {
     return $http({
      method: 'POST',
      url: '/api/signin',
      data: userObj
     });
    };

    var logOut = function () {
      console.log('trying to log out');
      return $http({
        method: 'GET',
        url: '/api/signout'
      });
    };

    var register = function (useObj) {
      return $http({
        method: 'POST',
        url: '/api/profile/create',
        data: useObj
      });
    };
////need to test this with server
    var update = function (userDataObj) {
      return $http({
        method: 'PUT',
        url: 'api/user/update/' + userDataObj.userId,
        data: userDataObj
      }).then(function (data) {
        return data;
      }).catch(function (data) {
        return data;
      });
    };
    
////need to test this with server
    var deleteUser = function (userId) {
      return $http({
        method: 'DELETE',
        url: 'api/delete/' + userId
      }).then(function (data) {
        return data;
      }).catch(function (data) {
        return data;
      });
    };

    return {
      logIn: logIn,
      logOut: logOut,
      register: register,
      update: update,
      deleteUser: deleteUser
    };
  }]);
})();
