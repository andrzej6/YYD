function printInvoiceModal() {
	jQuery.modal('<iframe src="/ordertracking.asp?action=printInvoiceModal" height="600" width="800" style="border:0">', {
		closeClass: 'modalCloseImg',
		closeHTML: '<a href="#">Close</a>',
		containerCss: {
			backgroundColor: "#fff",
			borderColor: "#fff",
			padding: 0,
			minHeight: 600,
			minWidth: 800
		},
		overlayClose: true,
		onShow: function (dialog) {
			dialog.wrap.css('overflow', 'hidden');
		}
	});
}

function printInvoice() {
	$('#checkoutStep4').show().printElement();
}

$(function () {
	calcHeight();
});

/* On the window resize event. */
jQuery(window).resize(function () {
	calcHeight();
});

/* On the device orientation change event. */
jQuery(window).bind('orientationchange', function (event) {
	calcHeight();
});

function calcHeight() {
	jQuery('.height').css('min-height', 'auto');
	if(window.innerWidth > 991 ) {
		var highestCol = jQuery('.billingBlock.height').outerHeight();
		jQuery('.height').css('min-height', highestCol);
	}
}