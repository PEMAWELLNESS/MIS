using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Rooms.Models;

namespace Rooms.Controllers
{
    public class AttendanceController : Controller
    {
        private MISPEMAEntities db = new MISPEMAEntities();
        // GET: Attendance
        public ActionResult HealerAttendance()
        {
            var emplist = db.TBL_DateofBirths.Where(i => i.Dept == "Healing Hub").ToList();
            return View(emplist);
        }
        [HttpPost]
        public ActionResult HealerAttendance(FormCollection collection)
        {
            int count = Convert.ToInt32(collection["count"].ToString());
            AttendanceDetail ad = new AttendanceDetail();
            List<AttendanceDetail> ads = new List<AttendanceDetail>();
            for (int i = 0; i < count; i++)
            {
                ad.EmpId = Convert.ToInt32(collection["emps " + i].ToString());
                ad.AttendanceStatusId = Convert.ToInt32(collection["attendance " + i].ToString());
                ad.AttendanceTime = DateTime.Now;
                ad.CreatedBy = "admin";
                ad.CreatedOn = DateTime.Now;
                db.AttendanceDetails.Add(ad);
                db.SaveChanges();
            }
            //AttendanceDetail ad = new AttendanceDetail();
            //ad.AttendanceStatusID = Convert.ToInt32(collection["attendance"].ToString());
            //ad.EmpId = Convert.ToInt32(collection["empcode"].ToString());
            //ad.AttendanceDate = DateTime.Now;
            //ad.CreatedBy ="1";
            //ad.CreatedOn = DateTime.Now;
            //db.AttendanceDetails.Add(ad);
            //int i = db.SaveChanges();
            //if(i==1)
            //{
            //    return Content("<script>alert('Attendance Registered Successfully');window.location = '/Home/Attendance';</script>");
            //}
            return RedirectToAction("HealerAttendance");
        }
        public ActionResult GetEmployees()
        {
            var emplist = db.TBL_DateofBirths.Where(i => i.Dept == "Healing Hub").Select(i => new { Id = i.Id, EmpCode = i.Ecno, EmpName = i.Emp_name }).ToList();
            return Json(emplist, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetAttendanceStatus()
        {
            var status = db.AttendanceStatus.Select(i => new { Id = i.ID, Status = i.AttendanceStatus }).ToList();
            return Json(status, JsonRequestBehavior.AllowGet);
        }
    }
}