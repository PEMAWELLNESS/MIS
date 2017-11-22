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
    public class HouseKeepingController : Controller
    {
        // GET: HouseKeeping
        private MisRoomsEntities pema = new MisRoomsEntities();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Getroomstatusdetails()
        {
            var List = pema.NC_TBL_ROOM_Status.Where(a => (a.Status == "Maintenance"||a.Status=="Room Cleaning") && a.Date_To == null).Select(
                i => new
                {
                    RoomNo = i.Room_No,
                    Staus = i.Status
                }).ToList();

            return Json(List,JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetMaintianencecount()
        {
            var List = pema.NC_TBL_ROOM_Status.Where(a => a.Status == "Maintenance" && a.Date_To == null).Count();
            return Content(List.ToString());
        }
        public ActionResult Getroomcleaningcount()
        {
            var List = pema.NC_TBL_ROOM_Status.Where(a => a.Status == "Room Cleaning" && a.Date_To == null).Count();
            return Content(List.ToString());
        }
    }
}