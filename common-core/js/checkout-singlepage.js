jQuery(function () {
	showHideShipping();

	jQuery('input.sameAsBilling').change(function () {
		jQuery('#sameAsBilling').click();
	});

	jQuery('#billing_state').change(function () {
		check_address('billing');
	});
	jQuery('#save_address').change(function () {
		check_address('shipping');
	});
	jQuery('#shipping_country').change(function () {
		var CustomerInfo_state = jQuery(this).data('CustomerInfo_state');
		populateState('shipping_state', 'shipping_country', '', true, CustomerInfo_state);
		check_stateValidator('billing'); 
		check_address('billing');
	});

	if(jQuery('#registerGuest').length <= 0) {
		jQuery('#passwordFields').slideDown(0);
	}

	jQuery('#registerGuest').change(function() {
		if(jQuery('#registerGuest').prop('checked')) {
			jQuery('#passwordFields').slideDown(0);
		}
		else {
			jQuery('#passwordFields').slideUp(0);
		}
	});
});