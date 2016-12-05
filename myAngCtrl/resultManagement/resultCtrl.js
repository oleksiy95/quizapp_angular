angular.module('quizApp')
    .controller("resultCtrl", function ($scope, $location, $requestService) {

        $scope.showLoader = false;
        //get all results from database
        $scope.refresh = function () {
            $location.path("/view/results");
            $scope.showLoader = true;
            $requestService.getTestingResults(function (data) {
                $scope.results = data;
                $scope.showLoader = false;
            });            
        }

        //delete current result
        $scope.delete = function (result) {
            $scope.showLoader = true;
            $requestService.deleteTestingResult(result.Guid, function () {
                $scope.refresh();
            });            
        }

        $scope.refresh();
});

