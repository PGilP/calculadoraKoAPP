(function() {
  'use strict';

  angular
    .module('koappcalculator', [])
    .controller('koappcalculatorController', koappcalculatorController);

  koappcalculatorController.$inject = ['$scope', 'structureService', '$location'];

  function koappcalculatorController($scope, structureService, $location) {

    structureService.registerModule($location, $scope, 'koappcalculator');

    $scope.addValues    = addValues;
    $scope.getOperation = getOperation;
    $scope.reset        = reset;
    $scope.deleteValue  = deleteValue;
    var divide          = divide;
    var minus           = minus;
    var plus            = plus;
    var multiply        = multiply;


    var values          = '';
    var result          = '';
    var lengthNum1      = '';
    $scope.num1         = '';
    $scope.num2         = '';
    $scope.operation    = '';
    $scope.globalResult = '';
    $scope.firstNumber  = '';

    function addValues(num, checkOperator) {
      $scope.num1= $scope.num1.toString();
      if ($scope.globalResult){
        $scope.num1 = $scope.globalResult;
        $scope.num2 = '';
      }

      if (!checkOperator) {
        values += num;

        if(!$scope.num1) $scope.firstNumber =values;
        else $scope.num2 = values;
      } else{
        $scope.operation = checkOperator;
        if (!$scope.num1){
          $scope.firstNumber = '';
          $scope.num1        = values;
        }
        $scope.globalResult = '';
        values              = '';
      }
    }

    function deleteValue(){

      $scope.num1= $scope.num1.toString();
      values = values.substr(0, values.length-1);
      if($scope.num1 && $scope.num2) $scope.num2=values;
      else {
        if($scope.num1 && !$scope.operation) $scope.num1 = $scope.num1.substr(0,$scope.num1.length-1);
        if(!$scope.num2) $scope.operation ='';

      }
      if($scope.firstNumber) $scope.firstNumber=values;
    }

    function getOperation() {

      if ($scope.globalResult){
        $scope.num1 = $scope.globalResult;
        $scope.num2 = '';
      }
      if ($scope.operation == '*') result  = multiply($scope.num1, $scope.num2);
      if ($scope.operation == '+') result  = plus($scope.num1, $scope.num2);
      if ($scope.operation == '/') result  = divide($scope.num1, $scope.num2);
      if ($scope.operation == '-') result  = minus($scope.num1, $scope.num2);
      $scope.globalResult = result;
      result = '';
      console.log('--OPERAR--');
      console.log('num1-->'+$scope.num1);
      console.log('num2-->'+$scope.num2);
      console.log('firstNumber-->'+$scope.firstNumber);
      console.log('values-->'+values);
      console.log('operation-->'+$scope.operation);
      console.log('resultGlobal-->'+$scope.globalResult);
    }

    function divide(a, b) {
      return Math.floor((a / b)*10000)/10000;
    }
    function plus(a,b){
      return Math.floor((((+a)+(+b))*10000))/10000;
    }
    function minus(a, b) {
      return Math.floor((a - b)*10000)/10000;
    }
    function multiply(a, b) {
      return Math.floor((a * b)*10000)/10000;
    }

    function reset() {
      values              = '';
      result              = '';
      $scope.num2         = '';
      $scope.operation    = '';
      $scope.num1         = '';
      $scope.globalResult = '';
      $scope.firstNumber  = '';
    }

  }
}());
