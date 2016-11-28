var testingUrlModule = angular.module("testingUrlManagement",["ngRoute"])
.config(function ($routeProvider) {
    
    //route config
    $routeProvider.when("/view", {
        templateUrl: "/myAngCtrl/testingUrlManagement/testingUrlView.html"
    });

    $routeProvider.when("/edit", {
        templateUrl: "/myAngCtrl/testingUrlManagement/testingUrlEdit.html"
    });

    $routeProvider.otherwise({
        templateUrl: "/myAngCtrl/testingUrlManagement/testingUrlView.html"
    });

   

});
