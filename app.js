//MODULE
//ngRoute - wraps up the HTTP object and makes it easy to go out onto the internet and collect data
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


//CONFIG TO TEMPLATES DEPENDING ON HASH VALUE
weatherApp.config(function($routeProvider){
    
    $routeProvider
    
     .when('/',{
        templateUrl:'pages/home.html',
        controller:'homeController'
    })
    
    .when('/forecast',{
        templateUrl:'pages/forecast.html',
        controller:'forecastController'
    })
    
})




//SERVICES
weatherApp.service('cityService', function(){
    
    this.city = 'New York, NY';
    
})




//CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    
    //City for this scope is equal to the city in the cityService service
    $scope.city = cityService.city;
    
    //Watch the scope for this on cityService. So when cityService city changes, so will this values
    //Now we will use ng-model="city" in our html - this is the directive for two way data binding
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    })
    
}]);


weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService){
    
    
    $scope.city = cityService.city;
    
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily',{
        //This basically tells the app that it's okay to grab the JSON from an online source. You can trust it and it's not an attempt at a hack
        callback : 'JSON_CALLBACK'
    }, {get:{method:'JSONP'}});
        
    $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city, cnt:2});
    
    console.log($scope);
        
    
    
}]);


//http://api.openweathermap.org/data/2.5/forecast/daily?APPID=14177fc184afb4b3a26bb6de5abdf62b


