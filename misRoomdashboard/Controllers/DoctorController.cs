using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Rooms.Models;
using System.IO;

namespace Rooms.Controllers
{
    public class DoctorController : Controller
    {
        private MisRoomsEntities db = new MisRoomsEntities();

        // GET: Doctor
        public ActionResult Index()
        {
            return View(db.DischargeSummaries.ToList());
        }

        // GET: Doctor/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DischargeSummary dischargeSummary = db.DischargeSummaries.Find(id);
            if (dischargeSummary == null)
            {
                return HttpNotFound();
            }
            return View(dischargeSummary);
        }

        // GET: Doctor/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Doctor/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,PRNO,A_Weight,A_Height,A_BMI,A_FatMass,A_FatMassIndex,A_FatFreeMass,A_FatFreeMassIndex,A_TotalBodyWater,D_Weight,D_Height,D_BMI,D_FatMass,D_FatMassIndex,D_FatFreeMass,D_FatFreeMassIndex,D_TotalBodyWater")] DischargeSummary dischargeSummary)
        {
            if (ModelState.IsValid)
            {
                Session["PRNO"] = dischargeSummary.PRNO;
                DischargeSummary exists = db.DischargeSummaries.Where(i => i.PRNO == dischargeSummary.PRNO).FirstOrDefault();
                if (exists == null)
                {
                    
                    dischargeSummary.CreatedDate = DateTime.Now;
                    //dischargeSummary.A_Report = ConvertToBytes(A_Report);
                    //dischargeSummary.D_Report = ConvertToBytes(D_Report);
                    db.DischargeSummaries.Add(dischargeSummary);
                    db.SaveChanges();
                }
                else
                {
                    DischargeSummary ds = db.DischargeSummaries.Find(exists.ID);
                    ds.A_BMI = dischargeSummary.A_BMI;
                    ds.A_FatFreeMass = dischargeSummary.A_FatFreeMass;
                    ds.A_FatFreeMassIndex = dischargeSummary.A_FatFreeMassIndex;
                    ds.A_FatMass = dischargeSummary.A_FatMass;
                    ds.A_FatMassIndex = dischargeSummary.A_FatMassIndex;
                    ds.A_Height = dischargeSummary.A_Height;
                    ds.A_Weight = dischargeSummary.A_Weight;
                    ds.A_TotalBodyWater = dischargeSummary.A_TotalBodyWater;
                    ds.D_BMI = dischargeSummary.D_BMI;
                    ds.D_FatFreeMass = dischargeSummary.D_FatFreeMass;
                    ds.D_FatFreeMassIndex = dischargeSummary.D_FatFreeMassIndex;
                    ds.D_FatMass = dischargeSummary.D_FatMass;
                    ds.D_FatMassIndex = dischargeSummary.D_FatMassIndex;
                    ds.D_Height = dischargeSummary.D_Height;
                    ds.D_Weight = dischargeSummary.D_Weight;
                    ds.D_TotalBodyWater = dischargeSummary.D_TotalBodyWater;
                    db.Entry(ds).State = EntityState.Modified;
                    db.SaveChanges();
                }
                return RedirectToAction("Result");
            }

            return View(dischargeSummary);
        }
        public ActionResult Result()
        {
            return View();
        }
        // GET: Doctor/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DischargeSummary dischargeSummary = db.DischargeSummaries.Find(id);
            if (dischargeSummary == null)
            {
                return HttpNotFound();
            }
            return View(dischargeSummary);
        }

        // POST: Doctor/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,PRNO,A_Weight,A_Height,A_BMI,A_FatMass,A_FatMassIndex,A_FatFreeMass,A_FatFreeMassIndex,A_TotalBodyWater,A_Report,D_Weight,D_Height,D_BMI,D_FatMass,D_FatMassIndex,D_FatFreeMass,D_FatFreeMassIndex,D_TotalBodyWater,D_Report,CreatedDate")] DischargeSummary dischargeSummary)
        {
            if (ModelState.IsValid)
            {
                db.Entry(dischargeSummary).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(dischargeSummary);
        }

        // GET: Doctor/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            DischargeSummary dischargeSummary = db.DischargeSummaries.Find(id);
            if (dischargeSummary == null)
            {
                return HttpNotFound();
            }
            return View(dischargeSummary);
        }

        // POST: Doctor/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            DischargeSummary dischargeSummary = db.DischargeSummaries.Find(id);
            db.DischargeSummaries.Remove(dischargeSummary);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        public byte[] ConvertToBytes(HttpPostedFileBase image)
        {
            byte[] imageBytes = null;
            BinaryReader reader = new BinaryReader(image.InputStream);
            imageBytes = reader.ReadBytes((int)image.ContentLength);
            return imageBytes;
        }
        #region AJAX
        [ActionName("GGD")]
        public ActionResult GETGUESTDETAILS()
        {
            var GUESTDETAILS = (from RS in db.NC_TBL_ROOM_Status
                                where RS.Status == "Occupied" && RS.Date_To == null
                                select new
                                {
                                    RS.PRNO,
                                    RS.Room_No,
                                    RS.Guest_Name
                                }).ToList();
            //db.nc_tbl_room_status.ToList();
            return Json(GUESTDETAILS, JsonRequestBehavior.AllowGet);
        }
        [ActionName("GR")]
        public ActionResult GETRESULT()
        {
            try
            {
                string prno = Session["PRNO"].ToString();
                var result = (from DS in db.DischargeSummaries
                              join RS in db.NC_TBL_ROOM_Status on DS.PRNO equals RS.PRNO
                              where DS.PRNO == prno
                              select new
                              {
                                  RS,
                                  DS
                              }).FirstOrDefault();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Content("000");
            }
        }
        [ActionName("ED")]
        public JsonResult ExistingData(string PRNO)
        {
            var result = db.DischargeSummaries.Where(i => i.PRNO == PRNO).ToList();
            var jsonResult = Json(result, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        #endregion
    }
}
