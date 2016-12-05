angular.module('quizApp')
    .controller("answerCtrl", function ($scope, $location, $requestService) {

        //variable for showing ajax-loader
        $scope.showLoaderAnswers = false;    

        //get all answers for current question from model
        $scope.refreshAnswer = function () {
            $location.path("/view/answers");
            $scope.showLoaderAnswers = true;
            $requestService.getAnswers($scope.questionForAnswer.Guid, function (data) {
                $scope.answers = data;
                $scope.showLoaderAnswers = false;
            })
           
        }
        //create new answer, make POST request to Apilike/CreateAnswer
        $scope.createAnswer = function (answer) {
            $scope.showLoaderAnswers = true;
            $requestService.createAnswer($scope.questionForAnswer.Guid, answer, function () {
                $scope.refreshAnswer();
            });            
        }    
        //delete current answer
        $scope.deleteAnswer = function (answer) {
            $scope.showLoaderAnswers = true;
            $requestService.deleteAnswer(answer.Guid, function () {
                $scope.refreshAnswer();
            })            
        }
        //get empty answer and open answerEdit.html
        $scope.editOrCreateAnswer = function (answer) {
            $scope.currentAnswer = {};
            $location.path("/edit/answers");
        }
        //call create function
        $scope.saveEditAnswer = function (answer) {
            $scope.showLoaderAnswers = true;        
            $scope.createAnswer(answer);
        
        }
        //return to answerView.html
        $scope.cancelEditAnswer = function () {
            $scope.currentAnswer = {};
            $location.path("/view/answers");
            $scope.showLoaderAnswers = false;
        }
        
        $scope.getAnswers = function (question) {
            $scope.questionForAnswer = question;
            $scope.refreshAnswer();
        }

        $scope.returnToQuestions = function () {
            $scope.refreshQuestion();
        }

    
});