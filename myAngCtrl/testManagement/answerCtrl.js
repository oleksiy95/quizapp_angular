testModule.controller("answerCtrl", function ($scope, $http, $location) {

    //variable for showing ajax-loader
    $scope.showLoaderAnswers = false;    

    //get all answers for current question from model
    $scope.refreshAnswer = function () {
        $scope.showLoaderAnswers = true;
        $http.get("/Apilike/GetAnswersByQuestionGuid?questionGuid=" + $scope.questionForAnswer.Guid).success(function (data) {
            $scope.answers = data;
            $location.path("/view/answers");
            $scope.showLoaderAnswers = false;
        });
    }
    //create new answer, make POST request to Apilike/CreateAnswer
    $scope.createAnswer = function (answer) {
        $scope.showLoaderAnswers = true;
        $http.post("/Apilike/CreateAnswer?questionGuid=" + $scope.questionForAnswer.Guid, answer).success(function (answer) {
            $scope.refreshAnswer();
        });
    }
    
    //delete current answer
    $scope.deleteAnswer = function (answer) {
        $scope.showLoaderAnswers = true;
        $http({
            method: "POST",
            url: "/Apilike/RemoveAnswer?answerGuid=" + answer.Guid
        }).success(function () {
            $scope.refreshAnswer();
        });
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

    $scope.$on("sendQuestionGuid", function (event, args) {
        //get question from testQuestionCtrl
        $scope.questionForAnswer = args.questionForAnswer;
        $scope.refreshAnswer();
    });

    $scope.returnToQuestions = function () {
        $scope.refreshQuestion();
    }

    
});