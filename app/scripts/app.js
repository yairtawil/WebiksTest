angular.module("usersApp.controllers",[]);
angular.module("usersApp.directives",[]);
angular.module("usersApp.services",[]);
angular.module("usersApp",[
  "usersApp.controllers",
  "usersApp.directives",
  "usersApp.services",
  "ngAnimate",
  "ngCookies",
  "ngResource",
  "ngRoute",
  "ngSanitize",
  "ngTouch",
  "ui.router"]);


angular.module("usersApp.controllers").controller("mainController", 
  ['$scope', '$http', 'dataService' ,'$state', function ($scope, $http, dataService, $state) {
    $scope.dataService = dataService;
    $scope.state = $state;
}]); 


angular.module("usersApp").config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "views/home.html",
      controller: 'dataController'
    })
    .state('home.create_edit', {
      url: "/create_edit",
      templateUrl: "views/create_edit.html",
      controller: 'createEditController'
    })
    .state('home.delete_confirm', {
      url: "/delete_confirm/:id",
      templateUrl: "views/delete_confirm.html",
      controller: 'deleteConfirmController'
    })
    .state('analysis', {
      url: "/analysis",
      templateUrl: "views/analysis.html",
      controller: 'analysisController'
    })
    .state('monitor', {
      url: "/monitor",
      templateUrl: "views/monitor.html",
      controller: 'monitorController'
    });
});