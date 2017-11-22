using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Rooms.Models
{
    public class PendingPayment
    {
        public string PRNO { set; get; }
        public string Name { set; get; }
        public int BillCode { set; get; }
        public string BillType { set; get; }
        public decimal Amount { set; get; }
      
        public string GuestType { set; get; }    
    }
}