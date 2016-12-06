angular.module('quizApp')
    .factory('$timerService', function ($interval) {
                
        var timerTick = function (changeTimer, finishTest, testTimeLimit, questionTimeLimit, questionCount) {

            if (testTimeLimit > 0) {
                var testTimeSeconds = testTimeLimit;
            }
            else if (questionTimeLimit > 0) {
                var testTimeSeconds = questionTimeLimit * questionCount;
            }
            if (angular.isDefined(testTimeSeconds)) {
                var timer = $interval(function () {
                    var testTime = new Date(0, 0, 0, 0, 0, testTimeSeconds);
                    changeTimer(testTime);
                    testTimeSeconds--;
                    if (testTimeSeconds < 0) {
                        $interval.cancel(timer);
                        finishTest();
                    }
                }, 1000);
            }
        }

        return {
            timerTick:timerTick
        }
    })