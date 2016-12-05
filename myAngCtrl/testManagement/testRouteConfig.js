angular.module('quizApp')
    .config(function ($routeProvider) {
    
        //route config
        $routeProvider.when("/view/tests", {
            templateUrl: "/myAngCtrl/testManagement/tests/testView.html"
        });

        $routeProvider.when("/edit/tests", {
            templateUrl: "/myAngCtrl/testManagement/tests/testEdit.html"
        });

        $routeProvider.when("/view/questions", {
            templateUrl: "/myAngCtrl/testManagement/questions/testQuestionsView.html"
        });

        $routeProvider.when("/edit/questions", {
            templateUrl: "/myAngCtrl/testManagement/questions/testQuestionsEdit.html"
        });

        $routeProvider.when("/view/answers", {
            templateUrl: "/myAngCtrl/testManagement/answers/answerView.html"
        });

        $routeProvider.when("/edit/answers", {
            templateUrl: "/myAngCtrl/testManagement/answers/answerEdit.html"
        });

        //$routeProvider.otherwise({
        //    templateUrl: "/myAngCtrl/testManagement/testView.html"
        //});

    });