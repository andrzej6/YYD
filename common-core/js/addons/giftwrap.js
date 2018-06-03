jQuery(function () {
	// Gift Wrap
	jQuery('.giftwraplink a').click(function (e) {
		e.preventDefault();
		var itemid = jQuery(this).data("itemid");
		showGiftWrap(itemid);
	});

});

function countChar(val) {
	var len = val.length;
	if (len >= 400) {
		val.value = val.value.substring(0, 400);
	}
	else {
		jQuery('#spnChars').text(400 - len);
	}
}

function reportGWError(jqXHR, textStatus) {
	if (jqXHR.status > 0) {
		alert("Error processing request, please try again.");
		//alert(jqXHR.responseText);
		//alert(jqXHR.status + " - " + jqXHR);
	}
}

function updateGiftWrapOption() {
	//USED TO UPDATE THE MIDDLE div with the option selected from the giftwrap dropdown.
	var url = '';
	var params = '';

	params = 'id=' + jQuery('#giftwrap_id').val() + '&action=2'; // document.getElementById('giftwrap_id').value + '&action=2';

	url = 'giftwrap_ajax.asp?' + params + '&no-cache=' + Math.random();

	//window.location = url;

	jQuery.ajax({
		url: url,
		dataType: 'html',
		type: 'GET',
		cache: false,
		success: function (strResult) {
			if (strResult == '') {
				//alert('[productqa_helpful-notupdated]');
			}
			else {
				jQuery('#divGiftwrapItem').html(strResult);
			}
		},
		error: reportGWError
	});

}

function cmdGWAdd_Click() {
	var url = '';
	var params = '';
	var id = document.getElementById('giftwrap_id').value;

	if (id == '') {
		alert(jQuery('#giftwrap_pleaseselect').val());
		return (false);
	}

	params = 'parentid=' + parentid;
	params += '&id=' + id;
	params += '&action=3';
	params += '&giftwrap_message=' + document.getElementById('giftwrap_message').value;

	url = 'giftwrap_ajax.asp?' + params + '&no-cache=' + Math.random();

	//window.location = url;

	jQuery.ajax({
		url: url,
		dataType: 'html',
		type: 'GET',
		cache: false,
		success: function (strResult) {
			jQuery("#divGiftWrap").modal('hide');
			window.location = 'view_cart.asp';
		},
		error: reportGWError
	});
}
function showGiftWrap(itemid) {
	//used to display the modal box
	var url = '';
	var params = '';

	params = 'id=' + itemid + '&action=1';
	//SAVE THE ID OF HE ITEM BEING GIFTWRAPPED 
	parentid = itemid;

	url = 'giftwrap_ajax.asp?' + params + '&no-cache=' + Math.random();

	//window.location = url;

	jQuery.ajax({
		url: url,
		dataType: 'html',
		type: 'GET',
		cache: false,
		success: function (strResult) {
			if (strResult == '') {
				//alert('[productqa_helpful-notupdated]');
			}
			else {

				jQuery('#divGiftWrap').replaceWith(strResult);
				jQuery("#divGiftWrap").modal('show');
				jQuery('#cmdGWAdd').click(function () {
					cmdGWAdd_Click();
				});
				jQuery('#giftwrap_message').keyup(function () {
					countChar(jQuery(this).val());
				});
			}
		},
		error: reportGWError
	});
}