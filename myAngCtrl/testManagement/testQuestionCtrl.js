testModule.controller("testQuestionCtrl", function ($scope, $rootScope, $http, $location) {

    //variable for showing ajax-loader
    $scope.showLoaderQuestions = false;    

    //get all questions for current test from model
    $scope.refreshQuestion = function () {
        $scope.showLoaderQuestions = true;
        $http.get("/Apilike/GetQuestionsByTestGuid?testGuid=" + $scope.testForQuestions.Guid).success(function (data) {
            $scope.questions = data;
            $location.path("/view/questions");
            $scope.showLoaderQuestions = false;
        });
    }
    //create new question, make POST request to Apilike/CreateQuestion
    $scope.createQuestion = function (question) {
        $scope.showLoaderQuestions = true;
        $http.post("/Apilike/CreateQuestion?testGuid=" + $scope.testForQuestions.Guid, question).success(function (question) {
            $scope.refreshQuestion();
        });
    }
    //update current question
    $scope.updateQuestion = function (question) {
        $scope.showLoaderQuestions = true;
        $http({
            url: "/Apilike/UpdateQuestion?questionGuid=" + question.Guid,
            method: "POST",
            data: question
        }).success(function (modifiedQuestion) {

            $scope.refreshQuestion();
        });
    }
    //delete current question
    $scope.deleteQuestion = function (question) {
        $scope.showLoaderQuestions = true;
        $http({
            method: "POST",
            url: "/Apilike/RemoveQuestion?questionGuid=" + question.Guid
        }).success(function () {
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

    $scope.$on("sendTestGuid", function(event, args){
        //get test from testCtrl
        $scope.testForQuestions = args.testForQuestion;        
        $scope.refreshQuestion();
});
    //send question to answerCtrl
    $scope.getAnswers = function(question){
        $rootScope.$broadcast("sendQuestionGuid", {
            questionForAnswer: question
        });
    }

    $scope.returnToTests = function () {
        $scope.refresh();
    }
    
});