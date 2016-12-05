angular.module('quizApp')
    .controller("testQuestionCtrl", function ($scope, $location, $requestService) {

        //variable for showing ajax-loader
        $scope.showLoaderQuestions = false;    

        //get all questions for current test from model
        $scope.refreshQuestion = function () {
            $location.path("/view/questions");
            $scope.showLoaderQuestions = true;
            $requestService.getQuestions($scope.testForQuestions.Guid, function (data) {
                $scope.questions = data;
                $scope.showLoaderQuestions = false;
            });
            
        }
        //create new question, make POST request to Apilike/CreateQuestion
        $scope.createQuestion = function (question) {
            $scope.showLoaderQuestions = true;
            $requestService.createQuestion($scope.testForQuestions.Guid, question, function(){
                $scope.refreshQuestion();
            });
        }
        //update current question
        $scope.updateQuestion = function (question) {
            $scope.showLoaderQuestions = true;
            $requestService.updateQuestion(question.Guid, question, function () {
                $scope.refreshQuestion();
            });
           
        }
        //delete current question
        $scope.deleteQuestion = function (question) {
            $scope.showLoaderQuestions = true;
            $requestService.deleteQuestion(question.Guid, function () {
                $scope.refreshQuestion();
            });            
        }
        //get current or empty question and open testQuestionEdit.html
        $scope.editOrCreateQuestion = function (question) {
            $scope.currentQuestion = question ? angular.copy(question) : {};
            $location.path("/edit/questions");
        }
        //check new or current question and call update or create function
        $scope.saveEditQuestion = function (question) {
            $scope.showLoaderQuestions = true;
            if (angular.isDefined(question.Guid)) {
                $scope.updateQuestion(question);
            } else {
                $scope.createQuestion(question);
            }
        }
        //return to testQuestionsView.html
        $scope.cancelEditQuestion = function () {
            $scope.currentQuestion = {};
            $location.path("/view/questions");
            $scope.showLoaderQuestions = false;
        }        

        $scope.getQuestions = function (test) {
            $scope.testForQuestions = test;
            $scope.refreshQuestion();
        }
        
        $scope.returnToTests = function () {
            $scope.refresh();
        }
    
});