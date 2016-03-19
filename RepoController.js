﻿var app = angular.module('app');

app.controller('RepoController', function ($scope, $http, $location, $routeParams, $log) {

    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;
    var repoAPI = "https://api.github.com/repos/";

    var onComplete = function (response) {
        $scope.api = response.data;
        $log.log(response);
        $log.log(response.data);
        $http.get(response.data.contributors_url).then(onRepoComplete, onError);
        $http.get(response.data.issues_url).then(onIssueCountComplete, onError);
    };

    var onRepoComplete = function (response) {
        $scope.repoContributors = response.data;
        $log.log("Contributors: " + repoContributors);
    };

    var onIssueCountComplete = function (response) {
        $scope.repoIssueCount = response.data;
        $log.log("Issue Count: " + repoIssueCount.number);
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