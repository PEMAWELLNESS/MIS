$(document).ready(function () {

    hideshow_Accompany();
    hideshow_DiscountType();

    if (userTyp == "5555") {
        $("#UserType").val("WebUser");
        hideshow_UserUHID();
    }
    else
    {
        $("#UserType").val("WalkinUser");
        hideshow_UserUHID();
    }
   


        $("#date").datepicker({
            numberOfMonths: 2,

        });


    function load_PackageType()
    {
        var url = "/RegistrationForm/GetPackageTypes/";


        $.ajax({
            url: url,
            cache: false,
            async: false,
            type: "GET",
            success: function (data) {
                if (data == 0) {
                    alert(" PackageTypes Not Available in master");

                }
                else {
                    $("#PackageTypeDrop").empty();
                    $("#PackageTypeDrop").append('<option value="-1">Select Package Type</option>');
                    $.each(data, function (i, x) {
                        $("#PackageTypeDrop").append('<option value="' + x.PackageType + '">' + x.PackageType + '</option>');
                    });
                }
            },
            error: function (response) {
                alert("error : " + response);
            }
        });
    }

    function load_PackageName() {
        var url = "/RegistrationForm/GetPackageNames/";

        var PackageType = $("#PackageTypeDrop").val();
        if (PackageType != "") {


            $.ajax({
                url: url,
                data: { PackageType: PackageType },
                cache: false,
                async: false,
                type: "GET",
                success: function (data) {
                    if (data == 0) {
                        alert("PackageNames are  Not Available in master");

                    }
                    else {
                        $("#PackageNameDrop").empty();
                        $("#PackageNameDrop").append('<option value="-1">Select Package Name</option>');
                        $.each(data, function (i, x) {
                            $("#PackageNameDrop").append('<option value="' + x.PackageName + '">' + x.PackageName + '</option>');

                        });
                    }
                },
                error: function (response) {
                    alert("error : " + response);
                }
            });
        }

    }
    function load_RoomViews()
    {
        var url = "/RegistrationForm/GetRoomViews/";
        var PackageType = $("#PackageTypeDrop").val();
        var PackageName = $("#PackageNameDrop").val();

        if (PackageType != "" && PackageName != "")
        {
            $.ajax({
                url: url,
                data: { PackageName: PackageName, PackageType: PackageType },
                cache: false,
                async: false,
                type: "GET",
                success: function (data) {
                    if (data == 0) {
                        alert("RoomViews Not Available in master");

                    }
                    else {
                        $("#RoomviewDrop").empty();
                        $("#RoomviewDrop").append('<option value="-1">Select Room View</option>');
                        $.each(data, function (i, x) {
                            $("#RoomviewDrop").append('<option value="' + x.Room_View + '">' + x.Room_View + '</option>');

                        });
                    }
                },
                error: function (response) {
                    alert("error : " + response);
                }
            });
        }
    }

    function load_RoomType() {
        var url = "/RegistrationForm/GetRoomTypes/";
        var PackageName = $("#PackageNameDrop").val();
        var PackageType = $("#PackageTypeDrop").val();
        var RoomView = $("#RoomviewDrop").val();
        if (RoomView != "" && PackageType != "" && PackageName != "") {
            $.ajax({
                url: url,
                data: { PackageName: PackageName, PackageType: PackageType, RoomView: RoomView },
                cache: false,
                async: false,
                type: "GET",
                success: function (data) {
                    if (data == 0) {
                        alert("No data Available in master");

                    }
                    else {
                        $("#RoomTypeDrop").empty();
                        $("#RoomTypeDrop").append('<option value="-1">Select Room Type</option>');
                        $.each(data, function (i, x) {
                            $("#RoomTypeDrop").append('<option value="' + x.Room_Type + '">' + x.Room_Type + '</option>');

                        });
                    }
                },
                error: function (response) {
                    alert("No data Available in master");
                }
            });
        }
    }

    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();
    $("#arrivaldate").datepicker({
        dateFormat: 'dd/mm/yy',
     
        minDate: new Date(currentYear, currentMonth, currentDate)
    });
    // $("#arrivaldate").datepicker("setDate", new Date());
    $("#departuredate").datepicker({
        dateFormat: 'dd/mm/yy',
        disabled: true
    });
    $("#alternatearrivaldate").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0",
     minDate: new Date(currentYear, currentMonth, currentDate)
    });
    $("#alternatedepartureldate").datepicker({
        dateFormat: 'dd/mm/yy',
        disabled: true
    });



    //**************************************************************************





    //*********************************************
    //    Room Views DropDown
    //*******************************************

    //load_RoomViews();

    //*********************************************
    //    Room Types Package Types
    //*******************************************
    load_PackageType();
    //*********************************************
    //    Room Types Package Names
    //*******************************************
    $("#PackageTypeDrop").change(function () {
        $("#Noofdays").val('');

        $("#arrivaldate").datepicker("setDate", '');
        $("#departuredate").datepicker("setDate", '');
        $("#alternatearrivaldate").datepicker("setDate", '');
        $("#alternatedepartureldate").datepicker("setDate", '');

        load_PackageName();

    });


    ///****************To load Data if the Form Mode is Edit**********************
    //To load data depend on UHID
    if (Formmode == 'Edit') {
        var urlPRPackageDetails = "/RegistrationForm/DisplayPRPackageDetails/";

        $.ajax({
            url: urlPRPackageDetails,
            cache: false,
            async: false,
            type: "GET",


            success: function (data) {


                if (data != null) {
                    $("input").removeClass("hasDatepicker");

                    $("#arrivaldate").val(data.ArrivalDate);

                    $("#arrivaldate").addClass("hasDatepicker");
                    $("#departuredate").val(data.DepartureDate);

                    $("#alternatearrivaldate").val(data.AlternateArrivalDate);
                    $("#alternatearrivaldate").addClass("hasDatepicker");
                    $("#alternatedepartureldate").val(data.AlternateDepartureDate);



                    document.getElementById('RoomTariff').value = data.RoomTariff;
                    document.getElementById('PackageAmount').value = data.Package_Amount;

                    load_PackageType();
                    $("#PackageTypeDrop option[value='" + data.PackageType + "']").attr("Selected", "Selected");
                    load_PackageName();
                    $("#PackageNameDrop option[value='" + data.PackageName + "']").attr("Selected", "Selected");
                    // document.getElementById('PackageName').value = data.PackageName

                    load_RoomViews();
                    $("#RoomviewDrop option[value='" + data.RoomView + "']").attr("Selected", "Selected");
                    load_RoomType();
                    $("#RoomTypeDrop option[value='" + data.RoomType + "']").attr("Selected", "Selected");
                    document.getElementById('Noofdays').value = data.NoOfDays

                    $("#AccompanyType option[value='" + data.Accompany_Type + "']").attr("Selected", "Selected");
                    document.getElementById('AttenderName').value = data.Guest_Attender_Name
                    document.getElementById('AccompanyUHID').value = data.AccompanyingGuestUHID
                    document.getElementById('GroupCode').value = data.Group_Code
                    document.getElementById('UserType').value = data.UserType
                  
                    if (data.TransportationRequired == 'Y') {
                        document.getElementById('TransportReq').checked = true;
                    }


                }
                else {

                    alert("For this No Data found");
                }


            },

            error: function (response) {
                alert("Error" + response);
            }
        });

    }

    //*********************************************
    //    No of Days
    //*******************************************



    $("#PackageNameDrop").change(function () {
        load_RoomViews();
    });

    $("#RoomTypeDrop").change(function () {
        var Accompany = $("#AccompanyType").val();
        if (Accompany == "Accompany") {
            AccompanyingGuests = 1
        }
        else {
            AccompanyingGuests = 0
        }
        var url = "/RegistrationForm/GetDays/";

        var PackageName = $("#PackageNameDrop").val();
        var PackageType = $("#PackageTypeDrop").val();
        var RomView = $('#RoomviewDrop').val();
        var RomType = $('#RoomTypeDrop').val();
        var Arrivaldate = $('#arrivaldate').val();
        var Departuredate = $('#departuredate').val();
              $.ajax({
            url: url,
            data: { PackageName: PackageName, PackageType: PackageType, RomView: RomView, RomType: RomType, AccompanyingGuests: AccompanyingGuests, Arrivaldate: Arrivaldate, Departuredate: Departuredate },
            cache: false,
            async: false,
            type: "GET",
            success: function (data) {
                if (data.toString() == null) {
                    alert("Package Data not defined in Master");
                }
                else {
                    document.getElementById('Noofdays').value = data.NoOfDays;
                    document.getElementById('PackageAmount').value = data.PackageAmount;
                    document.getElementById('RoomTariff').value = data.RoomTariffamount;
                }
            },
            error: function (response) {
                alert("error : " + response);
            }
        });
        var NoOfDays = $("#Noofdays").val();
        if (NoOfDays != "" && $('#arrivaldate').val() != "") {
            var date2 = $('#arrivaldate').datepicker('getDate');
            date2.setDate(date2.getDate() + parseInt(NoOfDays));
            $('#departuredate').datepicker('setDate', date2);

        }
        else {

        }

    });
    $("#AccompanyType").change(function () {

        if (Formmode == 'Edit') {
            $("#AccompanyType option[value='" + AccompanyTyp + "']").attr("Selected", "Selected");
            alert("Accompany type should not to be changed in Edit mode");

        }
        else {
            hideshow_Accompany();
            var Accompany = $("#AccompanyType").val();


            var PackageName = $("#PackageNameDrop").val();
            var PackageType = $("#PackageTypeDrop").val();
            var RomView = $('#RoomviewDrop').val();
            var RomType = $('#RoomTypeDrop').val();
            var Arrivaldate = $('#arrivaldate').val();
            var Departuredate = $('#departuredate').val();
            //if (Accompany != "-1" && PackageName != "-1" && PackageType != "-1" && RomView != "-1" && RomType != "-1") {
            if (PackageName != "-1" && PackageType != "-1" && RomView != "-1" && RomType != "-1") {

                if (Accompany == "Accompany") {
                    AccompanyingGuests = 1
                }
                else {
                    AccompanyingGuests = 0
                }


                var url = "/RegistrationForm/GetDays/";


                $.ajax({
                    url: url,
                    data: { PackageName: PackageName, PackageType: PackageType, RomView: RomView, RomType: RomType, AccompanyingGuests: AccompanyingGuests, Arrivaldate: Arrivaldate, Departuredate: Departuredate },
                    cache: false,
                    type: "GET",
                    success: function (data) {
                        if (data.toString() == null) {
                            alert("Package Data not defined in Master");
                        }
                        else {
                            document.getElementById('Noofdays').value = data.NoOfDays;
                            document.getElementById('PackageAmount').value = data.PackageAmount;
                            document.getElementById('RoomTariff').value = data.RoomTariffamount;
                        }
                    },
                    error: function (response) {
                        alert("error : " + response);
                    }
                });
            }
        }
    });



    //*********************************************
    //    Room Types DropDown
    //*******************************************
    $("#RoomviewDrop").change(function () {
        load_RoomType();

    });
    /////To display Availability

    $("#RoomTypeDrop").change(function ()
    {
        debugger;
       
        $("#LoadingImage").show();
        var RomView = $('#RoomviewDrop').val();
        var RomType = $('#RoomTypeDrop').val();
        var ArrivalDates = $('#arrivaldate').val();

        //if (ArrivalDates != null && ArrivalDates != "") {
        if ((RomView == "-1") || (RomType == "-1")) {
            alert('Please Select RoomView and Type');
        }
        else
        {
           
            var Availabity = [];
            Availabity.length = 0;
            var NONAvailabity = [];
            NONAvailabity.length = 0;


            //var NonAvailDt = ['2/21/2015', '2/22/2015']; //reverse color days
            var CurrentDate = new Date();
            // var ArrDate = new Date('02/11/2015');                

            //var ArrDate = new Date($("#arrivaldate").val());
            var ArrDate = new Date($('#arrivaldate').datepicker('getDate'));
            //alert(ArrDate);
            var Currdate = new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), CurrentDate.getDate());
            //alert(Currdate);
            debugger;
            var selectedValue = Number($("#Noofdays").val());
            //var AvailDt = ['2/10/2015', '2/11/2015', '2/12/2015', '2/13/2015', '2/14/2015', '2/15/2015', '2/16/2015', '2/17/2015', '2/18/2015', '2/19/2015', '2/20/2015', '2/21/2015', '2/22/2015', '2/23/2015', '2/24/2015', '2/25/2015', '2/26/2015', '2/27/2015', '2/28/2015','3/1/2015'];
            var seldt = [];

            for (var i = 0; i < selectedValue; i++) {

                var vtoday = ArrDate.getTime();
                var vnextday = new Date(vtoday + (i * 86400000));

                var dd = vnextday.getDate();
                var mm = vnextday.getMonth() + 1; //January is 0!
                var yyyy = vnextday.getFullYear();

                if (dd < 10) {
                    dd = '0' + dd
                }

                if (mm < 10) {
                    mm = '0' + mm
                }

                var customDate = dd + '/' + mm + '/' + yyyy;

              //  var customDate = vnextday.getMonth() + 1 + '/' + vnextday.getDate() + '/' + vnextday.getFullYear();


                seldt[i] = customDate;
                //alert(seldt[i]);

            }
            var Cdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            var Adate = new Date(ArrDate.getFullYear(), ArrDate.getMonth(), ArrDate.getDate());
            var dd1 = new Date().getDate();
            var mm1 = new Date().getMonth() + 1; //January is 0!
            var yyyy1 = new Date().getFullYear();
            if (dd1 < 10) {
                dd1 = '0' + dd1;
            }
            if (mm1 < 10) {
                mm1 = '0' + mm1;
            }
            var todate1 = dd1 + '/' + mm1 + '/' + yyyy1;
            var currentdate = dd1 + '/' + mm1 + '/' + yyyy1;
            if (Cdate >= Currdate) {
                //alert('1');

                $.ajax({
                    url: "/RegistrationForm/GetNONAvailability",
                    type: "get",
                    data: { TDate: currentdate, RoomView: RomView, RoomType: RomType },
                    dataType: 'json',
                    cache: false,
                    async: false,
                    success: function (data) {
                        //alert(data);
                        NONAvailabity = data.split('|')[0].split(',');
                        Availabity = data.split('|')[1].split(',');
                        //alert(Availabity);
                       // alert(NONAvailabity);
                        if (NONAvailabity == "" && Availabity == "") 
                        //if (NONAvailabity != "")
                        {
                            alert('Rooms are not available');
                            $('#RoomTypeDrop').val("-1");
                        }
                    },
                    error: function () {
                        alert("Wrong Selection!..");
                    }
                });


            }
            else {
                //alert('2');
            }
            $('#date').datepicker('destroy');
            $('#date').datepicker('refresh');
            $('#date').datepicker({

                numberOfMonths: 2,
                beforeShowDay: function (date) {
                    //var ArrivalDate = ArrDate.getMonth() + 1 + '/' + ArrDate.getDate() + '/' + ArrDate.getFullYear();
                    //var CYear = date.getFullYear();
                    //var CMonth = date.getMonth() + 1;                       
                    var dd2 = date.getDate();
                    var mm2 = date.getMonth() + 1;
                    if (dd2 < 10) {
                        dd2 = '0' + dd2;
                    }
                    if (mm2 < 10) {
                        mm2 = '0' + mm2;
                    }
                  
                    var customDate = dd2 + '/' + mm2 + '/' + date.getFullYear();
                    if (NONAvailabity.indexOf(customDate) >= 0)
                        return [true, "ui-nonavail"];
                    else if (seldt.indexOf(customDate) >= 0)
                        return [true, "ui-selected"];
                    else if (Availabity.indexOf(customDate) >= 0)
                        return [true, "ui-avail"];
                    else {
                        return [true];
                    }

                }
            });
            $("#LoadingImage").fadeOut(4000);
        }


    });

    $("#arrivaldate").change(function ()
    {
        debugger;
       
        $("#LoadingImage").show();
        var RomView = $('#RoomviewDrop').val();
        var RomType = $('#RoomTypeDrop').val();
        var ArrivalDates = $('#arrivaldate').val();
        //alert(ArrivalDates);
        if (ArrivalDates != "") {
            if ((RomView == "-1") || (RomType == "-1")) {
                alert('Please Select RoomView and Type');
            }
            else {
                
                var Availabity = [];
                Availabity.length = 0;
                var NONAvailabity = [];
                NONAvailabity.length = 0;


                //var NonAvailDt = ['2/21/2015', '2/22/2015']; //reverse color days
                var CurrentDate = new Date();
                // var ArrDate = new Date('02/11/2015');                

                var ArrDate = new Date($('#arrivaldate').datepicker('getDate'));
                var Currdate = new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), CurrentDate.getDate());
                //alert(Currdate);

                var selectedValue = Number($("#Noofdays").val());
                //var AvailDt = ['2/10/2015', '2/11/2015', '2/12/2015', '2/13/2015', '2/14/2015', '2/15/2015', '2/16/2015', '2/17/2015', '2/18/2015', '2/19/2015', '2/20/2015', '2/21/2015', '2/22/2015', '2/23/2015', '2/24/2015', '2/25/2015', '2/26/2015', '2/27/2015', '2/28/2015','3/1/2015'];
                var seldt = [];

                for (var i = 0; i < selectedValue; i++) {

                    var vtoday = ArrDate.getTime();
                    var vnextday = new Date(vtoday + (i * 86400000));
                    var dd = vnextday.getDate();
                    var mm = vnextday.getMonth() + 1; //January is 0!
                    var yyyy = vnextday.getFullYear();

                    if (dd < 10) {
                        dd = '0' + dd
                    }

                    if (mm < 10) {
                        mm = '0' + mm
                    }

                    var customDate = dd + '/' + mm + '/' + yyyy;
                    //var customDate = vnextday.getMonth() + 1 + '/' + vnextday.getDate() + '/' + vnextday.getFullYear();


                    seldt[i] = customDate;
                    //alert(seldt[i]);

                }

                $('#date').datepicker('destroy');
                $('#date').datepicker('refresh');
                var Cdate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                var Adate = new Date(ArrDate.getFullYear(), ArrDate.getMonth(), ArrDate.getDate());
                var dd1 = new Date().getDate();
                var mm1 = new Date().getMonth() + 1; //January is 0!
                var yyyy1 = new Date().getFullYear();
                if (dd1 < 10) {
                    dd1 = '0' + dd1;
                }
                if (mm1 < 10) {
                    mm1 = '0' + mm1;
                }
                var todate1 = dd1 + '/' + mm1 + '/' + yyyy1;

                var currentdate = dd1 + '/' + mm1 + '/' + yyyy1;
                if (Cdate >= Currdate) {
                    //alert('1');

                    $.ajax({
                        url: "/RegistrationForm/GetNONAvailability",
                        type: "get",
                        data: { TDate: currentdate, RoomView: RomView, RoomType: RomType },
                        dataType: 'json',
                        cache: false,
                        async: false,
                        success: function (data) {
                            ////alert(data);
                            //if (data == 1) {
                            NONAvailabity = data.split('|')[0].split(',');
                            Availabity = data.split('|')[1].split(',');
                            //}
                            //else {
                            //    Availabity.push(customDate);
                            //}

                        },
                        error: function () {
                            alert("Wrong Selection!..");
                        }
                    });



                }
                else {
                    //alert('2');
                }
                $('#date').datepicker({

                    numberOfMonths: 2,
                    beforeShowDay: function (date) {
                        var dd2 = date.getDate();
                        var mm2 = date.getMonth() + 1;
                        if (dd2 < 10) {
                            dd2 = '0' + dd2;
                        }
                        if (mm2 < 10) {
                            mm2 = '0' + mm2;
                        }
                        var customDate = dd2 + '/' + mm2 + '/' + date.getFullYear();
                        //var ArrivalDate = ArrDate.getMonth() + 1 + '/' + ArrDate.getDate() + '/' + ArrDate.getFullYear();
                        //var CYear = date.getFullYear();
                        //var CMonth = date.getMonth() + 1;                       

                        if (NONAvailabity.indexOf(customDate) >= 0)

                            return [true, "ui-nonavail"];
                        else if (seldt.indexOf(customDate) >= 0)
                            return [true, "ui-selected"];
                        else if (Availabity.indexOf(customDate) >= 0)
                            return [true, "ui-avail"];
                        else {
                            return [true];
                        }

                    }
                });
            }
            $("#LoadingImage").fadeOut(4000);

        }
        else {
            alert('Please Enter Arrival Date');
        }



        var NoOfDays = $("#Noofdays").val();
        if (NoOfDays == "") {


        }
        else {
            var date2 = $('#arrivaldate').datepicker('getDate');
            date2.setDate(date2.getDate() + parseInt(NoOfDays));
            $('#departuredate').datepicker('setDate', date2);
            $('#alternatedepartureldate').datepicker('setDate', date2);
            var x = $('#arrivaldate').datepicker('getDate');
            $('#alternatearrivaldate').datepicker('setDate', x);
        }


    });
    /////End To display Availability Calendar

    $("#arrivaldate").change(function ()
    {

        debugger; 
        var NoOfDays = $("#Noofdays").val();
        if (NoOfDays == "") {


        }
        else {
            var date2 = $('#arrivaldate').datepicker('getDate');
            date2.setDate(date2.getDate() + parseInt(NoOfDays));
            $('#departuredate').datepicker('setDate', date2);
            $('#alternatedepartureldate').datepicker('setDate', date2);
            var x = $('#arrivaldate').datepicker('getDate');
            $('#alternatearrivaldate').datepicker('setDate', x);
        }

        var memid = $("#MemId").val();
        if(memid!=null || memid!="")
        {
            var MemId = $("#MemId").val();

            var walkinuserUHID = $("#walkinuserUHID").val();

            var arrivaldate = $('#arrivaldate').val();
            var departuredate = $('#departuredate').val();

            //if (departuredate == null || departuredate == "")
            //{
            //    departuredate = arrivaldate
            //    var date2 = $('#arrivaldate').datepicker('getDate');
            //    date2.setDate(date2.getDate() + parseInt(NoOfDays));
            //    $('#departuredate').datepicker('setDate', date2);


            //}

            var url = "/RegistrationForm/DatesCheckMemId/";
            if (MemId != "") {
              

                $.ajax({
                    url: url,

                    data: { MC: $("#MemId").val(), walkinuserUHID: $("#walkinuserUHID").val(), arrivaldate: $('#arrivaldate').val(), departuredate: $('#departuredate').val() },
                    cache: false,
                    type: "POST",
                    success: function (data) {
                        if (data != "") {
                            alert(data);

                            $("#arrivaldate").val('');
                            $("#departuredate").val('');
                            $("#arrivaldate").focus();
                        }
                        else {
                        }
                    },
                    //error: function () {
                    //    alert("Invalid Membership Id");
                    //    $("#MemId").val('');
                    //    $("#MemId").focus();
                    //}
                });
            }
        }

        ////To Load package Amount

        var Accompany = $("#AccompanyType").val();
        if (Accompany == "Accompany") {
            AccompanyingGuests = 1
        }
        else {
            AccompanyingGuests = 0
        }


        var url11 = "/RegistrationForm/GetDays/";

        var PackageName = $("#PackageNameDrop").val();
        var PackageType = $("#PackageTypeDrop").val();
        var RomView = $('#RoomviewDrop').val();
        var RomType = $('#RoomTypeDrop').val();
        var Arrivaldate = $('#arrivaldate').val();
        var Departuredate = $('#departuredate').val();

        $.ajax({
            url: url11,
            data: { PackageName: PackageName, PackageType: PackageType, RomView: RomView, RomType: RomType, AccompanyingGuests: AccompanyingGuests, Arrivaldate: Arrivaldate, Departuredate: Departuredate },
            cache: false,
            async: false,
            type: "GET",
            success: function (data) {
                if (data.toString() == null) {
                    alert("Package Data not defined in Master");
                }
                else {
                    document.getElementById('Noofdays').value = data.NoOfDays;
                    document.getElementById('PackageAmount').value = data.PackageAmount;
                    document.getElementById('RoomTariff').value = data.RoomTariffamount;
                }
            },
            error: function (response) {
                alert("error : " + response);
            }
        });


    });

    $("#alternatearrivaldate").change(function () {

        var NoOfDays = $("#Noofdays").val();
        if (NoOfDays == "") {


        }
        else {
            var date3 = $('#alternatearrivaldate').datepicker('getDate');
            date3.setDate(date3.getDate() + parseInt(NoOfDays));
            $('#alternatedepartureldate').datepicker('setDate', date3);
        }

    });

    $('#AccompanyUHID').change(function () {
        var AccompnyUHID = $("#AccompanyUHID").val();
        var walkinuserUHID = $("#walkinuserUHID").val();
        //alert(AccompnyUHID);
        //alert(walkinuserUHID);
        var url = "/RegistrationForm/CheckUHID/";
        if (AccompnyUHID != "" )  {
            if (AccompnyUHID != walkinuserUHID) {
                $.ajax({
                    url: url,
                    data: { AGUHID: $("#AccompanyUHID").val() },
                    cache: false,
                    type: "POST",
                    success: function (data) {
                        if (data != null) {
                        }
                        else {
                            alert("Invalid Accompany Guest UHID");
                            $("#AccompanyUHID").val('');
                            $("#AccompanyUHID").focus();
                        }
                    },
                    error: function () {
                        alert("Invalid Accompany Guest UHID");
                        $("#AccompanyUHID").val('');
                        $("#AccompanyUHID").focus();
                    }
                });
            }
            else
            {
                alert("Please Register For Accompany Guest UHID");
            }
        }
    });
    $('#GroupCode').change(function () {
        var GroupCode = $("#GroupCode").val();
        var url = "/RegistrationForm/CheckGroupCode/";
        if (GroupCode != "") {
            $.ajax({
                url: url,

                data: { GroupCode: $("#GroupCode").val() },
                cache: false,
                type: "POST",

                success: function (data) {
                    if (data != null) {
                    }
                    else {
                        $("#GroupCode").val('');
                        alert("Invalid Group Code");
                        $("#GroupCode").focus();
                    }
                },
                error: function () {
                    $("#GroupCode").val('');
                    alert("Invalid Group Code");
                    $("#GroupCode").focus();
                }
            });
        }
    });

    $("#TariffForm").dialog({
        autoOpen: false,
        modal: true,
        width: 760,
        height: 400,
        title: "Package Tariffs"
    });
    $("#HelpForm").dialog({
        autoOpen: false,
        modal: true,
        width: 760,
        height: 250,
        title: "Help"
    });
    
   
    $("#Help").click(function () {
    

        $.ajax({

            url: "/RegistrationForm/Help",

            type: 'GET',
            success: function (result) {


                $("#HelpForm").empty().append(result);
                $("#HelpForm").dialog("open");
            },
            error: function () {
                alert("help not defined");
            }
        });
    });


    $("#AttenderName").keyup(function () {
        var res = $("#AttenderName").val();

        var AttenderName = /^[a-zA-Z ]*$/;
        if (res.match(AttenderName)) {
            return true;
        }
        else {
            alert("AttenderName  must be Alphabets");
            $("#AttenderName").val('');
            return false;
        }

    });


    $("#CheckTariffs").click(function () {


        $.ajax({

            url: "/RegistrationForm/PackageTariff",

            type: 'GET',
            success: function (result) {


                $("#TariffForm").empty().append(result);
                $("#TariffForm").dialog("open");
            },
            error: function () {
                alert("Packages are not available in master");
            }
        });
    });


    $("#RoomTypeDrop").change(function () {
       // alert('second');
        $("#RoomTariff").val('');
        var Accompany = $("#AccompanyType").val();
        if (Accompany == "-1") {
            AccompanyingGuests = 0
        }
        else {
            AccompanyingGuests = 1
        }
        var RoomView = $("#RoomviewDrop").val();
        var RoomType = $("#RoomTypeDrop").val();
        var Arrivaldate = $('#arrivaldate').val();
        var Departuredate = $('#departuredate').val();
        if (RoomView == "-1" || RoomType == "-1") {
          //  alert("Room Type or  Room view should not be selected");
        }
        else {
            $.ajax({
                url: "/RegistrationForm/GetTariffAmount",
                data: { RoomType: RoomType, RoomView: RoomView, AccompanyingGuests: AccompanyingGuests, Arrivaldate: Arrivaldate, Departuredate: Departuredate },
                type: 'POST',
                success: function (result) {
                    document.getElementById('RoomTariff').value = result.TariffAmount;

                },
                error: function () {
                    alert("Tariff data not available");
                    //alert("something seems wrong");
                }
            });
        }
    });

    $("#AccompanyType").change(function () {

        if (Formmode == 'Edit') {

            $("#AccompanyType option[value='" + AccompanyTyp + "']").attr("Selected", "Selected");
            //alert("Accompany type not to be changed in Edit mode");
        }
        else {
            $("#RoomTariff").val('');
            var Accompany = $("#AccompanyType").val();

            if (Accompany == "Accompany") {
                AccompanyingGuests = 1
            }
            else {
                AccompanyingGuests = 0
            }

            var RoomView = $("#RoomviewDrop").val();

            var RoomType = $("#RoomTypeDrop").val();

            var Arrivaldate = $('#arrivaldate').val();
            var Departuredate = $('#departuredate').val();


            if (RoomView == "-1" || RoomType == "-1") {
                alert("Room Type or  Room view should not be selected");
            }
            else {
                $.ajax({

                    url: "/RegistrationForm/GetTariffAmount",
                    data: { RoomType: RoomType, RoomView: RoomView, AccompanyingGuests: AccompanyingGuests, Arrivaldate: Arrivaldate, Departuredate: Departuredate },
                    type: 'POST',
                    success: function (result) {
                        document.getElementById('RoomTariff').value = result.TariffAmount;

                    },
                    error: function () {
                        alert("Tariff data not available");
                        //alert("something seems wrong");
                    }
                });
            }

        }
    });


    $("#UserType").change(function () {
        hideshow_UserUHID();
    });

    $('#walkinuserUHID').change(function () {
        var UserUHID = $("#walkinuserUHID").val();
        var url = "/RegistrationForm/CheckUHID/";
        if (UserUHID != "") {
            $.ajax({
                url: url,

                data: { AGUHID: $("#walkinuserUHID").val() },
                cache: false,
                type: "POST",

                success: function (data) {
                    if (data != null) {
                    }
                    else {

                        alert("Invalid User UHID");
                        $("#walkinuserUHID").val('');
                        $("#walkinuserUHID").focus();
                    }
                },
                error: function () {

                    alert("Invalid  User UHID");
                    $("#walkinuserUHID").val('');
                    $("#walkinuserUHID").focus();
                }
            });
        }
    });

    $('#DiscType').change(function () {
        hideshow_DiscountType();

    });


    $('#DiscType').change(function () {
        hideshow_DiscountType();

    });


    /////Checking Campaign Code is Valid or Not

    $('#CC').change(function () {

        var CampaignCode = $("#CC").val();
        var url = "/RegistrationForm/CheckCC/";
        if (CampaignCode != "") {
            $.ajax({
                url: url,

                data: { CC: $("#CC").val() },
                cache: false,
                type: "POST",

                success: function (data) {
                    if (data != null) {
                    }
                    else {

                        alert("Invalid Campaign Code");
                        $("#CC").val('');
                        $("#CC").focus();
                    }
                },
                error: function () {

                    alert("Invalid Campaign Code");
                    $("#CC").val('');
                    $("#CC").focus();
                }
            });
        }

    });
    /////Checking Membership Id is Valid or Not

    $('#MemId').change(function () {

        //  debugger;
        var MemId = $("#MemId").val();       

        var walkinuserUHID = $("#walkinuserUHID").val();
        
        var arrivaldate = $('#arrivaldate').val();
        alert($('#arrivaldate').val());
        var departuredate = $('#departuredate').val();
        var url = "/RegistrationForm/CheckMemId/";

         

        if (MemId != "") {
            $.ajax({
                url: url,

                data: { MC: $("#MemId").val(), walkinuserUHID: $("#walkinuserUHID").val(), arrivaldate: $('#arrivaldate').val(), departuredate: $('#departuredate').val() },
                cache: false,
                type: "POST",
                success: function (data) {
                    if (data != "") {
                        alert(data);
                        $("#MemId").val('');
                        $("#MemId").focus();

                    }
                    else {
                    }
                },
                //error: function () {
                //    alert("Invalid Membership Id");
                //    $("#MemId").val('');
                //    $("#MemId").focus();
                //}
            });
        

    }

    });


    $("#Save").click(function () {

        //$('input[type="text"].required').each(function () {

       

        isValid = ValidateInputs();
       
        if (isValid == true)
        {
            var GroupCode = "";
            var DiscType = $("#DiscType").val();
            var MemType="";
            if (DiscType == "-1")
            {
               
            }
            else {
                if (DiscType == "Membership") {                    
                    GroupCode = $('#MemId').val();
                    MemType = "M";

                }
                else {
                    GroupCode = $('#CC').val();
                    MemType = "C";
                }
            }
           
        var PackType = $("#PackageTypeDrop").val();
        var PackName = $("#PackageNameDrop").val();
        var RoomView = $("#RoomviewDrop").val();
        var RoomType = $("#RoomTypeDrop").val();
        ArrivalDate = $("#arrivaldate").val();
        UserType1 = $("#UserType").val();
        AltFDate = $("#alternatearrivaldate").val();
        AltTDate = $("#AlternateDepartureDate").val();
        UserUHID = $("#walkinuserUHID").val();


        if (PackType == "-1" || PackName == "-1" || RoomView == "-1" || RoomType == "-1" || (UserType1 == "WalkinUser" && UserUHID == "") || (ArrivalDate == "") || (AltFDate == "") || (AltTDate == "")) {
            //alert("Some of Package Details or Room Details or Arrival dates or User Type selection is missing");
            alert("Package Information is missing");
        }
        else {
            var accompany = $("#AccompanyType").val();
            var AttenderName = $("#AttenderName").val();
            var AUHID = $("#AccompanyUHID").val();
            //if (accompany == "-1") {


            //    var params = {
            //        PackageType: $("#PackageTypeDrop").val(),
            //        PackageName: $("#PackageNameDrop").val(),
            //        NoOfDays: $("#Noofdays").val(),
            //        ArrivalDate: $("#arrivaldate").val(),
            //        DepartureDate: $("#departuredate").val(),
            //        AlternateArrivalDate: $("#alternatearrivaldate").val(),
            //        AlternateDepartureDate: $("#alternatedepartureldate").val(),
            //        RoomView: $("#RoomviewDrop").val(),
            //        RoomType: $("#RoomTypeDrop").val(),
            //        RoomTariff: $("#RoomTariff").val(),
            //        //RoomTariff: $("#RoomTariff").val(),
            //        Accompany_Type: $("#AccompanyType").val(),
            //        Guest_Attender_Name: $("#AttenderName").val(),
            //        AccompanyingGuestUHID: $("#AccompanyUHID").val(),
            //        Package_Amount: $("#PackageAmount").val(),
            //        Group_Code: $("#GroupCode").val(),
            //        UserUHID: $("#walkinuserUHID").val(),
            //        UserType: $("#UserType").val()

            //    }

            //    $.ajax({

            //        url: "/RegistrationForm/saveDatesConformation",
            //        data: params,
            //        type: 'POST',
            //        dataType: "json",
            //        cache: false,
            //        traditional: true,
            //        success: function (data) {

            //            if (data.toString() == "Successfully Saved!") {
            //                // window.alert("Records saved..");
            //                window.location.href = urltt;
            //                //window.location.href = '@Url.Action("PersonalDetails", "RegistrationForm")';
            //                // window.location.href = '@Url.Action("PersonalDetails")';
            //            }
            //            else {
            //                window.alert("Operation Failed");
            //            }


            //        },
            //        error: function () {
            //            alert("Operation Failed");
            //        }
            //    });
            //}
            //else {

            if (accompany != "-1" && accompany == "Attender" && AttenderName == "")  {
                alert("Attender is Name missing");
            }
            else {

                if (accompany != "-1" && accompany == "Accompany" && AUHID == "") {
                    alert("Accompany UHID missing");
                }
                else {

                    var transport = "N";
                    var TransportationReq = $('#TransportReq').is(':checked')
                    if (TransportationReq == true) {
                        transport = "Y";
                    }
                    else {
                        transport = "N";
                    }
                    var params = {
                        PackageType: $("#PackageTypeDrop").val(),
                        PackageName: $("#PackageNameDrop").val(),
                        NoOfDays: $("#Noofdays").val(),
                        ArrivalDate: $("#arrivaldate").val(),
                        DepartureDate: $("#departuredate").val(),
                        AlternateArrivalDate: $("#alternatearrivaldate").val(),
                        AlternateDepartureDate: $("#alternatedepartureldate").val(),
                        RoomView: $("#RoomviewDrop").val(),
                        RoomType: $("#RoomTypeDrop").val(),
                        RoomTariff: $("#RoomTariff").val(),
                        RoomTariff: $("#RoomTariff").val(),
                        Accompany_Type: $("#AccompanyType").val(),
                        Guest_Attender_Name: $("#AttenderName").val(),
                        AccompanyingGuestUHID: $("#AccompanyUHID").val(),
                        Package_Amount: $("#PackageAmount").val(),
                        Group_Code: GroupCode,
                        UserUHID: $("#walkinuserUHID").val(),
                        UserType: $("#UserType").val(),
                        Transportation_Required: transport,
                        Mem_Camp_Type:MemType
                    }

                    $.ajax({

                        url: "/RegistrationForm/saveDatesConformation",
                        data: params,
                        type: 'POST',
                        dataType: "json",
                        cache: false,
                        traditional: true,
                        success: function (data) {

                            if (data.toString() == "Successfully Saved!") {
                                // window.alert("Records saved..");
                                window.location.href = urltt;
                                //window.location.href = '@Url.Action("PersonalDetails", "RegistrationForm")';
                                // window.location.href = '@Url.Action("PersonalDetails")';
                            }
                            else {
                                window.alert("Failed to save records");
                            }


                        },
                        error: function () {
                            alert("Failed to save records");
                        }
                    });
                }
            }

        }

    }
    } );


   

});





function hideshow_UserUHID() {
 
    var UserType = $("#UserType").val();
    if (UserType == "WebUser") {
        $("#walkinuserUHID").val('');
        $("#UserUHID").hide();
        $("#walkinuserUHID").hide();
   }
    else {
        $("#UserUHID").show();
        $("#walkinuserUHID").show();

    }


}

function hideshow_Accompany() {
    var Accompany = $("#AccompanyType").val();
    if (Accompany == "-1") {

        $("#AttenderName").val('');
        // $("#AccUHID").val('');
        $("#AccompanyUHID").val('');
        $("#AttendName").hide();
        $("#AttenderName").hide();
        $("#AccUHID").hide();
        $("#AccompanyUHID").hide();
        $("#Register").hide();

    }
    else {
        if (Accompany == "Attender") {
            // $("#AccUHID").val('');
            $("#AccompanyUHID").val('');
            $("#AccUHID").hide();
            $("#AccompanyUHID").hide();
            $("#AttendName").show();
            $("#AttenderName").show();
        }
        else {
            // $("#AttendName").val('');
            $("#AttenderName").val('');
            $("#AttendName").hide();
            $("#AttenderName").hide();
            $("#AccUHID").show();
            $("#AccompanyUHID").show();
            $("#Register").show();
        }
    }


}


function hideshow_DiscountType() {
    var DiscType = $("#DiscType").val();
    if (DiscType == "-1") {

        $("#MemId").val('');
        $("#CC").val('');
        $("#MembershipId").hide();
        $("#CampaignCode").hide();
        $("#MemId").hide();
        $("#CC").hide();
        $("#Membershipidc").show();



    }
    else {
        if (DiscType == "Membership") {
            // $("#AccUHID").val('');
            $("#CC").val('');
            $("#CC").hide();
            $("#CampaignCode").hide();
            $("#MembershipId").show();
            $("#MemId").show();
            $("#Membershipidc").hide();
        }
        else {
            $("#MemId").val('');
            $("#MembershipId").hide();
            $("#CC").show();
            $("#CampaignCode").show();
            $("#Membershipidc").hide();
            $("#MemId").hide();
        }
    }


}


