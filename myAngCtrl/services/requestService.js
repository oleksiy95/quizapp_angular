angular.module('quizApp')
    .factory('$requestService', function ($http) {

        var getTests = function (func) {            
            $http.get('/Admin/GetAllTests').success(function (data) {
                func(data);
            });            
        }

        var createTest = function (test, func) {
            $http.post("/Apilike/CreateTest", test).success(function () {
                func();
            });
        }

        var updateTest = function (test, testGuid, func) {
            $http.post("/Apilike/UpdateTest", {
                test: test,
                testGuid : testGuid
            }).success(function () {
                func();
            })
        }

        var deleteTest = function (testGuid, func) {
            $http.post("/Apilike/RemoveTest", {
                testGuid: testGuid
            }).success(function () {
                func();
            })
        }

        var getQuestions = function (testGuid, func) {
            $http.get("/Apilike/GetQuestionsByTestGuid", {
                params: { testGuid: testGuid }
            }).success(function (data) {
                func(data);
            });
        }

        var createQuestion = function (testGuid, question, func) {
            $http.post("/Apilike/CreateQuestion", {
                testGuid: testGuid,
                question: question
            }).success(function () {
                func();
            })
        }

        var updateQuestion = function (questionGuid, question, func) {
            $http.post("/Apilike/UpdateQuestion", {
                questionGuid: questionGuid,
                question: question
            }).success(function () {
                func();
            })
        }

        var deleteQuestion = function (questionGuid, func) {
            $http.post("/Apilike/RemoveQuestion", {
                questionGuid: questionGuid                
            }).success(function () {
                func();
            })
        }

        var getAnswers = function (questionGuid, func) {
            $http.get("/Apilike/GetAnswersByQuestionGuid", {
                params: { questionGuid: questionGuid }
            }).success(function (data) {
                func(data);
            });
        }

        var createAnswer = function (questionGuid, answer, func) {
            $http.post("/Apilike/CreateAnswer", {
                questionGuid: questionGuid,
                answer: answer
            }).success(function () {
                func();
            })
        }

        var deleteAnswer = function (answerGuid, func) {
            $http.post("/Apilike/RemoveAnswer", {
                answerGuid:answerGuid
            }).success(function () {
                func();
            })
        }

        var getTestingUrls = function (func) {
            $http.get('/Admin/GetAllTestingUrls').success(function (data) {
                func(data);
            });
        }

        var createTestingUrl = function (testingUrl, func) {
            $http.post("/Apilike/CreateTestingUrl", testingUrl).success(function () {
                func();
            });
        }

        var deleteTestingUrl = function (testingUrlGuid, func) {
            $http.post("/Apilike/RemoveTestingUrl", {
                testingUrlGuid: testingUrlGuid
            }).success(function () {
                func();
            })
        }

        var getTestingResults = function (func) {
            $http.get("/Admin/GetAllTestingResults").success(function (data) {
                func(data);
            });
        }

        var deleteTestingResult = function (testingResultGuid, func) {
            $http.post("/Apilike/RemoveTestingResult", {
                testingResultGuid: testingResultGuid
            }).success(function () {
                func();
            })
        }

        var startTest = function (testingUrlGuid, func) {
            $http.get("/Quiz/GetInfoAndStartTest", {
                params: { testingUrlGuid: testingUrlGuid }
            }).success(function (data) {
                func(data);
            })
        }

        var finishTest = function (testPassing, func) {
            $http.post("/Quiz/FinishTest", testPassing).success(function () {
                func();
            })
        }

        return {
            getTests: getTests,
            createTest: createTest,
            updateTest: updateTest,
            deleteTest: deleteTest,
            getQuestions: getQuestions,
            createQuestion: createQuestion,
            updateQuestion: updateQuestion,
            deleteQuestion: deleteQuestion,
            getAnswers: getAnswers,
            createAnswer: createAnswer,
            deleteAnswer: deleteAnswer,
            getTestingUrls: getTestingUrls,
            createTestingUrl: createTestingUrl,
            deleteTestingUrl: deleteTestingUrl,
            getTestingResults: getTestingResults,
            deleteTestingResult: deleteTestingResult,
            startTest: startTest,
            finishTest: finishTest
        }
    });