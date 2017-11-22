$(document).ready(function () {

    if (UserType != "GuestDash") {
        var url = "/RequestORComplaintForm/RequestTypes/";


        $.ajax({
            url: url,
            cache: false,
            async: false,
            type: "GET",
            success: function (data) {
                if (data == 0) {
                    alert(" Request Types not availablein master");

                }
                else {
                    $("#Type").empty();
                    $("#Type").append('<option value="-1">Select Type</option>');
                    $.each(data, function (i, x) {
                        $("#Type").append('<option value="' + x.RequestType + '">' + x.RequestType + '</option>');
                    });
                }
            },
            error: function (response) {
                alert("error : " + response);
            }
        });
    }

    $("#Type").change(function () {

        var url = "/RequestORComplaintForm/RequestCategory/";

        var Type = $("#Type").val();
        if (Type != "-1") {


            $.ajax({
                url: url,
                data: { RType: Type },
                cache: false,
                async: false,
                type: "GET",
                success: function (data) {
                    if (data == 0) {
                        alert("Request Categories are  Not Available in master");

                    }
                    else {
                        $("#Category").empty();
                        $("#Category").append('<option value="-1">Select Category</option>');
                        $.each(data, function (i, x) {
                            $("#Category").append('<option value="' + x.RequestCategory + '">' + x.RequestCategory + '</option>');

                        });
                    }
                },
                error: function (response) {
                    alert("error : " + response);
                }
            });
        }


    });



        $("#GName").autocomplete({
            
            source: function (request, response) {
              
                    $.ajax({
                        url: '/RequestORComplaintForm/GetNames',
                        type: "POST",
                        dataType: "json",
                        data: {
                            Name: request.term,
                            Reqby: $("#ReqType").val()
                        },
                        success: function (data) {
                            if (data != "") {
                                response($.map(data, function (item) {
                                    return {
                                        label: item.Name,
                                        value: item.Name
                                    }
                                }))
                            }
                            else {
                                alert("No Records Exist");
                            }
                        }

                    });
               

            },
            select: function (event, ui) {
               
                    $.ajax({
                        url: '/RequestORComplaintForm/GetPRNOByName',
                        type: "POST",
                        dataType: "json",
                        data: {
                            Name: ui.item.label,
                            Reqby: $("#ReqType").val()
                        },
                        success: function (data) {
                            $("#PRNO").val(data.PRNO);
                            //$("#phone").val(data.phonenumber);
                            getDetails('', data.PRNO)
                        }
                    });
               
            }


        });
 



    $("#Cancel").click(function () {
        var res = window.confirm("Are you sure you want to close");
        if (res == true)
            window.location.href = Exiturl;
    });

    $("#Submit").click(function () {
        isValid = ValidateInputs();

        if (isValid == true) {


            //var params = {
            //    Category: $("#Category").val(),
            //    Type: $("#Type").val(),
            //    Name: $("#Name").val(),
            //    Module: $("#Module").val(),
            //    Description: $("#Description").val()
            //}
            $.ajax({

                url: "/RequestORComplaintForm/SaveRecords",
                data: { PRNO: $("#PRNO").val(),Name:$("#GName").val(), Category: $("#Category").val(), Type: $("#Type").val(), Description: $("#Description").val(), ReqBy: $("#ReqType").val() },
                type: 'POST',
                dataType: "json",
                cache: false,
                traditional: true,
                success: function (data) {

                    if (data.toString() != "") {
                        window.alert(data.toString());
                        window.location.href = Navurl;

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
    });




    $("#PRNO").change(function () {
        var Requestby = $("#ReqType").val();
       

        //var url = "/RequestORComplaintForm/CheckPRNO/";
        var url = "/RequestORComplaintForm/CheckPRNO";
        //var params = {
        //  PRNO: $("#PRNO").val()
        //}
        $.ajax({
            url: url,
            //data: params,
            data: { PRNum: $("#PRNO").val(), Reqby: Requestby },
            cache: false,
            async: false,
            type: "GET",
            dataType: 'json',
            success: function (data) {


                if (data != null) {

                    $("#GName").val(((data.FirstName == null || data.FirstName == "null" || data.FirstName == "NULL") ? data.FirstName = "" : data.FirstName = data.FirstName) + " " + ((data.MiddleName == null || data.MiddleName == "null" || data.MiddleName == "NULL") ? data.MiddleName = "" : data.MiddleName = data.MiddleName) + " " + ((data.LastName == null || data.LastName == "null" || data.LastName == "NULL") ? data.LastName = "" : data.LastName = data.LastName));


                }
                else {
                   
                    if (Requestby == "Guest") {
                        window.alert("Invalid PRNO..");
                    }
                    else {
                        window.alert("Invalid Employee No..");
                    }
                        $("#PRNO").val('');
                        $("#GName").val('');
                        $("#PRNO").focus();
                    
                }


            },

            error: function (response) {
               
                if (Requestby == "Guest") {
                    window.alert("Invalid PRNO..");
                }
                else {
                    window.alert("Invalid Employee No..");
                }
                $("#PRNO").val('');
                $("#GName").val('');
                $("#PRNO").focus();
            }
        });

    });


});






