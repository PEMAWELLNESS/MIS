using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Rooms.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Rooms.Controllers
{
    public class HRController : Controller
    {
        // GET: HR
        private MisRoomsEntities pema = new MisRoomsEntities();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult LeaveManagement()
        {
            return View();
        }
        public ActionResult PayRole()
        {
            return View();
        }
        public ActionResult DepartmentWise()
        {
            return View();
        }
        public ActionResult DepartmentAttendance()
        {
            return View();
        }
        [ActionName("GED")]
        public ActionResult GETEMPDETAILS()
        {
            var GUESTDETAILS = (from RS in pema.PEMASSLs
                                select new
                                {
                                    RS.Employee_Code,
                                    RS.Employee_Name,
                                    RS.Department
                                }).Distinct().ToList();
            var newlist = (from a in GUESTDETAILS select a).OrderBy(a => a.Department).ToList();
            return Json(newlist, JsonRequestBehavior.AllowGet);
        }

        [ActionName("GDD")]
        public ActionResult GETDEPTDETAILS()
        {
            var GUESTDETAILS = (from RS in pema.PEMASSLs
                                select new
                                {
                                    RS.Department
                                }).Distinct().ToList();
            var newlist = (from a in GUESTDETAILS select a).OrderBy(a => a.Department).ToList();
            return Json(newlist, JsonRequestBehavior.AllowGet);
        }
        public JsonResult EmpAttdenanceDet(double EMP_Code)
        {
            var EmpPresent = (from a in pema.PEMASSLs.Where(a => a.Employee_Code == EMP_Code && a.StatusCode == "P" && a.AttendanceDate.Value.Month == DateTime.Today.Month-1) select a).Count();
            var EmpAbsent = (from a in pema.PEMASSLs.Where(a => a.Employee_Code == EMP_Code && a.StatusCode == "A" && a.AttendanceDate.Value.Month == DateTime.Today.Month-1) select a).Count();
            var SinglePunch = (from a in pema.PEMASSLs.Where(a => a.Employee_Code == EMP_Code && a.InTime==a.C_OutTime && a.PunchRecords != null && a.PunchRecords !="" && a.AttendanceDate.Value.Month == DateTime.Today.Month-1) select a).Count();
            var EmpLate = (from a in pema.PEMASSLs.Where(a => a.Employee_Code == EMP_Code && a.Duration>540 && a.AttendanceDate.Value.Month == DateTime.Today.Month-1) select a).Count();
            var EmpEarly = (from a in pema.PEMASSLs.Where(a => a.Employee_Code == EMP_Code && a.Duration < 540 && a.Duration != 0 && a.AttendanceDate.Value.Month == DateTime.Today.Month-1) select a).Count();
            dynamic det = new ExpandoObject();
            det.Present = EmpPresent;
            det.Absent = EmpAbsent;
            det.SinglePunch = SinglePunch;
            det.Late = EmpLate;
            det.Early = EmpEarly;
            var dictionary = (IDictionary<string, object>)det;
            //var jsonobject = JsonConvert.SerializeObject(dictionary);
            return Json(dictionary, JsonRequestBehavior.AllowGet);
        }
        public JsonResult EmpPresentDet(double EmpCode)
        {
            var EmpPresent = (from a in pema.PEMASSLs.Where(a => a.Employee_Code == EmpCode && a.StatusCode == "P" && a.AttendanceDate.Value.Month == DateTime.Today.Month-1).OrderBy(a=>a.AttendanceDate) select a).ToList();

            return Json(EmpPresent, JsonRequestBehavior.AllowGet);
        }
        public JsonResult EmpAbsentDet(double EmpCode)
        {
            var EmpAbsent = (from a in pema.PEMASSLs.Where(a => a.Employee_Code == EmpCode && a.StatusCode == "A" && a.AttendanceDate.Value.Month == DateTime.Today.Month-1).OrderBy(a => a.AttendanceDate) select a).ToList();
            return Json(EmpAbsent, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SinglePunch(double EmpCode)
        {
            var SinglePunch = (from a in pema.PEMASSLs.Where(a => a.Employee_Code == EmpCode && a.InTime == a.C_OutTime && a.PunchRecords!=null && a.PunchRecords != "" && a.AttendanceDate.Value.Month == DateTime.Today.Month-1).OrderBy(a => a.AttendanceDate) select a).ToList();
            return Json(SinglePunch, JsonRequestBehavior.AllowGet);
        }
        public JsonResult EmpLate(double EmpCode)
        {
            var EmpLate = (from a in pema.PEMASSLs.Where(a => a.Employee_Code == EmpCode && a.Duration > 540 && a.AttendanceDate.Value.Month == DateTime.Today.Month-1).OrderBy(a => a.AttendanceDate) select a).ToList();
            return Json(EmpLate, JsonRequestBehavior.AllowGet);
        }
        public JsonResult EmpEarly(double EmpCode)
        {
            var EmpEarly = (from a in pema.PEMASSLs.Where(a => a.Employee_Code == EmpCode && a.Duration < 540 && a.Duration!=0 && a.AttendanceDate.Value.Month == DateTime.Today.Month-1).OrderBy(a => a.AttendanceDate) select a).ToList();
            return Json(EmpEarly, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeptmentWisecount(string EMP_Code)
        {
            var EmpPresent = (from a in pema.PEMASSLs.Where(a => a.Department == EMP_Code ).GroupBy(a=>a.Employee_Code) select a).Count();
           
            return Json(EmpPresent, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DetEmps(string EmpCode)
        {
            var EmpPresent = (from a in pema.PEMASSLs.Where(a => a.Department == EmpCode ).GroupBy(a => a.Employee_Code) select a).ToList();

            return Json(EmpPresent, JsonRequestBehavior.AllowGet);
        }
    }
}