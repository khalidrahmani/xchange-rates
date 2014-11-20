$(function){
	new Morris.Line({
	  element: 'myfirstchart',
	  data: [
	    { year: '2008', value: 20 },
	    { year: '2009', value: 10 },
	    { year: '2010', value: 5 },
	    { year: '2011', value: 5 },
	    { year: '2012', value: 20 }
	  ],
	  xkey: 'year',
	  ykeys: ['value'],
	  labels: ['Value']
	});

	var app = angular.module('exchangeRatesApp', []).config(function($interpolateProvider){
	    $interpolateProvider.startSymbol('{?').endSymbol('?}');
	})
}