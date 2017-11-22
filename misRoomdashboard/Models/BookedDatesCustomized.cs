using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Rooms.Models
{
    public class BookedDatesCustomized
    {
        public string PRNO { get; set; }
        public string PackageType { get; set; }
        public string PackageName { get; set; }
        public int NoOfDays { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public System.DateTime ArrivalDate { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public System.DateTime DepartureDate { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public Nullable<System.DateTime> AlternateArrivalDate { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/MM/yyyy}")]
        public Nullable<System.DateTime> AlternateDepartureDate { get; set; }
        public Nullable<int> AccompanyingGuests { get; set; }
        public string RoomView { get; set; }
        public string RoomType { get; set; }
        public decimal RoomTariff { get; set; }
        public Nullable<System.DateTime> ConfirmedFromDate { get; set; }
        public Nullable<System.DateTime> ConfirmedToDate { get; set; }
        public string DoctorsComments { get; set; }
        public string PackageConfirmStatus { get; set; }
        //public string SuggestDays { get; set; }
        public Nullable<decimal> Package_Amount { get; set; }
        public int Id { get; set; }
        public string CMOComments { get; set; }
        public string CMOEscalated { get; set; }
    }
}