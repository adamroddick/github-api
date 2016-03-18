(function () {

    var app = angular.module('app', ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider.when("/main", {
            templateUrl: "main.html",
            controller: "MainController"
        })
            .when("/user/:username", {
                templateUrl: "user.html",
                controller: "UserController"
            })
            .otherwise({ redirectTo: "/main" });
    });

    //$locationProvider.html5Mode(true); // Haven't read the docs for this yet https://docs.angularjs.org/api/ng/service/$location

}());



