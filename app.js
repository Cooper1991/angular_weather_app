//MODULE
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


weatherApp.controller('forecastController', ['$scope', 'cityService', function($scope, cityService){
    
    
    $scope.city = cityService.city;
    
}]);



