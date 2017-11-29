﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class MisRoomsEntities : DbContext
    {
        public MisRoomsEntities()
            : base("name=MisRoomsEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AttendanceDetail> AttendanceDetails { get; set; }
        public virtual DbSet<AttendanceStatu> AttendanceStatus { get; set; }
        public virtual DbSet<Dinacharya_Treatment> Dinacharya_Treatment { get; set; }
        public virtual DbSet<DischargeSummary> DischargeSummaries { get; set; }
        public virtual DbSet<Feast_Details> Feast_Details { get; set; }
        public virtual DbSet<HealerDetail> HealerDetails { get; set; }
        public virtual DbSet<Ingredient> Ingredients { get; set; }
        public virtual DbSet<NC_TBL_APPCONFIG> NC_TBL_APPCONFIG { get; set; }
        public virtual DbSet<nc_tbl_bill_type_master> nc_tbl_bill_type_master { get; set; }
        public virtual DbSet<NC_TBL_Billing_Trans> NC_TBL_Billing_Trans { get; set; }
        public virtual DbSet<NC_TBL_BOOKED_DATES> NC_TBL_BOOKED_DATES { get; set; }
        public virtual DbSet<NC_TBL_CAMPAIGN_MASTER> NC_TBL_CAMPAIGN_MASTER { get; set; }
        public virtual DbSet<NC_TBL_COUNTRY_MASTER> NC_TBL_COUNTRY_MASTER { get; set; }
        public virtual DbSet<NC_TBL_Gateway_Payment_Details> NC_TBL_Gateway_Payment_Details { get; set; }
        public virtual DbSet<NC_TBL_GATEWAYPAYMENT_MODE_MASTER> NC_TBL_GATEWAYPAYMENT_MODE_MASTER { get; set; }
        public virtual DbSet<NC_TBL_Guest_Group_Master> NC_TBL_Guest_Group_Master { get; set; }
        public virtual DbSet<NC_TBL_GUEST_ROOM_TRANSACTION> NC_TBL_GUEST_ROOM_TRANSACTION { get; set; }
        public virtual DbSet<NC_TBL_HABIT_DETAILS> NC_TBL_HABIT_DETAILS { get; set; }
        public virtual DbSet<NC_TBL_HBQuest_master> NC_TBL_HBQuest_master { get; set; }
        public virtual DbSet<NC_TBL_HEALTH_DETAILS> NC_TBL_HEALTH_DETAILS { get; set; }
        public virtual DbSet<NC_TBL_HLQuest_master> NC_TBL_HLQuest_master { get; set; }
        public virtual DbSet<NC_TBL_MEMBERSHIPDETAILS_DETAILS> NC_TBL_MEMBERSHIPDETAILS_DETAILS { get; set; }
        public virtual DbSet<NC_TBL_MEMBERSHIPDETAILS_HEADER> NC_TBL_MEMBERSHIPDETAILS_HEADER { get; set; }
        public virtual DbSet<NC_TBL_MEMBERSHIPDETAILS_MASTER> NC_TBL_MEMBERSHIPDETAILS_MASTER { get; set; }
        public virtual DbSet<NC_TBL_NATIONALITY_MASTER> NC_TBL_NATIONALITY_MASTER { get; set; }
        public virtual DbSet<NC_TBL_NUMBERING_SERIES> NC_TBL_NUMBERING_SERIES { get; set; }
        public virtual DbSet<NC_TBL_PACKAGE_MASTER> NC_TBL_PACKAGE_MASTER { get; set; }
        public virtual DbSet<NC_TBL_PAYMENT_MODE_MASTER> NC_TBL_PAYMENT_MODE_MASTER { get; set; }
        public virtual DbSet<NC_TBL_PAYMENT_TRANS> NC_TBL_PAYMENT_TRANS { get; set; }
        public virtual DbSet<NC_TBL_PAYMENT_TYPE_MASTER> NC_TBL_PAYMENT_TYPE_MASTER { get; set; }
        public virtual DbSet<NC_TBL_PERSONAL_DETAILS> NC_TBL_PERSONAL_DETAILS { get; set; }
        public virtual DbSet<NC_TBL_Pre_Booking> NC_TBL_Pre_Booking { get; set; }
        public virtual DbSet<NC_TBL_ROOM_MASTER> NC_TBL_ROOM_MASTER { get; set; }
        public virtual DbSet<NC_TBL_ROOM_Status> NC_TBL_ROOM_Status { get; set; }
        public virtual DbSet<NC_TBL_Treatment_Master> NC_TBL_Treatment_Master { get; set; }
        public virtual DbSet<NC_TBL_VITAL_MASTER> NC_TBL_VITAL_MASTER { get; set; }
        public virtual DbSet<RecipeCategory> RecipeCategories { get; set; }
        public virtual DbSet<RecipeIngredient> RecipeIngredients { get; set; }
        public virtual DbSet<Recipe> Recipes { get; set; }
        public virtual DbSet<TBL_CheckOut_File> TBL_CheckOut_File { get; set; }
        public virtual DbSet<Treatment_Master> Treatment_Master { get; set; }
        public virtual DbSet<TreatmentRoomGroup> TreatmentRoomGroups { get; set; }
        public virtual DbSet<TreatmentRoomMaster> TreatmentRoomMasters { get; set; }
        public virtual DbSet<WS_Tbl_Registration> WS_Tbl_Registration { get; set; }
        public virtual DbSet<ADRM_TBL_USER_MASTER> ADRM_TBL_USER_MASTER { get; set; }
        public virtual DbSet<TBL_DateofBirths> TBL_DateofBirths { get; set; }
        public virtual DbSet<TBL_MINUTES_OF_MEETING> TBL_MINUTES_OF_MEETING { get; set; }
        public virtual DbSet<Treatment_masterOld> Treatment_masterOld { get; set; }
        public virtual DbSet<TreatmentAvailedOld> TreatmentAvailedOlds { get; set; }
        public virtual DbSet<TreatmentRoomGroupsOld> TreatmentRoomGroupsOlds { get; set; }
        public virtual DbSet<TreatmentRoomMasterOld> TreatmentRoomMasterOlds { get; set; }
        public virtual DbSet<TreatmentAvailed> TreatmentAvaileds { get; set; }
        public virtual DbSet<TreatmentFeedBack> TreatmentFeedBacks { get; set; }
        public virtual DbSet<ShiftMaster> ShiftMasters { get; set; }
        public virtual DbSet<PEMASSL> PEMASSLs { get; set; }
    
        public virtual int GehealerwiseDetails(string dates)
        {
            var datesParameter = dates != null ?
                new ObjectParameter("dates", dates) :
                new ObjectParameter("dates", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GehealerwiseDetails", datesParameter);
        }
    
        public virtual int gen_unique_no(string rEQSHORTFORM, ObjectParameter uniqueno)
        {
            var rEQSHORTFORMParameter = rEQSHORTFORM != null ?
                new ObjectParameter("REQSHORTFORM", rEQSHORTFORM) :
                new ObjectParameter("REQSHORTFORM", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("gen_unique_no", rEQSHORTFORMParameter, uniqueno);
        }
    
        public virtual ObjectResult<GetRoomDet_Result> GetRoomDet()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<GetRoomDet_Result>("GetRoomDet");
        }
    
        public virtual int GetTreatmentRoomDetails(string dates)
        {
            var datesParameter = dates != null ?
                new ObjectParameter("dates", dates) :
                new ObjectParameter("dates", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GetTreatmentRoomDetails", datesParameter);
        }
    
        public virtual int Guest_PR_Identification(string pRNO, ObjectParameter prtype, ObjectParameter oppPRNO, ObjectParameter oppName)
        {
            var pRNOParameter = pRNO != null ?
                new ObjectParameter("PRNO", pRNO) :
                new ObjectParameter("PRNO", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Guest_PR_Identification", pRNOParameter, prtype, oppPRNO, oppName);
        }
    }
}
