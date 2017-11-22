using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Rooms.Models;
using System.Data.Entity.Core.Objects;
using System.Globalization;
using System.Data;
using System.Collections;
using System.Data.Entity.SqlServer;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using System.Data.OleDb;
using LinqToExcel;

namespace Rooms.Controllers
{
    public class TreatmentController : Controller
    {
        private MisRoomsEntities pema = new MisRoomsEntities();
        private MISPEMAEntities db = new MISPEMAEntities();
        string targetpath = ConfigurationManager.AppSettings["folderpath"] + "RoomStatus.xlsx";
        string targetpathNew = ConfigurationManager.AppSettings["folderpathNew"] + "TreatmentStatus.xlsx";
        public ActionResult TreatmentPlan()
        {
            return View();
        }
        [HttpPost]
        public ActionResult TreatmentPlan(FormCollection coll)
        {

            var id = db.TreatmentPlanIDs.FirstOrDefault();
            string tpdid = "TP" + (Convert.ToInt32(id.PlanDetailsID) + 1).ToString("0000");
            int rowcount = Convert.ToInt32(coll["rowcount"].ToString());
            int savedcount = 0;
            for (int i = 1; i <= rowcount; i++)
            {
                TreatmentPlanDetail tpd = new TreatmentPlanDetail();
                tpd.TPNumber = tpdid;
                tpd.TreatmentName = coll["trname" + i].ToString();
                tpd.HealerName = coll["healername" + i].ToString();
                tpd.RoomNo = coll["roomid" + i].ToString();
                db.TreatmentPlanDetails.Add(tpd);
                savedcount += db.SaveChanges();
            }
            if (savedcount > 0)
            {
                id.PlanDetailsID = Convert.ToInt32(id.PlanDetailsID) + 1;
                db.TreatmentPlanIDs.Attach(id);
                db.Entry(id).Property(i => i.PlanDetailsID).IsModified = true;
                db.SaveChanges();
                TreatmentPlan tp = new TreatmentPlan();
                tp.PRNO = coll["guestid"].ToString();
                tp.PlanDetailID = tpdid;
                tp.TreatmentSession = coll["session"].ToString();
                tp.ScheduleDate = DateTime.Today.AddDays(1);
                tp.ScheduleTime = TimeSpan.Parse(coll["scheduletime"].ToString());
                tp.StartTime = TimeSpan.Parse(coll["starttime"].ToString());
                tp.EndTime = TimeSpan.Parse(coll["endtime"].ToString());
                tp.CreatedBy = "admin";
                tp.CreatedOn = DateTime.Now;
                db.TreatmentPlans.Add(tp);
                db.SaveChanges();
            }
            return View();
        }
        public ContentResult GetGuestDetails(string prnumber)
        {
            var guestlist = pema.NC_TBL_PERSONAL_DETAILS.Where(i => i.PRNO == prnumber).FirstOrDefault();
            if (guestlist == null)
            {
                guestlist.FirstName = "0";
            }
            return Content(guestlist.FirstName);
        }
        public JsonResult GetHealerDetails()
        {
            var healername = db.TBL_DateofBirths.Where(i => i.Dept == "Healing Hub").Select(i => new { i.Emp_name, i.Ecno }).ToList();
            return Json(healername, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRoomNumbers()
        {
            var roomslist = db.TreatmentRoomMasters.Select(i => new { Id = i.ID, RoomNumber = i.RoomName }).ToList();
            return Json(roomslist, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetTreatmentNames()
        {
            var treatmentslist = pema.NC_TBL_Treatment_Master.Select(i => new { Id = i.Id, TreatmentName = i.Treatment_Name }).ToList();
            return Json(treatmentslist, JsonRequestBehavior.AllowGet);
        }
        public ViewResult GuestWise()
        {
            return View();
        }
        public JsonResult GuestWiseReport(string dated)
        {
            DateTime scheduledate = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var guestwise = (from ta in pema.TreatmentAvaileds
                             join hd in pema.HealerDetails on ta.HealerID equals hd.EMPNO
                             join tm in pema.Treatment_Master on ta.TreatmentID equals tm.TreatmentID
                             join trm in pema.TreatmentRoomMasters on ta.RoomID equals trm.ID
                             where ta.ScheduleDate == scheduledate&&ta.Treatment_Status=="Y"
                             select new
                             {
                                 PRNO = ta.PRNO,
                                 HealerName = hd.EMPNAME,
                                 ScheduleTime = ta.SchdeuleTime,
                                 TreatmentName = tm.TreatName,
                                 RoomNo = trm.RoomName,
                                 GuestName = ta.GuestName
                             }).OrderBy(i => i.GuestName).ToList();
            return Json(guestwise, JsonRequestBehavior.AllowGet);
        }
        public ViewResult HealerWise()
        {
            return View();
        }
        public JsonResult HealerWiseReport()
        {
            var guestwise = (from ta in pema.TreatmentAvaileds
                             join hd in pema.HealerDetails on ta.HealerID equals hd.EMPNO
                             join tm in pema.Treatment_Master on ta.TreatmentID equals tm.TreatmentID
                             join trm in pema.TreatmentRoomMasters on ta.RoomID equals trm.ID
                             where ta.ScheduleDate == DateTime.Today
                             select new
                             {
                                 PRNO = ta.PRNO,
                                 HealerName = hd.EMPNAME,
                                 ScheduleTime = ta.SchdeuleTime,
                                 TreatmentName = tm.TreatName,
                                 RoomNo = trm.RoomName,
                                 GuestName = ta.GuestName
                             }).OrderBy(i => i.HealerName).ToList();
            return Json(guestwise, JsonRequestBehavior.AllowGet);
        }
        public ViewResult TreatmentWise()
        {
            return View();
        }
        public JsonResult TreatmentWiseReport()
        {
            var guestwise = (from ta in pema.TreatmentAvaileds
                             join hd in pema.HealerDetails on ta.HealerID equals hd.EMPNO
                             join tm in pema.Treatment_Master on ta.TreatmentID equals tm.TreatmentID
                             join trm in pema.TreatmentRoomMasters on ta.RoomID equals trm.ID
                             where ta.ScheduleDate == DateTime.Today
                             select new
                             {
                                 PRNO = ta.PRNO,
                                 HealerName = hd.EMPNAME,
                                 ScheduleTime = ta.SchdeuleTime,
                                 TreatmentName = tm.TreatName,
                                 RoomNo = trm.RoomName,
                                 GuestName = ta.GuestName
                             }).OrderBy(i => i.TreatmentName).ToList();
            return Json(guestwise, JsonRequestBehavior.AllowGet);
        }
        public ViewResult RoomWise()
        {
            return View();
        }
        public JsonResult RoomWiseReport()
        {
            var guestwise = (from ta in pema.TreatmentAvaileds
                             join hd in pema.HealerDetails on ta.HealerID equals hd.EMPNO
                             join tm in pema.Treatment_Master on ta.TreatmentID equals tm.TreatmentID
                             join trm in pema.TreatmentRoomMasters on ta.RoomID equals trm.ID
                             where ta.ScheduleDate == DateTime.Today
                             select new
                             {
                                 PRNO = ta.PRNO,
                                 HealerName = hd.EMPNAME,
                                 ScheduleTime = ta.SchdeuleTime,
                                 TreatmentName = tm.TreatName,
                                 RoomNo = trm.RoomName,
                                 GuestName = ta.GuestName
                             }).OrderBy(i => i.RoomNo).ToList();
            return Json(guestwise, JsonRequestBehavior.AllowGet);
        }
        public ActionResult TreatmentView()
        {
            return View();
        }
        #region AJAX
        [ActionName("GT")]
        public JsonResult GETTREATMENT(string roomno, string dated)
        {
            DateTime scheduledate = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            if (roomno == "null")
            {
                var TREATMENTS = (from TP in pema.TreatmentAvaileds
                                  join TRM in pema.TreatmentRoomMasters on TP.RoomID equals TRM.ID
                                  where TP.ScheduleDate == scheduledate && TP.StartTime <= EntityFunctions.CreateTime(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second) && TP.EndTime >= EntityFunctions.CreateTime(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second)
                                  select new { RoomNo = TRM.RoomName }).ToList();
                return Json(TREATMENTS, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var TREATMENTS = (from TP in pema.TreatmentAvaileds
                                  join TRM in pema.TreatmentRoomMasters on TP.RoomID equals TRM.ID
                                  join TM in pema.Treatment_Master on TP.TreatmentID equals TM.TreatmentID
                                  join RS in pema.NC_TBL_ROOM_Status on TP.PRNO equals RS.PRNO
                                  join HD in pema.HealerDetails on TP.HealerID equals HD.EMPNO
                                  where TP.ScheduleDate == scheduledate
                                  && TP.StartTime <= EntityFunctions.CreateTime(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second) && TP.EndTime >= EntityFunctions.CreateTime(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second)
                                  && TRM.RoomName == roomno

                                  select new
                                  {
                                      RoomNo = TRM.RoomName,
                                      GuestName = RS.Guest_Name,
                                      TreatmentName = TM.TreatName,
                                      HealerName = HD.EMPNAME

                                  }).ToList();
                return Json(TREATMENTS, JsonRequestBehavior.AllowGet);
            }

        }

        #endregion
        public ActionResult Dashboard()
        {
            return View();
        }
        public ActionResult Gettherapistcount()
        {
            var model = (from a in pema.HealerDetails select a).Count();
            return Content(model.ToString());
        }
        public ActionResult Getpresentcount()
        {
            DateTime dt = DateTime.Today;
            var model = (from a in pema.AttendanceDetails where EntityFunctions.TruncateTime(a.AttendanceTime) == EntityFunctions.TruncateTime(dt.Date) select a).Count();
            return Content(model.ToString());
        }
        //public ActionResult Getattendcount()
        //{
        //    DateTime dt = DateTime.Now;
        //    var model = (from a in pema.TreatmentAvaileds
        //                 join b in pema.AttendanceDetails on a.HealerID equals b.EmpId
        //                 where a.ScheduleDate == dt && EntityFunctions.TruncateTime(b.AttendanceTime) == EntityFunctions.TruncateTime(dt.Date)
        //                 select new { a, b }).Count();
        //    return Content(model.ToString());
        //}
        //public ActionResult TotalGuests()
        //{
        //    var model = (from a in pema.NC_TBL_ROOM_Status where a.Date_To == null&&a.Status=="Occupied" select a).Count();
        //    return Content(model.ToString());
        //}
        public ActionResult TotalGuests()
        {
            string pathToExcelFile = targetpath;
            //DateTime dtmonth = Convert.ToDateTime(dtmnt);
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet1$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            int count = 0;
            int count1 = 0;
            int count2 = 0;
            int totalcount = 0;
            foreach (var a in artistAlbums1)
            {
                string Status = Convert.ToString(a["Status"]);
                // DateTime dt1 = Convert.ToDateTime(a["Date"]);

                if (Status == "Inhouse")
                {
                    count = count + 1;
                }
                if (Status == "Single")
                {
                    count1 = count1 + 1;
                }
                if (Status == "Double")
                {
                    count2 = count2 + 1;
                }
                totalcount = count + count1 + (count2 * 2);
            }
            return Content(totalcount.ToString());
        }
        public ActionResult Gettreatmentscount()
        {
            var model = (from a in pema.Treatment_Master select a).Count();
            return Content(model.ToString());
        }
        public ActionResult Getguestattendcount(string dated)
        {
            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            // DateTime dt = DateTime.Today;
            var model = pema.TreatmentAvaileds.Where(a => a.ScheduleDate == dt&&a.Treatment_Status=="Y").GroupBy(a => a.GuestName).Count();
            return Content(model.ToString());
        }
        public ActionResult Gettodaytreatments(string dated)
        {
            //DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var model = pema.TreatmentAvaileds.Where(a => a.ScheduleDate == dt&&a.Treatment_Status=="Y").Count();
            return Content(model.ToString());
        }
        public ActionResult gettotalhealerscount()
        {
            var model = pema.HealerDetails.Count();
            return Content(model.ToString());
        }
        public ActionResult Getattendhealerscount(string dated)
        {
            //DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var model = pema.TreatmentAvaileds.Where(a => a.ScheduleDate == dt&&a.Treatment_Status=="Y").GroupBy(a => a.HealerID).Count();
            return Content(model.ToString());
        }
        public ActionResult gettotalroomsscount()
        {
            var model = pema.TreatmentRoomMasters.Count();
            return Content(model.ToString());
        }
        public ActionResult Getroomsoccupiedcount(string dated)
        {
            //  DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var model = pema.TreatmentAvaileds.Where(a => a.ScheduleDate == dt).GroupBy(a => a.RoomID).Count();
            return Content(model.ToString());
        }

        public ActionResult GetroomsoccupiedcountForGraph(string dated)
        {
            //  DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var occupied = pema.TreatmentAvaileds.Where(a => a.ScheduleDate == dt&&a.Treatment_Status=="Y").Select(i=> new { RoomID=i.RoomID,Status="Occupied"}).GroupBy(a => a.RoomID).ToList();
            var total = pema.TreatmentRoomMasters.Count();
            string outputt = occupied.Count().ToString() + ":" + (total - occupied.Count()).ToString();
            return Content(outputt.ToString());
        }
        public ActionResult Getroomsvacantcount(string dated)
        {
            //  DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var x = pema.TreatmentAvaileds.Where(a => a.ScheduleDate == dt&&a.Treatment_Status=="Y").GroupBy(a => a.RoomID).Count();
            var y = pema.TreatmentRoomMasters.Count();
            //var model = pema.TreatmentAvaileds.Where(a => a.ScheduleDate != dt).GroupBy(a => a.RoomID).Count();
            var model = y - x;
            return Content(model.ToString());
        }
        public JsonResult Guestwisegraph(string dated)
        {
            //  DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var guest = pema.TreatmentAvaileds.Where(t => t.ScheduleDate == dt&&t.Treatment_Status=="Y").GroupBy(h => h.GuestName).Select(group => new { Key = group.Key, Value = group.Count() });
            //var guest = pema.TreatmentAvaileds.Where(a => a.ScheduleDate == dt && a.GuestName!=null && a.GuestName!="").GroupBy(a => a.GuestName).Select(group => new { key = group.Key, Value = group.Count() });
            var guestgraph = guest.OrderByDescending(a => a.Value);
            return Json(guestgraph, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Gettreatmentlist(string Guestname, string datenew)
        {
            //  DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(datenew, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var list = (from a in pema.TreatmentAvaileds
                        join b in pema.Treatment_Master on a.TreatmentID equals b.TreatmentID
                        where a.ScheduleDate == dt && a.GuestName == Guestname&&a.Treatment_Status=="Y"
                        select new { a.PRNO, a.GuestName, b.TreatName }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Healerwisegraph(string dated)
        {
            //  DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var list = (from a in pema.TreatmentAvaileds
                        join b in pema.HealerDetails on a.HealerID equals b.EMPNO
                        where a.ScheduleDate == dt&&a.Treatment_Status=="Y"
                        select new { b.EMPNAME }).GroupBy(h => h.EMPNAME).Select(group => new { Key = group.Key, Value = group.Count() }).ToList();

            var healergraph = list.OrderByDescending(a => a.Value);
            return Json(healergraph, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Gethealerlist(string healername, string datenew)
        {
            //  DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(datenew, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var list = (from a in pema.TreatmentAvaileds
                        join b in pema.HealerDetails on a.HealerID equals b.EMPNO
                        join c in pema.Treatment_Master on a.TreatmentID equals c.TreatmentID
                        where a.ScheduleDate == dt && b.EMPNAME == healername&&a.Treatment_Status=="Y"
                        select new { a.PRNO, b.EMPNAME, c.TreatName }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Roomwisegraph(string dated)
        {
            //DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var list = (from a in pema.TreatmentAvaileds
                        join b in pema.TreatmentRoomMasters on a.RoomID equals b.ID
                        where a.ScheduleDate == dt&&a.Treatment_Status=="Y"
                        select new { b.RoomName }).GroupBy(h => h.RoomName).Select(group => new { Key = group.Key, Value = group.Count() }).ToList();
            var roomgraph = list.OrderByDescending(a => a.Value);
            return Json(roomgraph, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Getroomlist(string roomname, string datenew)
        {
            //DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(datenew, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var list = (from a in pema.TreatmentAvaileds
                        join b in pema.TreatmentRoomMasters on a.RoomID equals b.ID
                        where a.ScheduleDate == dt && b.RoomName == roomname&&a.Treatment_Status=="Y"
                        select new { a.PRNO, a.GuestName, b.RoomName }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Treatmentwisegraph(string dated)
        {
            //  DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var list = (from a in pema.TreatmentAvaileds
                        join b in pema.Treatment_Master on a.TreatmentID equals b.TreatmentID
                        where a.ScheduleDate == dt&&a.Treatment_Status=="Y"
                        select new { b.TreatName }).GroupBy(h => h.TreatName).Select(group => new { Key = group.Key, Value = group.Count() }).ToList();
            var treatmentgraph = list.OrderByDescending(a => a.Value);
            return Json(treatmentgraph, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Gettreatmentslist(string treatmentname, string datenew)
        {
            //  DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(datenew, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            //Guestname = Guestname.Substring(0, Guestname.IndexOf('(') - 1);
            var list = (from a in pema.TreatmentAvaileds
                        join b in pema.Treatment_Master on a.TreatmentID equals b.TreatmentID
                        where a.ScheduleDate == dt && b.TreatName == treatmentname&&a.Treatment_Status=="Y"
                        select new { a.PRNO, a.GuestName, b.TreatName }).ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public ActionResult currenttreatmentlist()
        {
            return View();
        }
        //public JsonResult Getcurrenttreatmentlist()
        //{
        //    DateTime dt = DateTime.Today;
        //    var list = pema.GetRoomDet().ToList();
        //    return Json(list, JsonRequestBehavior.AllowGet);
        //}
        public JsonResult Gettodaytreatmentlist(string Time, string RoomName, string dated)
        {
            //DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            if (Time == "")
            {
                var list = (from a in pema.TreatmentAvaileds
                            join b in pema.HealerDetails on a.HealerID equals b.EMPNO
                            join c in pema.Treatment_Master on a.TreatmentID equals c.TreatmentID
                            join d in pema.TreatmentRoomMasters on a.RoomID equals d.ID
                            where a.ScheduleDate == dt && d.RoomName == RoomName&&a.Treatment_Status=="Y"
                            select new { GuestName = a.GuestName, HealerName = b.EMPNAME, TreatmentName = c.TreatName }).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                int time = Convert.ToInt32(Time);
                var list = (from a in pema.TreatmentAvaileds
                            join b in pema.HealerDetails on a.HealerID equals b.EMPNO
                            join c in pema.Treatment_Master on a.TreatmentID equals c.TreatmentID
                            join d in pema.TreatmentRoomMasters on a.RoomID equals d.ID
                            where a.ScheduleDate == dt && a.StartTime.Value.Hours == time && d.RoomName == RoomName && a.Treatment_Status=="Y"
                            select new { GuestName = a.GuestName, HealerName = b.EMPNAME, TreatmentName = c.TreatName }).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);

            }
        }
        public ActionResult Getcurrenttreatmentlist(string dated)
        {
            try
            {
                //var x = (from TA in pema.TreatmentAvaileds
                //         group new { TA.TreatmentRoomMaster, TA } by new
                //         {
                //             TA.TreatmentRoomMaster.RoomName,
                //             Column1 = (TA.StartTime == null) ? 0 : SqlFunctions.DatePart("hour", TA.StartTime),
                //             TA.ScheduleDate
                //         } into g
                //         //where g.Key.ScheduleDate == (DateTime)SqlFunctions.GetDate()
                //         select new
                //         {
                //             RoomName = g.Key.RoomName,
                //             g.Key.ScheduleDate,
                //             ds = g.Count(p => p.TA.TreatmentRoomMaster.RoomName != null),
                //             Perio = (g.Key.Column1 == null) ? 0 : g.Key.Column1

                //         }).ToList();
                //var y=(from tm in pema.TreatmentRoomMasters
                // join ta in (
                //     x) on tm.RoomName equals ta.RoomName into ta_join
                // from ta in ta_join.DefaultIfEmpty()
                // select new
                // {
                //     ds = ta.ds,
                //     tm.RoomName,
                //     Perio = ta.Perio
                // }).ToList();

                string connectionString = ConfigurationManager.ConnectionStrings["MisRooms"].ConnectionString;
                DataTable table = new DataTable();
                using (var con = new SqlConnection(connectionString))
                using (var cmd = new SqlCommand("GetTreatmentRoomDetails", con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    //DateTime dates = Convert.ToDateTime(dated);
                    DateTime dates = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@dates", dates);
                    da.Fill(table);
                }
                //return Content(dated);
                //string data = GetTableRows(table);
                return Json(GetTableRows(table), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Content(ex.ToString());
            }
        }
        public List<Dictionary<string, object>> GetTableRows(DataTable dtData)
        {
            List<Dictionary<string, object>>
            lstRows = new List<Dictionary<string, object>>();
            Dictionary<string, object> dictRow = null;

            foreach (DataRow dr in dtData.Rows)
            {
                dictRow = new Dictionary<string, object>();
                foreach (DataColumn col in dtData.Columns)
                {
                    dictRow.Add(col.ColumnName, dr[col]);
                }
                lstRows.Add(dictRow);
            }
            return lstRows;
        }
        //
        public DataTable GetPivotTableUsingLinqToEntity()
        {
            try
            {
                DataTable dt = new DataTable();


                //GetAllData() return All data for Student.

                var data = pema.TreatmentAvaileds.ToList();

                // Student data will be like below
                //Applying linq for geeting pivot output

                var d = (from f in data
                         group f by new { f.ScheduleDate, f.StartTime.Value.Hours, f.RoomID }
                    into myGroup
                         where myGroup.Count() > 0
                         join TRM in pema.TreatmentRoomMasters on myGroup.FirstOrDefault().RoomID equals TRM.ID
                         select new
                         {
                             myGroup.Key.RoomID,
                             myGroup.Key.ScheduleDate,
                             myGroup.Key.Hours,
                             subject = myGroup.GroupBy(f => f.StartTime.Value.Hours).Select
                             (m => new { Sub = m.Key, Score = m.Sum(c => c.RoomID) })
                         }).ToList();

                // By Using GetAllSubject() Method we will Get the list of all subjects

                var sub = pema.TreatmentAvaileds.GroupBy(t => t.StartTime.Value.Hours).ToList();
                // Distinct Subject Like Below
                //Creating array for adding dynamic columns
                ArrayList objDataColumn = new ArrayList();

                if (data.Count() > 0)
                {
                    //Three column are fix "rank","pupil","Total".
                    objDataColumn.Add("RoomName");
                    //Add Subject Name as column in Datatable
                    for (int i = 0; i < sub.Count; i++)
                    {
                        objDataColumn.Add(sub[i].Key);
                    }
                }
                //Add dynamic columns name to datatable dt
                for (int i = 0; i < objDataColumn.Count; i++)
                {
                    dt.Columns.Add(objDataColumn[i].ToString());
                }

                //Add data into datatable with respect to dynamic columns and dynamic data
                for (int i = 0; i < d.Count; i++)
                {
                    List<string> tempList = new List<string>();
                    tempList.Add(d[i].RoomID.ToString());
                    tempList.Add(d[i].ScheduleDate.ToString());
                    tempList.Add(d[i].subject.ToString());

                    var res = d[i].subject.ToList();
                    for (int j = 0; j < res.Count; j++)
                    {
                        tempList.Add(res[j].Score.ToString());
                    }

                    dt.Rows.Add(tempList.ToArray<string>());
                }
                return dt;
                //Now the Pivot datatable return like below screen
            }
            catch (Exception)
            {
                return null;
            }
        }
        public JsonResult TreatmentGraphDet(string dated,string Name)
        {
            Name = Name.Substring(0, Name.IndexOf('('));
            if (Name == "Occupied")
            {
                DateTime scheduledate = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                var guestwise = (from ta in pema.TreatmentAvaileds
                                 join hd in pema.HealerDetails on ta.HealerID equals hd.EMPNO
                                 join tm in pema.Treatment_Master on ta.TreatmentID equals tm.TreatmentID
                                 join trm in pema.TreatmentRoomMasters on ta.RoomID equals trm.ID
                                 where ta.ScheduleDate == scheduledate
                                 select new
                                 {
                                     PRNO = ta.PRNO,
                                     HealerName = hd.EMPNAME,
                                     ScheduleTime = ta.SchdeuleTime,
                                     TreatmentName = tm.TreatName,
                                     RoomNo = trm.RoomName,
                                     GuestName = ta.GuestName
                                 }).OrderBy(i => i.GuestName).ToList();
                return Json(guestwise, JsonRequestBehavior.AllowGet);
            }
            else
            {
                DateTime scheduledate = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                var guestwise = (from TRM in pema.TreatmentRoomMasters
                                 where !(from TA in pema.TreatmentAvaileds
                                         where TA.ScheduleDate == scheduledate
                                         select TA.RoomID).Contains(TRM.ID) // TRM.RoomName.Contains(occupiedroomslist)
                                 select new
                                 {
                                     Id = TRM.ID,
                                     RoomNumber = TRM.RoomName
                                 }).OrderBy(i => i.RoomNumber).ToList();
                return Json(guestwise, JsonRequestBehavior.AllowGet);
            }
           
        }
        public JsonResult Gettodaytreatmentlist1(string Time, string RoomName, string dated)
        {
            //DateTime dt = DateTime.Today;
            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            if (Time == "")
            {
                var list = (from a in pema.TreatmentAvaileds
                            join b in pema.HealerDetails on a.HealerID equals b.EMPNO
                            join c in pema.Treatment_Master on a.TreatmentID equals c.TreatmentID
                            //join d in pema.TreatmentRoomMasters on a.RoomID equals d.ID
                            where a.ScheduleDate == dt && b.EMPNAME == RoomName&&a.Treatment_Status=="Y"
                            select new { GuestName = a.GuestName, HealerName = b.EMPNAME, TreatmentName = c.TreatName }).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            else
            {
                int time = Convert.ToInt32(Time);
                var list = (from a in pema.TreatmentAvaileds
                            join b in pema.HealerDetails on a.HealerID equals b.EMPNO
                            join c in pema.Treatment_Master on a.TreatmentID equals c.TreatmentID
                            //join d in pema.TreatmentRoomMasters on a.RoomID equals d.ID
                            where a.ScheduleDate == dt && a.StartTime.Value.Hours == time && b.EMPNAME == RoomName&&a.Treatment_Status == "Y"
                            select new { GuestName = a.GuestName, HealerName = b.EMPNAME, TreatmentName = c.TreatName }).ToList();
                return Json(list, JsonRequestBehavior.AllowGet);

            }
        }

        public ActionResult Gethealerwisereportlist(string dated)
        {
            try
            {
                string connectionString = ConfigurationManager.ConnectionStrings["MisRooms"].ConnectionString;
                DataTable table = new DataTable();
                using (var con = new SqlConnection(connectionString))
                using (var cmd = new SqlCommand("GehealerwiseDetails", con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    //DateTime dates = Convert.ToDateTime(dated);
                    DateTime dates = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@dates", dates);
                    da.Fill(table);
                }
                //return Content(dated);
                //string data = GetTableRows(table);
                return Json(GetTableRows(table), JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Content(ex.ToString());
            }
        }

        public ActionResult GetattendhealersGraph(string dated)
        {
            //DateTime dt = DateTime.Today;
            //DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            //var model = pema.TreatmentAvaileds.Where(a => a.ScheduleDate == dt).GroupBy(a => a.HealerID).Count();
            //return Content(model.ToString());

            DateTime dt = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var occupied = pema.TreatmentAvaileds.Where(a => a.ScheduleDate == dt&&a.Treatment_Status=="Y").GroupBy(a => a.HealerID).ToList();
            var total = pema.HealerDetails.Count();
            string outputt = occupied.Count().ToString() + ":" + (total - occupied.Count()).ToString();
            return Content(outputt.ToString());
        }

        public JsonResult HealersGraphDet(string dated, string Name)
        {
            Name = Name.Substring(0, Name.IndexOf('('));
            if (Name == "Present")
            {
                DateTime scheduledate = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                var guestwise = (from ta in pema.TreatmentAvaileds
                                 join hd in pema.HealerDetails on ta.HealerID equals hd.EMPNO
                                 join tm in pema.Treatment_Master on ta.TreatmentID equals tm.TreatmentID
                                 join trm in pema.TreatmentRoomMasters on ta.RoomID equals trm.ID
                                 where ta.ScheduleDate == scheduledate&&ta.Treatment_Status=="Y"
                                 select new
                                 {
                                     PRNO = ta.PRNO,
                                     HealerName = hd.EMPNAME,
                                     ScheduleTime = ta.SchdeuleTime,
                                     TreatmentName = tm.TreatName,
                                     RoomNo = trm.RoomName,
                                     GuestName = ta.GuestName
                                 }).OrderBy(i => i.HealerName).ToList();
                return Json(guestwise, JsonRequestBehavior.AllowGet);
            }
            else
            {
                DateTime scheduledate = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
                var guestwise = (from TRM in pema.HealerDetails
                                 where !(from TA in pema.TreatmentAvaileds
                                         where TA.ScheduleDate == scheduledate
                                         select TA.HealerID).Contains(TRM.EMPNO) // TRM.RoomName.Contains(occupiedroomslist)
                                 select new
                                 {
                                     Id = TRM.EMPNO,
                                     EMPNAME = TRM.EMPNAME
                                 }).OrderBy(i => i.EMPNAME).ToList();
                return Json(guestwise, JsonRequestBehavior.AllowGet);
            }

        }
public ActionResult Currenttreatment()
        {
            return View();
        }
        public ActionResult GetTreatment(string roomno)
        {
            if (roomno == "null")
            {
                var x = (from TA in pema.TreatmentAvaileds
                         join TRM in pema.TreatmentRoomMasters on TA.RoomID equals TRM.ID
                         where TA.ScheduleDate == DateTime.Today && TA.StartTime <= EntityFunctions.CreateTime(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second) && TA.EndTime >= EntityFunctions.CreateTime(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second)
                         select new { TA, TRM }).ToList();
                var y = (from RS in pema.NC_TBL_ROOM_Status select new { RS }).ToList();
                var roomslist = (from a in x
                                 join b in y on a.TA.PRNO equals b.RS.PRNO
                                 select new
                                 {
                                     RoomNo = a.TRM.RoomName
                                 }).ToList();
                return Json(roomslist, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var x = (from TA in pema.TreatmentAvaileds
                         join TRM in pema.TreatmentRoomMasters on TA.RoomID equals TRM.ID
                         join TM in pema.Treatment_Master on TA.TreatmentID equals TM.TreatmentID
                         join HD in pema.HealerDetails on TA.HealerID equals HD.EMPNO
                         where TA.ScheduleDate == DateTime.Today && TA.StartTime <= EntityFunctions.CreateTime(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second) && TA.EndTime >= EntityFunctions.CreateTime(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second)
                         select new { TA, TRM, TM, HD }).ToList();
                var y = (from RS in pema.NC_TBL_ROOM_Status select new { RS }).ToList();
                var roomslist = (from a in x
                                 join b in y on a.TA.PRNO equals b.RS.PRNO
                                 where a.TRM.RoomName == roomno
                                 select new
                                 {
                                     RoomNo = a.TRM.RoomName,
                                     GuestName = b.RS.Guest_Name,
                                     TreatmentName = a.TM.TreatName,
                                     HealerName = a.HD.EMPNAME
                                 }).ToList();
                return Json(roomslist, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Gervacantcount()
        {
            var list = (from TA in pema.TreatmentAvaileds
                        join TRM in pema.TreatmentRoomMasters on TA.RoomID equals TRM.ID
                        where TA.ScheduleDate == DateTime.Today && TA.StartTime <= EntityFunctions.CreateTime(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second) && TA.EndTime >= EntityFunctions.CreateTime(DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second)
                        select new { TA, TRM }).Count();
            return View(list);
        }
        public ActionResult guestlist()
        {
            return View();
        }
        //public ActionResult Gethealerwisereportlist(string dated)
        //{
        //    try
        //    {
        //        string connectionString = ConfigurationManager.ConnectionStrings["MisRooms"].ConnectionString;
        //        DataTable table = new DataTable();
        //        using (var con = new SqlConnection(connectionString))
        //        using (var cmd = new SqlCommand("GehealerwiseDetails", con))
        //        using (var da = new SqlDataAdapter(cmd))
        //        {
        //            //DateTime dates = Convert.ToDateTime(dated);
        //            DateTime dates = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
        //            cmd.CommandType = CommandType.StoredProcedure;
        //            cmd.Parameters.AddWithValue("@dates", dates);
        //            da.Fill(table);
        //        }
        //        //return Content(dated);
        //        //string data = GetTableRows(table);
        //        return Json(GetTableRows(table), JsonRequestBehavior.AllowGet);

        //    }
        //    catch (Exception ex)
        //    {
        //        return Content(ex.ToString());
        //    }
        //}
        public JsonResult Totalguestlist(string dated)
        {
            DateTime scheduledate = DateTime.ParseExact(dated, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var result = pema.NC_TBL_ROOM_Status.Where(i => i.Status == "Occupied" && i.Date_To == null && i.Date_From <= scheduledate).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult currenthealerlist()
        {
            return View();
        }
    }
}