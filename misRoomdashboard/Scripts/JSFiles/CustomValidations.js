
//integer validation
function Isinteger(Intvalue, text1) {
    if ($.isNumeric(Intvalue)) {
        return "";
    }
    else {
        return "Enter valid number";
    }

}

//Email Validation
function ValidateEmail(mail) {
    debugger;
    var res = document.getElementById('EmailId').value;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return ("")
    }
    alert("You have entered an invalid email address!");
}

//Only Text validation
function ValidateText(text, text1) {

    debugger;
    var x = text;
    var letters = /^[a-zA-Z ]*$/;
    if (x == null || x == "") {
        return "> &nbsp &nbsp Please enter " + text1 + "<br/>";
    }
    else {
        if (x.match(letters)) {
            return ("");
        }
        else {
            return "> &nbsp &nbsp Please enter " + text1 + "&nbsp as text <br/>";
        }
    }

}

//Date Validation
function validatedate(date) {
    var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    // Match the date format through regular expression  
    if (date.value.match(dateformat)) {
        document.form1.text1.focus();
        //Test which seperator is used '/' or '-'  
        var opera1 = date.value.split('/');
        var opera2 = date.value.split('-');
        lopera1 = opera1.length;
        lopera2 = opera2.length;
        // Extract the string into month, date and year  
        if (lopera1 > 1) {
            var pdate = date.value.split('/');
        }
        else if (lopera2 > 1) {
            var pdate = date.value.split('-');
        }
        var dd = parseInt(pdate[0]);
        var mm = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        // Create list of days of a month [assume there is no leap year by default]  
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                return 'Invalid date format!';
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {
                return 'Invalid date format!';
            }
            if ((lyear == true) && (dd > 29)) {
                return 'Invalid date format!';
            }
        }
    }
    else {
        return 'Invalid date format!';
        //document.form1.text1.focus(); 
    }
}

// Phone Validation
function validatephonenumber(phone, text1) {
    var phoneno = /^\d{10}$/;
    if ((phone.match(phoneno))) {
        return ("");
    }
    else {
        return "> &nbsp &nbsp Please enter " + text1 + " <br/> ";
    }
}

//DropDown Validation
function Validateddl(ddl, text1) {
    debugger;
    var x = ddl;

    if (x == null || x == "" || x == 0 || x == "Select" || x == "select") {
        return "> &nbsp &nbsp Please Select " + text1 + " <br/> ";
    }
    else
        return ("");
}

//Price Validation
function ValidatePrice(price, text1) {
    debugger;
    var regex = /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/;

    if (price.match(regex)) {
        return ("");
    }
    else {
        return "> &nbsp &nbsp Please enter " + text1 + "<br/>";
    }
}

// Text and Number Validation
function ValidateTextandNum(text, text1) {
    var x = text;

    if (x == null || x == "") {
        return "> &nbsp &nbsp Please enter " + text1 + "<br/>";
    }

    else {
        return ("");

    }

}

// Number Validation
function ValidateNum(Num, text1) {

    var x = Num;


    var regex = /^[0-9]+$/;

    if (Num == null || Num == "") {
        return "> &nbsp &nbsp" + text1 + " &nbsp  Can not be Null " + "<br/>";
    }
    else {
        if (Num.match(regex)) {
            return ("");
        }
        else {
            return "> &nbsp &nbsp Please enter " + text1 + "<br/>";

        }
    }

}

// Percentage Validation
function ValidatePercentage(str, text1) {
    debugger;
    var x = parseFloat(str);
    if (isNaN(x) || x < 0 || x > 100) {
        return "> &nbsp &nbsp Please enter Valid" + text1 + "<br/>";
    }
    if (x == null || x == "") {
        return "> &nbsp &nbsp Please enter" + text1 + "<br/>";
    }

    else {
        return ("");
    }
}

//Address Validation
function ValidateAddress(text, text1) {

    debugger;
    var x = text;

    if (x == null || x == "") {
        return "> &nbsp &nbsp Please enter " + text1 + "<br/>";
    }
    else {
        return ("");
    }
}

// Post Code Validation
function ValidatePostcode(phone, text1) {
    var phoneno = /^([1-9])([0-9]){5}$/;
    if ((phone.match(phoneno))) {
        return ("");
    }
    else {
        return "> &nbsp &nbsp Please Enter " + text1;
    }
}




