var xkcdApp = angular.module('xkcdApp', ['ngRoute', 'infinite-scroll']);
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
        when('/about', {
            templateUrl: '/templates/about.html',
            controller: 'AboutController'
        }).
        otherwise({
            redirectTo: '/latest'
        });
}]);

xkcdApp.controller("AboutController", function($scope){

});

xkcdApp.controller("LatestController", ['$scope', '$http', function($scope, $http) {
    $http.get('/latest').success(function(data){
        $scope.comic = data;
    });
}]);

xkcdApp.controller("ArchivesController", ['$scope', '$http', '$q', function($scope, $http, $q) {

    $http.get('/count').success(function(data) {

        $scope.fetch = function() {
            var comicFetches = [];
            for(var i = 0; i < 18; i++) {
                comicFetches[i] = $http.get("/get/" + ($scope.count - i - $scope.lastIndexFetched));
            }

            $q.all(comicFetches).then(function(fetchComicsResults){
                for(var index in fetchComicsResults) {
                    $scope.comics.push(fetchComicsResults[index].data);
                }           
            });

            $scope.lastIndexFetched += i;
        }

        $scope.openComic = function(comic) {
            $scope.comic = comic;
            $('#comicModal').on('hidden.bs.modal', function () {
                $(this).find('.modal-body').css({width:'auto',
                                   height:'auto', 
                                  'max-height':'100%'});
            });

            $("#comicModal").modal('show');

        }
        $scope.count = data.count;
        $scope.comics = [];        
        $scope.lastIndexFetched = 0;        
        $scope.fetch();
    });

    
}]);
