using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Rooms.Models
{
    public class Personal_detailscustomized
    {
        public int Id { get; set; }
        public string UHID { get; set; }
        public string PRNO { get; set; }
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [Display(Name = "Middle Name")]
        public string MiddleName { get; set; }
        [Display(Name = "Surname")]
        public string LastName { get; set; }
        [Display(Name = "Father/Husband Name")]
        public string FatherHusbandName { get; set; }
        public string Gender { get; set; }
        [Display(Name = "Marital Status")]
        public string MaritalStatus { get; set; }
        [Display(Name = "FlatNo")]
        public string FlatNo { get; set; }
        public string Building { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string PinCode { get; set; }
        public string Nationality { get; set; }
        public string Country { get; set; }
        [Display(Name = "Date of Birth")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public System.DateTime DOB { get; set; }
        public int Age { get; set; }
        [Display(Name = "Height (in cms)")]
        public int Height { get; set; }
        [Display(Name = "Weight (in Kgs)")]
        public int Weight { get; set; }
        [Display(Name = "Mobile Number")]
        public string MobileNo { get; set; }
        [Display(Name = "E-Mail")]
        public string EmailId { get; set; }
        [Display(Name = "profession")]
        public string Occupation { get; set; }
        public System.DateTime AdmissionDate { get; set; }
        [Display(Name = "Emergency No")]
        public string EmergencyContactNo { get; set; }
        public string BP { get; set; }
        public int PulseRate { get; set; }
        public string ReferralFrom { get; set; }
        public string ReferralPRNO { get; set; }
        public string AdmissionStatus { get; set; }
        public string User_Type { get; set; }
        public string CheckinProcess { get; set; }
        public Nullable<int> AssignedDoctor { get; set; }
        public Nullable<int> DischargeType { get; set; }
    }
}