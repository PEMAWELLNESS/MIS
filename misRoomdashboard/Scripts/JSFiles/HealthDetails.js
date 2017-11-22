$(document).ready(function ()
{

    $("#ECG").hide();
    $("#ECGfiles").hide();

    if (Age >= 65 || HBPData != "Normal" ) {
        $("#ECG").show();
        $("#ECGfiles").show();
    }
    else
    {
        $(".HLFlag").trigger("change");
        //Heart(this);
    }



    $(".HLFlag").change(function () {

        var flgval = $(this).val();
        if (flgval == 'Y') {

            $(this).parents('td').next('td').find("textarea").prop("required", true);
            $(this).parents('td').next('td').find("textarea").prop("disabled", false);


        }
        else {
            //var $tr = $(this).closest('tr');
            //var srr =  $tr.find('td:nth-child(4)').text();
            $(this).parents('td').next('td').find("textarea").prop("required", false);
            $(this).parents('td').next('td').find("textarea").prop("disabled", true);
        }


    });

    $("#SaveHL").click(function ()
    {
       
        var selectedHLDesc = [];
        selectedHLDesc.length = 0;
        $(".HLD").each(function ()
        {
     selectedHLDesc.push($(this).val());
           
        });
        var selectedHLId = [];
        selectedHLId.length = 0;
        $(".HLId").each(function () {
          
            selectedHLId.push($(this).val());
        });
       

        var selectedHLCode = [];
        selectedHLCode.length = 0;
        $(".HLCode").each(function () {
            selectedHLCode.push($(this).val());
        });


        var selectedHLFlg = [];
        selectedHLFlg.length = 0;
        $(".HLFlag option:selected").each(function () {
            selectedHLFlg.push($(this).val());
        });

        var selectedBloodFile = [];
        selectedBloodFile.length = 0;
        $(".BP").each(function () {
            selectedBloodFile.push($(this).val());
        });
        var selectedECGFile = [];
        selectedECGFile.length = 0;
        $(".ECG").each(function () {
            selectedECGFile.push($(this).val());
        });
        //var formBPData = new formBPData();
        //var totalBPFiles = document.getElementById("files").files.length;
        //for (var i = 0; i < totalFiles; i++) {
        //    var file = document.getElementById("files").files[i];

        //    formBPData.append("files", file);
        //}

        //var formECGData = new formECGData();
        //var totalECGFiles = document.getElementById("ECGfiles").files.length;
        //for (var i = 0; i < totalECGFiles; i++) {
        //    var file = document.getElementById("ECGfiles").files[i];

        //    formECGData.append("ECGfiles", file);
        //}

        $.ajax({
            url: "/RegistrationForm/SaveHLDetails",
            type: "POST",
           data: { HLId: selectedHLId, HLCode: selectedHLCode, HLFlag: selectedHLFlg, HLDesc: selectedHLDesc},
            cache: false,
            traditional: true,
            success: function (data) {
                if (data.toString() == "Successfully Saved!")
                {
              window.history.back();
                }
                else
                {
                    //window.alert("Failed to Save Records..");
                    window.history.back();
                }


            },
            error: function (response)
            {
                //alert("error : " + response);
                window.history.back();
            }
        });

    });

});

function Heart(el) {

    var selected = $(el).val();
    if (selected == 'Y') {
        $("#ECG").show();
        $("#ECGfiles").show();
    }
    else {
        $("#ECG").hide();
        $("#ECGfiles").hide();
    }

}
//$('#previous').click(function (e) {


