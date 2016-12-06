angular.module('quizApp')
    .factory('$recordAnswersService', function(){
        
        var recordAnswers = function(func, questions){
            var i = 0;
            var objectWasCreated = false;
            var questionsArr = [];

            for(q in questions){
                for(a in questions[q].Answers){
                    
                    if(document.getElementById(questions[q].Answers[a].Guid).checked){
                        if(questionsArr[i] == undefined){
                            questionsArr[i] = {};
                            questionsArr[i].QuestionGuid = questions[q].Guid;
                            questionsArr[i].AnswersSelected = [];
                            objectWasCreated = true;
                        }
                        questionsArr[i].AnswersSelected.push(questions[q].Answers[a].Guid);
                    }
                }
                if(objectWasCreated)
                    i++;
                objectWasCreated = false;
            }
            func(questionsArr);
        }

        return{
            recordAnswers:recordAnswers
        }
    });