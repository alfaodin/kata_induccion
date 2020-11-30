'use strict';

angular.module('Group')
  .controller('group', function ($scope) {

    var MAX_NUMBER_TILES = 4;

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

    $scope.setWorldAndCellsConfiguration = function (worldConfig) {
      changeWorldState(worldConfig);
    }

    $scope.runWorldIteration = function () {
      checkIfCellLives();
    }

    function checkIfCellLives() {
      var auxWorldTiles = copyArray($scope.worldTiles);
      for (var i = 0; i < auxWorldTiles.length; i++) {
        var element = auxWorldTiles[i];
        for (var j = 0; j < element.length; j++) {
          auxWorldTiles[i][j] = 0;
        }
      }

      changeWorldState(auxWorldTiles);
    }

    function checkNeighbour(rowPosition, colPosition) {
      var rowLimits = getLimits(rowPosition);
      var colLimits = getLimits(colPosition);

      for (var i = rowLimits.startIndex; i < rowLimits.endIndex; i++) {
        if(i === rowPosition){
          continue;
        }

        for (var j = colLimits.startIndex; j < colLimits.endIndex; j++) {
          if(j === colPosition){
            continue;
          }
        }
      }
    }

    function getLimits(positionInMatrix) {
      var startIndex = positionInMatrix - 1 < 0 ? 0 : positionInMatrix - 1;
      var endIndex = positionInMatrix + 1 > MAX_NUMBER_TILES - 1 ? MAX_NUMBER_TILES : positionInMatrix + 1;
      return { startIndex: startIndex, endIndex: endIndex };
    }

    function copyArray(worldTiles) {
      return JSON.parse(JSON.stringify(worldTiles));
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
