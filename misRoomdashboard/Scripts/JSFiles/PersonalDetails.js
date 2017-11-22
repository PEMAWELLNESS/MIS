$(document).ready(function () {
    $.validator.methods.date = function (value, element) {
        return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
    };
    var ff = document.getElementById('Referralrb1').checked;
    var others = document.getElementById('Referralrb9').checked;

    if (ff == true) {
        $("#ReferralDetails").show();
        $("#ReferralPRNO").show();
    }

    else {

        $("#ReferralDetails").hide();
        $("#ReferralPRNO").hide();
    }
    if (others == true) {
        $("#OtherDetails").show();
        $("#ReferralOthers").show();
    }

    else {

        $("#OtherDetails").hide();
        $("#ReferralOthers").hide();
    }
       

    //To load data depend on UHID

    var urlUHID = "/RegistrationForm/DisplayUHIDDetails/";
    //var params = {
    //  PRNO: $("#PRNO").val()
    //}
    $.ajax({
        url: urlUHID,

        cache: false,
        type: "POST",
        //dataType: 'json',
        success: function (data) {


            if (data != null) {

                document.getElementById('FirstName').value = data.first_name
                document.getElementById('MiddleName').value = data.middle_name
                document.getElementById('LastName').value = data.last_name
                document.getElementById('FatherHusbandName').value = data.father_husband_name
                //document.getElementById('Gender').value = data.Gender


                switch (data.gender) {

                    case "Male":
                        document.getElementById('rb1').checked = true;
                        document.getElementById('rb2').disabled = true;
                        break;
                    case "Female":
                        document.getElementById('rb1').disabled = true;
                        document.getElementById('rb2').checked = true;
                        break;
                    default:
                        document.getElementById('rb1').checked = true;
                        document.getElementById('rb2').disabled = true;
                        break;
                }
                document.getElementById('MobileNo').value = data.mobile_no

                document.getElementById('EmailId').value = data.user_id

                //if (data.date_of_birth != null) {
                  
                   // document.getElementById('datepicker1').value = data.date_of_birth
                  
                   // var birthdayDate = new Date($("#datepicker1").val());
                   //var  dateNow = new Date();
                  
                   // var years = dateNow.getFullYear() - birthdayDate.getFullYear();
                   // var months=dateNow.getMonth()-birthdayDate.getMonth();
                   // var days=dateNow.getDate()-birthdayDate.getDate();
                   // if(months < 0 || (months == 0 && days < 0)) {
                   //     years = parseInt(years) -1;
                   //     document.getElementById('Age').value = years;
                   //   }
                   // else {
                       
                   //     document.getElementById('Age').value = years;
                   // }

                                    
                document.getElementById('DOB').value = data.date_of_birth

                var BirthDate = $("#DOB").val();

                //alert(BirthDate);
                var now = new Date();
                bD = BirthDate.split('/');

                if (bD.length == 3) {
                    born = new Date(bD[2], bD[1] * 1, bD[0]);

                    years = Math.floor((now.getTime() - born.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
                }
                if (isNaN(years) || years < 0) {

                }
                else {
                    document.getElementById('Age').value = years;
                }
              
            }
            else {

                //alert("For this No Data found");
            }


        },

        error: function (response) {
            alert("Error" + response);
        }
    });



    ////End of Data load depend on UHID

    $(function () {
        $("#DOB").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: "-100:+0",
           // disabled: true
        });
       
    });


    $('#Referralrb1').click(function () {
        if (this.checked == true) {
            $("#OtherDetails").hide();
            $("#ReferralOthers").hide();
            $("#ReferralDetails").show();
            $("#ReferralPRNO").show();

        }
        else {
            $("#ReferralDetails").hide();
            $("#ReferralPRNO").hide();
        }
    });
    $('#Referralrb2').click(function () {
        if (this.checked == true) {
            $("#ReferralDetails").hide();
            $("#ReferralPRNO").hide();
            $("#OtherDetails").hide();
            $("#ReferralOthers").hide();
        }

    });

    $('#Referralrb3').click(function () {
        if (this.checked == true) {
            $("#ReferralDetails").hide();
            $("#ReferralPRNO").hide();
            $("#OtherDetails").hide();
            $("#ReferralOthers").hide();
        }

    });
    $('#Referralrb4').click(function () {
        if (this.checked == true) {
            $("#ReferralDetails").hide();
            $("#ReferralPRNO").hide();
            $("#OtherDetails").hide();
            $("#ReferralOthers").hide();
        }

    });
    $('#Referralrb5').click(function () {
        if (this.checked == true) {
            $("#ReferralDetails").hide();
            $("#ReferralPRNO").hide();
            $("#OtherDetails").hide();
            $("#ReferralOthers").hide();
        }

    });
    $('#Referralrb6').click(function () {
        if (this.checked == true) {
            $("#ReferralDetails").hide();
            $("#ReferralPRNO").hide();
            $("#OtherDetails").hide();
            $("#ReferralOthers").hide();
        }

    });
    $('#Referralrb7').click(function () {
        if (this.checked == true) {
            $("#ReferralDetails").hide();
            $("#ReferralPRNO").hide();
            $("#OtherDetails").hide();
            $("#ReferralOthers").hide();
        }
    });
    $('#Referralrb8').click(function () {
        if (this.checked == true) {
            $("#ReferralDetails").hide();
            $("#ReferralPRNO").hide();
            $("#OtherDetails").hide();
            $("#ReferralOthers").hide();
        }
    });
    $('#Referralrb9').click(function () {

        if (this.checked == true) {
            $("#ReferralDetails").hide();
            $("#ReferralPRNO").hide();
            $("#OtherDetails").show();
            $("#ReferralOthers").show();
        }

    });





    $("#DOB").change(function () {
       


        //var birthdayDate = new Date($("#datepicker1").val());
        //var dateNow = new Date();

        //var years = dateNow.getFullYear() - birthdayDate.getFullYear();
        //var months = dateNow.getMonth() - birthdayDate.getMonth();
        //var days = dateNow.getDate() - birthdayDate.getDate();
        //if (months < 0 || (months == 0 && days < 0)) {
        //    years = parseInt(years) - 1;
        //    document.getElementById('Age').value = years;
        //}
        //else {

        //    document.getElementById('Age').value = years;
        //}
      

        var BirthDate = $("#DOB").val();

        //alert(BirthDate);
        var now = new Date();
        bD = BirthDate.split('/');

        if (bD.length == 3) {
            born = new Date(bD[2], bD[1] * 1, bD[0]);

            years = Math.floor((now.getTime() - born.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        }
        if (isNaN(years) || years < 0) {

        }
        else {
            document.getElementById('Age').value = years;
        }

    });

     
  

    $("#EPRNO").change(function () {

        //$(this).each(function () {
        //    $(this).find(".field-validation-error").empty();
        //    $(this).trigger('reset.unobtrusiveValidation');
        //});
        var url = "/RegistrationForm/DisplayPersonalDetails/";
        //var params = {
        //  PRNO: $("#PRNO").val()
        //}
        $.ajax({
            url: url,
            //data: params,
            data: { PRNO: $("#EPRNO").val() },
            cache: false,
            type: "POST",
            //dataType: 'json',
            success: function (data) {
               

                if (data != null) {
                   // //document.getElementById('Id').value = data.Id
                   //// document.getElementById('UHID').value = data.UHID
                   // document.getElementById('FirstName').value = data.FirstName
                   // document.getElementById('MiddleName').value = data.MiddleName
                   // document.getElementById('LastName').value = data.LastName
                   // document.getElementById('FatherHusbandName').value = data.FatherHusbandName
                   // //document.getElementById('Gender').value = data.Gender


                   // switch (data.Gender) {

                   //     case "M":
                   //         document.getElementById('rb1').checked = true;
                   //         document.getElementById('rb2').disabled = true;
                   //         break;
                   //     case "F":
                   //         document.getElementById('rb1').disabled = true;
                   //         document.getElementById('rb2').checked = true;
                   //         break;
                   //     default:
                   //         document.getElementById('rb1').checked = true;
                   //         document.getElementById('rb2').disabled = true;
                   //         break;
                   // }
                    switch (data.MaritalStatus) {

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
                    document.getElementById('AliasName').value = data.AliasName
                    document.getElementById('FlatNo').value = data.FlatNo
                    document.getElementById('Building').value = data.Building
                    document.getElementById('Street').value = data.Street
                    document.getElementById('City').value = data.City
                    document.getElementById('PinCode').value = data.PinCode
                    document.getElementById('Country').value = data.Country
                    document.getElementById('Nationality').value = data.Nationality
                   
                   

                    //document.getElementById('datepicker1').value = data.DOB
                 
                   // document.getElementById('Age').value = data.Age
                    document.getElementById('Height').value = data.Height
                    document.getElementById('Weight').value = data.Weight
                    document.getElementById('BP').value = data.BP
                    document.getElementById('PulseRate').value = data.PulseRate
                   // document.getElementById('MobileNo').value = data.MobileNo
                    document.getElementById('EmergencyContactNo').value = data.EmergencyContactNo
                   // document.getElementById('EmailId').value = data.EmailId
                    document.getElementById('Occupation').value = data.Occupation

                    //var results2 = pattern.exec(data.AdmissionDate);
                    //var dt2 = new Date(parseFloat(results2[1]));
                    // var cc2 = dt2.getDate() + "/" + (dt2.getMonth() + 1) + "/" + dt2.getFullYear();
                   // var cc2 = (dt2.getMonth() + 1) + "/" + dt2.getDate() + "/" + dt2.getFullYear();
                   // $("#datepicker2").datepicker("setDate", cc2);

                   // //var pp = data.PackageType
                   // document.getElementById('PackageType').value = data.PackageType
                   // document.getElementById('PackageName').value = data.PackageName
                   // document.getElementById('NoOfDays').value = data.NoOfDays
                   // var results3 = pattern.exec(data.AccomodationDateFrom);
                   // var dt3 = new Date(parseFloat(results3[1]));
                   //  var cc3 = dt3.getDate() + "/" + (dt3.getMonth() + 1) + "/" + dt3.getFullYear();
                   // //var cc3 = (dt3.getMonth() + 1) + "/" + dt3.getDate() + "/" + dt3.getFullYear();
                   // $("#datepicker3").datepicker("setDate", cc3);

                   // var results4 = pattern.exec(data.AccomodationDateTo);
                   // var dt4 = new Date(parseFloat(results4[1]));
                   // var cc4 = dt4.getDate() + "/" + (dt4.getMonth() + 1) + "/" + dt4.getFullYear();
                   //// var cc4 = (dt4.getMonth() + 1) + "/" + dt4.getDate() + "/" + dt4.getFullYear();
                   // $("#datepicker4").datepicker("setDate", cc4);

                   // var results5 = pattern.exec(data.AlternateDateFrom);
                   // var dt5 = new Date(parseFloat(results5[1]));
                   // var cc5 = dt5.getDate() + "/" + (dt5.getMonth() + 1) + "/" + dt5.getFullYear();
                   //// var cc5 = (dt5.getMonth() + 1) + "/" + dt5.getDate() + "/" + dt5.getFullYear();
                   // $("#datepicker5").datepicker("setDate", cc5);

                   // var results6 = pattern.exec(data.AlternateDateTo);
                   // var dt6 = new Date(parseFloat(results6[1]));
                   //var cc6 = dt6.getDate() + "/" + (dt6.getMonth() + 1) + "/" + dt6.getFullYear();
                   //// var cc6 = (dt6.getMonth() + 1) + "/" + dt6.getDate() + "/" + dt6.getFullYear();
                   // $("#datepicker6").datepicker("setDate", cc6);

                    switch (data.ReferralFrom) {

                        case "Client Referral":
                            document.getElementById('Referralrb1').checked = true;
                            $("#ReferralDetails").show();
                            $("#ReferralPRNO").show();
                            break;
                        case "Email":
                            document.getElementById('Referralrb2').checked = true;
                            break;

                        case "Postcard":
                            document.getElementById('Referralrb3').checked = true;
                            break;
                        case "Website":
                            document.getElementById('Referralrb4').checked = true;
                            break;
                        case "SPA Finder":
                            document.getElementById('Referralrb5').checked = true;
                            break;
                        case "Review Site":
                            document.getElementById('Referralrb6').checked = true;
                            break;
                        case "Walked by":
                            document.getElementById('Referralrb7').checked = true;
                            break;
                        case "Advertisement":
                            document.getElementById('Referralrb8').checked = true;
                            break;
                        case "Other":
                            document.getElementById('Referralrb9').checked = true;
                            $("#OtherDetails").show();
                            $("#ReferralOthers").show();
                            break;

                        default:
                            document.getElementById('Referralrb5').checked = true;
                            break;
                    }
                    document.getElementById('ReferralPRNO').value = data.ReferralPRNO
                    document.getElementById('ReferralOthers').value = data.ReferralOthers
                } 
                 else {

                 alert( "For this No Data found");
                }

               
            },
       
            error: function (response) {
                document.getElementById('EPRNO').value = '';
            alert("Invalid  Earlier PRNO  : ");
        }
        });

    });




    //    $("#FirstSubmitbutton").click(function () {
    //        //var url = "/RegistrationForm/SavePersonalDetails/";
    //        var url = "/RegistrationForm/PersonalDetails/";
    //        var params = {
    //        UHID :$("#UHID").val(),
    //        PRNO : $("#PRNO").val(),
    //        FirstName : $("#FirstName").val(),
    //        MiddleName : $("#MiddleName").val(),
    //        LastName: $("#LastName").val(),
    //        FatherHusbandName : $("#FatherHusbandName").val(),
    //        Gender : $("#Gender").val(),
    //        MaritalStatus : $("#MaritalStatus").val(),
    //        FlatNo : $("#FlatNo").val(),
    //        Building : $("#Building").val(),
    //        Street : $("#Street").val(),
    //        City : $("#City").val(),
    //        PinCode : $("#PinCode").val(),
    //        Nationality : $("#Nationality").val(),
    //        Country : $("#Country").val(),
    //        DOB : $("#DOB").val(),
    //        Age : $("#Age").val(),
    //        Height : $("#Height").val(),
    //        Weight : $("#Weight").val(),
    //        MobCountryCode : $("#MobCountryCode").val(),
    //        MobileNo : $("#MobileNo").val(),
    //        EmailId : $("#EmailId").val(),
    //        Occupation : $("#Occupation").val(),
    //        AdmissionDate: $("#AdmissionDate").val(),
    //      // AdmissionDate: new Date(AdmissionDate1).toJSON(),
    //        PackageType : $("#PackageType").val(),
    //        PackageName : $("#PackageName").val(),
    //        NoOfDays : $("#NoOfDays").val(),
    //        AccomodationDateFrom : $("#AccomodationDateFrom").val(),
    //        AccomodationDateTo : $("#AccomodationDateTo").val(),
    //        AlternateDateFrom :$("#AlternateDateFrom").val(),
    //        AlternateDateTo: $("#AlternateDateTo").val()
    //    }
    //        $.ajax({
    //            url: url,
    //            data: params,

    //            cache: false,
    //            type: "POST",
    //            //dataType: 'json',
    //            success: function (data) {

    //                $.ajax({
    //                    url: "/RegistrationForm/HealthDetails/",
    //                            data: params,
    //                            cache: false,
    //                            type: "GET",
    //                            success: function (data) {
    //                }
    //                });
    //                 }

    //            });
    //});

    /////HealthDetails Adding
    //    var url = "/RegistrationForm/GetHealthDetails/";
    //    var params = {
    //        PRNO: $("#PRNO").val(),
    //     Gender: $("#Gender").val()
    //    }
    //    $.ajax({
    //        url: url,
    //        data: params,
    //        cache: false,
    //        type: "POST",
    //        success: function (data) {

    //            // Habbits Data Save
    //            $.each(data, function (i, Health) {
    //                var PRNO = $("#PRNO").val();
    //                var HLCode = Health.HLCode;
    //                var HLFlag = "N";
    //                var HLDesc= "";


    //                $.post('/RegistrationForm/createHealthDetails', { "PRNO": PRNO, "HLCode": HLCode, "HLFlag": HLFlag, "HLDesc": HLDesc }, function () {

    //                });

    //            });
    //            // Display Employee Data 
    //        }

    //    });
    //});
});

$("#BP").change(function () {
    var res = $("#BP").val();

    if (res == "" || res == null) {

        alert("Eenter BP ");
        return false;

    }
    var pattern = /^\d{1,3}\/\d{1,3}$/;
    if (res.match(pattern)) {
       
        var TBP = res.split('/');
        var HBP = parseInt(TBP[0]);
        var LBP = parseInt(TBP[1]);
      

        if (HBP > LBP) {
        }
        else {
            alert("Systolic must be greater than Diastolic");
            $("#BP").val('');
            $("#BP").focus();
            return false;
        }
       
       
    }
    else {
        alert("BP in Invalid Format");
        $("#BP").val('');
        $("#BP").focus();
        return false;
    }

});
$("#MobileNo").keyup(function () {
    var res = $("#MobileNo").val();
    if (res == "" || res == null) {
        alert("Mobile No should not be blank ");

        return false;
    }
    if (isNaN(res)) {

        alert("Mobile No should be numbers only");
        $("#MobileNo").val('');
        $("#MobileNo").focus();
        return false;
    }

});
$("#MobileNo").change(function () {
    var res = $("#MobileNo").val();


    var MobileNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (res.match(MobileNo)) {
        return true;
    }
    else {
        alert("Mobile number must be PhoneNo Format1");
        return false;
    }
});


$("#EmergencyContactNo").keyup(function () {
    var res = $("#EmergencyContactNo").val();

    if (isNaN(res)) {

        alert("EmergencyContact No should be numbers only");
        $("#EmergencyContactNo").val('');
        $("#EmergencyContactNo").focus();
        return false;
    }

});
$("#EmergencyContactNo").change(function () {
    var res = $("#EmergencyContactNo").val();


    var MobileNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (res.match(MobileNo)) {
        return true;
    }
    else {
        alert("Emergency contact number must be PhoneNo Format");
        return false;
    }
});
$("#PinCode").keyup(function () {
    var res = $("#PinCode").val();

    if (isNaN(res)) {

        alert("PinCode should be numbers only");
        $("#PinCode").val('');
        $("#PinCode").focus();
        return false;
    }

});