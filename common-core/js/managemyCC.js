String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
}
/*
initCountry('[billing_country]','[billing_state]','billing_state','billing_country','');

function deleteProfile()
{
	var rep = confirm("[account_creditcard-delete-confirmation]");
	
	if (rep)
	{
		document.frmForm.hdnAction.value = "delete";
//		document.frmForm.submit();
	}
}

function saveProfile()
{
	var strMsg = "";
	//<!--START: ccValidation-->
	if (document.frmForm.card_number.value.trim() == "")
		strMsg += " - [CustomerInfo_creditcardnumber] cannot be blank.\n";
	//<!--END: ccValidation-->

	//<!--START: cvvValidation-->
	if (document.frmForm.card_cvv2.value.trim() == "")
		strMsg += " - CVV cannot be blank.\n";
	//<!--END: cvvValidation-->

	try {



	if (document.frmForm.drpMonth.value.trim() == "" || document.frmForm.drpYear.value.trim() == "")
		strMsg += " - [CustomerInfo_creditexpiration] is invalid.\n";
		
	//<!--START: authNetValidation-->
	if (document.frmForm.billing_firstname.value.trim() == "")
		strMsg += " - [CustomerInfo_firstname] cannot be blank.\n";
	if (document.frmForm.billing_lastname.value.trim() == "")
		strMsg += " - [CustomerInfo_lastname] cannot be blank.\n";
	//<!--END: authNetValidation-->

	if (document.frmForm.billing_address.value.trim() == "")
	    strMsg += " - [CustomerInfo_address] cannot be blank.\n";

    //<!--START: CityValidation-->
	if (document.frmForm.billing_city.value.trim() == "")
		strMsg += " - [CustomerInfo_city] cannot be blank.\n";
	//<!--END: CityValidation-->

    //<!--START: CountryValidation-->
	if (document.frmForm.billing_country.value.trim() == "")
		strMsg += " - [CustomerInfo_country] cannot be blank.\n";
    //<!--END: CountryValidation-->

    //<!--START: StateValidation-->
	if (document.frmForm.billing_state.value.trim() == "")
		strMsg += " - [CustomerInfo_state] cannot be blank.\n";
    //<!--END: StateValidation-->   

	if (document.frmForm.billing_zip.value.trim() == "")
		strMsg += " - [CustomerInfo_zip] cannot be blank.\n";

	}
	catch (e) { }

	if (strMsg != ""){
		alert(strMsg);
		return false;
	}
	document.frmForm.hdnAction.value = "save";
	document.frmForm.submit();
}
*/
function editCard(isEdit)
{
	if (isEdit)
	{
		document.getElementById('divCard').style.display = 'none';
		document.getElementById('divCardEdit').style.display = '';
		document.getElementById('cmdSave').style.display = '';
		document.getElementById('hdnEditCard').value = "1";
		document.getElementById('cardExp').value = document.getElementById('CCMonthYear').innerText.replace("-", "/").replace(" ", "").replace(" ", "")
	}
	else
	{
		document.getElementById('divCard').style.display = '';
		document.getElementById('divCardEdit').style.display = 'none';
		document.getElementById('cmdSave').style.display = 'none';
		document.getElementById('hdnEditCard').value = "0";
	}
}