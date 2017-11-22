$(document).ready(function () {
   // var regexDDMMYYYY="^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d$";
    $.validator.methods.date = function (value, element) {
        return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
        //return Pattern.matches(regexDDMMYYYY, value);
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
            alert("Invalid Date of Birth");
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

                    //var markup = "<option value='0'>Select SubDept</option>";
                    //for (var x = 0; x < data.length; x++) {
                    //    markup += "<option value=" + data[x].Value + ">" + data[x].Text + "</option>";
                    //}
                    //$("#EMP_DEPT_SUBCATG").html(markup).show();
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



});
$("#USER_CODE").change(function () {

    $("#EMP_CODE").val('');
    $("#EMP_FNAME").val('');
    $("#EMP_MNAME").val('');
    $("#EMP_LNAME").val('');
    $("#EMP_FHNAME").val('');
    document.getElementById('rb1').checked = true;
    document.getElementById('rb3').checked = true;
    $("#datepicker1").datepicker("setDate", '');
    $("#datepicker2").datepicker().val('');
    $("#EMP_JOBSTATUS").val('');
    $("#EMP_QUALIFICATION").val('');
    $("#EMP_DESIGNATION").val('');
    $("#EMP_DEPT").val('');
    $("#MANAGER_CODE").val('');
    $("#EMP_MOBNO").val('');
    $("#EMP_EMAIL").val('');
    $("#EMP_PROFILE").val('');
    $("#EMP_CONADDRESS").val('');
    $("#JOBCATEGORY").val('');

    //$("#EMP_CODE").val('');


    var url = "/Employee/DisplayEmployeelDetails/";
    //var params = {
    //  PRNO: $("#PRNO").val()
    //}
    $.ajax({
        url: url,
        //data: params,
        data: { UserCode: $("#USER_CODE").val() },
        cache: false,
        type: "GET",
        //dataType: 'json',
        success: function (data) {
            if (data == null) {
                alert("No Data found for this User Code");
            }
            else {

                //document.getElementById('Id').value = data.Id
                document.getElementById('EMP_CODE').value = data.EMP_CODE
                document.getElementById('EMP_FNAME').value = data.EMP_FNAME
                document.getElementById('EMP_MNAME').value = data.EMP_MNAME
                document.getElementById('EMP_LNAME').value = data.EMP_LNAME
                document.getElementById('EMP_FHNAME').value = data.EMP_FHNAME
                //document.getElementById('Gender').value = data.Gender


                switch (data.EMP_GENDER) {

                    case "M":
                        document.getElementById('rb1').checked = true;
                        break;
                    case "F":
                        document.getElementById('rb2').checked = true;
                        break;
                    default:
                        document.getElementById('rb1').checked = true;
                        break;
                }
                switch (data.MARITALSTATUS) {

                    case "S":
                        document.getElementById('rb3').checked = true;
                        break;
                    case "M":
                        document.getElementById('rb4').checked = true;
                        break;
                    default:
                        document.getElementById('rb3').checked = true;
                        break;
                }

                             
                $("#datepicker1").val(data.EMP_DOB);

                 $("#datepicker2").val(data.EMP_DOJ);

                document.getElementById('EMP_JOBSTATUS').value = data.EMP_JOBSTATUS
                document.getElementById('JOBCATEGORY').value = data.JOBCATEGORY
                document.getElementById('EMP_QUALIFICATION').value = data.EMP_QUALIFICATION
                document.getElementById('EMP_DESIGNATION').value = data.EMP_DESIGNATION
                document.getElementById('EMP_DEPT').value = data.EMP_DEPT
                document.getElementById('MANAGER_CODE').value = data.MANAGER_CODE
                document.getElementById('EMP_MOBNO').value = data.EMP_MOBNO
                document.getElementById('EMP_EMAIL').value = data.EMP_EMAIL
                document.getElementById('EMP_DEPT_SUBCATG').value = data.EMP_DEPT_SUBCATG

                document.getElementById('EMP_PROFILE').value = data.EMP_PROFILE
                document.getElementById('EMP_CONADDRESS').value = data.EMP_CONADDRESS
            }

        },
        error: function (response) {
            alert("Invalid User Code");

        }
    });

});