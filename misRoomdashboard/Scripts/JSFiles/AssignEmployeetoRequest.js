$(document).ready(function () {

    var ischeckedEmp = $('#AssignEmp').is(':checked');
    var ischeckedDept = $('#AssignDept').is(':checked');
    if (ischeckedEmp == true) {

        $("#ReqAssignDept").hide();
        $("#AssigDept").hide();
        $("#ReqAssignEmp").show();
        $("#AssigEmp").show();
        $("#ET").show();
        $("#ExpTime").show();
    }
    else {
        $("#ReqAssignEmp").hide();
        $("#ReqAssignDept").show();
        $("#AssigDept").show();
        $("#AssigEmp").hide();
        $("#ET").hide();
        $("#ExpTime").hide();

    }
    $(".Radi").change(function () {
        var ischeckedEmp = $('#AssignEmp').is(':checked');

        if (ischeckedEmp == true) {
            $("#ReqAssignDept").hide();
            $("#AssigDept").hide();
            $("#ReqAssignEmp").show();
            $("#AssigEmp").show();
            $("#ET").show();
            $("#ExpTime").show();
        }
        else {
            $("#ReqAssignEmp").hide();
            $("#AssigEmp").hide();
            $("#ReqAssignDept").show();
            $("#AssigDept").show();
            $("#ET").hide();
            $("#ExpTime").hide();
        }

    });
    $("#ReqAssignDept").change(function () {
        var ischeckedDept = $('#AssignDept').is(':checked');

        if (ischeckedDept == true) {
            $("#ReqAssignDept").show();
            $("#AssigDept").show();
            $("#ReqAssignEmp").hide();
            $("#AssigEmp").hide();
            $("#ET").hide();
            $("#ExpTime").hide();
        }
        else {
            $("#ReqAssignEmp").hide();
            $("#AssigEmp").hide();
            $("#ReqAssignDept").show();
            $("#AssigDept").show();
            $("#ET").show();
            $("#ExpTime").show();
        }

    });



    function load_Depts() {
        var url = "/ScheduleGuestRequests/Departyments/";


        $.ajax({
            url: url,
            cache: false,
            async: false,
            type: "GET",
            success: function (data) {
                if (data == 0) {
                    alert(" Departments Not Available in master");

                }
                else {
                    $("#ReqAssignDept").empty();
                    $("#ReqAssignDept").append('<option value="-1">Select Department</option>');
                    $.each(data, function (i, x) {
                        $("#ReqAssignDept").append('<option value="' + x.Code + '">' + x.Name + '</option>');
                    });
                }
            },
            error: function (response) {
                alert("error : " + response);
            }
        });
    }
    function load_Users() {
        var url = "/ScheduleGuestRequests/Users/";


        $.ajax({
            url: url,
            cache: false,
            async: false,
            type: "GET",
            success: function (data) {
                if (data == 0) {
                    alert(" Users Not Available in master");

                }
                else {
                    $("#ReqAssignEmp").empty();
                    $("#ReqAssignEmp").append('<option value="-1">Select Employee</option>');
                    $.each(data, function (i, x) {
                        $("#ReqAssignEmp").append('<option value="' + x.UserCode + '">' + x.UserName + '</option>');
                    });
                }
            },
            error: function (response) {
                alert("error : " + response);
            }
        });
    }


    var Details = "/ScheduleGuestRequests/AssignEmployeeData/";

    $.ajax({
        url: Details,
        cache: false,
        async: false,
        type: "GET",


        success: function (data) {


            if (data != null) {


                $("#ReqNo").val(data.RequestNo);

                $("#ReqCateg").val(data.RequestCategory);

                $("#ReqName").val(data.RequestName);

                $("#ReqDesc").val(data.Description);
                $("#Rks").val(data.Remarks);
                $("#ExpTime").val(data.ExpecTime);





                load_Depts();
                $("#ReqAssignDept option[value='" + data.AssignedDept + "']").attr("Selected", "Selected");
                load_Users();
                $("#ReqAssignEmp option[value='" + data.AssignedEmployee + "']").attr("Selected", "Selected");


            }
            else {

                alert("For this No Data found");
            }


        },

        error: function (response) {
            alert("Error" + response);
        }
    });


    $("#Save").click(function () {

        var ischeckedEmp = $('#AssignEmp').is(':checked');
        var ischeckedDept = $('#AssignDept').is(':checked');
        if (ischeckedEmp == true) {
            var AssignType = "Emp";
        }
        else {
            var AssignType = "Dept";
        }

        if (ischeckedDept == true && $("#ReqAssignDept").val() == "-1") {
            alert("Select Department");
        }
            //3
        else {

            if (ischeckedEmp == true && $("#ReqAssignEmp").val() == "-1") {
                alert("Select Employee");
            }
                //2
            else {
                if (ischeckedEmp == true && $("#ExpTime").val() == "") {
                    alert("Enter Expected Time");
                }
                    //1
                else {
                   
                    var params = {
                        ReqNo: $("#ReqNo").val(),
                        Assign: AssignType,
                        AssignedEmployee: $("#ReqAssignEmp").val(),
                        AssignedDept: $("#ReqAssignDept").val(),
                        Remarks: $("#Rks").val(),
                        ExpectedTime: $("#ExpTime").val()==""?0:$("#ExpTime").val()
                    }

                    $.ajax({
                        type: "post",
                        url: "/ScheduleGuestRequests/update",
                        data: params,
                        datatype: "json",
                        traditional: true,
                        success: function (message) {
                            if (message != "") {
                                alert("Assigned Successfully")
                                $("#MYdialog").dialog("close");
                                $('#ScheduleGuestRequestsListJtable').jtable('load');


                            }
                        }
                    });

                }
                //1


            }
            //2
        }
        //3
   
    });
});
function validateNumber(id) {

    var ss = $("#" + id).val();
    if (isNaN(ss)) {
        alert("Allow numbers only");
        $("#" + id).val('');
        $("#" + id).focus();
        return false;

    }
    else {
        return true;
    }

}
