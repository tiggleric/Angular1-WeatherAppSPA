//Modules
var weatherApp = angular.module('weatherApp',['ngRoute', 'ngResource']).config(function($sceDelegateProvider) {
     $sceDelegateProvider.resourceUrlWhitelist([
       // Allow same origin resource loads.
       'self',
       // Allow loading from api.openweathermap.org
       'http://api.openweathermap.org/**'
     ])});

//Routes
weatherApp.config(function ($routeProvider){
    $routeProvider
    
    .when('/', {
        templateUrl:'pages/home.html',
        controller:'homeController'
    })
    
    .when('/forecast', {
        templateUrl:'pages/forecast.html',
        controller:'forecastController'
    })
});

//Services
weatherApp.service('locationService', function() {
    this.zipcode = "20817"
    this.countryCode = "us" //USA, should be a constant
})

weatherApp.service('weatherService', function(){
    
})

//Controllers
weatherApp.controller('homeController', ['$scope', 'locationService', function($scope, locationService){
    
    $scope.zipcode = locationService.zipcode;
    $scope.searchKey = locationService.zipcode + "," + locationService.countryCode;
    $scope.$watch('zipcode', function(){
        locationService.zipcode = $scope.zipcode;
        $scope.searchKey =  $scope.zipcode + "," +             locationService.countryCode;
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$sce','locationService', function($scope, $resource, $sce, locationService){
    
    $scope.searchKey = locationService.zipcode + "," + locationService.countryCode;
    //?APPID=a4f92f0fd3e783c547e1af5127564493
   
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=a4f92f0fd3e783c547e1af5127564493", {get : { method: "JSONP" }});
    $scope.weatherResult = $scope.weatherAPI.get({ zip: $scope.searchKey });
    
    console.log("Search key: "+$scope.searchKey);
    console.log($scope.weatherResult);
}]);