$(document).ready(function () {
    var ID = 2;

    $('#TotalTax').val(0.0);
    $('#TotalAmount').val(0.0);
    $('#TotalNetAmount').val(0.0);
    ///To Service Type Dropdown
    var url = "/GuestServices/GetServicesTypes/";
    $.ajax({
        url: url,

        cache: false,
        type: "GET",
        success: function (data) {
            if (data == 0) {
                alert("ServiceTypes Not Available in master");

            }
            else {
                $.each(data, function (i, x) {
                    $("#ServiceTypeDrop").append('<option value="' + x.GroupCode + '">' + x.GroupName + '</option>');

                });
            }
        },
        error: function (response) {
            alert("error : " + response);
        }
    });

    ///To TaxCode Dropdown
    var url1 = "/GuestServices/GetTaxCodes/";
    $.ajax({
        url: url1,

        cache: false,
        type: "GET",
        success: function (data) {
            if (data == 0) {
                alert(" Tax Codes Not Available in master");

            }
            else {
                $.each(data, function (i, x) {
                    $("#TaxCodeDrop1").append('<option value="' + x.TaxCode + '">' + x.TaxName + '</option>');

                });
            }
        },
        error: function (response) {
            alert("error : " + response);
        }
    });




    $("#ServiceTypeDrop").change(function () {
        var url = "/GuestServices/GetItems/";
        var GroupCode = $("#ServiceTypeDrop").val();
        if (GroupCode == -1) {
            alert("select Service Type");
            $("#ServiceTypeDrop").focus();
        }
        else {
            $('#ServiceTypeDrop').attr("disabled", true);
            $.ajax({
                url: url,
                data: { GroupCode: GroupCode },
                cache: false,
                type: "GET",
                success: function (data) {
                    if (data == 0) {
                        alert("No data Available in master");

                    }
                    else {
                        $("#ItemNameDrop1").empty();
                        $("#ItemNameDrop1").append('<option value="-1">Select Item</option>');
                        $.each(data, function (i, x) {
                            $("#ItemNameDrop1").append('<option value="' + x.ItemCode + '">' + x.ItemName + '</option>');

                        });
                    }
                },
                error: function (response) {
                    alert("error : " + response);
                }
            });

        }
    });
    $("#AddRow").click(function () {
    
        //alert(ID);

        var GroupCode = $("#ServiceTypeDrop").val();
        if (GroupCode != -1) {
            selectedId = ID - 1;
            var Item = $('#ItemNameDrop' + selectedId + '').val();
            if (Item != -1) {
                var TaxCode = $('#TaxCodeDrop' + selectedId + '').val();
                if (TaxCode != -1) {




                    $("#table1").append("<tbody><tr><td><input type='text' value='" + ID + "' id='SNO" + ID + "' class='SNO' hidden='hidden'><select  class='Item requiredselect' id='ItemNameDrop" + ID + "'><option value='-1'>Select Item</option></select></td><td><input type='text' id='Quantity" + ID + "' class='Qty requiredselect'></td><td><input type='text' id='Amount" + ID + "' class='Amount' readonly='readonly'><td><select  class='TaxCode requiredselect' id='TaxCodeDrop" + ID + "'><option value='-1'>Select TaxCode</option></select></td><td><input type='text' id='TaxAmount" + ID + "' class='TaxAmount' readonly='readonly'><td><img src='/Content/images/delete.png' class='rdelete'/></td></tr></tbody>");

                    var url = "/GuestServices/GetItems/";
                    $.ajax({
                        url: url,
                        data: { GroupCode: GroupCode },
                        cache: false,
                        async: false,
                        type: "GET",
                        success: function (data) {
                            if (data == 0) {
                                alert("No data Available in master");

                            }
                            else {
                                //$('#ItemNameDrop' + ID + '').empty();
                                //$("#ItemNameDrop2").empty();
                                $.each(data, function (i, x) {
                                    $('#ItemNameDrop' + ID + '').append('<option value="' + x.ItemCode + '">' + x.ItemName + '</option>');

                                });
                                //ID++;
                            }

                        },
                        error: function (response) {
                            alert("error : " + response);
                        }
                    });
                    var url1 = "/GuestServices/GetTaxCodes/";
                    $.ajax({
                        url: url1,
                        async: false,
                        cache: false,
                        type: "GET",
                        success: function (data) {
                            if (data == 0) {
                                alert(" Tax Codes Not Available in master");

                            }
                            else {
                                $.each(data, function (i, x) {
                                    $('#TaxCodeDrop' + ID + '').append('<option value="' + x.TaxCode + '">' + x.TaxName + '</option>');

                                });
                                // ID++;
                            }

                        },
                        error: function (response) {
                            alert("error : " + response);
                        }
                    });

                    ID++;
                }
                else {
                    alert("select TaxCode");
                    $('#TaxCodeDrop' + selectedId + '').focus();
                }
            }

            else {
                alert("select Item");
                $('#ItemNameDrop' + selectedId + '').focus();
            }

        }
        else {
            alert("select Service Type");
            $("#ServiceTypeDrop").focus();
        }

    });




    $("#table1").on("click", ".rdelete", deleteRow);
    $("#table1").on("change", ".Item", onchangeItem);
    $("#table1").on("change", ".Qty", onchangeQty);
    //$("#table1").on("change", ".Amount", onchangeAmount);
    $("#table1").on("change", ".TaxCode", onchangeTaxcode);
    //$("#table1").on("change", ".TaxAmount", onchangeTaxAmt);



    function deleteRow() {

        if ($("#table1 tr").length > 5) {
            var par = $(this).parent().parent();
            par.remove();

            ///To set Total Amount 
            var selectedAmount1 = [];
            selectedAmount1.length = 0;
            var TotalAmount = 0
            $(".Amount").each(function () {
                selectedAmount1.push($(this).val());
            });

            $.each(selectedAmount1, function (i, amt) {
                TotalAmount = TotalAmount + parseInt(amt);
            });

            $('#TotalAmount').val(TotalAmount);

            ////

            ///To set Total Tax Amount 
            var selectedTaxAmount1 = [];
            selectedTaxAmount1.length = 0;
            var TotalTaxAmount = 0
            $(".TaxAmount").each(function () {
                selectedTaxAmount1.push($(this).val());
            });

            $.each(selectedTaxAmount1, function (i, Taxamt) {
                TotalTaxAmount = TotalTaxAmount + parseFloat(Taxamt);
            });

            $('#TotalTax').val(TotalTaxAmount);

            var TotalNetAmount = parseFloat($('#TotalAmount').val()) + parseFloat($('#TotalTax').val());
            $('#TotalNetAmount').val(TotalNetAmount);



            ////


        }
        else {
            alert("table must have atleast one row");
        }
    };

    //On change of Qty
    function onchangeItem() {
        var item = $(this).val();
        var selectedId = $(this).parents('tr:first').children('td:first').children('input:first').attr('value');
        if (item != -1) {

            $.ajax({
                url: "/GuestServices/GetRate/",
                data: { item: item },
                cache: false,
                type: "GET",
                success: function (data) {
                    if (data == 0) {
                        alert("No data Available in master");

                    }
                    else {
                        $('#Quantity' + selectedId + '').val(1);
                        $('#Amount' + selectedId + '').val(data.ItemRate);
                        ///To set Total Amount 
                        var selectedAmount1 = [];
                        selectedAmount1.length = 0;
                        var TotalAmount = 0
                        $(".Amount").each(function () {
                            selectedAmount1.push($(this).val());
                        });

                        $.each(selectedAmount1, function (i, amt) {
                            TotalAmount = TotalAmount + parseInt(amt);
                        });

                        $('#TotalAmount').val(TotalAmount);

                        var TotalNetAmount = parseFloat($('#TotalAmount').val()) + parseFloat($('#TotalTax').val());
                        $('#TotalNetAmount').val(TotalNetAmount);
                        ////

                        ///Onchange of Item, Tax amount also want to change


                        var selectedTaxCode = $('#TaxCodeDrop' + selectedId + '').val();
                        if (selectedTaxCode != -1) {

                            var Amount = $('#Amount' + selectedId + '').val();


                            $.ajax({
                                url: "/GuestServices/GetTaxRate/",
                                data: { TaxCode: selectedTaxCode },
                                cache: false,
                                type: "GET",
                                success: function (data) {
                                    if (data == 0) {
                                        alert("No data Available in master");

                                    }
                                    else {
                                        var TaxAmount = parseFloat((data.Rate * Amount) / 100);
                                        $('#TaxAmount' + selectedId + '').val(TaxAmount);

                                        ///To set Total Tax Amount 
                                        var selectedTaxAmount1 = [];
                                        selectedTaxAmount1.length = 0;
                                        var TotalTaxAmount = 0
                                        $(".TaxAmount").each(function () {
                                            selectedTaxAmount1.push($(this).val());
                                        });

                                        $.each(selectedTaxAmount1, function (i, Taxamt) {
                                            TotalTaxAmount = TotalTaxAmount + parseFloat(Taxamt);
                                        });

                                        $('#TotalTax').val(TotalTaxAmount);

                                        var TotalNetAmount = parseFloat($('#TotalAmount').val()) + parseFloat($('#TotalTax').val());
                                        $('#TotalNetAmount').val(TotalNetAmount);

                                        ////

                                    }
                                },
                                error: function (response) {
                                    alert("error : " + response);
                                }
                            });
                        }

                        //////End of Tax Amount Change

                    }
                },
                error: function (response) {
                    alert("error : " + response);
                }
            });

            var TotalNetAmount = parseFloat($('#TotalAmount').val()) + parseFloat($('#TotalTax').val());
            $('#TotalNetAmount').val(TotalNetAmount);
        }
        else {
            alert("select Item");
            $('#ItemNameDrop' + selectedId + '').focus();
        }

    }

    // On change of Qty
    function onchangeQty() {
        var selectedQty = $(this).val();

        //var selecteditem = $(this).parents('tr:first').children('td:first').children('input:first').selected.val();
        var selectedId = $(this).parents('tr:first').children('td:first').children('input:first').attr('value');
        var selecteditem = $('#ItemNameDrop' + selectedId + '').val();
        var price = $('#Amount' + selectedId + '').val();
        //var Amt = Qty * price;

        //$('#Amount' + selectedId + '').val(Amt);

        $.ajax({
            url: "/GuestServices/GetRate/",
            data: { item: selecteditem },
            cache: false,
            type: "GET",
            success: function (data) {
                if (data == 0) {
                    alert("No data Available in master");

                }
                else {
                    var Amount = data.ItemRate * selectedQty;
                    $('#Amount' + selectedId + '').val(Amount);


                    ///To set Total Amount 
                    var selectedAmount1 = [];
                    selectedAmount1.length = 0;
                    var TotalAmount = 0
                    $(".Amount").each(function () {
                        selectedAmount1.push($(this).val());
                    });

                    $.each(selectedAmount1, function (i, amt) {
                        TotalAmount = TotalAmount + parseInt(amt);
                    });

                    $('#TotalAmount').val(TotalAmount);


                    ////

                    ///Onchange of Qty, Tax amount also want to change


                    var selectedTaxCode = $('#TaxCodeDrop' + selectedId + '').val();
                    if (selectedTaxCode != -1) {

                        var Amount = $('#Amount' + selectedId + '').val();


                        $.ajax({
                            url: "/GuestServices/GetTaxRate/",
                            data: { TaxCode: selectedTaxCode },
                            cache: false,
                            type: "GET",
                            success: function (data) {
                                if (data == 0) {
                                    alert("No data Available in master");

                                }
                                else {
                                    var TaxAmount = (data.Rate * Amount) / 100;
                                    $('#TaxAmount' + selectedId + '').val(TaxAmount);

                                    ///To set Total Tax Amount 
                                    var selectedTaxAmount1 = [];
                                    selectedTaxAmount1.length = 0;
                                    var TotalTaxAmount = 0
                                    $(".TaxAmount").each(function () {
                                        selectedTaxAmount1.push($(this).val());
                                    });

                                    $.each(selectedTaxAmount1, function (i, Taxamt) {
                                        TotalTaxAmount = TotalTaxAmount + parseFloat(Taxamt);
                                    });

                                    $('#TotalTax').val(TotalTaxAmount);



                                    ////

                                }
                            },
                            error: function (response) {
                                alert("error : " + response);
                            }
                        });
                    }

                    //////End of Tax Amount Change

                }
            },
            error: function (response) {
                alert("error : " + response);
            }
        });

        var TotalNetAmount = parseFloat($('#TotalAmount').val()) + parseFloat($('#TotalTax').val());
        $('#TotalNetAmount').val(TotalNetAmount);

    }

    // On change of TaxCode
    function onchangeTaxcode() {

        var selectedTaxCode = $(this).val();
        var selectedId = $(this).parents('tr:first').children('td:first').children('input:first').attr('value');
        var Item = $('#ItemNameDrop' + selectedId + '').val();
        if (Item != -1) {

            //var selectedId = $(this).parents('tr:first').children('td:first').children('input:first').attr('value');

            var Amount = $('#Amount' + selectedId + '').val();


            $.ajax({
                url: "/GuestServices/GetTaxRate/",
                data: { TaxCode: selectedTaxCode },
                cache: false,
                type: "GET",
                success: function (data) {
                    if (data == 0) {
                        alert("No data Available in master");

                    }
                    else {
                        var TaxAmount = (data.Rate * Amount) / 100;
                        $('#TaxAmount' + selectedId + '').val(TaxAmount);

                        ///To set Total Tax Amount 
                        var selectedTaxAmount1 = [];
                        selectedTaxAmount1.length = 0;
                        var TotalTaxAmount = 0
                        $(".TaxAmount").each(function () {
                            selectedTaxAmount1.push($(this).val());
                        });

                        $.each(selectedTaxAmount1, function (i, Taxamt) {
                            TotalTaxAmount = TotalTaxAmount + parseFloat(Taxamt);
                        });

                        $('#TotalTax').val(TotalTaxAmount);

                        var TotalNetAmount = parseFloat($('#TotalAmount').val()) + parseFloat($('#TotalTax').val());
                        $('#TotalNetAmount').val(TotalNetAmount);

                        ////

                    }
                },
                error: function (response) {
                    alert("error : " + response);
                }
            });

        }
        else {
            $(this).val('-1');
            alert("select Item");
            $('#ItemNameDrop' + selectedId + '').focus();
        }
    }
    $("#PRNO").change(function () {

        $.ajax({
            url: "/GuestServices/CheckPRNO",
            data: { PRNum: $("#PRNO").val() },
            cache: false,
            type: "GET",
            success: function (data) {
                //  var s=data.PRNO
                if (data != null) {
                    
                    $("#Name").val(((data.FirstName == null || data.FirstName == "null" || data.FirstName == "NULL") ? data.FirstName = "" : data.FirstName = data.FirstName) + " " + ((data.MiddleName == null || data.MiddleName == "null" || data.MiddleName == "NULL") ? data.MiddleName = "" : data.MiddleName = data.MiddleName) + " " + ((data.LastName == null || data.LastName == "null" || data.LastName == "NULL") ? data.LastName = "" : data.LastName = data.LastName));
                }
                else {
                    window.alert("Invalid PRNO..");
                    $("#PRNO").val('');
                    $("#Name").val('');
                    $("#PRNO").focus();
                }

            },
            error: function (response) {
                window.alert("Invalid PRNO..");
                $("#PRNO").val('');
                $("#Name").val('');
                $("#PRNO").focus();
            }
            });
            });

    $("#Save").click(function () {
        isValid = ValidateInputs();
       
        if (isValid == true) {
            var PRNumber = $("#PRNO").val();
            if (PRNumber != "") {

                var ItemCodesArray = [];
                var TaxCodesArray = [];
                ItemCodesArray.length = 0;
                TaxCodesArray.length = 0;

                $(".Item option:selected").each(function () {

                    if ($(this).val() == "-1") {
                        ItemCodesArray.push($(this).val());
                    }

                });

                $(".TaxCode").each(function () {

                    if ($(this).val() == "-1") {
                        TaxCodesArray.push($(this).val());
                    }

                });

                if (ItemCodesArray.length > 0 || TaxCodesArray.length > 0) {
                    alert('ItemCode and Taxcode are  Mandatory!.');
                }
                else {

                    var selectedItems = [];
                    selectedItems.length = 0;
                    $(".Item option:selected").each(function () {
                        selectedItems.push($(this).val());
                    });

                    ///To check atleast one item select or not
                    if (selectedItems.length >= 1) {

                        var Duplicates = [];
                        Duplicates.length = 0;
                        Duplicates = selectedItems;


                        var sortedarray = Duplicates;
                        var results = [];
                        for (var i = 0; i < Duplicates.length - 1; i++) {
                            if (sortedarray[i + 1] == sortedarray[i]) {
                                results.push(sortedarray[i]);
                            }
                        }
                        if (results.length <= 0) {

                            var PRNumber = $("#PRNO").val();
                            var TotalTaxAmount = $("#TotalTax").val();
                            var TotalAmount = $("#TotalAmount").val();
                            var selectedQty = [];
                            selectedQty.length = 0;
                            $(".Qty").each(function () {
                                selectedQty.push($(this).val());
                            });

                            var selectedAmount = [];
                            selectedAmount.length = 0;
                            $(".Amount").each(function () {
                                selectedAmount.push($(this).val());
                            });


                            var selectedTaxCode = [];
                            selectedTaxCode.length = 0;
                            $(".TaxCode").each(function () {
                                selectedTaxCode.push($(this).val());
                            });


                            var selectedTaxAmount = [];
                            selectedTaxAmount.length = 0;
                            $(".TaxAmount").each(function () {
                                selectedTaxAmount.push($(this).val());
                            });

                            $("#LoadingImage").show();
                            $.ajax({
                                url: "/GuestServices/CheckPRNO",
                                data: { PRNum: PRNumber },
                                cache: false,
                                type: "GET",
                                success: function (data) {
                                    //  var s=data.PRNO
                                    if (data != null) {

                                        $.ajax({
                                            url: "/GuestServices/SaveItems",
                                            type: "POST",
                                            data: { PRNO: PRNumber, items: selectedItems, quantity: selectedQty, Amount: selectedAmount, TaxCode: selectedTaxCode, TaxAmount: selectedTaxAmount, TotalTax: TotalTaxAmount, TotalAmount: TotalAmount },
                                            dataType: "json",
                                            cache: false,
                                            traditional: true,
                                            success: function (data) {
                                                if (data.toString() == "Successfully Saved!") {
                                                    window.alert("Records saved SucessFully..");
                                                    window.location.href = Exiturl;
                                                }
                                                else {
                                                    window.alert("Failed to Save Records..");
                                                }


                                            },
                                            error: function (response) {
                                                alert("error : " + response);
                                            }
                                        });
                                    }
                                    else {
                                        window.alert("Invalid PRNO..");
                                        $("#PRNO").val('');
                                        $("#PRNO").focus();
                                    }

                                },
                                error: function (response) {
                                    alert("error : " + response);
                                }
                            });

                            $("#LoadingImage").fadeOut(4000);
                        }

                        else {
                            alert("Dupliacation of Items are not allowed!");
                        }

                    }
                    else {
                        alert("Must be select atleast one Item ");
                    }
                }
            }
            else {
                alert("Enter PRNO");
                $("#PRNO").val('');
                $("#PRNO").focus();
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
});
