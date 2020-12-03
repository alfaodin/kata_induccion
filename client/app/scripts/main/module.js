'use strict';


angular.module('App', [
  'ngRoute',
  'Group',
  'underscore'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/main/views/dashboard.html'
      });
  });

