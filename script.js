// Code goes here

var root = angular.module('root', ['ngSanitize']); //ng-app in index.html

root.controller('AppController', function ($scope) {
    $scope.message = "Angular App";
    $scope.buttonName = "Button";
});

root.controller('NameController', function ($scope) {
    var person = {
        firstName: "Adam",
        lastName: "Roddick",
        imgSource: "https://s-media-cache-ak0.pinimg.com/236x/08/52/29/085229c2921196979b5cc20b4783ca41.jpg"
    };

    $scope.person = person;
});

root.controller('httpController', function ($scope, $http, $sce, $interval, $log) {

    var gituser;

    var githubAPIBroken = "https://ap.github.com/users/";
    var githubAPIWorking = "https://api.github.com/users/";
    var githubAPI = githubAPIWorking;

    $scope.sortOrder = "-stargazers_count";
    $scope.countdown = 10;

    var decrementCountdown = function () {
        $scope.countdown -= 1;
        if ($scope.countdown < 1) {
            $scope.search($scope.username);
        }
    };

    var countdownInterval = null;
    var startCountdown = function () {
        countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.search = function (username) {
        githubAPI = githubAPIWorking;
        gituser = $scope.username;
        hideError();
        githubAPIGET(gituser);
        $('#apiDataDiv').show();
        $log.info("Searched Github for: " + gituser);

        if (countdownInterval) {
            $interval.cancel(countdownInterval);
            $scope.countdown = null;
            $('#countdown').hide();
        }
    };

    $scope.breakAPI = function () {
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

    var onComplete = function (response) {
        $scope.api = response.data;
        hideError();
        $('#apiDataDiv').show();
        $http.get($scope.api.repos_url).then(onRepos, onError);
    };

    var onRepos = function (response) {
        $scope.repos = response.data;
    };

    var onError = function (reason) {
        var errorRaw = "<p id=\"error\" class=\"alert alert-danger\">Alert: Could not fetch the API Data</p>";
        $scope.errorHtml = $sce.trustAsHtml(errorRaw);
    };

    var hideError = function () {
        $('#error').hide();
        //var errorRaw = "";
        //$scope.errorHtml = $sce.trustAsHtml(errorRaw);
    };

    var githubAPIGET = function (gituser) {
        $http.get(githubAPI + gituser)
        .then(onComplete, onError);
    };

    startCountdown();

});


/* LOGGING ******
    $log.log("Testing $log.log");
    $log.info("Testing $log.info");
    $log.error("Testing $log.error");
    $log.warn("Testing $log.warn");
    $log.debug("Testing $log.debug");
    */

/* 

var doWork = function(x) {
  $log("Starting " + x + " function.");
  x();
  $log("Finished " + x + " function.");
};

doWork(work);
*/

(function () {

    var createWorker = function () {

        var workerCount = 0;

        var task1 = function () {
            workerCount++
            //$log("Task1 " + workerCount);
        };

        var job2 = function () {
            workerCount++
            //$log("Job2 " + workerCount);
        };

        return {
            job1: task1,
            job2: job2
        }
    };

    var worker = createWorker();

    worker.job1();
    worker.job2();

}());