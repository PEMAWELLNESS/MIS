using System.Web;
using System.Web.Optimization;

namespace Rooms
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            //bundles.Add(new StyleBundle("~/Content/css").
            //    Include("~/Content/style_dashboard.css", "~/Content/reset_css.css", "~/Content/form_pw.css", "~/Content/form_glb_small.css", "~/Content/style_pw.css", "~/Content/themes/base/jquery-ui.css", "~/Content/themes/smoothness/jquery-ui.css", "~/Scripts/jtable/themes/basic/jtable_basic.min.css", "~/Scripts/jtable/themes/lightcolor/gray/jtable.min.css"));
            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include("~/Scripts/jquery-2.1.1.min.js", "~/Scripts/jquery-ui-1.11.2.min.js", "~/Scripts/jquery.unobtrusive-ajax.min.js", "~/Scripts/jtable/jquery.jtable.min.js", "~/Content/themes/base/jquery-ui.min.js", "~/Scripts/jquery.validate.min.js", "~/Scripts/jquery.validate.unobtrusive.min.js"));
        }
    }
}
