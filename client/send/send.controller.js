angular.module('bitclip.sendController', [
  'ngFx'
])

.controller('sendController', ['$scope', '$timeout', 'TxBuilder','Utilities',
  function($scope, $timeout, TxBuilder, Utilities) {

    $scope.morph = function(){
      $scope.confirmed = !$scope.confirmed;
    };

    //initialize transaction details (amount, destination)
    $scope.transactionDetails = {};

    $scope.clearAmount = function(){
      $scope.transactionDetails.amount = "";
    }

    Utilities.isMainNet().then(function(isMainNet){
      $scope.network = isMainNet;
    })

    //TODO: sendPayment Functionality
    $scope.sendPayment = function() {
      console.log("invoking sendPayment: ", $scope.transactionDetails);
      Utilities.isMainNet().then(function(isMainNet){
        Utilities.getCurrentPrivateKey().then(function(currentPrivateKey){
          console.log("currentPrivateKey: ", currentPrivateKey);
          TxBuilder.sendTransaction(currentPrivateKey, $scope.transactionDetails, isMainNet).then(function(message){
            $scope.txSuccessMessage = message;
            $scope.$apply();
            $timeout(function() { $scope.txSuccessMessage = false }, 2000);
          })
          .catch(function(err){
            $scope.txErrorMessage = "Transaction Failed: "+ err.message;
            $scope.$apply();
            $timeout(function() { $scope.txErrorMessage = false }, 2000);
          });
        });
      });
  };
}]);
