var app = angular.module('app');

app.controller('RepoController', function ($scope, $http, $location, $routeParams, $log) {

    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;
    var githubAPI = "https://api.github.com/repos/";

    var onComplete = function (response) {
        $scope.api = response.data;
    };

    var onError = function (reason) {
        $log.warn("API GET failed.")
    };

    var repoGet = function (user, repo) {
        $http.get(UserController.githubAPI + user + "/" + repo)
        .then(onComplete, onError);
    };
    
    repoGet($scope.username, $scope.reponame);

});