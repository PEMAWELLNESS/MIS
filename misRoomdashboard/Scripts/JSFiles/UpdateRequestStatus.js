$(document).ready(function () {
    $("#chglbl").hide();
    $("#chg").hide();
    $("#Amtlbl").hide();
    $("#Amt").hide();

    //if (Chargeable == 'N') {
    //    $("#Amtlbl").hide();
    //    $("#Amt").hide();
    //}
    $("#ReqStatus").change(function () {
        var st = $("#ReqStatus").val();
        if (st == "Close") {
            $("#chglbl").show();
            $("#chg").show();

        }
        else {
            $("#chglbl").hide();
            $("#chg").hide();
            $("#Amtlbl").hide();
            $("#Amt").hide();
        }
    });
    $("#chg").change(function () {
        var st1 = $("#chg").val();
        if (st1 == "N") {
            $("#Amtlbl").hide();
            $("#Amt").hide();
        }
        else {
            $("#Amtlbl").show();
            $("#Amt").show();
        }
    });

    $("#Save").click(function () {

        if ($("#ReqStatus").val() == "-1") {
            alert("Select Status");
        }

        else {

            var params = {
                Status: $("#ReqStatus").val(),
                Remarks: $("#ReqRks").val(),
                chargeable: $("#chg").val(),
                Amount: $("#Amt").val() == "" ? 0 : $("#Amt").val()
            }

            $.ajax({
                type: "post",
                url: "/GuestRequestsStatusUpdation/update",
                data: params,
                datatype: "json",
                traditional: true,
                success: function (message) {
                    if (message != "") {
                        alert("Updated Successfully")
                        $("#MYdialog").dialog("close");
                        $('#GuestRequestsListJtable').jtable('load');


                    }
                }
            });
        }
    });
});