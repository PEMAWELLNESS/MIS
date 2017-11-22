$(document).ready(function () {

    //$("#txtDate").datepicker({

    //});

    $("#Treatment").dialog({
        autoOpen: false,
        modal: true,
        width: 700,
        height: 200,
        title: "SPA Rooms List"
    });

});

    $("#txtPRNO").change(function () {
        $("#table2").empty();

        if ($("#txtPRNO").val() != "") {
            $.ajax({
                url: "/TreatmentRescheduling/GetPRNODetails",
                type: "GET",
                data: { PRNO: $("#txtPRNO").val() },
                dataType: 'json',
                cache: false,
                success: function (items) {
                    if (items.length > 0) {
                        $('#txtname').val(items[0].GuestName);
                        $('#txtAge').val(items[0].Age);
                        $('#rdgender').val(items[0].Sex);

                        var selecteddate = $("#txtDate").val()


                        $.ajax({
                            url: "/TreatmentRescheduling/TreatmentDetails",
                            type: "get",
                            data: { "date": $("#txtDate").val(), "prnumber": $("#txtPRNO").val() },
                            cache: false,
                            success: function (result) {
                                if (result.length == 0) {

                                    alert("Records  are not Available");
                                }
                                else {

                                    $("#table2").append("<thead><tr> <th style='width:40px' align='center'>SNo</th><th style='display:none'>ID</th><th style='width:120px'>SPA Category</th> <th style='width:120px'>SPA Type</th><th style='width:120px'>SPA Name</th> <th style='width:60px'>RoomNo</th><th style='width:60px'>SlotNo</th><th style='width:60px'>StartTime</th><th style='width:60px'>EndTime</th></tr>");




                                    $.each(result, function (i, v) {
                                        var ID = i + 1



                                        $("#table2").append("<tbody><tr><td><input type='text' value='" + ID + "' id='SNO" + ID + "' class='SNO' readonly='readonly' style='width:40px'></td><td style='display:none'><input type='text' value='" + v.TreatID + "' id='TreatID" + ID + "' class='TreatID' readonly='readonly'></td><td><input type='text' value='" + v.TreatGroup + "' id='TreatmentGroup" + ID + "' class='TreatmentGroup' readonly='readonly'></td><td><input type='text' value='" + v.TreatType + "' id='TreatType" + ID + "' class='TreatType' readonly='readonly'></td><td><input type='text'  value='" + v.TreatName + "' id='TreatName" + ID + "' class='TreatName' readonly='readonly'></td><td><input type='text'  value='" + v.Roomnumber + "' id='RoomNo" + ID + "' class='RoomNo' style='width:60px'></td><td><input type='text'  value='" + v.SlotNo + "' id='SlotNo" + ID + "' class='SlotNo' style='width:60px'></td><td><input type='text'  value='" + v.Starttime + "' id='Starttime" + ID + "' class='Starttime' style='width:60px'></td><td><input type='text'  value='" + v.Endtime + "' id='endtime" + ID + "' class='endtime' style='width:60px'></td><td><input type='button' value='Change'  id='Change" + ID + "' class='Select'></td></tr></tbody>");

                                    });
                                }

                            },
                            error: function (response) {
                                alert("error : " + response);
                            }
                        });

                    }
                    else {
                        alert('Invalid PRNO..');
                    }

                },
                error: function (response) {
                    alert("error : " + response);

                }
            });
        }

    });

    $("#table2").on("click", ".Select", Change);
    function Change() {

        var SNumber = $(this).parents('tr:first').children('td:first').children('input:first').attr('value');
        var TGroup = $('#TreatmentGroup' + SNumber + '').val();
        var TType = $('#TreatType' + SNumber + '').val();
        var TName = $('#TreatName' + SNumber + '').val();
        var Selected = ('#Change' + SNumber + '');
        var PRNO = $('#txtPRNO').val();
        var Date = $('#txtDate').val();
        //alert(Selected);
        //alert(TType);
        //alert(TName);

        if ((TType == "") || (TName == "")) {

        }
        else {


            $.ajax({
                url: "/TreatmentRescheduling/TreatmentRoomsListPartialView",
                type: "get",
                data: { SNO: SNumber, TreatGroup: TGroup, TreatType: TType, TreatName: TName, PRNumb: PRNO, TDate: Date },
                success: function (result) {

                    $("#Treatment").empty().append(result);
                    $("#Treatment").dialog("open");

                },
                error: function () {
                    alert("Wrong Selection!..");

                }
            });


        }

    }


    $('#Save').click(function (e) {
        
        isValid = ValidateInputs();
       
        if (isValid == true) {
            if ($("#txtPRNO").val() != "") {
                var FortDate = $('#txtDate').val();
                var Treatment = Array();
                var PRNum = $("#txtPRNO").val();
                $("#table2 tbody tr").each(function (i, v) {
                    Treatment[i] = Array();
                    $(this).children('td:not(:first, :last)').each(function (ii, vv) {
                        Treatment[i][ii] = $(this).closest('td').find(':input').val()
                    });
                })




                $.ajax({
                    url: "/TreatmentRescheduling/SavingRecords",
                    type: "POST",
                    data: { PRNumber: PRNum, FortnightDate: FortDate, TreatmentRecords: Treatment },
                    dataType: "json",
                    cache: false,
                    traditional: true,
                    success: function (data) {
                        if (data.toString() == "Successfully Saved!") {
                            window.alert("Records saved SucessFully..");


                        }
                        else {
                            window.alert("Transaction Failed!..");

                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(errorThrown);

                    }
                });

            }


            else {
                alert('PRNO is Empty');
            }
        }

    });

    $("#Exit").click(function () {

        //window.alert("are you sure you want to close");
        var res = window.confirm("Are you sure you want to Close");
        if (res == true) {
            window.location.href = Exiturl;
        }

    });
