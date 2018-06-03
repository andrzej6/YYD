// JavaScript source code
jQuery("#access_token").val(getUrlVars()["access_token"]);

new OffAmazonPayments.Widgets.Wallet({
	sellerId: strAmzLgPySellerID,
	amazonOrderReferenceId: orderReferenceID,
	onPaymentSelect: function (orderReference) {
		setAmazonPaymentDetails();
	},
	design: {
		designMode: 'responsive'
	},
	onError: function (error) {
		// your error handling code
		alert(error.getErrorMessage());
		//amazonLogout();
	}
}).bind("walletWidgetDiv");

function setAmazonPaymentDetails() {
		var datareq = 'ajax=1&action=amazonpay_payment&orderreference=' + orderReferenceID + '&access_token=' + jQuery("#access_token").val() + '&oamt=' + jQuery("#hdnBalance").val();
		jQuery.ajax({
			url: 'amazonpay_ajax.asp',
			dataType: 'json',
			type: 'post',
			data: datareq,
			cache: false,
			async: true,
			success: function (data) {
			if (data.error == "") {
				//check_address('refresh');
				}
			else
				console.log(data.error);
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
}

function reRenderPayWidget() {
	new OffAmazonPayments.Widgets.Wallet({
		sellerId: strAmzLgPySellerID,
		amazonOrderReferenceId: orderReferenceID,
		onPaymentSelect: function (orderReference) {
			setAmazonPaymentDetails();
	},
	design: {
		designMode: 'responsive'
	},
	onError: function (error) {
		// your error handling code
		alert(error.getErrorMessage());
		//amazonLogout();
	}
}).bind("walletWidgetDiv");
}