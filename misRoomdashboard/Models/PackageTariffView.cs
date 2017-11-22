using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rooms.Models
{
    public class PackageTariffView
    {
        public string PackageType { get; set; }
        public string PackageName { get; set; }
        public string Room_View { get; set; }
        public string Room_Type { get; set; }
        public decimal SO_Pkg_Amt { get; set; }
        public decimal DO_Pkg_Amt { get; set; }
        public int NoOfDays { get; set; }
    }
}