testModule.controller("testCtrl", function($scope, $rootScope,$http, $location){

    //variable for showing ajax-loader
    $scope.showLoader = false;
    //variable for hide tests and show questions
    //$scope.hideTests = false;

    //get all tests from model
    $scope.refresh = function () {
        $scope.showLoader = true;
        $http.get("/Admin/GetAllTests").success(function (data) {
            $scope.tests = data;
            $location.path("/view");
            $scope.showLoader = false;
        });
    }
    //create new test, make POST request to Apilike/CreateTest
    $scope.create = function (test) {
        $scope.showLoader = true;
        $http.post("/Apilike/CreateTest", test).success(function (test) {
            $scope.refresh();
        });
    }
    //update current test
    $scope.update = function (test) {
        $scope.showLoader = true;
        $http({
            url: "/Apilike/UpdateTest?testGuid=" + test.Guid,
            method: "POST",
            data: test
        }).success(function (modifiedTest) {
            
            $scope.refresh();
        });
    }
    //delete current test
    $scope.delete = function (test) {
        $scope.showLoader = true;
        $http({
            method: "POST",
            url: "/Apilike/RemoveTest?testGuid=" + test.Guid
        }).success(function () {
            $scope.refresh();
        });
    }

    //get current or empty test and open testEdit.html
    $scope.editOrCreate = function (test) {
        $scope.currentTest = test ? angular.copy(test) : { TestTimeLimit: "00:00:00", QuestionTimeLimit : "00:00:00"};
        $location.path("/edit");
    }
    //check new or current test and call update or create function
    $scope.saveEdit = function (test) {
        $scope.showLoader = true;
        if (angular.isDefined(test.Guid)) {
            $scope.update(test);
        } else {
            $scope.create(test);
        }
    }
    //return to testView.html
    $scope.cancelEdit = function () {
        $scope.currentTest = {};
        $location.path("/view");
        $scope.showLoader = false;
    }

    $scope.getQuestions = function(test){
        //send value of test to questions ctrl
        $rootScope.$broadcast("sendTestGuid", {
            testForQuestion: test
            });
        
}
    $scope.refresh();
});