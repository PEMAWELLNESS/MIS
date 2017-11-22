$(document).ready(function () {
    if (res != 'yes') {

        $("#combine").hide();
    }

    $(function () {
        var ischeckedcp = $('#CombinedPayment').is(':checked');

        var url = "/RegistrationForm/DataOnlinePayment/";
        $.ajax({
            url: url,
            data: { combined: ischeckedcp, PRNO: $('#PRNO').val(), BillCode: $('#BillCode').val() },
            cache: false,
            type: "POST",
            success: function (data) {
                document.getElementById('PRNO').value = data.PRNO;
                document.getElementById('Name').value = data.Name;
                document.getElementById('BillType').value = data.BillType;
                document.getElementById('BillCode').value = data.BillCode;
                document.getElementById('Amount').value = data.Amount;
            },
            error: function (response) {
                alert("No Pending Payments are available for this user : ");
                //window.location.href = urltt2;
            }
        });


        if ($('#BillCode').val() != 14 && $('#BillCode').val() != 0) {

            var url = "/RegistrationForm/CheckRoomAvailability/";


            $.ajax({
                url: url,
                // data: {  },
                cache: false,
                async: false,
                type: "GET",
                success: function (data) {
                    if (data.toString() != "") {
                        // alert(" Rooms are Available")
                    }
                    else {
                        alert(" Rooms are not  Available")
                    }

                },
                error: function (response) {

                }
            });
        }


    });


    $("#Save").click(function () {
        //var ischecked = $('#TermsConditions').is(':checked');
        debugger;



        //if (ischecked == true)
        //    //if ($(#Terms&Conditions).prop('checked') == true)
        //{


        var url = "/RegistrationForm/SavePaymentDetails";

        var params = {
            PR_NO: $("#PRNO").val(),
            PAYMENT_TYPE_CODE: $("#BillCode").val(),
            PAID_AMOUNT: $("#Amount").val(),
            combined: $('#CombinedPayment').is(':checked')
        }
        $("#LoadingImage").show();
        $.ajax({
            url: url,
            data: params,
            cache: false,
            type: "POST",
            success: function (data) {

                if (data.toString() != "") {
                    $("#LoadingImage").fadeOut(4000);
                    window.alert(data);
                    //window.alert("Your Application is Successfully submitted ...Please note PRNO for your future communication with PEMA");
                    window.location.href = urltt1;

                }
                else {
                    $("#LoadingImage").fadeOut(4000);
                    alert("Operation Failed : ");

                }

            },
            error: function (response) {
                $("#LoadingImage").fadeOut(4000);
                alert("Error : " + response);

            }
        });

        //}
        //else {
        //    alert("Check the Terms and conditions");
        //}
    });
});


$('#CombinedPayment').change(function () {
    var ischeckedcp = $('#CombinedPayment').is(':checked');

    var url = "/RegistrationForm/DataOnlinePayment/";


    $.ajax({
        url: url,
        data: { combined: ischeckedcp },
        cache: false,
        type: "POST",
        success: function (data) {
            document.getElementById('PRNO').value = data.PRNO;
            document.getElementById('Name').value = data.Name;
            document.getElementById('BillType').value = data.BillType;
            document.getElementById('BillCode').value = data.BillCode;
            document.getElementById('Amount').value = data.Amount;
                    },
        error: function (response) {
            alert("No Pending Payments are available for this user : ");
            // window.location.href = urltt2;
        }
    });


});