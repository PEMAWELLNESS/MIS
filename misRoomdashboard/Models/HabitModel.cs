using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rooms.Models
{
    public class HabitModel
    {
        public int Id { set; get; }
        public int HBCode { set; get; }
        public string HBQFreq { get; set; }
        public string HBDesc { get; set; }
        public string HBQuestion { get; set; }

    }
}