//GR Edit Scripts
var addReplyClick = 0;

if ($('input#regShipMyAddress').is(':checked')) {
	$('.no_shipping_address').hide();
};

function controlAddressBtn(objChkBox) {
	if (objChkBox.checked) {
		window.document.getElementById('divChooseAddress').style.display = '';
		window.document.getElementById('divSelectedAddress').style.display = '';
		$('.no_shipping_address').hide();
	}
	else {
		window.document.getElementById('divChooseAddress').style.display = 'none';
		window.document.getElementById('divSelectedAddress').style.display = 'none';
		$('.no_shipping_address').show();
	}
}

function submitForm(strAction) {
	window.document.body.style.cursor = 'wait';
	if (window.document.activeElement) { window.document.activeElement.style.cursor = 'wait'; }

	document.frmForm.action.value = strAction;
	document.frmForm.submit();
}

function chooseAddress() {
	submitForm('chooseaddress');
}

function saveRegistry() {
	var strMsg = "";
	if (document.frmForm.txtRegName.value.trim() == "")
		strMsg += " - " + getVariableVal('giftregistry_create-name') +" cannot be blank.\n"
	if (document.frmForm.drpRegMonth.value.trim() == "" || document.frmForm.drpRegDay.value.trim() == "" || document.frmForm.drpRegYear.value.trim() == "")
		strMsg += " - " + getVariableVal('giftregistry_create-eventdate') + " cannot be blank.\n"
	if (document.frmForm.txtRegPassword.value.trim() == "" && jQuery('#gr_pw_required').val() == '1')
		strMsg += " - " + getVariableVal('giftregistry_create-password') + " cannot be blank.\n"
	if (strMsg != "") {
		alert(strMsg);
		return false;
	}
	if (addReplyClick == 0) {
		addReplyClick = 1;
		submitForm('save');
	}
}
String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, "");
}
//JS script
