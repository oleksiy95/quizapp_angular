testingUrlModule.controller("testingUrlCtrl", function($scope, $rootScope,$http, $location){

    $scope.showLoader = false;
    //get all URLs from database
    $scope.refresh = function () {
        $scope.showLoader = true;
        $http.get("/Admin/GetAllTestingUrls").success(function (data) {
            $scope.testingUrls = data;
            $location.path("/view");
            $scope.showLoader = false;
        });
    }
    //get current url and open edit view
    $scope.editOrCreate = function (testingUrl) {
        $scope.getAllTests();
        
        $location.path("/edit");
    }
    //save new testingUrl, POST request to Apilike/CreateTestingUrl
    $scope.saveEdit = function (testingUrl) {        
        $scope.showLoader = true;
        $http.post("/Apilike/CreateTestingUrl", testingUrl).success(function (testingUrl) {
            $scope.refresh();
        });
        
    }
    //return to view
    $scope.cancelEdit = function () {
        $scope.currentTest = {};
        $location.path("/view");
        $scope.showLoader = false;
    }

    //delete current testingUrl
    $scope.delete = function (testingUrl) {
        $scope.showLoader = true;
        $http({
            method: "POST",
            url: "/Apilike/RemoveTestingUrl?testingUrlGuid=" + testingUrl.Guid
        }).success(function () {
            $scope.refresh();
        });
    }
    //get all tests
    $scope.getAllTests = function () {
        $http.get("/Admin/GetAllTests").success(function (data) {
            $scope.tests = data;
            $scope.testGuid = $scope.tests[0].Guid;
            $scope.currentTestingUrl = { TestGuid: $scope.testGuid };
        });
    }

    $scope.refresh();
});