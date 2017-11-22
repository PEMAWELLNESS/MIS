using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rooms.Models
{
    public class HDModel
    {
        public int Id { set; get; }
        public int HLCode { set; get; }
        public string HLFlag { get; set; }
        public string HLDesc { get; set; }
        public string HLQuestion { get; set; }


    }
}