//Thirumala


//Remember me code
$(function () {

    if (localStorage.chkbx && localStorage.chkbx != '') {

        $('#checkbox1').attr('checked', 'checked');
        $('#SigninId').val(localStorage.usrname);
        $('#SigninPwd').val(localStorage.pass);
    } else {
        $('#checkbox1').removeAttr('checked');
        $('#SigninId').val('');
        $('#SigninPwd').val('');
    }

    $('#checkbox1').click(function () {

        if ($('#checkbox1').is(':checked')) {

            // save username and password
            localStorage.usrname = $('#SigninId').val();
            localStorage.pass = $('#SigninPwd').val();
            localStorage.chkbx = $('#checkbox1').val();
        } else {
            localStorage.usrname = '';
            localStorage.pass = '';
            localStorage.chkbx = '';
        }
    });
});



////Login Form//////
function LoginD() {
    $("#LoadingImage23").show();
    var SigninId = $("#SigninId").val();
    var SigninPwd = $("#SigninPwd").val();


    if (!$("#SigninId").val() || $("#SigninId").hasClass("error")) {

        $("#SigninId").addClass("error");
        $("#SigninId").focus();
        $("#LoadingImage23").fadeOut(500);
        return false;
    }
    else if (!$("#SigninPwd").val()) {

        $("#SigninPwd").addClass("error");
        $("#SigninPwd").focus();
        $("#LoadingImage23").fadeOut(500);
        return false;
    }
    var Details =
        {
            Userid: SigninId,
            Pwd: SigninPwd
        }

    $("#Login").prop("disabled", true);
    //  $("#LoadingImage23").show();

    $.ajax({
        url: "/Index/CheckLoginDeatils",
        type: "POST",
        data: JSON.stringify(Details),
        contentType: "application/json",
        dataType: 'json',
        async: false,
        success: function (data) {
            if (data.Value == "Success") {


                if (data.Redirect == 'Dash') {
                    window.location.href = '../GuestDashboard/Dashboard'
                }
                else if (data.Redirect == 'GuestApplication') {
                    window.location.href = '../GuestApplicationStatus/Index'
                }
                else {
                    window.location.href = '../RegistrationForm/DatesConformation'
                }


                $("#SigninId").val('');
                $("#SigninPwd").val('');

            }

            else {
                $("#SigninPwd").addClass("error");
                $("#SigninPwd").focus();
                alert(data.message);


                //$("#LoadingImage23").fadeOut(500);
                //$("#Login").removeAttr('disabled');

            }
            //$("#LoadingImage23").fadeOut(500);
            $("#Login").removeAttr('disabled');
        },
    });
    //window.location = 'http://192.168.168.156:7878/LoginPage/LoginPost?LOGIN_NAME=+SigninId+&PASSWORD=+SigninPwd+'
    //window.location = http://192.168.168.156:7878/LoginPage/LoginPost?LOGIN_NAME='admin'&PASSWORD='Admin'
    $("#LoadingImage23").fadeOut(500);

}



function checkPass() {

    //Store the password field objects into variables ...
    var pass1 = document.getElementById("PWD");
    var pass2 = document.getElementById("CPWD");
    //Store the Confimation Message Object ...
    var message = document.getElementById('confirmMessage');
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    //Compare the values in the password field
    //and the confirmation field
    if (pass1.value == pass2.value) {
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match!"
        $("#confirmMessage").fadeOut(5000);
        isvalidCpassword = true;
    }
    else {

        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"

        isvalidCpassword = false;

    }
}





$('#mobile_no').keyup(function (e) {
    if (/\D/g.test(this.value)) {
        // Filter non-digits from input value.
        this.value = this.value.replace(/\D/g, '');
    }
});






$(document).ready(function () {
    var isvalidmailB = false;
    var isvalidmail = false;
    var isvalidPwd = false;
    var isvalidCpassword = false;
    var isvalidResetmail = false;

    $("#DOB").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+0",


    });

    $('#count-test').jQuerySimpleCounter({
        start: 0,
        end: 251,
        duration: 2000
    });
    $('#count-test2').jQuerySimpleCounter({
        start: 0,
        end: 457,
        duration: 2000
    });
    $('#count-test3').jQuerySimpleCounter({
        start: 0,
        end: 32,
        duration: 2000
    });


    $('.carousel[data-type="multi"] .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i = 0; i < 1; i++) {
            next = next.next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
        }
    });


    ///Ending to Book Now






    ////----------------------------------
    //Stating To Signup Validations
    ///----------------------------------




    $('#signupclose').click(function () {


        $("#email").val('');
        $("#email").removeClass("error");
        $("#PWD").val('');
        $("#PWD").removeClass("error");
        $("#CPWD").val('');
        $("#CPWD").removeClass("error");
        $("#firstName").val('');
        $("#firstName").removeClass("error");
        $("#middlename").val('');

        $("#lastName").val('');
        $("#lastName").removeClass("error");

        $("#fathername").val('');
        $("#fathername").removeClass("error");

        $('#DOB').val('').datepicker("refresh");
        $("#mobile_no").val('');
        $("#mobile_no").removeClass("error");

        $('#inlineRadio1').prop("checked", true);

    });


    $("#Signupbtn").click(function () {

        var Gender = "";

        if ($('#inlineRadio1').is(':checked') == true) {
            Gender = "Male";
        }
        else {
            Gender = "Female";
        }


        if (!$("#email").val() || $("#email").hasClass("error")) {

            $("#email").addClass("error");
            return false;
        }
        else if (!$("#PWD").val() || $("#PWD").hasClass("error")) {

            $("#PWD").addClass("error");
            return false;
        }
        else if (!$("#CPWD").val() || $("#CPWD").hasClass("error")) {

            $("#CPWD").addClass("error");
            return false;
        }
        else if (!$("#firstName").val() || $("#firstName").hasClass("error")) {

            $("#firstName").addClass("error");
            return false;

        }
        else if (!$("#lastName").val() || $("#lastName").hasClass("error")) {

            $("#lastName").addClass("error");
            return false;


        }

        else if (!$("#fathername").val() || $("#fathername").hasClass("error")) {

            $("#fathername").addClass("error");
            return false;


        }
        else if (!$("#DOB").val() || $("#DOB").hasClass("error")) {

            $("#DOB").addClass("error");
            return false;


        }

        else if (!$("#mobile_no").val() || $("#mobile_no").hasClass("error")) {

            $("#mobile_no").addClass("error");
            return false;


        }


        $("#Signupbtn").prop("disabled", true);
        $("#LoadingImage1").show();
        $.ajax({
            url: "/Index/SignUp",
            type: "POST",
            data: {
                user_id: $("#email").val(),
                password: $("#PWD").val(),
                first_name: $("#firstName").val(),
                middle_name: $("#middlename").val(),

                last_name: $("#lastName").val(),
                gender: Gender,
                father_husband_name: $("#fathername").val(),

                date_of_birth: $("#DOB").val(),
                mobile_no: $("#mobile_no").val(),

            },
            dataType: 'json',
            async: false,
            success: function (data) {


                if (data.Value == "Success") {

                    $("#email").val('');
                    $("#PWD").val('');
                    $("#CPWD").val('');
                    $("#firstName").val('');
                    $("#middlename").val('');

                    $("#lastName").val('');

                    $("#fathername").val('');

                    //$("#DOB").val(''),
                    $('#DOB').val('').datepicker("refresh");
                    $("#mobile_no").val('');
                    $("#LoadingImage1").fadeOut(500);
                    $("#Signupbtn").removeAttr('disabled');
                    //alert(data.message);
                    window.location.href = '../RegistrationForm/DatesConformation'
                    //$("#signup").dialog("open");

                    //$("#signup").dialog('open');

                    $("#login").dialog('open');



                }

                else {
                    $("#LoadingImage1").fadeOut(500);
                    $("#Signupbtn").removeAttr('disabled');
                    alert(data.message);



                }
            },
        });
    });

    $("#mobile_no").change(function () {

        var res = document.getElementById('mobile_no').value;

        if (res.length != 10) {
            //alert("Enter Valid MobileNo");
            $("#mobile_no").addClass("error");

            $("#mobile_no").focus();
            //$("#mobile_no").val('');

        }
        else {
            $("#mobile_no").removeClass("error");

        }


    });



    $("#firstname").change(function () {

        if (!$("#firstname").val()) {
            $("#firstname").addClass("error");
        }
        else {
            $("#firstname").removeClass("error");
        }


    });

    $("#lastname").change(function () {

        if (!$("#lastname").val()) {
            $("#lastname").addClass("error");
        }
        else {
            $("#lastname").removeClass("error");
        }


    });

    $("#fathername").change(function () {

        if (!$("#fathername").val()) {
            $("#fathername").addClass("error");
        }
        else {
            $("#fathername").removeClass("error");
        }


    });

    $("#DOB").change(function () {

        if (!$("#DOB").val()) {
            $("#DOB").addClass("error");
        }
        else {
            $("#DOB").removeClass("error");
        }


    });
    $("#PWD").change(function () {
        var res1 = document.getElementById('PWD').value;

        if (res1.length >= 8 && res1.length <= 25) {
            isvalidPwd = true;


            $("#PWD").removeClass("error");
        }
        else {
            alert("Password length minimum 8 and max 25 characters");
            $("#PWD").addClass("error");

            $("#PWD").focus();
            isvalidPwd = false;
            //$("#PWD").val('');

        }

    });


    $("#email").change(function () {

        var inputvalue = $(this).val();
        var re = /^[_a-z0-9-A-Z-]+(\.[_a-z0-9-A-Z-]+)*@@[a-z0-9-A-Z-]+(\.[a-z0-9-A-Z-]+)*(\.[a-z]{2,4})$/;
        if (!re.test(inputvalue)) {
            //alert("!Please enter valid email address");
            $("#email").addClass("error");


            $("#email").focus();
            isvalidmail = false;

        }
        else {

            $.ajax({
                type: "POST",
                url: "../Index/CheckEmail",
                data: { username: $("#email").val() },
                dataType: "json",
                async: true,
                success: function (message) {

                    switch (message) {

                        case "Success":

                            $("#disply").fadeOut(5000);
                            $("#email").removeClass("error");
                            isvalidmail = true;
                            break;

                        case "fail":

                            alert("Someone already Registered with this EmailId. Try another?");

                            $("#email").addClass("error");

                            $("#email").focus();
                            $("#email").val('');
                            isvalidmail = false;
                            break;

                    }



                },
                failure: function (response) {
                    alert(response);
                }
            });
        }
    })
    ///Ending of Signup Form
    $("#contactemail").change(function () {

        var inputvalue = $(this).val();
        var re = /^[_a-z0-9-A-Z-]+(\.[_a-z0-9-A-Z-]+)*@@[a-z0-9-A-Z-]+(\.[a-z0-9-A-Z-]+)*(\.[a-z]{2,4})$/;
        if (!re.test(inputvalue)) {
            //alert("!Please enter valid email address");
            $("#contactemail").addClass("error");


            $("#contactemail").focus();
            isvalidmail = false;

        }
        else {

            isvalidmail = true;
        }
    })
    ///Starting of Login Form

    $("#SigninId").change(function () {

        var inputvalue = $(this).val();
        var re = /^[_a-z0-9-A-Z-]+(\.[_a-z0-9-A-Z-]+)*@@[a-z0-9-A-Z-]+(\.[a-z0-9-A-Z-]+)*(\.[a-z]{2,4})$/;
        if (!re.test(inputvalue)) {
            //alert("!Please enter valid email address");
            $("#SigninId").addClass("error");

            $("#SigninId").focus();


        }
        else {

            $.ajax({
                type: "POST",
                url: "../Index/CheckEmail",
                data: { username: $("#SigninId").val() },
                dataType: "json",
                async: true,
                success: function (message) {

                    switch (message) {

                        case "Success":

                            $("#SigninId").addClass("error");

                            $("#SigninId").focus();
                            break;

                        case "fail":

                            $("#SigninId").removeClass("error");

                            break;

                    }



                },
                failure: function (response) {
                    alert(response);
                }
            });
        }
    });



    $("#LoginClose").click(function () {
        $("#SigninId").val('');
        $("#SigninId").removeClass("error");

        $("#SigninPwd").val('');
        $("#SigninPwd").removeClass("error");
        $('#checkbox1').removeAttr('checked');
    });

    ////Ending of Login Form

    //////Starting of Forgot password Form


    $("#ResetpwdEmail").change(function () {

        var inputvalue = $(this).val();
        var re = /^[_a-z0-9-A-Z-]+(\.[_a-z0-9-A-Z-]+)*@@[a-z0-9-A-Z-]+(\.[a-z0-9-A-Z-]+)*(\.[a-z]{2,4})$/;
        if (!re.test(inputvalue)) {
            alert("!Please enter valid email address");
            $("#ResetpwdEmail").addClass("error");
            //$("#email").a("inputerror");


            $("#ResetpwdEmail").focus();
            //$("#ResetpwdEmail").val('');
            // isvalidResetmail = false;

        }
        else {
            $.ajax({
                type: "POST",
                url: "../Index/CheckEmail",
                data: { username: $("#ResetpwdEmail").val() },
                dataType: "json",
                async: true,
                success: function (message) {

                    switch (message) {

                        case "Success":

                            $("#ResetpwdEmail").addClass("error");

                            $("#ResetpwdEmail").focus();
                            alert("This Emailid not Registered");
                            break;

                        case "fail":

                            $("#ResetpwdEmail").removeClass("error");

                            break;

                    }



                },
                failure: function (response) {
                    alert(response);
                }
            });
        }
    });


    $("#ResetPasswordbtn").click(function () {




        if (!$("#ResetpwdEmail").val() || $("#ResetpwdEmail").hasClass("error")) {

            $("#ResetpwdEmail").addClass("error");
            $("#ResetpwdEmail").focus();
            return false;
        }

        $("#LoadingImage").show();

        $.ajax({
            url: "/Index/ResetPassword",
            type: "POST",
            data: { Userid: $("#ResetpwdEmail").val() },
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data.Value == "Success") {

                    $("#ResetpwdEmail").val('');
                    alert(data.message);
                    $("#LoadingImage").fadeOut(500);

                }

                else {

                    alert(data.message);
                    $("#LoadingImage").fadeOut(500);


                }
            },
        });
    });


    $("#Forgotpwd").click(function () {
        $("#ResetpwdEmail").val('');
        $("#ResetpwdEmail").removeClass("error");
    });




    /////Ending of Forgot password Form

    ////Starting to Feedback Form




    $("#FEmail").change(function () {

        var inputvalue = $(this).val();
        var re = /^[_a-z0-9-A-Z-]+(\.[_a-z0-9-A-Z-]+)*@@[a-z0-9-A-Z-]+(\.[a-z0-9-A-Z-]+)*(\.[a-z]{2,4})$/;
        if (!re.test(inputvalue)) {
            //alert("!Please enter valid email address");
            $("#FEmail").addClass("error");

            $("#FEmail").focus();


        }
        else {
            $("#FEmail").removeClass("error");
        }
    });


    $("#FMobileno").change(function () {

        var res = document.getElementById('FMobileno').value;

        if (res.length != 10) {
            //alert("Enter Valid MobileNo");
            $("#FMobileno").addClass("error");

            $("#FMobileno").focus();
            //$("#mobile_no").val('');

        }
        else {
            $("#FMobileno").removeClass("error");

        }


    });



    $('#FMobileno').keyup(function (e) {
        if (/\D/g.test(this.value)) {
            // Filter non-digits from input value.
            this.value = this.value.replace(/\D/g, '');
        }
    });



    $("#FName").change(function () {

        if (!$("#FName").val()) {
            $("#FName").addClass("error");
        }
        else {
            $("#FName").removeClass("error");
        }


    });

    $("#FMessage").change(function () {

        if (!$("#FMessage").val()) {
            $("#FMessage").addClass("error");
        }
        else {
            $("#FMessage").removeClass("error");
        }


    });



    $("#FBtn").click(function () {




        if (!$("#FName").val() || $("#FName").hasClass("error")) {

            $("#FName").addClass("error");
            return false;
        }
        else if (!$("#FEmail").val() || $("#FEmail").hasClass("error")) {

            $("#FEmail").addClass("error");
            return false;
        }

        else if (!$("#FMobileno").val() || $("#FMobileno").hasClass("error")) {

            $("#FMobileno").addClass("error");
            return false;


        }

        else if (!$("#FMessage").val() || $("#FMessage").hasClass("error")) {

            $("#FMessage").addClass("error");
            return false;


        }




        $("#FBtn").prop("disabled", true);
        $("#LoadingImage2").show();
        $.ajax({
            url: "/Index/Feedback",
            type: "POST",
            data: {
                Name: $("#FName").val(),
                Emailid: $("#FEmail").val(),
                Mobileno: $("#FMobileno").val(),
                Message: $("#FMessage").val()

            },
            dataType: 'json',
            async: false,
            success: function (data) {


                if (data.Value == "Success") {

                    $("#FName").val('');
                    $("#FEmail").val('');
                    $("#FMobileno").val('');
                    $("#FMessage").val('');

                    $("#LoadingImage2").fadeOut(500);
                    $("#FBtn").removeAttr('disabled');
                    alert(data.message);





                }

                else {
                    $("#LoadingImage2").fadeOut(500);
                    $("#FBtn").removeAttr('disabled');
                    alert(data.message);



                }
            },
        });
    });
    ////Ending to Feedback Form




    load_PackageType();



    $("#BEmailid").change(function () {

        var inputvalue = $(this).val();
        var re = /^[_a-z0-9-A-Z-]+(\.[_a-z0-9-A-Z-]+)*@@[a-z0-9-A-Z-]+(\.[a-z0-9-A-Z-]+)*(\.[a-z]{2,4})$/;
        if (!re.test(inputvalue)) {
            $("#BEmailid").addClass("error");
            $("#BEmailid").focus();
            //$("#email").val('');
            isvalidmailB = false;

        }
        else {

            $.ajax({
                // type: "POST",
                url: "../Onlineconsult/CheckEmail",
                data: { username: $("#BEmailid").val() },
                dataType: "json",
                async: true,
                success: function (data) {

                    switch (data.Value) {

                        case "Success":
                            document.getElementById('BName').value = data.res.first_name + ' ' + data.res.last_name;

                            document.getElementById('BMobileNo').value = data.res.mobile_no;




                            $("#BEmailid").removeClass("error");
                            isvalidmailB = true;
                            break;

                        case "fail":


                            $("#BName").val('');
                            $("#BMobileNo").val('');
                            $("#BEmailid").val('');
                            $("#BEmailid").removeClass("error");
                            $("#BName").removeClass("input-validation-error");
                            $("#BMobileNo").removeClass("input-validation-error");
                            $("#PackageTypeDrop").removeClass("input-validation-error");
                            isvalidmailB = false;
                            alert("Please Register with PEMA to avail Book Now Services.");
                            $('#booknow').modal('hide').on('hidden.bs.modal', function (e) {
                                $('#signup').modal('show');
                                $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
                            });

                    }



                },
                failure: function (response) {
                    alert(response);
                }
            });
        }
    });


    $("#BookingClose").click(function () {

        $("#BEmailid").val('');
        $("#BEmailid").removeClass("input-validation-error");

        $("#BName").val('');
        $("#BName").removeClass("input-validation-error");
        $("#BMobileNo").val('');
        $("#BMobileNo").removeClass("input-validation-error");

        $("#PackageTypeDrop option[value='']").attr("Selected", "Selected");
        $("#PackageTypeDrop").removeClass("input-validation-error");

    });
    $("#loginForm").submit(function () {


        if (isvalidmailB == true) {

            $('#LoadingImageBook').show();
            return true;
        }
        else {


            // alert("First Enter the valid Emailid")
            return false;
        }
    });



    //Ending to  Booknow Popup


    function ValidateInputs() {
        var isValid = true;
        $('.requiredselect').each(function () {
            if ($(this).is("input,textarea") && $.trim($(this).val()) == '' && $(this).attr("style") != "display:none" && $(this).attr("style") != "display: none;") {
                isValid = false;
                $(this).addClass("requiredselectExt");
            }
            else if ($(this).is("select") && ($.trim($(this).val()) == '-1' || $.trim($(this).val()) == '' || $.trim($(this).val()) == '0' || $.trim($(this).val()) == '-2') && $(this).attr("style") !== "display:none" && $(this).attr("style") != "display: none;") {
                isValid = false;
                $(this).addClass("requiredselectExt");
            }

            else if ($(this).is("input[type='button']")) {
                isValid = false;
                $(this).addClass("requiredselectExt");
            }

            else {
                $(this).removeClass("requiredselectExt");
            }
        });
        return isValid;
    }

    function RemoveValidationchange(id) {


        if ($("#" + id).is("select") && $("#" + id).hasClass('requiredselectExt') && ($.trim($("#" + id).val()) != '-1' || $.trim($("#" + id).val()) != '0' || $.trim($("#" + id).val()) != '-2')) {
            $("#" + id).removeClass("requiredselectExt");
        }
        else if ($("#" + id).is("input") && $("#" + id).hasClass('requiredselectExt') && ($.trim($("#" + id).val()) != '')) {
            $("#" + id).removeClass("requiredselectExt");
        }
        else if ($("#" + id).is("textarea") && $("#" + id).hasClass('requiredselectExt') && ($.trim($("#" + id).val()) != '')) {
            $("#" + id).removeClass("requiredselectExt");
        }

    }


    $("input.hasDatepicker").each(function (i, x) {
        $(this).datepicker('option', {
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            // yearRange: "-100:+0"
        }).datepicker('setDate', jsondate($(this).val()));


    });



});

function getExtensions(id) {
    var ext = $("#" + id).val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg', 'pdf']) == -1) {
        $("#" + id).val("");
        alert("Please Upload Gif or png or jpeg or pdf files only");

        return false;
    }

}
function getExtensionswordfile(id) {
    var ext = $("#" + id).val().split('.').pop().toLowerCase();
    if ($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg', 'pdf', 'docx', 'doc']) == -1) {
        $("#" + id).val("");
        alert("Please Upload Gif or png or jpeg or pdf or word files only");

        return false;
    }
    else {


    }

}

function load_PackageType() {
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

                $("#PackageTypeDrop").append('<option value="">Select Package Type</option>');
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


$('.Digitonly').keyup(function (e) {
    if (/\D/g.test(this.value)) {
        // Filter non-digits from input value.
        this.value = this.value.replace(/\D/g, '');
    }
});
function jsondate(jsondate) {
    if (jsondate != "") {
        var date1 = new Date(Date.UTC(parseInt(jsondate.split('/')[2]), parseInt(jsondate.split('/')[1] - 1), parseInt(jsondate.split('/')[0]), 3, 0, 0));
        return date1;
    }
    else {
        var date2 = "";
        return date2;
    }
}



