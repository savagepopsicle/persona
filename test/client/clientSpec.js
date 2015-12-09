'user strict';

describe('Services', function () {
  beforeEach(module('like.services'));

  describe('Authentication Service', function () {
    var authService;
    var $http;
    var $httpBackend;
    var authSend;

    beforeEach(inject(function (_authService_, _$httpBackend_) {
      authService = _authService_;
      $httpBackend = _$httpBackend_;
      authSend = sinon.spy(authService, "login");
    }));

    it('should send username and password to the server', function () {
      authSend();
      expect(authSend.callCount).to.equal(1);
    });

    it('should receive a 200 status code on success', function () {
      var username = 'John';
      var password = 'this';
      var userObj = {
        username: username,
        password: password
      };
      $httpBackend
        .expectPOST('/api/login', userObj)
        .respond(200, {});

      authSend(userObj);
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should receive a 747 status code on failure', function () {
      var userObj = {
        username: 'John',
        password: 'wrong'
      };

      $httpBackend.expectPOST('/api/login', userObj)
      .respond(747, {});

      authSend(userObj);
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });

  describe('Dashboard Service', function () {
    var dashboardService;
    var $http;
    var $httpBackend;
    var getUserData;
    var logOut;

    beforeEach(inject(function (_dashboardService_, _$httpBackend_) {
      dashboardService = _dashboardService_;
      $httpBackend = _$httpBackend_;
    }));

    it('should get the user\'s data from the server', function () {
      getUserData = sinon.spy(dashboardService, 'getUserData');
      getUserData();
      expect(getUserData.callCount).to.equal(1);
    });

    it('should receive a 200 status code when successfully get user data', function () {
      getUserData = sinon.spy(dashboardService, 'getUserData');
      var userId = 1;
      $httpBackend
        .expectGET('/api/users/' + userId)
        .respond(200, {});

      getUserData(userId);
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should receive a 200 status code on when successfully log out', function () {
      logOut = sinon.spy(dashboardService, 'logOut');

      $httpBackend
        .expectPOST('/api/logout')
        .respond(200, {});

      logOut();
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});

describe('Controllers', function () {
  beforeEach(module('like'));

  describe('Login Controller', function () {
    beforeEach(module('like.login'));

    var controller;
    var $rootScope;
    var scope;

    beforeEach(inject(function (_$controller_, _$rootScope_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      controller = $controller('loginCtrl', {$scope: scope});
    }));

    it('should have a login function', function () {
      expect(scope.login).to.exist;
    });

    it('should load angular', function () {
      expect(angular).to.exist;
    });
  });

  describe('Dashboard Controller', function () {
    beforeEach(module('like.dashboard'));

    var $controller;
    var $rootScope;
    var scope;
    var $httpBackend;

    beforeEach(inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      $controller('dashboardCtrl', {$scope: scope});
      $httpBackend = _$httpBackend_;
    }));

    it('should have a logout function', function () {
      expect(scope.logout).to.exist;
    });

    it('should have a getUserData function', function () {
      expect(scope.getUserData).to.exist;
    });

    it('should call getUserData once', function () {
      $httpBackend.expectGET('/api/users/').respond('user no. 0');
      $httpBackend.flush();
      expect(scope.userData).to.eql('user no. 0');
    });
  });

  describe('Browse controller', function () {
  beforeEach(module('like.browse'));

  var controller;
  var $httpBackend;
  var $scope;

  beforeEach(inject(function (_$controller_, $injector) {
    controller = _$controller_;
    $httpBackend = $injector.get('$httpBackend');
    $scope = {};
    controller('browseCtrl', { $scope: $scope });
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should make http request to /api/browse', function () {
    //invoke the function then check and see if it make a get request to /api/browse/
    $httpBackend.expect('GET', '/api/browse').respond(200);
    $httpBackend.flush();
  });

  it('should set $scope to false if server respond with 400', function () {
    $httpBackend.expect('GET', '/api/browse').respond(400);
    scope.getAllUsers();
    $httpBackend.flush();
    expect($scope.data).to.equal(false);
  });

  it('should set $scope to an object if server respond with 200', function () {
    $httpBackend.expect('GET', '/api/browse').respond(200, {});
    $scope.getAllUsers();
    $httpBackend.flush();
    expect($scope.data).to.be.an('object');
  });

});
  describe('Browse Controller', function () {
    var controller;
    var $rootScope;
    var scope;

    beforeEach(module('like.browse'));
    beforeEach(inject(function (_$controller_, _$rootScope_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      controller = $controller('browseCtrl', {$scope: scope});
    }));

    it('should have a browseRegionalUsers function', function () {
      expect(scope.browseRegionalUsers).to.exist;
    });
  });
});
