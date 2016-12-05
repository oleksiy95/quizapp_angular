using System.Web;
using System.Web.Optimization;

namespace QuizApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/jPages").Include(
                        "~/Scripts/jPages.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/angular.js",
                      "~/Scripts/angular-animate.js",
                      "~/Scripts/angular-messages.js",
                      "~/Scripts/angular-route.js",
                      "~/Scripts/angular-aria/angular-aria.min.js",
                      "~/Scripts/angular-material/angular-material.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/testManagement").Include(
                "~/MyAngCtrl/quizApp.js",
                "~/MyAngCtrl/testManagement/testRouteConfig.js",
                "~/MyAngCtrl/testManagement/tests/testCtrl.js",
                "~/MyAngCtrl/testManagement/questions/testQuestionCtrl.js",
                "~/MyAngCtrl/testManagement/answers/answerCtrl.js"));

            bundles.Add(new ScriptBundle("~/bundles/testingUrlManagement").Include(
                "~/MyAngCtrl/quizApp.js",
                "~/MyAngCtrl/testingUrlManagement/testingUrlRouteConfig.js",
                "~/MyAngCtrl/testingUrlManagement/testingUrlCtrl.js"));

            bundles.Add(new ScriptBundle("~/bundles/resultManagement").Include(
                "~/MyAngCtrl/quizApp.js",
                "~/MyAngCtrl/resultManagement/resultRouteConfig.js",
                "~/MyAngCtrl/resultManagement/resultCtrl.js"));

            bundles.Add(new ScriptBundle("~/bundles/quizManagement").Include(
               "~/MyAngCtrl/quizApp.js",
               "~/MyAngCtrl/quiz/quizRouteConfig.js",
               "~/MyAngCtrl/quiz/quizCtrl.js"));


            bundles.Add(new StyleBundle("~/Content/admin-css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/ngDialog.min.css",
                      "~/Content/ngDialog-theme-default.min.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/jPages-css").Include(
                     "~/Content/jPages.css"));

           bundles.Add(new StyleBundle("~/Content/quiz-css").Include(                      
                      "~/Content/quizStyles.css"));

            bundles.Add(new ScriptBundle("~/bundles/material-bootstrap-js").Include(
                      "~/Content/bootstrap-material/material.min.js",
                      "~/Content/bootstrap-material/ripples.min.js"));
        }
    }
}
