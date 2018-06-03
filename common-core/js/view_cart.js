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
	jQuery('.update-qty').click(function (e) {
		e.preventDefault();
		jQuery('#recalculate').submit();
	});

	//Remove promo
	jQuery('.remove-promo').click(function (e) {
		e.preventDefault();
		var promoId = jQuery(this).data('promoid');
		var form = jQuery('<form />').attr({ action: 'recalculate.asp?apply_coupon=2', method: 'post', class: 'hidden' });
		var input = jQuery('<input />').attr({ type: 'hidden', value: promoId, name: 'coupon' });
		jQuery(form).append(input);
		jQuery('body').append(form);
		jQuery(form).submit();
	});

	//ShipQuote
	jQuery('#calculate_button_go').click(function () {
		document.shipquote.shipping_zip.value = document.recalculate.shipping_zip.value;
		document.shipquote.submit();
	});
	jQuery('#ShipQuote-clear').click(function () {
		document.shipquote.action = 'shipquote.asp?action=clean';
		document.shipquote.submit();
	});
	//submits the form in case the user presses enter
	jQuery("#calculate_shipping_zip").keyup(function (event) {
		if (event.keyCode == 13) {
			jQuery("#calculate_button_go").click();
		}
	});

	//Show/Hide 3rd Party Payment Options section.
	if (jQuery('#thirdPartyPayment > div').length == 0) {
		jQuery('.third-party-payment').hide();
	}
	else {
		jQuery('.third-party-payment').show();
	}

	//Show/Hide cart modules
	jQuery('.module-expand').click(function (e) {
		e.preventDefault();
		var target = jQuery(this).data('target');
		if (jQuery(this).hasClass('expanded')) {
			jQuery(target).slideUp(500);
			jQuery(this).removeClass('expanded');
		}
		else {
			jQuery(target).slideDown(500);
			jQuery(this).addClass('expanded');
		}
	});

	//Show shipping calculate if quote items are there.
	if (jQuery('#ShipQuote-clear').length > 0) {
		jQuery('#shipping .module-content').slideDown(500);
		jQuery('#shipping h4.module-expand').addClass('expanded');
	}
	if (jQuery('#shipquoteint-clear').length > 0) {
		jQuery('.shipQuoteInt .module-content').slideDown(500);
		jQuery('.shipQuoteInt h4.module-expand').addClass('expanded');
	}

	//Sticky sidebar
	jQuery('#cart-box').waypoint({
		handler: function (direction) {
			if (direction == 'down') {
			    var cartBoxHeight = jQuery('.cart-box-sticky').height();
			    var offsetHeight = $('.sticky-header').height();
				jQuery('#cart-box').css('padding-top', cartBoxHeight + 15);
				jQuery('#cart-box').addClass('fixed-cart-box');
				jQuery('.cart-box.fixed-cart-box .cart-box-sticky').css('top', offsetHeight)
			}
			else {
				jQuery('#cart-box').removeAttr('style');
				jQuery('#cart-box').removeClass('fixed-cart-box');
			}
		},
	    offset: function() {
	        return $('.sticky-header').height();
	    }

	});

	//sticky checkout
	jQuery('#mobile-sticky-checkout').waypoint({
		handler: function (direction) {
			if (direction == 'down') {
				jQuery('#mobile-sticky-checkout').addClass('sticky-checkout');
			}
			else {
				jQuery('#mobile-sticky-checkout').removeClass('sticky-checkout');
			}
		}
	});

	//clear shipquoteint values
	jQuery('#shipquoteint-clear').click(function () {
		document.shipquote.action = 'shipquote.asp?action=clean';
		document.shipquote.submit();
	});
});



(function () {
	// store the slider in a local variable
	var $window = $(window),
		flexslider = { vars: {} };

	// tiny helper function to add breakpoints
	function getGridSize() {
		return (window.innerWidth <= 567) ? 1 :
			   (window.innerWidth < 992) ? 2 : 3;
	}

	$window.load(function () {
		$('.flexslider').flexslider({
			animation: "slide",
			controlNav: false,
			keyboard: false,
			itemWidth: 210,
			itemMargin: 0,
			minItems: getGridSize(), // use function to pull in initial value
			maxItems: getGridSize() // use function to pull in initial value
		});

		setTimeout(function () {
			window.dispatchEvent(new Event('resize'));
		}, 100);
	});

	// check grid size on resize event
	$window.resize(function () {
		var gridSize = getGridSize();

		flexslider.vars.minItems = gridSize;
		flexslider.vars.maxItems = gridSize;
	});
}());
