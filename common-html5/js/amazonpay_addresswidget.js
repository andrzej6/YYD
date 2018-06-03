// JavaScript source code
var orderReferenceID;
new OffAmazonPayments.Widgets.AddressBook({
	sellerId: strAmzLgPySellerID,
	design: {
	    designMode: 'responsive'
	},
	onOrderReferenceCreate: function (orderReference) {
		orderReferenceID = orderReference.getAmazonOrderReferenceId();
		jQuery("#orderreference").val(orderReferenceID);

	},
	onAddressSelect: function (orderReference) {
		// Optionally render the Wallet Widget
		var datareq = 'ajax=1&action=amazonpay_shipping&orderreference=' + orderReferenceID + '&access_token=' + getUrlVars()["access_token"];
		jQuery.ajax({
			url: 'amazonpay_ajax.asp',
			dataType: 'json',
			type: 'post',
			data: datareq,
			cache: false,
			async: true,
			success: function (data) {
				if (data.error == "") {
					if (data.billingfirstname != '')
						jQuery("#billing_firstname").val(data.billingfirstname);
					else
						jQuery("#billing_firstname").val('NA');

					jQuery("#billing_lastname").val(data.billinglastname);
					jQuery("#billing_address").val(data.address);
					jQuery("#billing_address2").val(data.address2);
					jQuery("#billing_city").val(data.city);
					jQuery("#billing_state").val(data.state);
					jQuery("#billing_zip").val(data.zip);
					jQuery("#billing_country").val(data.country);
					jQuery("#billing_phone").val(data.phone);
					jQuery("#billing_email").val(data.email);
					jQuery("#shipping_firstname").val(data.shippingfirstname);
					jQuery("#shipping_lastname").val(data.shippinglastname);
					jQuery("#shipping_address").val(data.address);
					jQuery("#shipping_address2").val(data.address2);
					jQuery("#shipping_city").val(data.city);
					jQuery("#shipping_state").val(data.state);
					jQuery("#shipping_zip").val(data.zip);
					jQuery("#shipping_country").val(data.country);
					jQuery("#shipping_phone").val(data.phone);
					if (jQuery("#billing_email2").val() == '') jQuery("#billing_email2").val(data.email);
					jQuery('#showEmailPassword').show();
					check_address('refresh');
				}
				else {
					jQuery("#shipping_state").val('');
					jQuery("#shipping_zip").val('');
					jQuery("#shipping_country").val('US');
					alert(data.error);
					check_address('shipping');
				}
			},
			failure: function (textstatus) {
				alert('Process did not complete - ' + textstatus);
			},
			error: function (jqXHR, textStatus) {
				document.body.style.cursor = '';
				if (jqXHR.statusCode > 0) {
					alert("Request process incomplete " + jqXHR.statusCode + " - " + jqXHR);
				}
			}
		});

	},
	onError: function (error) {
		// Write your custom error handling
		alert(error.getErrorMessage());
	}
}).bind("addressBookWidgetDiv");
function amazonLogout() {
	amazon.Login.logout();
	document.cookie = "amazon_Login_accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	window.location = 'view_cart.asp';
}

function lockAddressWidget() {
	new OffAmazonPayments.Widgets.AddressBook({
		sellerId: strAmzLgPySellerID,
		design: {
		    designMode: 'responsive'
		},
		displayMode: "Read",
		onError: function (error) {
			// Write your custom error handling
			alert(error.getErrorMessage());
		}
	}).bind("addressBookWidgetDiv");
}