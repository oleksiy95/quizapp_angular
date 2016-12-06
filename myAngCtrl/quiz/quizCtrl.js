angular.module('quizApp')
 .controller("quizCtrl", function ($scope, $location, $requestService, $timerService, $recordAnswersService) {

     $scope.testPassing = {};

     //get tests info and start test
     $scope.getInfo = function () {
         $scope.showLoader = true;
         $requestService.startTest($scope.testingUrlGuid, function (data) {

             $scope.testPass = data;
             $scope.showLoader = false;
             $scope.hideInfo = true;
             $location.path("/startTest");
             $scope.StartDate = new Date();
             //logic for timer and test finish
             $timerService.timerTick(function (testTime) {
                 $scope.Timer = testTime;
             }, function () {
                 $scope.finishTest();
             }, $scope.testPass.TestTimeLimit.TotalSeconds, $scope.testPass.QuestionTimeLimit.TotalSeconds, $scope.testPass.Questions.length);
         });
     }   

     $scope.finishTest = function () {         
         //logic to record selected answers
         $recordAnswersService.recordAnswers(function (data) {
             $scope.testPassing.Questions = data;
         }, $scope.testPass.Questions);

         $scope.EndDate = new Date();
         $scope.testPassing.TestingStartDateTime = $scope.StartDate;
         $scope.testPassing.TestingEndDateTime = $scope.EndDate;
         $scope.testPassing.Interviewee = ($scope.Interviewee != undefined) ? $scope.Interviewee : $scope.testPass.Interviewee;
         $scope.testPassing.AttemptGuid = $scope.testPass.AttemptGuid;
         $scope.testPassing.TestingGuid = $scope.testingUrlGuid;
         $requestService.finishTest($scope.testPassing, function () {
             $location.path("/finishTest");
         });
     }
 });