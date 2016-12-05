angular.module('quizApp')
    .controller("testingUrlCtrl", function ($scope, $location, $requestService) {

        $scope.showLoader = false;
        //get all URLs from database
        $scope.refresh = function () {
            $location.path("/view/testingUrl");
            $scope.showLoader = true;
            $requestService.getTestingUrls(function (data) {
                $scope.testingUrls = data;
                $scope.showLoader = false;
            });            
        }
        //get current url and open edit view
        $scope.editOrCreate = function (testingUrl) {
            $scope.showLoader = true;
            $scope.getAllTests();
        
            $location.path("/edit/testingUrl");
            $scope.showLoader = false;
        }
        //save new testingUrl, POST request to Apilike/CreateTestingUrl
        $scope.saveEdit = function (testingUrl) {        
            $scope.showLoader = true;
            $requestService.createTestingUrl(testingUrl, function () {
                $scope.refresh();
            })  
        }
        //return to view
        $scope.cancelEdit = function () {
            $scope.currentTest = {};
            $location.path("/view/testingUrl");
            $scope.showLoader = false;
        }

        //delete current testingUrl
        $scope.delete = function (testingUrl) {
            $scope.showLoader = true;
            $requestService.deleteTestingUrl(testingUrl.Guid, function () {
                $scope.refresh();
            })
            
        }
        //get all tests
        $scope.getAllTests = function () {
            $requestService.getTests(function (data) {
                $scope.tests = data;
                $scope.testGuid = $scope.tests[0].Guid;
                $scope.currentTestingUrl = { TestGuid: $scope.testGuid };
            })           
        }

        $scope.refresh();
});