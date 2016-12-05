angular.module('quizApp')
    .controller("testCtrl", function ($scope, $location, $requestService) {

        //variable for showing ajax-loader
        $scope.showLoader = false;
        //variable for hide tests and show questions
        //$scope.hideTests = false;

        //get all tests from model
        $scope.refresh = function () {
            $location.path("/view/tests");
            $scope.showLoader = true;           
            $requestService.getTests(function (data) {
                $scope.tests = data;
                
                $scope.showLoader = false;
            })
            
            
        }
        //create new test, make POST request to Apilike/CreateTest
        $scope.create = function (test) {
            $scope.showLoader = true;
            $requestService.createTest(test, function() {
                $scope.refresh();
            });            
        }
        //update current test
        $scope.update = function (test) {
            $scope.showLoader = true;
            $requestService.updateTest(test, test.Guid, function () {
                $scope.refresh();
            });               
            
        }
        //delete current test
        $scope.delete = function (test) {
            $scope.showLoader = true;
            $requestService.deleteTest(test.Guid, function () {
                $scope.refresh();
            })           
        }

        //get current or empty test and open testEdit.html
        $scope.editOrCreate = function (test) {
            $scope.currentTest = test ? angular.copy(test) : { TestTimeLimit: "00:00:00", QuestionTimeLimit : "00:00:00"};
            $location.path("/edit/tests");
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
            $location.path("/view/tests");
            $scope.showLoader = false;
        }   
        
        $scope.refresh();
});