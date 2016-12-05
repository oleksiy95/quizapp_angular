angular.module('quizApp')
    .controller("resultCtrl", function ($scope, $rootScope, $http, $location) {

        $scope.showLoader = false;
        //get all results from database
        $scope.refresh = function () {
            $location.path("/view/results");
            $scope.showLoader = true;
            $http.get("/Admin/GetAllTestingResults").success(function (data) {
                $scope.results = data;
            
                $scope.showLoader = false;
            });
        }

        //delete current result
        $scope.delete = function (result) {
            $scope.showLoader = true;
            $http({
                method: "POST",
                url: "/Apilike/RemoveTestingResult?testingResultGuid=" + result.Guid
            }).success(function () {
                $scope.refresh();
            });
        }

        $scope.refresh();
});

