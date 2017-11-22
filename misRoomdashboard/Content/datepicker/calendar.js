var $j = jQuery;
var calWin;
	function newCal(src){					
				calWin = window.open("cal.asp?src="+src,"Calendar","location=no,status=no,width=300,height=131,screenX=150,screenY=550,left=550,top=350");
			}

			
		function set_dates(){
				var start_date = "";
				var end_date = "";

				var sel_arr_mon = document.forms[0].start_mon.options[document.forms[0].start_mon.options.selectedIndex].value;
				
				var sel_arr_date = document.forms[0].start_date.options[document.forms[0].start_date.options.selectedIndex].value;
				var sel_dep_mon = document.forms[0].end_mon.options[document.forms[0].end_mon.options.selectedIndex].value;
				var sel_dep_date = document.forms[0].end_date.options[document.forms[0].end_date.options.selectedIndex].value;

				//var sel_currency = 
				//document.forms[0].currency.options[document.forms[0].currency.options.selectedIndex].value;
				

				var sel_st_mt = sel_arr_mon.substring(0, sel_arr_mon.indexOf("_"));
				var sel_st_yr = sel_arr_mon.substring(sel_arr_mon.indexOf("_")+1);
				if(parseInt(sel_st_mt) < 10 ){
					sel_st_mt = "0"+sel_st_mt;
				}
				
				var sel_ed_mt = sel_dep_mon.substring(0, sel_dep_mon.indexOf("_"));
				var sel_ed_yr = sel_dep_mon.substring(sel_dep_mon.indexOf("_")+1);
				if(parseInt(sel_ed_mt) < 10 ){
					sel_ed_mt = "0"+sel_ed_mt;
				}
				if (sel_st_yr > sel_ed_yr) {
				alert("Departure Date Should Be Greater Than Arrival Date");
				return false;
				}
				else if ( sel_st_yr >= sel_ed_yr && sel_st_mt > sel_ed_mt) {
				alert("Departure Date Should Be Greater Than Arrival Date");
				return false;
				}
				else if (sel_st_yr >= sel_ed_yr && sel_st_mt >= sel_ed_mt && sel_arr_date >= sel_dep_date ) {
				alert("Departure Date Should Be Greater Than Arrival Date");
				return false;
				}
				else{
					document.forms[0].arr_date.value = sel_arr_date+sel_st_mt+sel_st_yr;
					document.forms[0].dep_date.value = sel_dep_date+sel_ed_mt+sel_ed_yr;				
				//	document.forms[0].curr.value = sel_currency;

					if(document.forms[0].regCode.value == "--Select a Property--"){ 
						alert("Please Choose Property.");
						return false;
					}
				
					document.forms[0].submit();
				}

			}

			var disp_mon = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
			var curr_date = new Date();
			var my_date = new Date();
		//	alert(my_date.setDate);
			my_date.setDate(my_date.getDate()+1);
			var curr_mon = curr_date.getMonth();
			var curr_year = curr_date.getFullYear();
            var curr_day=curr_date.getDate();
			var disp_date;
			var disp_yr;
			var disp_mth;

			function todayDate(){		
				if (curr_date.getDate() < 10 ) {
					document.forms[0].start_date.value = '0'+curr_date.getDate();
				}
				else {
					document.forms[0].start_date.value = curr_date.getDate();
				}
				if (my_date.getDate() < 10 ) {
				document.forms[0].end_date.value = '0'+my_date.getDate();	
				}
				else {
					document.forms[0].end_date.value = my_date.getDate();	
				}			
				document.forms[0].end_mon.value = (my_date.getMonth()+1)+'_' + my_date.getFullYear();			
				document.forms[0].start_mon.value = (curr_date.getMonth()+1)+'_' + curr_date.getFullYear();
			
			}


	function MM_openBrWindow(theURL,winName,features) { //v2.0
	  window.open(theURL,winName,features);
	}


// this is used while adding calendar on page to choose date
// Added By Dheeraj Gupta [2011-10-07]
	$j(function() {

		var date_format="dd/mm/yy" //this is date format
		//$j("#curDate").val(dt);

		$j('#img_frm_date').click(function() {
			//alert("before date");
      		$j('#arr_datepicker').datepicker('show');

		});


			$j("#arr_datepicker").datepicker({
			//numberOfMonths: 2,
			/*showOn: "button",
			buttonImage: "calendar/images/calendar.gif",
			buttonImageOnly: true,*/
			changeMonth: true,
			changeYear: true,
			//showButtonPanel: true,
			//dateFormat: date_format,
			minDate: 0,
			beforeShow: function(input, instance) {
            $j(input).datepicker('setDate', new Date());
        	},
			onSelect: function(selectedDate) {
                selectedDate = selectedDate.split('/');
             	var tempDt=new Date(selectedDate[2],selectedDate[1]-1,selectedDate[0]);
        		tempDt.setDate(tempDt.getDate()+4)
				$j("#dep_datepicker").val($j.datepicker.formatDate(date_format,tempDt));
            }


		});
        var arrDt=new Date();
		arrDt.setDate(arrDt.getDate()+2)
	   	$j("#arr_datepicker").val($j.datepicker.formatDate(date_format, arrDt));

		$j('#img_dep_date').click(function() {
			//alert("before date");
      		$j('#dep_datepicker').datepicker('show');

		 });

		$j("#dep_datepicker").datepicker({
			//numberOfMonths: 2,
			/*showOn: "button",
			buttonImage: "calendar/images/calendar.gif",
			buttonImageOnly: true,*/
			changeMonth: true,
			changeYear: true,
			//showButtonPanel: true,
			//dateFormat: date_format,
			minDate: 1,
			beforeShow: function(input, instance) {
            	$j(input).datepicker('setDate', new Date());
        	}

		});
		var depDt=new Date();
		depDt.setDate(depDt.getDate()+6)
		$j("#dep_datepicker").val($j.datepicker.formatDate(date_format,depDt));

	});

function chkValidation(){

	var dt1= new Date($j("#arr_datepicker").val());
	var dt2= new Date($j("#dep_datepicker").val());
	//alert(" date1 "+dt1.getTime()+" date2 "+dt2.getTime());
	if((dt1.getTime() > dt2.getTime())|| dt1.getTime()==dt2.getTime()){
		alert("Departure Date Should Be Greater Than Arrival Date");
		return false;
	}else{
		dt1=$j.datepicker.formatDate('ddmmyy', dt1);
		dt2=$j.datepicker.formatDate('ddmmyy', dt2);
		var date1=dt1.toString();
		var date2=dt2.toString();
		//alert(" Valid Date is Arr "+date1+" and dept "+date2);
		$j("#arr_date").val(date1);
		$j("#dep_date").val(date2);
		document.hotelform.submit();
	}
}

	
	