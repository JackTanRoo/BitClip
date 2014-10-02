angular.module('bitclip.validateAddress', [])

.directive('validAddress', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attr, ngModelCtrl) {
            console.log("fuck shit less than five");
            //destination is the modelValue
            ngModelCtrl.$validators.destination = function(modelValue){
              return (FunctionThatJackJustWrote(modelValue)) ? true : false;
            }
          }
    };
}])