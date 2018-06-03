function DeleteMultipleList(intListId) {
	str = 'multiple_wishlist_' + intListId;

	if (confirm(getVariableVal("wishlist_multiple-message-deletelist"))) {
		document.frmForm.action.value = 'removeList';
		document.frmForm.k.value = intListId;
		frmForm.submit();
	} 
}

function SaveMultipleList(intListId) {
	str = 'multiple_wishlist_' + intListId;
	WshName = document.getElementById(str).value;
	strMsg = '';

	if (WshName.trim() == "")
		strMsg += getVariableVal("wishlist_multiple-message-renamelist");
		String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, "");
	}

	if (strMsg != "") {
		alert(strMsg);
		return false;
	}

	document.frmForm.action.value = 'saveList';
	document.frmForm.k.value = intListId;
	document.frmForm.multiple_wishlist_name.value = WshName;

	frmForm.submit();
}

function RenameMultipleList(intListId,act) {

	Spanlabel = 'multiple_wishlist_label_' + intListId;
	SpanLink = 'multiple_wishlist_textbox_' + intListId;

	if (act == 1) {
		document.getElementById(SpanLink).style.display = 'block';
		document.getElementById(Spanlabel).style.display = 'none';
	}
	else {
		document.getElementById(SpanLink).style.display = 'none';
		document.getElementById(Spanlabel).style.display = 'block';
	}
}

function submitForm(strAction) {
	window.document.body.style.cursor = 'wait';
	if(window.document.activeElement){window.document.activeElement.style.cursor='wait'; }
	
	document.frmForm.action.value = strAction;
	document.frmForm.submit();
}
	 
function removeItem(intWsiId,intListId) {
	var rep;
	rep = confirm(getVariableVal("wishlist_viewwishlist-message-removeitem"));
	if (!rep)
		return false;
	
	document.frmForm.wsiId.value = intWsiId;
	document.frmForm.k.value = intListId;
	submitForm('removeItem');
}

function addToCart(intWsiId, intListId) {
	var rep;
	rep = confirm(getVariableVal("wishlist_viewwishlist-message-addtocart"));
	if (!rep)
		return false;
	
	document.frmForm.wsiId.value = intWsiId;
	document.frmForm.k.value = intListId;
	submitForm('addToCart');
}

function saveItem(intWsiId, intListId) {
	var qty = document.getElementById("txtQty" + intWsiId).value;

    document.frmForm.wsiId.value = intWsiId;
    document.frmForm.k.value = intListId;
    document.frmForm.qty.value = qty;

    submitForm('saveItem');
}

function savePublicOrPrivate(intListId) {
	var optVisibility = '';

	if (document.getElementById("optListVisibilityPublic").checked == true) {
		optVisibility = '1'
	}
	else {
		optVisibility = '0'

	}

	document.frmForm.optListVisibility.value = optVisibility;
	document.frmForm.action.value = 'savePublicOrPrivate';
	document.frmForm.k.value = intListId;
	frmForm.submit();
}