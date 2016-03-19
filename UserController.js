var app = angular.module('app');

app.controller('UserController', function ($scope, $http, $sce, $log, $routeParams, $location) {

    var gituser;
    var githubAPIBroken = "https://ap.github.com/users/";
    var githubAPIWorking = "https://api.github.com/users/";
    var githubAPI = githubAPIWorking;

    $scope.sortOrder = "-stargazers_count";
    $scope.username = $routeParams.username;

/*    $scope.breakAPI = function () {
        githubAPI = githubAPIBroken;
        $log.info("Breaking the API: " + githubAPI);
        $('#apiDataDiv').hide();
        githubAPIGET();
        $('#error').show();
    };

    $scope.fixAPI = function () {
        githubAPI = githubAPIWorking;
        //gituser = "valkyss";
        $log.info("Fixing the API: " + githubAPI);
        //hideError();
        githubAPIGET(gituser);
    };
*/ //breakAPI() and fixAPI()

    $scope.repoUrl = "/#/user/" + $scope.username + "/";
    var test = $scope.repoUrl;
    $log.log(test);

    var onComplete = function (response) {
        $scope.api = response.data;
        $('#error').hide();
        $http.get($scope.api.repos_url).then(onRepos, onError);
    };

    var onRepos = function (response) {
        $scope.repos = response.data;
    };

    var onError = function (reason) {
        var errorRaw = "<p id=\"error\" class=\"alert alert-danger\">Alert: Could not fetch the API Data</p>";
        $scope.errorHtml = $sce.trustAsHtml(errorRaw);
        $('#outputDiv').hide();
    };

    var githubAPIGET = function (gituser) {
        $http.get(githubAPI + gituser)
        .then(onComplete, onError);
    };

    githubAPIGET($scope.username);

});