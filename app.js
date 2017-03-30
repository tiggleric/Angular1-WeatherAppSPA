//Modules
var weatherApp = angular.module('weatherApp',['ngRoute', 'ngResource']).config(function($sceDelegateProvider) {
     $sceDelegateProvider.resourceUrlWhitelist([
       // Allow same origin resource loads.
       'self',
       // Allow loading from api.openweathermap.org
       'http://api.openweathermap.org/**'
     ])});


