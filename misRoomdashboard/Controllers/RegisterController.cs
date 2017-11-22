using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Rooms.Models;
using System.Linq.Expressions;
using System.Net;
using System.Net.Mail;
using System.Net.Security;
using System.Data.Entity.Core.Objects;
using System.Text;
using System.Security.Cryptography.X509Certificates;

namespace Rooms.Controllers
{
    public class RegisterController : Controller
    {
        private MisRoomsEntities pema = new MisRoomsEntities();
        private static bool customCertValidation(object sender, X509Certificate cert, X509Chain chain, SslPolicyErrors errors)
        {
            return true;
        }
        // GET: Register
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(WS_Tbl_Registration values)
        {
            bool flag = false;
            string str1 = "";
            try
            {
                DateTime today = DateTime.Today;
                Convert.ToDateTime(today);
                values.Registered_Date = today;
                ObjectParameter uniqueno = new ObjectParameter("uniqueno", typeof(string));
                this.pema.gen_unique_no("UHID", uniqueno);
                values.UHID = uniqueno.Value.ToString();
                str1 = values.UHID;
                values.Active = "N";
                if (this.ModelState.IsValid)
                {
                    this.pema.WS_Tbl_Registration.Add(values);
                    this.pema.SaveChanges();
                    flag = true;
                    string str2 = "<div style='border:groove; border-width:medium; width:600px; height:620px;'><center><img style=align:'center'; src='http://202.153.40.214:1515/Images/PemaLogo.jpg' ></center><div style='width:600px; height:60px;'><tr><td style='text-align:center;' font-style:bold; > <br> &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Baypark- a Pema Wellness Resort<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Healing the Nature’s Way- Sustainable Health & Wellness<br /> <br/></div><div> ";
                    string str3 = "<table style='width:100%;'><tr><td style='text-align:center; font-style:italic;'>Baypark - A Pema Wellness Resort<br> &nbsp; &nbsp; Healing hills,Rushikonda,<br>&nbsp; &nbsp; &nbsp;Visakhapatnam,<br>&nbsp; &nbsp; &nbsp;Andhra Pradesh,<br>&nbsp; &nbsp; &nbsp; India-530045.<br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Email:reservation@pemawellness.co.<br> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Website: www.pemawellness.co. </td></tr><br></br><div><img src='http://202.153.40.214:1515/Images/contact.png'>+91 8912825555,+91 7331175555&nbsp;</a>&nbsp; &nbsp;<a href='https://www.facebook.com/bayparkpemawellness'><img src='http://202.153.40.214:1515/Images/fb.png'>&nbsp;&nbsp;bayparkpemawellness&nbsp;</a>&nbsp; &nbsp;<a href='https://www.instagram.com/bayparkpemawellness'><img src='http://202.153.40.214:1515/Images/search.png'>&nbsp;&nbsp;bayparkpemawellness</a></div></div></table>";
                    string userId = values.user_id;
                    string str4 = values.first_name + " " + values.last_name;
                    string password = values.password;
                    string uhid = values.UHID;
                    MailMessage message = new MailMessage();
                    message.To.Add(userId);
                    message.From = new MailAddress("nhcl.pema@hotmail.com");
                    message.Subject = "PEMA Registration Details[UHID: " + uhid + "]";
                    StringBuilder stringBuilder = new StringBuilder();
                    stringBuilder.Append(str2);
                    stringBuilder.Append("<table style='width:250px; height:150px; align='center'> ");
                    stringBuilder.Append("<tr><td style='height:8px'><img style='width:590px;height:150px;'src='http://202.153.40.214:1515/Images/innerbanner1.png'></td></tr></br>");
                    stringBuilder.Append("<tr> <td style='height:8px'>Dear :&nbsp;<b style='color:red'> " + str4 + ",</td> </tr></br> ");
                    stringBuilder.Append("<tr> <td style='height:8px;'>Greetings from Baypark - a PEMA Wellness Resort, Vizag!</td> </tr>");
                    stringBuilder.Append("<tr> <td style='height:8px;'>Please find the login details to enable you access your account.</td></tr> ");
                    stringBuilder.Append("<tr><td style='height:8px'>UserID:" + userId + "  </td></tr><tr><td>Password:&nbsp;<b style='color:red'> " + password + " </td></tr>");
                    stringBuilder.Append("<tr><td style='height:8px'>Kindly make note of your Id details.</td> </tr>");
                    stringBuilder.Append("UHID [Life Time ID] :&nbsp;<b style='color:red'>" + uhid + "</br> </br>");
                    stringBuilder.Append("<a href='http://pemawellness.co'><b style='color:red'>Click Here To Login</a> ");
                    stringBuilder.Append("</br></br>");
                    stringBuilder.Append("<hr>");
                    stringBuilder.Append("</table>");
                    stringBuilder.Append(str3);
                    message.Body = stringBuilder.ToString();
                    message.IsBodyHtml = true;
                    ServicePointManager.ServerCertificateValidationCallback = new RemoteCertificateValidationCallback(RegisterController.customCertValidation);
                    SmtpClient smtpClient = new SmtpClient("smtp.live.com");
                    smtpClient.Port = 587;
                    smtpClient.UseDefaultCredentials = true;
                    smtpClient.EnableSsl = true;
                    smtpClient.Credentials = (ICredentialsByHost)new NetworkCredential("nhcl.pema@hotmail.com", "Pema@123");
                    smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtpClient.Send(message);
                    message.Dispose();
                    smtpClient.Dispose();
                    this.ModelState.Clear();
                    this.TempData["message"] = (object)("Registration Completed Successfully!Please Check Mail. please Note your UHID NUMBER For Further Reference:" + uniqueno.Value.ToString());
                    return (ActionResult)this.View("Index");
                }
                this.TempData["message"] = (object)"Registation NOT Completed";
                return (ActionResult)this.View((object)values);
            }
            catch (Exception ex)
            {
                if (!flag)
                    this.TempData["message"] = (object)"Registation NOT Completed";
                else
                    this.TempData["message"] = (object)("Registation Completed, Communication Error has occured, please Note your UHID NUMBER For Further Reference:" + str1);
                return (ActionResult)this.View((object)values);
            }
        }

        public JsonResult CheckEmail(string username)
        {
            if (!this.pema.WS_Tbl_Registration.Any<WS_Tbl_Registration>((Expression<Func<WS_Tbl_Registration, bool>>)(x => x.user_id == username)))
                return this.Json((object)"Success", JsonRequestBehavior.AllowGet);
            return this.Json((object)"fail", JsonRequestBehavior.AllowGet);
        }
    }
}