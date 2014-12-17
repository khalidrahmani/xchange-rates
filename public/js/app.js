/*var app = angular.module('exchangeRatesApp', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{?').endSymbol('?}');
});
app.controller('mainController', function($scope, $http, $location, mainFactory){
	$scope.result = "45"
  function init(){
    mainFactory.getData(window.location.search).success(function(data){		

	        $scope.current_rate = data.current_rate
	        $scope.result       = data.result

	        $('#rateschart').highcharts('StockChart', {
    	        chart: {
            		plotBorderWidth: 1
				},
	        	colors: ['#FF6600'],
	        	yAxis: {
	        		opposite: false
	        	},
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
	                    valueDecimals: 4
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
});*/
$(function(){	
	$('#from').val(from);
	$('#to').val(to);
	$('#rateschart').highcharts('StockChart', {
	    chart: {
			plotBorderWidth: 1
		},
		colors: ['#FF6600'],
		yAxis: {
			opposite: false
		},
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
	        data : chart_data,
	        tooltip: {
	            valueDecimals: 4
	        }
	    }]
	});	
})
