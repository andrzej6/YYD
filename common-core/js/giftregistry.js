//GR Details Scripts
function submitForm(strAction)
{
	window.document.body.style.cursor = 'wait';
	if(window.document.activeElement){window.document.activeElement.style.cursor='wait'; }
	
	document.frmForm.action.value = strAction;
	document.frmForm.submit();
}
	  
function removeItem(intWsiId)
{
	var rep;
	rep = confirm(getVariableVal('giftregistry_view-message-removeitem'));
	if (!rep)
		return false;
	
	document.frmForm.wsiId.value = intWsiId;
	submitForm('removeItem');
}

function saveItem(intWsiId)
{
	var qty = document.getElementById("txtQty" + intWsiId).value;

	document.frmForm.wsiId.value = intWsiId;
	submitForm('saveItem');
}

function addToCart(intWsiId)
{
    jQuery.ajax({
        url: 'view_giftregistry.asp',
        dataType: 'html',
        data: 'action=isCartAlreadyHaveItemFromOtherGiftRegistry&id=' + getVariableVal('custid') + '&wsiId=' + intWsiId,
        type: 'POST',
        async: false,
        cache: false,
        success: function (bolResult) {
            if (bolResult === 'True') {
            	alert(getVariableVal('giftregistry_view-can-not-add-from-two-gr'));
                return false;
            }
            else
            {
                var rep;
                rep = confirm(getVariableVal('wishlist_viewwishlist-message-addtocart'));
                if (!rep)
                    return false;

                document.frmForm.wsiId.value = intWsiId;
                submitForm('addToCart');
            }
        },
        error: function () {
        	alert("Error: "+ getVariableVal('giftregistry_view-can-not-add-from-two-gr'));
        }
    });
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

});

//GR List Scripts
var addReplyClick = 0;
function submitForm2(strAction) {
	window.document.body.style.cursor = 'wait';
	if (window.document.activeElement) { window.document.activeElement.style.cursor = 'wait'; }

	document.frmForm.action2.value = strAction;
	document.frmForm.submit();
}


function sendEmail() {
	var strMsg = "";
	var strEmail1 = document.frmForm.txtEmail1.value.trim();
	var strEmail2 = document.frmForm.txtEmail2.value.trim();
	var strEmail3 = document.frmForm.txtEmail3.value.trim();
	var strEmail4 = document.frmForm.txtEmail4.value.trim();
	var strEmail5 = document.frmForm.txtEmail5.value.trim();
	var strEmail6 = document.frmForm.txtEmail6.value.trim();

	//Empty
	if (strEmail1 == "" && strEmail2 == "" && strEmail3 == "" && strEmail4 == "" && strEmail5 == "" && strEmail6 == "")
		strMsg += " - You need to fill at least one " + getVariableVal('giftregistry_header-invitation-emailaddress') + ".\n"

	//Valid E-mail
	if (strEmail1 != "" && !isValidEmail(strEmail1))
		strMsg += " - The 1st " + getVariableVal('giftregistry_header-invitation-emailaddress') + " is invalid.\n"
	if (strEmail2 != "" && !isValidEmail(strEmail2))
		strMsg += " - The 2nd " + getVariableVal('giftregistry_header-invitation-emailaddress') + " is invalid.\n"
	if (strEmail3 != "" && !isValidEmail(strEmail3))
		strMsg += " - The 3rd " + getVariableVal('giftregistry_header-invitation-emailaddress') + " is invalid.\n"
	if (strEmail4 != "" && !isValidEmail(strEmail4))
		strMsg += " - The 4th " + getVariableVal('giftregistry_header-invitation-emailaddress') + " is invalid.\n"
	if (strEmail5 != "" && !isValidEmail(strEmail5))
		strMsg += " - The 5th " + getVariableVal('giftregistry_header-invitation-emailaddress') + " is invalid.\n"
	if (strEmail6 != "" && !isValidEmail(strEmail5))
		strMsg += " - The 6th " + getVariableVal('giftregistry_header-invitation-emailaddress') + " is invalid.\n"

	if (strMsg != "") {
		alert(strMsg);
		return false;
	}
	if (addReplyClick == 0) {
		addReplyClick = 1;
		submitForm2('sendEmail');
	}
}
String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, "");
}
function isValidEmail(str) {
	return (str.indexOf(".") > 2) && (str.indexOf("@") > 0);
}
function previewMessage() {
//	window.open('', 'PreviewMessage', 'width=730px, location=no, menubar=no, status=no, toolbar=no, scrollbars=yes, resizable=yes');
	// console.log('open modal');
	jQuery('#myModal').modal('show').find('.modal-body').load('');
}

//JS script
