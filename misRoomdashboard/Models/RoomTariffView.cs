using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rooms.Models
{
    public class RoomTariffView
    {
        public string Room_View { get; set; }
        public string Room_Type { get; set; }
        public decimal SO_Tariff { get; set; }
        public decimal DO_Tariff { get; set; }
    }
}