var resultModule = angular.module("resultManagement",["ngRoute"])
.config(function ($routeProvider) {
    
    //route config
    $routeProvider.when("/view", {
        templateUrl: "/myAngCtrl/resultManagement/resultView.html"
    });
   

    $routeProvider.otherwise({
        templateUrl: "/myAngCtrl/resultManagement/resultView.html"
    });
   

});
