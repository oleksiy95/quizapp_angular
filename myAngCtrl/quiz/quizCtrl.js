angular.module('quizApp')
 .controller("quizCtrl", function ($scope, $location, $requestService, $timerService) {

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
     //functon for finding checked radio and checkbox and set true
     $scope.findChecked = function () {

         var i = 0;
         var objectWasCreated = false;
         $scope.testPassing.Questions = [];
         for (question in $scope.testPass.Questions) {

             for (answer in $scope.testPass.Questions[question].Answers) {

                 if (document.getElementById($scope.testPass.Questions[question].Answers[answer].Guid).checked) {
                     $scope.testPass.Questions[question].Answers[answer].IsSelected = true;
                     if ($scope.testPassing.Questions[i] == undefined) {
                         $scope.testPassing.Questions[i] = {};
                         $scope.testPassing.Questions[i].QuestionGuid = $scope.testPass.Questions[question].Guid;
                         $scope.testPassing.Questions[i].AnswersSelected = [];
                         objectWasCreated = true;

                     }
                     $scope.testPassing.Questions[i].AnswersSelected.push($scope.testPass.Questions[question].Answers[answer].Guid);
                 }
             }
             if (objectWasCreated)
                 i++;
             objectWasCreated = false
         }
     }

     $scope.finishTest = function () {

         $scope.findChecked();

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