using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rooms.Models
{
    public class PreBookingDet
    {
        public string Room_no { get; set; }
        public string Guest_Name { get; set; }
        public String Gender { get; set; }
        public DateTime Date_From { get; set; }
        public DateTime Date_To { get; set; }
        public string Status { get; set; }

        public List<PreBookingDet> data = new List<PreBookingDet>();
    }
}