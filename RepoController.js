var app = angular.module('app');

app.controller('RepoController', function ($scope, $http, $location, $routeParams, $log) {

    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;
    var repoAPI = "https://api.github.com/repos/";

    var onComplete = function (response) {
        $scope.api = response.data;
        $log.log(response);
        $log.log(response.data);
        $log.log(response.data.contributors_url);
        $http.get(response.data.contributors_url).then(onRepoComplete, onError);
        //$http.get(getIssuesUrl(response.data.issues_url)).then(onIssueCountComplete, onError);
    };

    var onRepoComplete = function (response) {
        $scope.contributors = response.data;
        $log.log(response.data);
    };

    var onIssueCountComplete = function (response) {
        $scope.issuecount = response.data;
        $log.log("Issue Count: " + response.data.number);
    };

    var onError = function (reason) {
        $log.warn("API GET failed.")
    };

    var repoGet = function (user, repo) {
        $http.get(repoAPI + user + "/" + repo)
        .then(onComplete, onError);
    };
    
    repoGet($scope.username, $scope.reponame);

});