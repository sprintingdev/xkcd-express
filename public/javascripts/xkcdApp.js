var xkcdApp = angular.module('xkcdApp', ['ngRoute']);
xkcdApp.config(['$routeProvider',function($routeProvider) {
    $routeProvider.
        when('/latest', {
            templateUrl: '/templates/latest.html',
            controller: 'LatestController'
        }).
        when('/archives', {
            templateUrl: '/templates/archives.html',
            controller: 'ArchivesController'
        }).
        otherwise({
            redirectTo: '/latest'
        });
}]);

xkcdApp.controller("LatestController", ['$scope', '$http', function($scope, $http) {
    $scope.active = true;
    $http.get('/latest').success(function(data){
        $scope.comic = data;
    });
}]);

xkcdApp.controller("ArchivesController", ['$scope', '$http', function($scope, $http) {
    $scope.active = true;
}]);
