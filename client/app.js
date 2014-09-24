angular.module('bitclip', [
  'ui.router',
  'bitclip.headerController',
  'bitclip.headerDirective',
  'bitclip.headerFactory',
  'bitclip.receiveController',
  'bitclip.receiveFactory',
  'bitclip.sendController',
  'bitclip.sendFactory',
  'bitclip.historyController',
  'bitclip.historyFactory',
  'bitclip.utilitiesFactory'
])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/send');
  $stateProvider
    .state('send', {
      url: '/send',
      templateUrl: 'send/send.tpl.html',
      controller: 'sendController'
    })
    .state('receive', {
      url: '/receive',
      templateUrl: 'receive/receive.tpl.html',
      controller: 'receiveController'
    })
    .state('history', {
      url: '/history',
      templateUrl: 'history/history.tpl.html',
      constroller: 'historyController'
    });
}])

.controller('navBarController', ['$scope', function($scope){
  $scope.activeTab = 'send';
  $scope.setActiveTab = function(tab) {
    $scope.activeTab = tab;
  };
}])
