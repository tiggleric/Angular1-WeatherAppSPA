//Controllers
weatherApp.controller('homeController', ['$scope', '$location', 'locationService', function($scope, $location, locationService){
    
    $scope.zipcode = locationService.zipcode;
    $scope.searchKey = locationService.zipcode + "," + locationService.countryCode;
    $scope.$watch('zipcode', function(){
        locationService.zipcode = $scope.zipcode;
        $scope.searchKey =  $scope.zipcode + "," + locationService.countryCode;
    });
    $scope.submitZipcode = function(){
        $location.path('/forecast');
    };
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$sce', 'locationService', function($scope, $resource, $sce, locationService){
    
    $scope.searchKey = locationService.zipcode + "," + locationService.countryCode;
   
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=a4f92f0fd3e783c547e1af5127564493", {get : { method: "JSONP" }});
    $scope.weatherResult = $scope.weatherAPI.get({ zip: $scope.searchKey });
    
    $scope.convertToFahrenheit = function(kelvin){
        return Math.round((1.8 * (kelvin -273)) +32 );
    }
    
    $scope.convertToDate = function(sec){
        return new Date(sec * 1000);
    }
}]);
