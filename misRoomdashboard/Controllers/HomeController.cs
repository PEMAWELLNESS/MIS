using Rooms.Models;
using LinqToExcel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.OleDb;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Globalization;
using System.Dynamic;

namespace Rooms.Controllers
{
    public class HomeController : Controller
    {
        MisRoomsEntities pema = new MisRoomsEntities();
        //MISPEMAEntities db = new MISPEMAEntities();
        string targetpath = ConfigurationManager.AppSettings["folderpath"] + "RoomStatus.xlsx";
        string targetpathNew = ConfigurationManager.AppSettings["folderpathNew"] + "TreatmentStatus.xlsx";
        [ActionName("GIDETAILS")]
        public JsonResult GETINGREDIENTDETAILS()
        {
            var result = pema.Ingredients.Select(i => new { IngredientName = i.INGREDIENT_NAME, Calories = i.CALORIES_KCAL }).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [ActionName("GRDETAILS")]
        public JsonResult GETRECIPEDETAILS()
        {
            var result = (from R in pema.Recipes
                          join RC in pema.RecipeCategories on R.category equals RC.id
                          select
                          new
                          {
                              RecipeName = R.recipe_name,
                              Category = RC.category
                          }).ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Roomdashboard()
        {
                return View();
        }
        public ActionResult CurrenttreatmentFromExcel()
        {
            string pathToExcelFile = targetpathNew;
            var connectionString = "";
            if (targetpathNew.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpathNew.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet1$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            dummy.Columns.Add("backgroundColor");
            dummy.Columns.Add("rendering");
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            //var contains = dtable1.AsEnumerable().Any(row => roomno == row.Field<String>("Room_No"));
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<TreatmentValues> data = new List<TreatmentValues>();
            //if (contains) {
            foreach (var a in artistAlbums1)
            {

                TreatmentValues fu = new TreatmentValues();
                //if (roomno == Room_No)
                {
                    string Status = Convert.ToString(a["Status"]);
                    //DateTime Date = Convert.ToDateTime(a["Date"]);
                    string Room_No = Convert.ToString(a["Room_No"]);
                    if (Status == "Occupied")
                    {
                        fu.Room_No = Room_No;
                        fu.backgroundColor = "#00ff1f";
                        fu.Status = Status;
                    }
                    else if (Status == "Vacant")
                    {
                        fu.Room_No = Room_No;
                        fu.backgroundColor = "#0099cc";
                        fu.Status = Status;
                    }
                    else if (Status == "Non-Funtional")
                    {
                        fu.Room_No = Room_No;
                        fu.backgroundColor = "#ff0000";
                        fu.Status = Status;
                    }
                    else if (Status == "Non-Operational")
                    {
                        fu.Room_No = Room_No;
                        fu.backgroundColor = "#a52a2a";
                        fu.Status = Status;
                    }
                    //}
                    data.Add(fu);
                }
            }
            var dddd = data.ToArray();
            return Json(dddd, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Currenttreatment()
        {
            return View();
        }
        public ActionResult Kitchen()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogIn(string User_Name, string Password)
        {
            if (ModelState.IsValid)
            {
                var user_Name = "admin";
                var password = "admin";
                if (user_Name == User_Name && password == Password)
                {
                    //Session["user_id"] = obj.user_id.ToString();
                    // Session["EMP_NAME"] = obj.first_name.ToString();
                    return RedirectToAction("Roomdashboard");
                }
            }
            else
            {
                ModelState.AddModelError("", "Login details are wrong.");
            }
            return View(User);
        }

        public ActionResult LogOff()
        {
            //FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Home");
        }
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult CheckLoginDeatils(string Userid, string Pwd)
        {
            var message = "";

            var Redirect = "";
            var res = pema.ADRM_TBL_USER_MASTER.Where(x => x.LOGIN_NAME == Userid && x.PASSWORD == Pwd).FirstOrDefault();
            if (res == null)
            {
                message = "Invalid Login Details";
                return Json(new { Value = "Fail", message }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                Session["LogedUserID"] = res.EMP_FHNAME.ToString();
                Session["UserCode"] = res.USER_CODE;
                Session["GuestName"] = res.EMP_FNAME + " " + res.EMP_FHNAME;
                message = "Success";
                return Json(new { Value = "Success", message, Redirect }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Logout()
        {
            Session.Clear();
            Session.Abandon();
            return RedirectToAction("Index");
        }
        public ActionResult GetDobnew()
        {
            DateTime dt = DateTime.Now.Date;
            List<TBL_DateofBirths> listDOB = new List<TBL_DateofBirths>();
            // var listNew = db.dob.Where(d => d.DOB != null).ToList();
            var listNew = (from d in pema.TBL_DateofBirths where d.DateofBirthDate != null select d).ToList();
            //db.dob.Where(t => t.DOB != null).ToList();
            //  var list = db.dobs.ToList();
            foreach (var v in listNew)
            {
                if (v.DateofBirthDate.Value.Month == dt.Month && v.DateofBirthDate.Value.Day == dt.Day)
                {
                    listDOB.Add(v);
                }
            }

            if (listDOB.Count > 0)
            {
                return Json(listDOB, JsonRequestBehavior.AllowGet);
            }
            else
            {
                List<TBL_DateofBirths> listDOB1 = new List<TBL_DateofBirths>();
                int count = 0;
                for (int i = 0; count == 0; i++)
                {
                    DateTime dt1 = DateTime.Today.AddDays(i);
                    var list1 = pema.TBL_DateofBirths.Where(t => t.DateofBirthDate != null).ToList();
                    foreach (var v in list1)
                    {
                        if (v.DateofBirthDate.Value.Month == dt1.Month && v.DateofBirthDate.Value.Day == dt1.Day)
                        {
                            count++;
                            listDOB1.Add(v);
                        }
                    }
                }
                return Json(listDOB1, JsonRequestBehavior.AllowGet);
            }


        }
        public ActionResult GetEventsOfTheDay()
        {
            DateTime dt = DateTime.Now.Date;
            List<TBL_MINUTES_OF_MEETING> listuser = new List<TBL_MINUTES_OF_MEETING>();

            var list = pema.TBL_MINUTES_OF_MEETING.Where(t => t.MOM_Assigned_Date != null).ToList();
            foreach (var v in list)
            {
                if (v.MOM_Assigned_Date.Value.Month == dt.Month && v.MOM_Assigned_Date.Value.Day == dt.Day)
                {
                    listuser.Add(v);
                }
            }

            if (listuser.Count > 0)
            {
                return Json(listuser, JsonRequestBehavior.AllowGet);
            }
            else
            {
                List<TBL_MINUTES_OF_MEETING> listuser1 = new List<TBL_MINUTES_OF_MEETING>();
                int count = 0;
                for (int i = 0; count == 0; i--)
                {
                    DateTime dt1 = DateTime.Today.AddDays(i);
                    var list1 = pema.TBL_MINUTES_OF_MEETING.Where(t => t.MOM_Assigned_Date != null).ToList();
                    foreach (var v in list1)
                    {
                        if (v.MOM_Assigned_Date.Value.Month == dt1.Month && v.MOM_Assigned_Date.Value.Day == dt1.Day)
                        {
                            count++;
                            listuser1.Add(v);
                        }
                    }
                }
                return Json(listuser1, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult RoomDashboardChart()
        {
            return View();
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        //public ActionResult ApplicationNew()
        //{
        //    return View();
        //}

        public ActionResult Application()
        {

            string pathToExcelFile = targetpath;
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }

            var adapter = new OleDbDataAdapter("SELECT * FROM [Sheet1$]", connectionString);
            var ds = new DataSet();

            adapter.Fill(ds, "ExcelTable");

            DataTable dtable = ds.Tables["ExcelTable"];
            var excelFile = new ExcelQueryFactory(pathToExcelFile);
            var artistAlbums = from a in dtable.AsEnumerable() select a;
            List<ApplicationData> datas = new List<ApplicationData>();
            foreach (var a in artistAlbums)
            {
                string Room_no = Convert.ToString(a["Room_no"]);
                string FLOOR = Convert.ToString(a["FLOOR"]);
                string Status = Convert.ToString(a["Status"]);
                //string Room_condition = Convert.ToString(a["Room_condition"]);
                ApplicationData TU = new ApplicationData();
                TU.Room_no = Room_no;
                TU.FLOOR = FLOOR;
                TU.Status = Status;
                // TU.Room_condition = Room_condition;
                datas.Add(TU);
            }


            return View(datas);
        }
        public ActionResult Text()
        {
            return View();
        }

        public ActionResult statistics()
        {
            string pathToExcelFile = targetpath;
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }

            var adapter = new OleDbDataAdapter("SELECT * FROM [Sheet1$]", connectionString);
            var ds = new DataSet();

            adapter.Fill(ds, "ExcelTable");

            DataTable dtable = ds.Tables["ExcelTable"];
            var excelFile = new ExcelQueryFactory(pathToExcelFile);
            var artistAlbums = from a in dtable.AsEnumerable() select a;
            List<ApplicationData> datas = new List<ApplicationData>();
            foreach (var a in artistAlbums)
            {
                string Room_no = Convert.ToString(a["Room_no"]);
                string FLOOR = Convert.ToString(a["FLOOR"]);
                string Status = Convert.ToString(a["Status"]);
                //string Room_condition = Convert.ToString(a["Room_condition"]);
                ApplicationData TU = new ApplicationData();
                TU.Room_no = Room_no;
                TU.FLOOR = FLOOR;
                TU.Status = Status;
                // TU.Room_condition = Room_condition;
                datas.Add(TU);
            }


            return View(datas);
        }
        public ActionResult calender()
        {
            string pathToExcelFile = targetpath;
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }

            var adapter = new OleDbDataAdapter("SELECT * FROM [Sheet1$]", connectionString);
            var ds = new DataSet();

            adapter.Fill(ds, "ExcelTable");

            DataTable dtable = ds.Tables["ExcelTable"];
            var excelFile = new ExcelQueryFactory(pathToExcelFile);
            var artistAlbums = from a in dtable.AsEnumerable() select a;
            List<ApplicationData> datas = new List<ApplicationData>();
            foreach (var a in artistAlbums)
            {
                string Room_no = Convert.ToString(a["Room_no"]);
                string FLOOR = Convert.ToString(a["FLOOR"]);
                string Status = Convert.ToString(a["Status"]);
                //string Room_condition = Convert.ToString(a["Room_condition"]);
                ApplicationData TU = new ApplicationData();
                TU.Room_no = Room_no;
                TU.FLOOR = FLOOR;
                TU.Status = Status;
                // TU.Room_condition = Room_condition;
                datas.Add(TU);
            }


            return View(datas);
        }
        public ActionResult GetEvents(string roomno)
        {
            //Get the events
            //You may get from the repository also
            var eventList = GetEvents();

            var rows = eventList.ToArray();
            return Json(rows, JsonRequestBehavior.AllowGet);
        }

        private List<Events> GetEvents()
        {
            List<Events> eventList = new List<Events>();
            Events newEvent = new Events();
            for (int i = 30; i > 0; i--)
            {
                newEvent = new Events
                {
                    start = DateTime.Now.AddDays(-i).ToString("yyyy-MM-dd"),
                    backgroundColor = "green",
                    rendering = "background",
                    dateNum = "1"
                };
                eventList.Add(newEvent);
                newEvent = new Events
                {
                    start = DateTime.Now.AddDays(-i).ToString("yyyy-MM-dd"),
                    backgroundColor = "green",
                    rendering = "background",
                    dateNum = "1"
                };
                eventList.Add(newEvent);
            }

            return eventList;
        }

        private static DateTime ConvertFromUnixTimestamp(double timestamp)
        {
            var origin = new DateTime(1970, 1, 1, 0, 0, 0, 0);
            return origin.AddSeconds(timestamp);
        }
        public ActionResult guestdetails(string roomno)
        {
            string pathToExcelFile = targetpath;
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
            dummy.Columns.Add("start");
            dummy.Columns.Add("backgroundColor");
            dummy.Columns.Add("rendering");
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            //var contains = dtable1.AsEnumerable().Any(row => roomno == row.Field<String>("Room_No"));
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            string guestname = "none";
            //if (contains) {
            foreach (var a in artistAlbums1)
            {
                string Room_No = Convert.ToString(a["Room_no"]);
                string Status = Convert.ToString(a["Status"]);
                //DateTime Date = Convert.ToDateTime(a["Date"]);
                //if (roomno == Room_No && Status == "Occupied" && Date == DateTime.Today)
                //{
                //    guestname = Convert.ToString(a["Guest_Name"]);
                //}
                string FLOOR = Convert.ToString(a["FLOOR"]);
                if ((roomno == Room_No && Status == "Single") || (roomno == Room_No && Status == "Double") || (roomno == Room_No && Status == "Triple") || (roomno == Room_No && Status == "Inhouse") || (roomno == Room_No && Status == "Blocked"))
                {
                    guestname = Convert.ToString(a["Guest_Name"]);
                }
            }
            return Json(guestname, JsonRequestBehavior.AllowGet);

        }
        public ActionResult guestdetailsByDate(string roomno)
        {
            string pathToExcelFile = targetpath;
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet2$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            dummy.Columns.Add("start");
            dummy.Columns.Add("backgroundColor");
            dummy.Columns.Add("rendering");
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            //var contains = dtable1.AsEnumerable().Any(row => roomno == row.Field<String>("Room_No"));
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            string guestname = "none";

            foreach (var a in artistAlbums1)
            {
                string Room_No = Convert.ToString(a["Room_no"]);
                string Status = Convert.ToString(a["Status"]);
                DateTime Date = Convert.ToDateTime(a["Date"]);
                guestname = Convert.ToString(a["Guest_Name"]);
                DateTime Room = Convert.ToDateTime(roomno);
                ApplicationValue fu = new ApplicationValue();
                if (Room == Date && Status == "Occupied")
                {
                    fu.start = guestname;
                    fu.title = Room_No;
                    data.Add(fu);
                }
            }
            var dddd = data.ToArray();
            return Json(dddd, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Treatmentguestdetails(string roomno)
        {
            string pathToExcelFile = targetpathNew;
            var connectionString = "";
            if (targetpathNew.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpathNew.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet1$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            dummy.Columns.Add("start");
            dummy.Columns.Add("backgroundColor");
            dummy.Columns.Add("rendering");
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            //var contains = dtable1.AsEnumerable().Any(row => roomno == row.Field<String>("Room_No"));
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            string guestname = "none";
            //if (contains) {
            foreach (var a in artistAlbums1)
            {
                string Room_No = Convert.ToString(a["Room_no"]);
                string Status = Convert.ToString(a["Status"]);
                //DateTime Date = Convert.ToDateTime(a["Date"]);
                //if (roomno == Room_No && Status == "Occupied" && Date == DateTime.Today)
                //{
                //    guestname = Convert.ToString(a["Guest_Name"]);
                //}
                // string FLOOR = Convert.ToString(a["FLOOR"]);
                if (roomno == Room_No && Status == "Occupied")
                {
                    guestname = Convert.ToString(a["Guest_Name"]);
                }
            }
            return Json(guestname, JsonRequestBehavior.AllowGet);

        }
        public ActionResult getdaywisedetails(string roomno, string date)
        {
            string pathToExcelFile = targetpath;
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet2$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            //DataTable dummy = new DataTable();
            //dummy.Columns.Add("start");
            //dummy.Columns.Add("backgroundColor");
            //dummy.Columns.Add("rendering");
            //var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            //var contains = dtable1.AsEnumerable().Any(row => roomno == row.Field<String>("Room_No"));
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            string guestname = "none";
            //if (contains) {
            foreach (var a in artistAlbums1)
            {
                DateTime exceldate = Convert.ToDateTime(a["date"]);
                string Room_No = Convert.ToString(a["Room_No"]);
                string Status = Convert.ToString(a["Status"]);
                //string FLOOR = Convert.ToString(a["FLOOR"]);
                if (roomno == Room_No && Convert.ToDateTime(date) == exceldate)
                {
                    guestname = Convert.ToString(a["Guest_Name"]);
                }
            }
            return Json(guestname, JsonRequestBehavior.AllowGet);

        }
        public ActionResult RoomWiseList(string roomno)
        {
            string pathToExcelFile = targetpath;
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet2$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            dummy.Columns.Add("start");
            dummy.Columns.Add("backgroundColor");
            dummy.Columns.Add("rendering");
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            //var contains = dtable1.AsEnumerable().Any(row => roomno == row.Field<String>("Room_No"));
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            //if (contains) {
            foreach (var a in artistAlbums1)
            {
                string Room_No = Convert.ToString(a["Room_No"]);
                ApplicationValue fu = new ApplicationValue();
                if (roomno == Room_No)
                {
                    string Status = Convert.ToString(a["Status"]);
                    DateTime Date = Convert.ToDateTime(a["Date"]);

                    if (Status == "Occupied")
                    {
                        //fu.Room_no = Room_No;
                        fu.start = Date.ToString("yyyy-MM-dd");
                        //fu.end = Convert.ToDateTime(Date.AddDays(13).ToString("yyyy-MM-dd"));
                        fu.backgroundColor = "#00ff1f";
                        fu.rendering = "background";
                    }
                    else if (Status == "Vacant")
                    {
                        //fu.Room_no = Room_No;
                        fu.start = Date.ToString("yyyy-MM-dd");
                        //fu.end = Convert.ToDateTime(Date.AddDays(13).ToString("yyyy-MM-dd"));
                        fu.backgroundColor = "#0099CC";
                        fu.rendering = "background";
                    }
                    else if (Status == "Maintenence")
                    {
                        //fu.Room_no = Room_No;
                        fu.start = Date.ToString("yyyy-MM-dd");
                        //fu.end = Convert.ToDateTime(Date.AddDays(13).ToString("yyyy-MM-dd"));
                        fu.backgroundColor = "#FFD700";
                        fu.rendering = "background";
                    }
                    //}
                    data.Add(fu);

                }
                //foreach (var a in artistAlbums1)
                //{
                //    DataRow dr = dummy.NewRow();
                //    string Room_No = Convert.ToString(a["Room_No"]);
                //    string Status = Convert.ToString(a["Status"]);
                //        DateTime Date = Convert.ToDateTime(a["Date"]);
                //        dr["start"] = Convert.ToDateTime(a["Date"]);
                //        dr["rendering"] = "background";
                //        if (Status == "Occupied")
                //        {
                //            dr["backgroundColor"] = "Green";
                //        }
                //        else if (Status == "Vacant")
                //        {
                //            dr["backgroundColor"] = "Blue";
                //        }
                //        else if (Status == "Maintianence")
                //        {
                //            dr["backgroundColor"] = "Orange";
                //        }
                //    dummy.Rows.Add(dr);
                //}
            }
            var dddd = data.ToArray();
            return Json(dddd, JsonRequestBehavior.AllowGet);

        }
        public ActionResult roomslist()
        {
            string pathToExcelFile = targetpath;
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet2$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            dummy.Columns.Add("start");
            dummy.Columns.Add("backgroundColor");
            dummy.Columns.Add("rendering");
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            //var contains = dtable1.AsEnumerable().Any(row => roomno == row.Field<String>("Room_No"));
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            //if (contains) {
            foreach (var a in artistAlbums1)
            {
                string Room_No = Convert.ToString(a["Room_No"]);
                ApplicationValue fu = new ApplicationValue();
                //if (roomno == Room_No)
                {
                    string Status = Convert.ToString(a["Status"]);
                    DateTime Date = Convert.ToDateTime(a["Date"]);

                    if (Status == "Occupied")
                    {
                        //fu.Room_no = Room_No;
                        fu.start = Date.ToString("yyyy-MM-dd");
                        //fu.end = Convert.ToDateTime(Date.AddDays(13).ToString("yyyy-MM-dd"));
                        fu.backgroundColor = "#00ff1f";
                        fu.rendering = "background";
                    }
                    else if (Status == "Vacant")
                    {
                        //fu.Room_no = Room_No;
                        fu.start = Date.ToString("yyyy-MM-dd");
                        //fu.end = Convert.ToDateTime(Date.AddDays(13).ToString("yyyy-MM-dd"));
                        fu.backgroundColor = "#0099CC";
                        fu.rendering = "background";
                    }
                    else if (Status == "Maintenence")
                    {
                        //fu.Room_no = Room_No;
                        fu.start = Date.ToString("yyyy-MM-dd");
                        //fu.end = Convert.ToDateTime(Date.AddDays(13).ToString("yyyy-MM-dd"));
                        fu.backgroundColor = "#FFD700";
                        fu.rendering = "background";
                    }
                    //}
                    data.Add(fu);
                }
            }
            var dddd = data.ToArray();
            return Json(dddd, JsonRequestBehavior.AllowGet);

        }
        public ActionResult calendarroomslist()
        {
            string pathToExcelFile = targetpath;
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet2$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            dummy.Columns.Add("start");
            dummy.Columns.Add("backgroundColor");
            dummy.Columns.Add("rendering");
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            //var contains = dtable1.AsEnumerable().Any(row => roomno == row.Field<String>("Room_No"));
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            //if (contains) {
            foreach (var a in artistAlbums1)
            {
                string Room_No = Convert.ToString(a["Room_No"]);
                ApplicationValue fu = new ApplicationValue();
                //if (roomno == Room_No)
                {
                    string Status = Convert.ToString(a["Status"]);
                    DateTime Date = Convert.ToDateTime(a["Date"]);
                    data.Add(fu);
                }
            }
            var dddd = data.ToArray();
            return Json(dddd, JsonRequestBehavior.AllowGet);

        }
        public ActionResult calendarrooomslist()
        {
            string pathToExcelFile = targetpath;
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet2$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            dummy.Columns.Add("start");
            dummy.Columns.Add("backgroundColor");
            dummy.Columns.Add("rendering");
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            //var contains = dtable1.AsEnumerable().Any(row => roomno == row.Field<String>("Room_No"));
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<CalCount> data = new List<CalCount>();
            int available = 0;
            //if (contains) {
            foreach (var a in artistAlbums1)
            {
                string Room_No = Convert.ToString(a["Room_No"]);
                CalCount fu = new CalCount();
                //if (a["Status"].ToString() == "Vacant")
                {
                    //available++;
                    fu.title = Convert.ToString(a["Status"]);
                    //string Status = Convert.ToString(a["Status"]);
                    //DateTime Date = Convert.ToDateTime(a["Date"]);
                    fu.start = Convert.ToDateTime(a["Date"].ToString());
                    data.Add(fu);
                }
            }
            var d = data.GroupBy(h => new { h.start }).Select(hh => new { title = hh.Count(), start = hh.Key.start });
            var dddd = d.ToArray();
            return Json(dddd, JsonRequestBehavior.AllowGet);

        }
        public ActionResult Getvacentcount(string dtmnt, string param)
        {
            string pathToExcelFile = targetpath;
            DateTime dtmonth = Convert.ToDateTime(dtmnt);
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet2$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            int count = 0;
            foreach (var a in artistAlbums1)
            {
                string Status = Convert.ToString(a["Status"]);
                DateTime dt1 = Convert.ToDateTime(a["Date"]);

                if (Status == "Vacant" && dt1.Month == dtmonth.Month && param == "Month")
                {
                    count = count + 1;
                }
                if (Status == "Vacant" && dt1 == dtmonth && param == "Day")
                {
                    count = count + 1;
                }
            }
            return Content(count.ToString());
        }
        public ActionResult calendarSoldRooms()
        {
            string pathToExcelFile = targetpath;
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet2$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            dummy.Columns.Add("start");
            // dummy.Columns.Add("backgroundColor");
            dummy.Columns.Add("rendering");
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            //var contains = dtable1.AsEnumerable().Any(row => roomno == row.Field<String>("Room_No"));
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<CalCount> data = new List<CalCount>();
            int available = 0;
            //if (contains) {
            foreach (var a in artistAlbums1)
            {
                string Room_No = Convert.ToString(a["Room_No"]);
                CalCount fu = new CalCount();
                if (a["Status"].ToString() == "Occupied")
                {
                    //available++;
                    fu.title = Convert.ToString(a["Status"]);
                    //string Status = Convert.ToString(a["Status"]);
                    //DateTime Date = Convert.ToDateTime(a["Date"]);
                    fu.start = Convert.ToDateTime(a["Date"].ToString()).AddDays(1);
                    data.Add(fu);
                }
            }
            var d = data.GroupBy(h => new { h.title, h.start }).Select(hh => new { title = hh.Count(), start = hh.Key.start });
            var dddd = d.ToArray();
            return Json(dddd, JsonRequestBehavior.AllowGet);

        }

        public ActionResult GetOccupiedcount(string dtmnt, string param)
        {
            string pathToExcelFile = targetpath;
            DateTime dtmonth = Convert.ToDateTime(dtmnt);
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet2$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            int count = 0;
            foreach (var a in artistAlbums1)
            {
                string Status = Convert.ToString(a["Status"]);
                DateTime dt1 = Convert.ToDateTime(a["Date"]);
                if (Status == "Occupied" && dt1.Month == dtmonth.Month && param == "Month")
                {
                    count = count + 1;
                }
                if (Status == "Occupied" && dt1 == dtmonth && param == "Day")
                {
                    count = count + 1;
                }
                //if (Status == "Occupied" && dt1.Month == dtmnt)
                //{
                //    count = count + 1;
                //}
            }
            return Content(count.ToString());
        }
        public ActionResult GetMaintianencecount(string dtmnt, string param)
        {
            string pathToExcelFile = targetpath;
            DateTime dtmonth = Convert.ToDateTime(dtmnt);
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet2$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            int count = 0;
            foreach (var a in artistAlbums1)
            {
                string Status = Convert.ToString(a["Status"]);
                DateTime dt1 = Convert.ToDateTime(a["Date"]);
                if (Status == "Maintenence" && dt1.Month == dtmonth.Month && param == "Month")
                {
                    count = count + 1;
                }
                if (Status == "Maintenence" && dt1 == dtmonth && param == "Day")
                {
                    count = count + 1;
                }
                //if (Status == "Maintenence" && dt1.Month == dtmnt)
                //{
                //    count = count + 1;
                //}
            }
            return Content(count.ToString());
        }
        public ActionResult Gettotalcount(string dtmnt, string param)
        {
            string pathToExcelFile = targetpath;
            DateTime dtmonth = Convert.ToDateTime(dtmnt);
            var connectionString = "";
            if (targetpath.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpath.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet2$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            int count = 0;
            foreach (var a in artistAlbums1)
            {
                string Status = Convert.ToString(a["Status"]);
                DateTime dt1 = Convert.ToDateTime(a["Date"]);

                if (dt1.Month == dtmonth.Month && param == "Month")
                {
                    count = count + 1;
                }
                if (dt1 == dtmonth && param == "Day")
                {
                    count = count + 1;
                }
            }
            return Content(count.ToString());
        }
        public ActionResult ExcelData(string message)
        {
            ViewBag.message = message;
            return View();
        }
        public FileResult DownloadExcel()
        {
            return File(targetpath, "application/vnd.ms-excel", "Roomstatus.xlsx");
        }
        public ActionResult UploadExcel()
        {
            return View();
        }
        [HttpPost]
        public ActionResult UploadExcel(HttpPostedFileBase FileUpload)
        {
            targetpath = ConfigurationManager.AppSettings["folderpath"];
            List<string> data = new List<string>();
            if (FileUpload != null)
            {
                if (FileUpload.ContentType == "application/vnd.ms-excel" || FileUpload.ContentType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                {
                    string extension = System.IO.Path.GetExtension(FileUpload.FileName);
                    string filename = "RoomStatus";
                    string filedetail = filename + extension;
                    if (System.IO.File.Exists(targetpath + filedetail))
                    {
                        System.IO.File.Delete(targetpath + filedetail);
                    }
                    FileUpload.SaveAs(targetpath + filedetail);
                    //string pathToExcelFile = targetpath + filedetail;
                    //var connectionString = "";
                    //if (filedetail.EndsWith(".xls"))
                    //{
                    //    connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
                    //}
                    //else if (filedetail.EndsWith(".xlsx"))
                    //{
                    //    connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
                    //}

                    //var adapter = new OleDbDataAdapter("SELECT * FROM [Sheet1$]", connectionString);
                    //var ds = new DataSet();

                    //adapter.Fill(ds, "ExcelTable");

                    //DataTable dtable = ds.Tables["ExcelTable"];
                    //var excelFile = new ExcelQueryFactory(pathToExcelFile);
                    //var artistAlbums = from a in dtable.AsEnumerable() select a;
                    return RedirectToAction("Application", "Home");
                }
            }
            else
            {
                data.Add("<ul>");
                data.Add("<li>Only Excel file format is allowed</li>");
                data.Add("</ul>");
                data.ToArray();
                //return RedirectToAction("ExcelData", new { message = "Only Excel file format is allowed" });
                return RedirectToAction("UploadExcel", "Home");
            }
            targetpath = ConfigurationManager.AppSettings["folderpath"] + "RoomStatus.xlsx";
            return View();
        }
        public ActionResult Gettime()
        {
            FileInfo fi = new FileInfo(ConfigurationManager.AppSettings["folderpath"] + "RoomStatus.xlsx");
            fi.Refresh();
            DateTime created = fi.LastWriteTime;
            return Content(created.ToString());
        }

        public ActionResult TreatmentList()
        {
            string pathToExcelFile = targetpathNew;
            var connectionString = "";
            if (targetpathNew.EndsWith(".xls"))
            {
                connectionString = string.Format("Provider=Microsoft.Jet.OLEDB.4.0; data source={0}; Extended Properties=Excel 8.0;", pathToExcelFile);
            }
            else if (targetpathNew.EndsWith(".xlsx"))
            {
                connectionString = string.Format("Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=\"Excel 12.0 Xml;HDR=YES;IMEX=1\";", pathToExcelFile);
            }
            var adapter1 = new OleDbDataAdapter("SELECT * FROM [Sheet1$]", connectionString);
            var dt = new DataSet();
            adapter1.Fill(dt, "ExcelTable");
            DataTable dtable1 = dt.Tables["ExcelTable"];
            DataTable dummy = new DataTable();
            dummy.Columns.Add("start");
            dummy.Columns.Add("backgroundColor");
            dummy.Columns.Add("rendering");
            var excelFile1 = new ExcelQueryFactory(pathToExcelFile);
            //var contains = dtable1.AsEnumerable().Any(row => roomno == row.Field<String>("Room_No"));
            var artistAlbums1 = from a in dtable1.AsEnumerable() select a;
            List<TreatmentValues> data = new List<TreatmentValues>();
            //if (contains) {
            foreach (var a in artistAlbums1)
            {
                string Room_No = Convert.ToString(a["Room_No"]);
                TreatmentValues fu = new TreatmentValues();
                //if (roomno == Room_No)
                {
                    string Status = Convert.ToString(a["Status"]);
                    //DateTime Date = Convert.ToDateTime(a["Date"]);

                    if (Status == "Occupied")
                    {
                        fu.backgroundColor = "#00ff1f";
                        fu.rendering = "background";
                    }
                    else if (Status == "Vacant")
                    {
                        fu.backgroundColor = "#0099cc";
                        fu.rendering = "background";
                    }
                    else if (Status == "Non-Funtional")
                    {
                        fu.backgroundColor = "#ff0000";
                        fu.rendering = "background";
                    }
                    else if (Status == "Non-Operational")
                    {
                        fu.backgroundColor = "#a52a2a";
                        fu.rendering = "background";
                    }
                    //}
                    data.Add(fu);
                }
            }
            var dddd = data.ToArray();
            return Json(dddd, JsonRequestBehavior.AllowGet);

        }
        public ActionResult UploadTreatmentExcel()
        {
            return View();
        }
        [HttpPost]
        public ActionResult UploadTreatmentExcel(HttpPostedFileBase FileUpload)
        {
            targetpathNew = ConfigurationManager.AppSettings["folderpathNew"];
            List<string> data = new List<string>();
            if (FileUpload != null)
            {
                if (FileUpload.ContentType == "application/vnd.ms-excel" || FileUpload.ContentType == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                {
                    string extension = System.IO.Path.GetExtension(FileUpload.FileName);
                    string filename = "TreatmentStatus";
                    string filedetail = filename + extension;
                    if (System.IO.File.Exists(targetpathNew + filedetail))
                    {
                        System.IO.File.Delete(targetpathNew + filedetail);
                    }
                    FileUpload.SaveAs(targetpathNew + filedetail);
                    return RedirectToAction("Currenttreatment", "Home");
                }
            }
            else
            {
                data.Add("<ul>");
                data.Add("<li>Only Excel file format is allowed</li>");
                data.Add("</ul>");
                data.ToArray();
                //return RedirectToAction("ExcelData", new { message = "Only Excel file format is allowed" });
                return RedirectToAction("UploadTreatmentExcel", "Home");
            }
            targetpathNew = ConfigurationManager.AppSettings["folderpathNew"] + "TreatmentStatus.xlsx";
            return View();
        }
        public FileResult DownloadTreatmentExcel()
        {
            return File(targetpathNew, "application/vnd.ms-excel", "TreatmentStatus.xlsx");
        }
        public ActionResult Roomscount(string param)
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
            foreach (var a in artistAlbums1)
            {
                string Room_no = Convert.ToString(a["Room_no"]);
                //DateTime dt1 = Convert.ToDateTime(a["Date"]);

                if (Room_no != null)
                {
                    count = count + 1;
                }
            }
            return Content(count.ToString());
        }
        public ActionResult PreBookingDet()
        {
            var artistAlbums = from a in pema.NC_TBL_Pre_Booking select a;
            List<PreBookingDet> datas = new List<PreBookingDet>();
            foreach (var a in artistAlbums)
            {
                string Room_no = Convert.ToString(a.Room_No);
                string Guest_Name = a.Guest_Name;
                string Mobile_No = a.Mobile_No;
                string Status = a.Status;
                string Gender = a.Gender;
                DateTime Date_from = Convert.ToDateTime(a.Date_From);
                DateTime Date_To = Convert.ToDateTime(a.Date_To);
                PreBookingDet TU = new PreBookingDet();
                TU.Room_no = Room_no;
                TU.Guest_Name = Guest_Name;
                TU.Status = Status;
                TU.Gender = Gender;
                TU.Date_From = Date_from;
                TU.Date_To = Date_To;
                datas.Add(TU);
            }
            return View(datas);
        }

        public ActionResult PreBookingRoomWiseList(string roomno)
        {

            DataTable dummy = new DataTable();
            dummy.Columns.Add("start");
            dummy.Columns.Add("backgroundColor");
            dummy.Columns.Add("rendering");
            var artistAlbums1 = from a in pema.NC_TBL_Pre_Booking
                                select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            //if (contains) {
            foreach (var a in artistAlbums1)
            {
                string Room_No = Convert.ToString(a.Room_No);
                ApplicationValue fu = new ApplicationValue();
                if (roomno == Room_No)
                {
                    string Status = Convert.ToString(a.Status);
                    DateTime Date1 = Convert.ToDateTime(a.Date_From);
                    DateTime Date2 = Convert.ToDateTime(a.Date_To);
                    DateTime Date = Convert.ToDateTime(a.Date_From);

                    if (Status == "Occupied")
                    {
                        //fu.Room_no = Room_No;
                        fu.start = Date.ToString("yyyy-MM-dd");
                        fu.backgroundColor = "#00ff1f";
                        fu.rendering = "background";
                    }
                    else if (Status == "Vacant")
                    {
                        //fu.Room_no = Room_No;
                        fu.start = Date.ToString("yyyy-MM-dd");
                        //fu.end = Convert.ToDateTime(Date.AddDays(13).ToString("yyyy-MM-dd"));
                        fu.backgroundColor = "#0099CC";
                        fu.rendering = "background";
                    }
                    else if (Status == "Maintenance") 
                    {
                        if(a.Date_To == null)
                        {
                            Date2 = DateTime.Today.AddDays(60);
                        }
                        for (int dt = 0; Date1.AddDays(dt) < Date2; dt++)
                        {
                            ApplicationValue fu1 = new ApplicationValue();
                            Date = Date1.AddDays(dt);
                            //fu.Room_no = Room_No;
                            fu1.start = Date.ToString("yyyy-MM-dd");
                            //fu.end = Convert.ToDateTime(Date.AddDays(13).ToString("yyyy-MM-dd"));
                            fu1.backgroundColor = "#FFD700";
                            fu1.rendering = "background";
                            data.Add(fu1);
                        }
                        //fu.Room_no = Room_No;
                        
                    }
                    else if (Status == "Blocked")
                    {

                        for (int dt = 0; Date1.AddDays(dt) < Date2; dt++)
                        {
                            ApplicationValue fu1 = new ApplicationValue();
                            Date = Date1.AddDays(dt);
                            //fu.Room_no = Room_No;
                            fu1.start = Date.ToString("yyyy-MM-dd");
                            //fu.end = Convert.ToDateTime(Date.AddDays(13).ToString("yyyy-MM-dd"));
                            fu1.backgroundColor = "#FF3366";
                            fu1.rendering = "background";
                            data.Add(fu1);
                        }
                    }
                    if (roomno == Room_No)
                    {
                       for(int dt=-60;dt<=60;dt++)
                        {
                            DateTime dt1 = DateTime.Today.AddDays(dt);
                           if(dt1<Date1||dt1>Date2)
                            {
                                ApplicationValue fu2 = new ApplicationValue();
                                Date = dt1;
                                //fu.Room_no = Room_No;
                                fu2.start = Date.ToString("yyyy-MM-dd");
                                fu2.backgroundColor = "#0099CC";
                                fu2.rendering = "background";
                                data.Add(fu2);
                            }
                        }
                        
                    }
                    //}
                    if (fu.backgroundColor != null)
                    {
                        data.Add(fu);
                    }

                }
            }
            var dddd = data.ToArray();
            return Json(dddd, JsonRequestBehavior.AllowGet);

        }
        public ActionResult getPredaywisedetails(string roomno, string date)
        {

            var artistAlbums1 = from a in pema.NC_TBL_Pre_Booking select a;
            List<ApplicationValue> data = new List<ApplicationValue>();
            string guestname = "none";
            //if (contains) {
            foreach (var a in artistAlbums1)
            {
                DateTime exceldate = Convert.ToDateTime(a.Date_From);
                string Room_No = Convert.ToString(a.Room_No);
                string Status = Convert.ToString(a.Status);
                //string FLOOR = Convert.ToString(a["FLOOR"]);
                if (roomno == Room_No && Convert.ToDateTime(date) == exceldate)
                {
                    guestname = Convert.ToString(a.Guest_Name);
                }
            }
            return Json(guestname, JsonRequestBehavior.AllowGet);

        }
        public ActionResult RoomStatusDetailsForPreBook()
        {
            DateTime dt = DateTime.Today;
            //DateTime dt = DateTime.ParseExact(fd, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            var Guestdetails = (from a in pema.NC_TBL_Pre_Booking
                                where a.Date_To == null || (a.Status == "Blocked" && (a.Date_From <= dt && a.Date_To >= dt))
                                group a by new { a.Room_No, a.Status } into d
                                select new { Room_No = d.Key.Room_No, Status = d.Key.Status, Count = d.Count() });
            return Json(Guestdetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult MISNUTRITION()
        {
            return View();
        }
        [ActionName("GTC")]
        public ContentResult GETCOUNT()
        {
            var totalrecipes = pema.Recipes.Count();
            var totalingredients = pema.Ingredients.Count();
            dynamic flexible = new ExpandoObject();
            flexible.TotalRecipes = totalrecipes;
            flexible.TotalIngredients = totalingredients;
            return Content(totalrecipes.ToString() + "&&" + totalingredients.ToString());
        }

        public ActionResult RoomStatusDetails()
        {
            DateTime dt = DateTime.Today;
            var Guestdetails = (from a in pema.NC_TBL_ROOM_Status
                                where a.Date_To == null
                                group a by new { a.Room_No, a.Status } into d
                                select new { Room_No = d.Key.Room_No, Status = d.Key.Status, Count = d.Count() });
            return Json(Guestdetails, JsonRequestBehavior.AllowGet);
        }
        public ActionResult getvacantcount()
        {
            DateTime dt = DateTime.Today;
            var model = (from a in pema.NC_TBL_ROOM_Status.Where(a => a.Status == "Vacant" && a.Date_To == null) select a).Count();
            return Content(model.ToString());
        }
        public ActionResult getsinglecount()
        {
            DateTime dt = DateTime.Today;
            var model = (from a in pema.NC_TBL_ROOM_Status
                         where (a.Date_To == null && a.Status == "occupied")
                         group a by new { a.Room_No } into d
                         select new { Room_No = d.Key.Room_No, Count = d.Count() }).ToList();
            var count = (from b in model.Where(b => b.Count == 1) select b).Count();
            return Content(count.ToString());
        }
        public ActionResult getdoublecount()
        {
            DateTime dt = DateTime.Today;
            var model = (from a in pema.NC_TBL_ROOM_Status
                         where (a.Date_To == null && a.Status == "occupied")
                         group a by new { a.Room_No } into d
                         select new { Room_No = d.Key.Room_No, Count = d.Count() }).ToList();
            var count = (from b in model.Where(b => b.Count == 2) select b).Count();
            return Content(count.ToString());
        }
        public ActionResult getmaintenancecount()
        {
            DateTime dt = DateTime.Today;
            var model = (from a in pema.NC_TBL_ROOM_Status.Where(a => a.Status == "Maintenance" && a.Date_To == null) select a).Count();
            return Content(model.ToString());
        }
        public ActionResult Getroomcleaningcount()
        {
            DateTime dt = DateTime.Today;
            var model = (from a in pema.NC_TBL_ROOM_Status
                         where (a.Date_To == null && a.Status == "Room Cleaning")
                         group a by new { a.Room_No } into d
                         select new { Room_No = d.Key.Room_No, Count = d.Count() }).ToList();
            var count = (from b in model.Where(b => b.Count == 1) select b).Count();
            return Content(count.ToString());
        }
        public ActionResult totalroomsoccupied()
        {
            var list = pema.NC_TBL_ROOM_Status.Where(a => a.Date_To == null && a.Status == "Occupied").GroupBy(a => a.Room_No).Count();
            return Content(list.ToString());
        }
        public ActionResult totalguests()
        {
            var list = pema.NC_TBL_ROOM_Status.Where(a => a.Date_To == null && a.Status == "Occupied").Count();
            return Content(list.ToString());
        }
        public ActionResult totalmaleguests()
        {
            var list = pema.NC_TBL_ROOM_Status.Where(a => a.Date_To == null && a.Status == "Occupied" && a.Gender == "Male").Count();
            return Content(list.ToString());
        }
        public ActionResult totalfemaleguests()
        {
            var list = pema.NC_TBL_ROOM_Status.Where(a => a.Date_To == null && a.Status == "Occupied" && a.Gender == "Female").Count();
            return Content(list.ToString());
        }
    }
}