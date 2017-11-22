$(document).ready(function () {
    $.validator.methods.date = function (value, element) {
        return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
    };

        var date = new Date();
        var currentMonth = date.getMonth();
        var currentDate = date.getDate();
        var currentYear = date.getFullYear();
       
        $("#datepicker1").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: "-100:+0",
            maxDate: new Date(currentYear, currentMonth, currentDate)
        });
      
        $("#datepicker2").datepicker({
             dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: "-100:+0",
            maxDate: new Date(currentYear, currentMonth, currentDate)
        });

    $("#Exit").click(function () {

        //window.alert("are you sure you want to close");
        var res = window.confirm("Are you sure you want to Close");
        if (res == true) {
            window.location.href = Exiturl;
        }

    });
    $("#datepicker1").change(function () {
        //var BirthDate = $("#DOB").val();
        var BirthDate = $("#datepicker1").val();
        var now = new Date();
        bD = BirthDate.split('/');

        if (bD.length == 3) {
            born = new Date(bD[2], bD[1] * 1 - 1, bD[0]);

            years = Math.floor((now.getTime() - born.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        }
        var age = years;

        if (age < 18) {
            $("#datepicker1").datepicker("setDate", '');
            alert("Age must be greater than 18 years");
        }

    });
 
    $('#datepicker2').change(function () {
        var selectedDate = $('#datepicker2').datepicker('getDate');
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        if (Date.parse(today) >= Date.parse(selectedDate)) {
           
        } else {
            $("#datepicker2").datepicker("setDate", '');
            alert('Future dates not Allowed');
        }
    });
    
    $("#EMP_DEPT").change(function () {
        var dept = $("#EMP_DEPT").val();
        if (dept != "") {
            var url = "/Employee/GetManager/";


            $.ajax({
                url: url,
                data: { EMP_DEPT: $("#EMP_DEPT").val() },
                cache: false,
                type: "POST",
                success: function (data) {
                    var markup = "<option value='0'>Select Manager</option>";
                    for (var x = 0; x < data.length; x++) {
                        markup += "<option value=" + data[x].Value + ">" + data[x].Text + "</option>";
                    }
                    $("#MANAGER_CODE").html(markup).show();
                },
                error: function (response) {
                    alert("Department is Mandatory : ");
                }
            });
        }
        else {
            alert("select Department");
        }
    });

    $("#EMP_DEPT").change(function () {
        var dept = $("#EMP_DEPT").val();
        if (dept != 0) {
            var url = "/Employee/GetSubDept/";


            $.ajax({
                url: url,
                data: { EMP_DEPT: $("#EMP_DEPT").val() },
                cache: false,
                type: "POST",
                success: function (data) {
                    $("#EMP_DEPT_SUBCATG").empty();
                    $("#EMP_DEPT_SUBCATG").append('<option value="0">Select SubDept</option>');
                    $.each(data, function (i, x) {
                        $("#EMP_DEPT_SUBCATG").append('<option value="' + x.SubDept_Name + '">' + x.SubDept_Name + '</option>');

                    });
                },
                error: function (response) {
                    alert("Department is Mandatory : ");
                }
            });
        }
        else {
            alert("select Department");
        }
    });
    //$("#Savebtn").click(function () {

    //    var url = "/Employee/AddEmployee2/";
    //    var params = {
    //        USER_CODE: $("#USER_CODE").val(),
    //        EMP_CODE: $("#EMP_CODE").val(),
    //        EMP_FNAME: $("#EMP_FNAME").val(),
    //        EMP_MNAME: $("#EMP_MNAME").val(),
    //        EMP_LNAME: $("#EMP_LNAME").val(),
    //        EMP_FHNAME: $("#EMP_FHNAME").val(),
    //        EMP_GENDER: $("#EMP_GENDER").val(),
    //        EMP_DOB: $("#EMP_DOB").val(),
    //        EMP_DOJ: $("#EMP_DOJ").val(),
    //        EMP_JOBSTATUS: $("#EMP_JOBSTATUS").val(),
    //        EMP_QUALIFICATION: $("#EMP_QUALIFICATION").val(),
    //        EMP_DESIGNATION: $("#EMP_DESIGNATION").val(),
    //        EMP_DEPT: $("#EMP_DEPT").val(),
    //        MANAGER_CODE: $("#MANAGER_CODE").val(),
    //        EMP_MOBNO: $("#EMP_MOBNO").val(),
    //        EMP_PROFILE: $("#EMP_PROFILE").val(),
    //        EMP_CONADDRESS: $("#EMP_CONADDRESS").val()


    //    }
    //    var url = "/Employee/AddEmployee2/";
    //    $.ajax({
    //        url: url,
    //       data: params,

    //        cache: false,
    //        //type: "POST",
    //        //dataType: 'json',
    //        success: function (data) {

    //            //var c = 12;
    //            //var d = 34;
    //            //$("#msg").html(data);
    //            var url = "/RegistrationForm/PersonalDetails/";

    //            $.ajax({
    //                url: url,
    //                //data: params,

    //                cache: false,
    //                //type: "POST",
    //                //dataType: 'json',
    //                success: function (data) {

    //                    //var c = 12;
    //                    //var d = 34;
    //                    //$("#msg").html(data);

    //                }
    //            });

    //    }


    //    });
    //});
});