using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rooms.Models
{
    public class Events
    {
        public string id { get; set; }
        public string title { get; set; }
        public string date { get; set; }
        public string start { get; set; }
        public string end { get; set; }
        public string url { get; set; }
        public string backgroundColor { set; get; }
        public string rendering { set; get; }
        public string dateNum { set; get; }

        public bool allDay { get; set; }
    }
}