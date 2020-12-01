'use strict';

angular.module('Group')
  .controller('group', function ($scope) {

    var ROW_SIZE = 0;
    var COL_SIZE = 0;

    $scope.worldTiles = [[]];

    $scope.worldTilesHistory = [];

    $scope.setWorldAndCellsConfiguration = function (worldConfig) {
      resetWorldHistory();
      setWorldLimit(worldConfig);
      changeWorldState(worldConfig);
    }

    $scope.runWorldIteration = function () {
      var auxWorldTiles = checkIfCellLives();

      changeWorldState(auxWorldTiles);
    }

    $scope.setOnLyOneConf = function () {
      $scope.setWorldAndCellsConfiguration([
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);
    }

    $scope.setBlockConf = function () {
      $scope.setWorldAndCellsConfiguration([
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ]);
    }

    $scope.setOcilatorConf = function () {
      $scope.setWorldAndCellsConfiguration([
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);
    }
    
    $scope.setCustomeConf = function () {
      var CONFIG_WORLD = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0]
      ];
      $scope.setWorldAndCellsConfiguration(CONFIG_WORLD);
    }

    function resetWorldHistory() {
      $scope.worldTilesHistory = [];
    }

    function checkIfCellLives() {
      var auxWorldTiles = copyArray($scope.worldTiles);
      for (var i = 0; i < ROW_SIZE; i++) {
        for (var j = 0; j < COL_SIZE; j++) {
          auxWorldTiles[i][j] = checkNeighbour(i, j);
        }
      }
      return auxWorldTiles;
    }

    function checkNeighbour(rowPosition, colPosition) {
      var rowLimits = getLimits(rowPosition, ROW_SIZE);
      var colLimits = getLimits(colPosition, COL_SIZE);

      var cellState = $scope.worldTiles[rowPosition][colPosition];

      var totalNeighbourAlive = 0;
      for (var i = rowLimits.startIndex; i <= rowLimits.endIndex; i++) {
        for (var j = colLimits.startIndex; j <= colLimits.endIndex; j++) {
          if (j === colPosition && i === rowPosition) {
            continue;
          }
          if ($scope.worldTiles[i][j] === 1) {
            totalNeighbourAlive++;
          }
        }
      }

      var newCellState = cellState;
      if (cellState === 0) {
        if (totalNeighbourAlive === 3) {
          newCellState = 1;
        }
      } else {
        if (totalNeighbourAlive < 2 || totalNeighbourAlive > 3) {
          newCellState = 0;
        }
      }

      return newCellState;
    }

    function setWorldLimit(worldTiles) {
      ROW_SIZE = worldTiles.length;
      COL_SIZE = worldTiles[0].length;
    }

    function getLimits(positionInMatrix, limitOfMatrix) {
      var startIndex = positionInMatrix - 1 < 0 ? 0 : positionInMatrix - 1;
      var endIndex = positionInMatrix + 1 > limitOfMatrix - 1 ? limitOfMatrix - 1 : positionInMatrix + 1;
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
      console.table(newWorldState);
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
