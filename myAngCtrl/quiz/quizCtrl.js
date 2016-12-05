angular.module('quizApp')
 .controller("quizCtrl", function ($scope, $rootScope, $http, $location, $timeout, $interval) {

     $scope.testPassing = {};


     //get tests info and start test
     $scope.getInfo = function () {
         $scope.showLoader = true;
         $http.get("/Quiz/GetInfoAndStartTest?testingUrlGuid=" + $scope.testingUrlGuid).success(function (data) {
             $scope.testPass = data;
             $scope.showLoader = false;
             $scope.hideInfo = true;
             $location.path("/startTest");
             $scope.StartDate = new Date();

             //logic for finishining test if time is ended;
             if ($scope.testPass.TestTimeLimit.TotalSeconds > 0) {
                 $scope.TestTimeSeconds = $scope.testPass.TestTimeLimit.TotalSeconds;
             }
             else if ($scope.testPass.QuestionTimeLimit.TotalSeconds > 0) {
                 $scope.TestTimeSeconds = $scope.testPass.QuestionTimeLimit.TotalSeconds;
             }

             if ($scope.TestTimeSeconds != undefined) {

                 var TestTime = new Date(0, 0, 0, 0, 0, $scope.TestTimeSeconds);
                 var TimeOut = $scope.TestTimeSeconds * 1000;

                 $interval(function () {
                     $scope.Timer = TestTime.getHours() + ":" + TestTime.getMinutes() + ":" + TestTime.getSeconds();
                     $scope.TestTimeSeconds = $scope.TestTimeSeconds - 1;
                     TestTime = new Date(0, 0, 0, 0, 0, $scope.TestTimeSeconds);
                 }, 1000);

                 $timeout(function () {
                     $scope.finishTest();
                 }, TimeOut + 1000);

             }


         });
     }


     //fucntion for definition input type
     $scope.whatType = function (multiple) {
         if (multiple)
             return 'checkbox'
         else return 'radio'
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
         $http.post("/Quiz/FinishTest", $scope.testPassing).success(function (testingUrl) {
             $location.path("/finishTest");
         });


     }


 });