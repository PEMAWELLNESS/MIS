//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Rooms.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class PEMASSL
    {
        public int ID { get; set; }
        public string Employee_Name { get; set; }
        public string Company { get; set; }
        public Nullable<System.DateTime> AttendanceDate { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public Nullable<System.TimeSpan> InTime { get; set; }
        public Nullable<System.TimeSpan> C_OutTime { get; set; }
        public string Status { get; set; }
        public string PunchRecords { get; set; }
        public Nullable<double> Employee_Code { get; set; }
        public string Category { get; set; }
        public string Employement_type { get; set; }
        public string In_Device_Name { get; set; }
        public string Out_Device_Name { get; set; }
        public string StatusCode { get; set; }
        public Nullable<double> Duration { get; set; }
        public Nullable<double> LateBy { get; set; }
        public Nullable<double> Early_by { get; set; }
        public Nullable<double> Overtime { get; set; }
        public bool Is_On_Leave { get; set; }
        public string LeaveType { get; set; }
        public bool Is_On_OutDoor_Entries { get; set; }
        public Nullable<double> OutDoor_Duration { get; set; }
        public string ShiftName { get; set; }
    }
}