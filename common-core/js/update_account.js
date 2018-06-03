function doUpdate(objForm) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, "");
	}

	function IsNumeric(strString) {
		var strValidChars = "0123456789.-";
		var strChar;
		var blnResult = true;

		if (strString.length == 0) return false;
		//  test strString consists of valid characters listed above
		for (i = 0; i < strString.length && blnResult == true; i++) {
			strChar = strString.charAt(i);
			if (strValidChars.indexOf(strChar) == -1) {
				blnResult = false;
			}
		}
		return blnResult;
	}


	var strMsg = "";

	if (emailReq == 1) {
		if (objForm.email.value.trim() == "")
			strMsg += " - Please enter a valid Email.\n";
		if (objForm.email.value.length > 50)
			strMsg += " - Maximum length for this field is 50.\n";
	}

	//BILLING INFO
	if (objForm.billing_firstname.value.trim() == "")
		strMsg += " - Please enter your Billing [CustomerInfo_firstname].\n";
	if (objForm.billing_firstname.value.length > 20)
		strMsg += " - Maximum length for this field is 20 characters.\n";

	if (objForm.billing_lastname.value.trim() == "")
		strMsg += " - Please enter your Billing [CustomerInfo_lastname].\n";
	if (objForm.billing_lastname.value.length > 20)
		strMsg += " - Maximum length for this field is 20 characters.\n";

	if (objForm.billing_phone.value.trim() == "")
		strMsg += " - Please enter your Billing [CustomerInfo_phone].\n";
	if (objForm.billing_phone.value.length > 18)
		strMsg += " - Maximum length for this field is 18 characters.\n";

	if (objForm.billing_address.value.trim() == "")
		strMsg += " - Please enter your Billing [CustomerInfo_address].\n";
	if (objForm.billing_address.value.length > 50)
		strMsg += " - Maximum length for this field is 50 characters.\n";

	if (objForm.billing_city.value.trim() == "")
		strMsg += " - Please enter your Billing [CustomerInfo_city].\n";
	if (objForm.billing_city.value.length > 50)
		strMsg += " - Maximum length for this field is 50 characters.\n";

	if (objForm.billing_state.value.trim() == "")
		strMsg += " - Please enter your Billing [CustomerInfo_state].\n";
	if (objForm.billing_state.value.length > 50)
		strMsg += " - Maximum length for this field is 50 characters.\n";

	if (objForm.billing_zip.value.trim() == "")
		strMsg += " - Please enter your Billing [CustomerInfo_zip].\n";
	if (objForm.billing_zip.value.length > 20)
		strMsg += " - Maximum length for this field is 20 characters.\n";


	//SHIPPING INFO
	if (objForm.shipping_firstname.value.trim() == "")
		strMsg += " - Please enter your Shipping [CustomerInfo_firstname].\n";
	if (objForm.shipping_firstname.value.length > 20)
		strMsg += " - Maximum length for this field is 20 characters.\n";

	if (objForm.shipping_lastname.value.trim() == "")
		strMsg += " - Please enter your Shipping [CustomerInfo_lastname].\n";
	if (objForm.shipping_lastname.value.length > 20)
		strMsg += " - Maximum length for this field is 20 characters.\n";

	if (objForm.shipping_phone.value.trim() == "")
		strMsg += " - Please enter your Shipping [CustomerInfo_phone].\n";
	if (objForm.shipping_phone.value.length > 18)
		strMsg += " - Maximum length for this field is 18 characters.\n";

	if (objForm.shipping_address.value.trim() == "")
		strMsg += " - Please enter your Shipping [CustomerInfo_address].\n";
	if (objForm.shipping_address.value.length > 50)
		strMsg += " - Maximum length for this field is 50 characters.\n";

	if (objForm.shipping_city.value.trim() == "")
		strMsg += " - Please enter your Shipping [CustomerInfo_city].\n";
	if (objForm.shipping_city.value.length > 50)
		strMsg += " - Maximum length for this field is 50 characters.\n";

	if (objForm.shipping_state.value.trim() == "")
		strMsg += " - Please enter your Shipping [CustomerInfo_state].\n";
	if (objForm.shipping_state.value.length > 50)
		strMsg += " - Maximum length for this field is 50 characters.\n";

	if (objForm.shipping_zip.value.trim() == "")
		strMsg += " - Please enter your Shipping [CustomerInfo_zip].\n";
	if (objForm.shipping_zip.value.length > 20)
		strMsg += " - Maximum length for this field is 20 characters.\n";


	if (strMsg != "") {
		alert(strMsg);
		return false;
	}

	objForm.submit();
}
$(function () {
	$('#form1').parsley().on('field:validated', function() {
		var ok = $('.parsley-error').length === 0;
		$('.bs-callout-info').toggleClass('hidden', !ok);
		$('.bs-callout-warning').toggleClass('hidden', ok);
	})
	.on('form:submit', function() {
		doUpdate:doUpdate(this.form);
	});
});
