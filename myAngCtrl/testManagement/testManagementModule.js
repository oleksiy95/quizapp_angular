var testModule = angular.module("testManagement",["ngRoute"])
.config(function ($routeProvider) {
    
    //route config
    $routeProvider.when("/view", {
        templateUrl: "/myAngCtrl/testManagement/testView.html"
    });

    $routeProvider.when("/edit", {
        templateUrl: "/myAngCtrl/testManagement/testEdit.html"
    });

    $routeProvider.when("/view/questions", {
        templateUrl: "/myAngCtrl/testManagement/testQuestionsView.html"
    });

    $routeProvider.when("/edit/questions", {
        templateUrl: "/myAngCtrl/testManagement/testQuestionsEdit.html"
    });

     $routeProvider.when("/view/answers", {
        templateUrl: "/myAngCtrl/testManagement/answerView.html"
     });

     $routeProvider.when("/edit/answers", {
         templateUrl: "/myAngCtrl/testManagement/answerEdit.html"
     });

    $routeProvider.otherwise({
        templateUrl: "/myAngCtrl/testManagement/testView.html"
    });

});
