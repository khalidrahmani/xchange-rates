var app = angular.module('exchangeRatesApp', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{?').endSymbol('?}');
});
app.controller('mainController', function($scope, $http, $location, mainFactory){
  function init(){
    mainFactory.getData(window.location.search).success(function(data){
	/*	  new Morris.Line({
		  element:    'rateschart',
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
		  fillOpacity: 0.5,
		  yLabelFormat: function (y) { return Math.round(y * 10000) / 10000; }
		});
    })*/

	//    $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
	        console.log(data)
	        $('#rateschart').highcharts('StockChart', {
	            rangeSelector : {
	                enabled : false
	            },	            
	 			navigator : {
	                enabled : false
	            },
	            scrollbar : {
	                enabled : false
	            },            
	            series : [{
	                name : 'value',
	                data : data.chart_data,
	                tooltip: {
	                    valueDecimals: 2
	                }
	            }]
	        });
	    });    
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