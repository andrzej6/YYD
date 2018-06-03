// Copy to clipboard js

if (typeof Clipboard == 'function') {
	var clipboard = new Clipboard('#copy_public_URL');

	clipboard.on('success', function (e) {
		console.log(e);
	});

	clipboard.on('error', function (e) {
		console.log(e);
	});
	// End of Clipboard.js
}

jQuery(function () {
	//Quantity box
	jQuery('.quant-input .qty-up').click(function () {
		var qtyInput = jQuery(this).data('target');
		var incrementedVal = parseInt(jQuery(qtyInput).val()) + 1;
		jQuery(qtyInput).val(incrementedVal);
	});
	jQuery('.quant-input .qty-down').click(function () {
		var qtyInput = jQuery(this).data('target');
		var incrementedVal = parseInt(jQuery(qtyInput).val()) - 1;

		if (incrementedVal <= 0) incrementedVal = 0;
		jQuery(qtyInput).val(incrementedVal);
	});

	// Toggle Options
	jQuery('a.view-options').click(function (e) {
		e.preventDefault();
		var target = jQuery(this).data('target');
		jQuery(target).slideToggle();
	});

	//Update cart
/*
	jQuery('.update-qty').click(function (e) {
		e.preventDefault();
		saveItem([ITEM_ID],[LIST_ID]);
	});
*/
});

function submitForm(strAction) {
	window.document.body.style.cursor = 'wait';
	if (window.document.activeElement) { window.document.activeElement.style.cursor = 'wait'; }

	document.frmForm.action.value = strAction;
	document.frmForm.submit();
}

function removeItem(intWsiId, intListId) {
	var rep;
	var confirm_msg = $('#Delete_msg').val();
	rep = confirm(confirm_msg);
	if (!rep)
		return false;

	document.frmForm.wsiId.value = intWsiId;
	document.frmForm.k.value = intListId;
	submitForm('removeItem');
}

function addToCart(intWsiId, intListId) {
	var rep;
	var confirm_msg = $('#Confirm_msg').val();
	rep = confirm(confirm_msg);
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

