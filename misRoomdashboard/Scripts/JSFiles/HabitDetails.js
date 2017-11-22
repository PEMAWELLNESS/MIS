$(document).ready(function ()
{

    $(".HBFlag").change(function () {
  
        var flgHBval = $(this).val();
        if (flgHBval == '0') {

            $(this).parents('td').next('td').next('td').find("textarea").prop("required", false);
            $(this).parents('td').next('td').next('td').find("textarea").prop("disabled", true);



        }
        else {
            //var $tr = $(this).closest('tr');
            //var srr =  $tr.find('td:nth-child(4)').text();
            $(this).parents('td').next('td').next('td').find("textarea").prop("required", true);
            $(this).parents('td').next('td').next('td').find("textarea").prop("disabled", false);
        }


    });
    $("#SaveHB").click(function ()
    {
         
        var selectedHBId = [];
        selectedHBId.length = 0;
        $(".HBId").each(function () {

            selectedHBId.push($(this).val());
        });
              


        var selectedHBFlg = [];
        selectedHBFlg.length = 0;
        $(".HBFlag option:selected").each(function ()
        {
            selectedHBFlg.push($(this).val());
        });

        var selectedHBDesc = [];
        selectedHBDesc.length = 0;
        $(".HBDe").each(function () {
            selectedHBDesc.push($(this).val());

        });
     

        $.ajax({
            url: "/RegistrationForm/SaveHBDetails",
            type: "POST",
            data: { HBId: selectedHBId, HBFlag: selectedHBFlg, HBDesc: selectedHBDesc },
            cache: false,
            traditional: true,
            success: function (data)
            {
                if (data.toString() == "Successfully Saved!") {
                    window.history.back();
                }
                else {
                    // window.alert("Failed to Save Records..");
                    window.history.back();
                }


            },
            error: function (response) {
                // alert("error : " + response);
                window.history.back();
            }
        });

    });
});