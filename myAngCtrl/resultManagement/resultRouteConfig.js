angular.module('quizApp')
    .config(function ($routeProvider) {

        //route config
        $routeProvider.when("/view/results", {
            templateUrl: "/myAngCtrl/resultManagement/resultView.html"
        });

    });