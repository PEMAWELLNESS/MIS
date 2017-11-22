using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rooms.Models
{
    public class ApplicationData
    {
        public string Room_no { get; set; }

        public string FLOOR { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        //public string Room_condition { set; get; }

        public List<ApplicationData> data = new List<ApplicationData>();
    }
}