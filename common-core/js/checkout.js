jQuery(function() {
	if (window.innerWidth <= 767) {
    	jQuery('[data-target="#chkShoppingCartCollapse"]').addClass('collapsed');
		jQuery('#chkShoppingCartCollapse').removeClass('in');
    }
});