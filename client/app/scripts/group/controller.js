'use strict';
angular.module('Group')
  .controller('group', function ($scope, $interval, _) {
    // TODO this constant must come from a factory
    $scope.DEFULT_WORLD_SIZE = 10;

    var ROW_SIZE = 0;
    var COL_SIZE = 0;

    var intervalPromise;
    var worldLastIteration;

    $scope.worldTiles = [[]];
    $scope.worldTilesHistory = [];
    $scope.isIntervalTimerRunning = false;

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

    $scope.periodicallyRunWorldIteration = function () {
      if ($scope.isIntervalTimerRunning) {
        stopIntervalPromise();
      } else {
        intervalPromise = $interval(function () {
          $scope.runWorldIteration();
        }, 1000);
      }
      $scope.isIntervalTimerRunning = !$scope.isIntervalTimerRunning;
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
      if (!worldLastIteration) {
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
      _.range(rowSize).forEach(function (rowElement) {
        auxWorldTiles[rowElement] = [];
        _.range(colSize).forEach(function () {
          auxWorldTiles[rowElement].push(0);
        });
      });
      setWorldLimit(auxWorldTiles);
      setCurrentWorldState(auxWorldTiles);
    }

    function resetWorldHistory() {
      worldLastIteration = null;
      $scope.worldTilesHistory = [];
      resetInterval();
    }

    function resetInterval(){
      $scope.isIntervalTimerRunning = false;
      if (angular.isDefined(intervalPromise)) {
        stopIntervalPromise();
      }
    }

    function checkIfCellLives() {
      var auxWorldTiles = copyArray($scope.worldTiles);
      _.each(auxWorldTiles, function (rowArray, rowIndex) {
        _.each(rowArray, function (colValue, colIndex) {
          auxWorldTiles[rowIndex][colIndex] = checkNeighbour(rowIndex, colIndex);
        });
      });
      return auxWorldTiles;
    }

    function checkNeighbour(rowPosition, colPosition) {
      var rowLimits = getLimits(rowPosition, ROW_SIZE);
      var colLimits = getLimits(colPosition, COL_SIZE);

      var cellState = $scope.worldTiles[rowPosition][colPosition];

      var totalNeighbourAlive = 0;
      _.range(rowLimits.startIndex, rowLimits.endIndex + 1).forEach(function (rowElement) {
        _.range(colLimits.startIndex, colLimits.endIndex + 1).forEach(function (colElement) {
          if ($scope.worldTiles[rowElement][colElement] === 1 && !(colElement === colPosition && rowElement === rowPosition)) {
            totalNeighbourAlive++;
          }
        });
      });

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
        $scope.worldTilesHistory.unshift(previousWorldState);
      }
    }

    function stopIntervalPromise (){
      if (angular.isDefined(intervalPromise)) {
        $interval.cancel(intervalPromise);
        intervalPromise = undefined;
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