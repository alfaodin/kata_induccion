'use strict';

angular.module('Group')
  .controller('group', function ($scope) {
    // TODO this constant must come from a factory
    $scope.DEFULT_WORLD_SIZE = 10;

    var ROW_SIZE = 0;
    var COL_SIZE = 0;

    var worldLastIteration;

    $scope.worldTiles = [[]];
    $scope.worldTilesHistory = [];

    init();

    $scope.setWorldAndCellsConfiguration = function (worldConfig) {
      setWorldLimit(worldConfig);
      changeWorldState(worldConfig);
      resetWorldHistory();
    };

    $scope.runWorldIteration = function () {
      var auxWorldTiles = checkIfCellLives();

      changeWorldState(auxWorldTiles);
    };

    $scope.setOnLyOneConf = function () {
      $scope.setWorldAndCellsConfiguration([
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);
    };

    $scope.setBlockConf = function () {
      $scope.setWorldAndCellsConfiguration([
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0]
      ]);
    };

    $scope.setOcilatorConf = function () {
      $scope.setWorldAndCellsConfiguration([
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]);
    };

    $scope.setCustomeConf = function () {
      var CONFIG_WORLD = [
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ];
      $scope.setWorldAndCellsConfiguration(CONFIG_WORLD);
    };

    $scope.changeCellStateAtPosition = function (rowPosition, colPosition) {
      var currentWorldTiles = copyArray($scope.worldTiles);
      currentWorldTiles[rowPosition][colPosition] = currentWorldTiles[rowPosition][colPosition] === 0 ? 1 : 0;

      changeWorldState(currentWorldTiles);
    };

    $scope.resetWorld = function () {
      createAnEmptyWorldOfSize($scope.DEFULT_WORLD_SIZE, $scope.DEFULT_WORLD_SIZE);
      resetWorldHistory();
    };

    $scope.gotoSelectedWorldHistoryByIndex = function (selectedWorldHistoryIndex) {
      if(!worldLastIteration){
        worldLastIteration = $scope.worldTiles;
      }
      setCurrentWorldState($scope.worldTilesHistory[selectedWorldHistoryIndex]);
    };

    $scope.gotoCurrentWorldIteration = function () {
      if (worldLastIteration) {
        setCurrentWorldState(worldLastIteration);
        worldLastIteration = null;
      }
    };

    function init() {
      createAnEmptyWorldOfSize($scope.DEFULT_WORLD_SIZE, $scope.DEFULT_WORLD_SIZE);
    }

    function createAnEmptyWorldOfSize(rowSize, colSize) {
      var auxWorldTiles = [];
      for (var i = 0; i < rowSize; i++) {
        var row = [];
        for (var j = 0; j < colSize; j++) {
          row.push(0);
        }
        auxWorldTiles.push(row);
      }
      setWorldLimit(auxWorldTiles);
      setCurrentWorldState(auxWorldTiles);
    }

    function resetWorldHistory() {
      worldLastIteration = null;
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
    }

    function setWorldStateHistory(previousWorldState) {
      if (previousWorldState && previousWorldState.length > 0) {
        $scope.worldTilesHistory.push(previousWorldState);
      }
    }
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/group', {
        templateUrl: 'scripts/group/views/group.html',
        controller: 'group'
      });
  });
