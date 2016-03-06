// Code goes here

var root = angular.module('root', ['ngSanitize']); //ng-app in index.html

root.controller('AppController', function ($scope) {
    $scope.message = "Adam's Angular App";
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

    var githubAPIBroken = "https://ap.github.com/users/valkyss";
    var githubAPIWorking = "https://api.github.com/users/valkyss";
    var githubAPI = githubAPIWorking;

    $scope.breakAPI = function () {
        githubAPI = githubAPIBroken;
        console.log("Breaking the API: " + githubAPI);
        //console.log("githubAPI: " + githubAPI + " and githubAPIBroken: " + githubAPIBroken);
        hideAPIData();
        githubAPIGET();
    };

    $scope.fixAPI = function () {
        githubAPI = githubAPIWorking;
        console.log("Fixing the API: " + githubAPI);
        //console.log("githubAPI: " + githubAPI + " and githubAPIWorking: " + githubAPIWorking);
        hideError();
        githubAPIGET();
    };

    var onComplete = function (response) {
        $scope.api = response.data;
        hideError();
        showAPIData();
    };

    var onError = function (reason) {
        showError();
    };

    var showError = function () {
        var errorRaw = "<p class=\"alert alert-danger\">Alert: Could not fetch the API Data</p>";
        $scope.errorHtml = $sce.trustAsHtml(errorRaw);
    };

    var hideError = function () {
        var errorRaw = "";
        $scope.errorHtml = $sce.trustAsHtml(errorRaw);
    };

    var showAPIData = function () {
        $('#apiDataDiv').show();
    };

    var hideAPIData = function () {
        $('#apiDataDiv').hide();
    };


    var githubAPIGET = function () {
        $http.get(githubAPI)
        .then(onComplete, onError);
    };

    githubAPIGET();
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