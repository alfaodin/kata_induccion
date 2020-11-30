'use strict';

angular.module('Group')
  .controller('group', function ($scope) {

    var MAX_NUMBER_TILES = 3;

    $scope.worldTiles = [[]];

    $scope.worldTilesHistory = [];

    initController();

    function initController() {
      var auxWorldTiles = [];
      for (var i = 0; i < MAX_NUMBER_TILES; i++) {
        var row = [];
        for (var j = 0; j < MAX_NUMBER_TILES; j++) {
          row.push(0);
        }
        auxWorldTiles.push(row);
      }
      changeWorldState(auxWorldTiles);
    };

    // (horizontalPosition, verticalPosition, cellState)
    $scope.setCellInPositon = function () {
      changeWorldState([
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]);
    }

    function changeWorldState(newWorldState) {
      setWorldStateHistory($scope.worldTiles);
      setCurrentWorldState(newWorldState);
    }

    function setCurrentWorldState(newWorldState) {
      $scope.worldTiles = newWorldState;
    }

    function setWorldStateHistory(previousWorldState) {
      $scope.worldTilesHistory.push(previousWorldState);
    }
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/group', {
        templateUrl: 'scripts/group/views/group.html',
        controller: 'group'
      });
  });
