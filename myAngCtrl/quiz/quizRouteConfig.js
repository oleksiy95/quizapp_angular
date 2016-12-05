angular.module('quizApp')
    .config(function ($routeProvider) {

        //route config
        $routeProvider.when("/details/quiz", {
            templateUrl: "/myAngCtrl/quiz/resultView.html"
        });

        $routeProvider.when("/startTest", {
            templateUrl: "/myAngCtrl/quiz/testingPassView.html"
        });

        $routeProvider.when("/finishTest", {
            templateUrl: "/myAngCtrl/quiz/finishView.html"
        });

    });