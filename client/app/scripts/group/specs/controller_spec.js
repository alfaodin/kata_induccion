'use strict';

describe('Controller: select group', function () {

  beforeEach(module('App'));
  beforeEach(module('Group'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('group', { $scope: scope });
  }));

  describe('On instance', function () {

    it('should creates an empty world with the DEFAULT SIZE', function () {
      expect(scope.worldTiles.length).toEqual(scope.DEFULT_WORLD_SIZE);
      expect(scope.worldTiles[0].length).toEqual(scope.DEFULT_WORLD_SIZE);
    });

    it('should creates a world of 2x2', function () {
      var CONFIG_WORLD = [
        [1, 0],
        [0, 0]
      ];
      scope.setWorldAndCellsConfiguration(CONFIG_WORLD);

      expect(scope.worldTiles.length).toEqual(2);
      expect(scope.worldTiles[0].length).toEqual(2);
    });

    it('should creates a world of 4x4', function () {
      var CONFIG_WORLD = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      scope.setWorldAndCellsConfiguration(CONFIG_WORLD);

      expect(scope.worldTiles.length).toEqual(4);
      expect(scope.worldTiles[0].length).toEqual(4);
    });

    it('should creates a world fill by 0', function () {
      var CONFIG_WORLD = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      scope.setWorldAndCellsConfiguration(CONFIG_WORLD);

      expect(scope.worldTiles).toEqual(CONFIG_WORLD);
    });

    it('should has a initial history 0', function () {
      var CONFIG_WORLD = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      scope.setWorldAndCellsConfiguration(CONFIG_WORLD);
      expect(scope.worldTilesHistory.length).toEqual(0);
    });

    describe('when setWorldAndCellsConfiguration', function () {
      it('should creates a world with an Cell at 0x0 position', function () {
        var CONFIG_WORLD = [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
        scope.setWorldAndCellsConfiguration(CONFIG_WORLD);

        expect(scope.worldTiles).toEqual(CONFIG_WORLD);
      });

      it('should creates a history of the previous world', function () {
        var CONFIG_WORLD_ITERATION_1 = [
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
        scope.setWorldAndCellsConfiguration(CONFIG_WORLD_ITERATION_1);

        scope.runWorldIteration();
        expect(scope.worldTilesHistory[0]).toEqual([
          [1, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ]);
      });
    });

    it('should cell die because there are not neighbours', function () {
      var CONFIG_WORLD = [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
      scope.setWorldAndCellsConfiguration(CONFIG_WORLD);
      scope.runWorldIteration();

      expect(scope.worldTiles).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);
    });

    it('should cells life because they are a BLOCK', function () {
      var CONFIG_WORLD = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ];
      scope.setWorldAndCellsConfiguration(CONFIG_WORLD);
      scope.runWorldIteration();

      expect(scope.worldTiles).toEqual(CONFIG_WORLD);
    });

    it('should cells life because they are a OCILATOR', function () {
      var CONFIG_WORLD = [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0]
      ];
      scope.setWorldAndCellsConfiguration(CONFIG_WORLD);
      scope.runWorldIteration();

      expect(scope.worldTiles).toEqual([
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);
    });

    it('should cells life because they are a GLITER', function () {
      var CONFIG_WORLD = [
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ];
      scope.setWorldAndCellsConfiguration(CONFIG_WORLD);
      scope.runWorldIteration();

      expect(scope.worldTiles).toEqual([
        [0, 0, 0, 0],
        [1, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0]
      ]);
    });

    it('should cells life because they are a GLITER after SIX iteration', function () {
      var CONFIG_WORLD = [
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ];
      scope.setWorldAndCellsConfiguration(CONFIG_WORLD);

      scope.runWorldIteration();
      expect(scope.worldTiles).toEqual([
        [0, 0, 0, 0],
        [1, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0]
      ]);

      scope.runWorldIteration();
      expect(scope.worldTiles).toEqual([
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [1, 0, 1, 0],
        [0, 1, 1, 0]
      ]);

      scope.runWorldIteration();
      expect(scope.worldTiles).toEqual([
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 1],
        [0, 1, 1, 0]
      ]);

      scope.runWorldIteration();
      expect(scope.worldTiles).toEqual([
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
        [0, 1, 1, 1]
      ]);

      scope.runWorldIteration();
      expect(scope.worldTiles).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 1],
        [0, 0, 1, 1]
      ]);

      scope.runWorldIteration();
      expect(scope.worldTiles).toEqual([
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 1]
      ]);
    });

    it('should cells life because they are a custom OCILATOR', function () {
      var CONFIG_WORLD = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0]
      ];
      scope.setWorldAndCellsConfiguration(CONFIG_WORLD);
      scope.runWorldIteration();

      expect(scope.worldTiles).toEqual([
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0]
      ]);
    });

    it('should be like L after the first iteration', function () {
      var CONFIG_WORLD = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ];
      scope.setWorldAndCellsConfiguration(CONFIG_WORLD);
      scope.runWorldIteration();

      expect(scope.worldTiles).toEqual([
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ]);
    });

    it('should show a Matrix with only one Cell lived that is entered', function () {
      var CONFIG_WORLD = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];

      scope.changeCellStateAtPosition(0,0);
      CONFIG_WORLD[0][0] = 1;

      expect(scope.worldTiles).toEqual(CONFIG_WORLD);

      scope.changeCellStateAtPosition(0,0);
      CONFIG_WORLD[0][0] = 0;

      expect(scope.worldTiles).toEqual(CONFIG_WORLD);

      scope.changeCellStateAtPosition(0,0);
      scope.changeCellStateAtPosition(0,1);
      scope.changeCellStateAtPosition(0,2);
      CONFIG_WORLD[0][0] = 1;
      CONFIG_WORLD[0][1] = 1;
      CONFIG_WORLD[0][2] = 1;

      expect(scope.worldTiles).toEqual(CONFIG_WORLD);

    });

    it('should show an empty Matrix after reset changes', function () {
      var CONFIG_WORLD = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];

      scope.changeCellStateAtPosition(0,0);
      CONFIG_WORLD[0][0] = 1;

      expect(scope.worldTiles).toEqual(CONFIG_WORLD);

      scope.resetWorld();
      
      CONFIG_WORLD[0][0] = 0;
      expect(scope.worldTiles).toEqual(CONFIG_WORLD);
      
      expect(scope.worldTilesHistory).toEqual([]);
    });

    it('should show the selected HISTORY ITERATION', function () {
      var CONFIG_WORLD_ITERATION_1 = [
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ];
      
      var CONFIG_WORLD_ITERATION_2 = [
        [0, 0, 0, 0],
        [1, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0]
      ];
      
      var CONFIG_WORLD_ITERATION_3 = [
        [0, 0, 0, 0],
        [0, 0, 1, 0],
        [1, 0, 1, 0],
        [0, 1, 1, 0]
      ];

      scope.setWorldAndCellsConfiguration(CONFIG_WORLD_ITERATION_1);

      scope.runWorldIteration();
      expect(scope.worldTiles).toEqual(CONFIG_WORLD_ITERATION_2);

      scope.runWorldIteration();
      expect(scope.worldTiles).toEqual(CONFIG_WORLD_ITERATION_3);

      expect(scope.worldTilesHistory.length).toEqual(2);

      scope.gotoSelectedWorldHistoryByIndex(1);
      
      expect(scope.worldTiles).toEqual(CONFIG_WORLD_ITERATION_2);
    });

    it('should show the CURRENT ITERATION', function () {
      var CONFIG_WORLD_ITERATION_1 = [
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ];
      
      var CONFIG_WORLD_ITERATION_2 = [
        [0, 0, 0, 0],
        [1, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0]
      ];
      
      scope.setWorldAndCellsConfiguration(CONFIG_WORLD_ITERATION_1);

      scope.runWorldIteration();

      scope.gotoSelectedWorldHistoryByIndex(0);

      expect(scope.worldTiles).toEqual(CONFIG_WORLD_ITERATION_1);

      scope.gotoCurrentWorldIteration();

      expect(scope.worldTiles).toEqual(CONFIG_WORLD_ITERATION_2);

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
