var app = angular.module('exchangeRatesApp', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{?').endSymbol('?}');
});
app.controller('mainController', function($scope, $http, $location, mainFactory){
  function init(){
    mainFactory.getData(window.location.search).success(function(data){
		  new Morris.Line({
		  element:    'myfirstchart',
		  data:       data.chart_data,
		  xkey:       'date',
		  ykeys:      ['value'],
		  labels:     ['rate'],
		  xLabels:    [data.xlabel],
		  ymin: data.ymin,
		  ymax: data.ymax,
		  smooth: false,
		  lineColors:['#FF6600'],
		  pointSize: 2.5,
		  lineWidth: 2.5,
		  xLabelAngle: 5,
		  fillOpacity: 0.5
		});
    })
  };
  init();
});

app.factory('mainFactory', function($http){
  var factory = {};
  factory.getData = function(params){
    return $http.get('/main/getData'+params)
  }
  return factory;
});