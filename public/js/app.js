var chart;
var app = angular.module('exchangeRatesApp', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{?').endSymbol('?}');
})

app.controller('mainController', function($scope, $http, mainFactory){

  function init(){
    mainFactory.getData().success(function(data){
      $scope.data = data;
      chart = new Morris.Line({
	  element: 'myfirstchart',
	  data: data.chart_data,
	  xkey: 'date',
	  ykeys: ['value'],
	  labels: ['Value']
	});
    })
  };
  init();
});

app.factory('mainFactory', function($http){
  var factory = {};
  factory.getData = function(){
    return $http.get('/main/getData')
  }
  return factory;
});