angular.module('quizApp')
    .config(function ($routeProvider) {

        //route config
        $routeProvider.when("/view/testingUrl", {
            templateUrl: "/myAngCtrl/testingUrlManagement/testingUrlView.html"
        });

        $routeProvider.when("/edit/testingUrl", {
            templateUrl: "/myAngCtrl/testingUrlManagement/testingUrlEdit.html"
        });
    });