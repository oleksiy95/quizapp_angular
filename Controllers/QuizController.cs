﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using QuizApp.ViewModel;
using QuizApp.ViewModel.Mapping;
using QuizApp.ViewModel.PassingQuiz;
using Services;

namespace QuizApp.Controllers
{
    public class QuizController : Controller
    {
        private readonly IGetInfoService _getInfoService;
        private readonly IAdvancedLogicService _advancedLogicService;
        private readonly IMapper _mapper;
        private readonly IAdvancedMapper _advancedMapper;

        public QuizController(IGetInfoService getInfoService, IAdvancedLogicService advancedLogicService,
            IMapper mapper, IAdvancedMapper advancedMapper)
        {
            _getInfoService = getInfoService;
            _advancedLogicService = advancedLogicService;
            _mapper = mapper;
            _advancedMapper = advancedMapper;
        }


        public ActionResult Quiz(string guid)
        {
            var testUrlDomain = _getInfoService.GetTestingUrlByGuid(guid);
            var domainTest = _getInfoService.GetTestByTestingUrlGuid(guid);
            var error = _advancedLogicService.CheckTestingUrlForAvailability(testUrlDomain);
            if (!string.IsNullOrEmpty(error))
            {
                ViewBag.error = error;
                return View("TestingErrorView");
            }
            //if all is ok
            var testUrl = _advancedMapper.MapTestingUrl(testUrlDomain);
            ViewBag.Description = domainTest.Description;
            ViewBag.Interviewee = testUrl.Interviewee;
            ViewBag.qCount = domainTest.TestQuestions.Count;
            if (domainTest.TestTimeLimit != null)
                ViewBag.Time = domainTest.TestTimeLimit;
            else if (domainTest.QuestionTimeLimit != null)
                ViewBag.Time = new TimeSpan(0, 0, ((int)(domainTest.QuestionTimeLimit.Value.TotalSeconds * domainTest.TestQuestions.Count)));
            return View(testUrl);
        }

        [HttpGet]
        public JsonResult GetInfoAndStartTest(string testingUrlGuid)
        {
            var domainTest = _getInfoService.GetTestByTestingUrlGuid(testingUrlGuid);
            var testUrlDomain = _getInfoService.GetTestingUrlByGuid(testingUrlGuid);

            var questionViewModelList = domainTest
               ?.TestQuestions
               .Select(q => _mapper.Map<QuestionPassingViewModel>(q))
               .ToList();

            var attepmtGuid = Guid.NewGuid().ToString();

            var test = new
            {
                TestTimeLimit = domainTest.TestTimeLimit ?? new TimeSpan(),
                QuestionTimeLimit = domainTest.QuestionTimeLimit ?? new TimeSpan(),
                Questions = questionViewModelList,
                AttemptGuid = attepmtGuid,
                Interviewee = testUrlDomain.Interviewee
            };

            _advancedLogicService.StartQuiz(_getInfoService.GetTestingUrlByGuid(testingUrlGuid), attepmtGuid);

            return Json(test, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void FinishTest(TestPassingViewModel testPassing)
        {
            var testPassingMapped = _advancedMapper.MapTestPassingViewModel(testPassing);
            _advancedLogicService.FinishQuiz(testPassingMapped);
        }
    }
}