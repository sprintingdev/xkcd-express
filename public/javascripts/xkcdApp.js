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
    $http.get('/latest').success(function(data){
        $scope.comic = data;
    });
}]);

xkcdApp.controller("ArchivesController", ['$scope', '$http', '$q', function($scope, $http, $q) {
    $http.get('/count').success(function(data) {
        console.log(data.count);
        $scope.count = data.count;
        $scope.comics = [];
        var comicFetches = []
        for(var i = 0; i < 18; i++) {
            var index = i;
            comicFetches[index] = $http.get("/get/" + ($scope.count - i));
        }
        console.log("Total number of calls " + comicFetches.length);
        $q.all(comicFetches).then(function(fetchComicsResults){
            for(var index in fetchComicsResults) {
                $scope.comics.push(fetchComicsResults[index].data);
            }           
        });
        $scope.lastIndexFetched = --i;
    });
}]);
