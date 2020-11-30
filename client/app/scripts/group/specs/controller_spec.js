'use strict';

describe('Controller: select group', function () {

  beforeEach(module('Group'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('group', { $scope: scope });
  }));

  describe('On instance', function () {
    it('should creates a world of 3x3', function () {
      expect(scope.worldTiles.length).toEqual(3);
      expect(scope.worldTiles[0].length).toEqual(3);
    });

    it('should creates a world fill by 0', function () {
      expect(scope.worldTiles).toEqual([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]);
    });

    it('should has a initial history 1', function () {
      expect(scope.worldTilesHistory.length).toEqual(1);
    });

    describe('when setCellInPositon', function () {
      it('should creates a world with an Cell at 0x0 position', function () {

        scope.setCellInPositon();
        
        expect(scope.worldTiles).toEqual([
          [1, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]);
      });
      
      it('should creates a history of the previous world', function () {
        scope.setCellInPositon();
        expect(scope.worldTilesHistory[1]).toEqual([
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]);
      });
    });
  
  });


  describe('when going to /group', function () {

    var route, location, rootScope, httpBackend;

    beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
      route = $route;
      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/group/views/group.html').respond('<div></div>');
    }));

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should use minesweeper.html and controller', function () {
      expect(route.current).toBeUndefined();

      location.path('/group');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/group/views/group.html');
      expect(route.current.controller).toBe('group');
    });
  });

});
