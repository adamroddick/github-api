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

root.controller('httpController', function ($scope, $http, $sce) {

    var gituser;

    var githubAPIBroken = "https://ap.github.com/users/";
    var githubAPIWorking = "https://api.github.com/users/";
    var githubAPI = githubAPIWorking;

    $scope.sortOrder = "-stargazers_count";

    $scope.search = function (username) {
        githubAPI = githubAPIWorking;
        gituser = $scope.username;
        hideError();
        githubAPIGET(gituser);
        $('#apiDataDiv').show();
    };

    $scope.breakAPI = function () {
        githubAPI = githubAPIBroken;
        console.log("Breaking the API: " + githubAPI);
        //console.log("githubAPI: " + githubAPI + " and githubAPIBroken: " + githubAPIBroken);
        $('#apiDataDiv').hide();
        githubAPIGET();
        $('#error').show();
    };

    $scope.fixAPI = function () {
        githubAPI = githubAPIWorking;
        //gituser = "valkyss";
        console.log("Fixing the API: " + githubAPI);
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

    //githubAPIGET();
});


/*
var work = function() {
  // do stuff
};

var doWork = function(x) {
  console.log("Starting " + x + " function.");
  x();
  console.log("Finished " + x + " function.");
};

doWork(work);
*/

(function () {

    var createWorker = function () {

        var workerCount = 0;

        var task1 = function () {
            workerCount++
            console.log("Task1 " + workerCount);
        };

        var job2 = function () {
            workerCount++
            console.log("Job2 " + workerCount);
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