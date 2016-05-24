
//CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService){
    
    //City for this scope is equal to the city in the cityService service
    $scope.city = cityService.city;
    
    //Watch the scope for this on cityService. So when cityService city changes, so will this values
    //Now we will use ng-model="city" in our html - this is the directive for two way data binding
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    })
    
    $scope.submit  = function(){
        
        $location.path = ("/forecast");
    };
    
}]);


weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
    
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=14177fc184afb4b3a26bb6de5abdf62b',{
        //This basically tells the app that it's okay to grab the JSON from an online source. You can trust it and it's not an attempt at a hack
        callback : 'JSON_CALLBACK'
    }, {get:{method:'JSONP'}});
        
    $scope.weatherResult = $scope.weatherAPI.get({q:$scope.city, cnt:$scope.days});
    
    $scope.convertToFahrenheit = function(degK){
        
        return Math.round((1.8 * (degK - 273)) + 32);
    }
    
    $scope.convertToDate = function(dt){
        
        return new Date(dt * 1000);
    }
        
 
    
}]);
