jQuery(function () {
    jQuery('#sortby').on('change', function () {
        jQuery('#frmsortby').submit();
    });
});

(function () {
	// store the slider in a local variable
	var $window = $(window),
		flexslider = { vars: {} };

	// tiny helper function to add breakpoints
	function getGridSize() {
		return (window.innerWidth <= 567) ? 1 :
			   (window.innerWidth < 992) ? 2 : 4;
	}

	$window.load(function () {
		$('.product-carousel').flexslider({
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

// Equal heights of the category blocks
jQuery(function () {
	var maxHeight = -1;

	jQuery('div.cat-filters div').each(function () {
		maxHeight = maxHeight > jQuery(this).height() ? maxHeight : jQuery(this).height();
	});

	jQuery('div.cat-filters div').each(function () {
		jQuery(this).height(maxHeight);
	});
});

function setCatFilter(strFilter, objForm, removeSubsequent) {
	strFilter = decodeURIComponent(strFilter);
	if (removeSubsequent) {
		//alert(strFilter);
		objForm.hdnCatFilter.value = strFilter;
	} else {
		objForm.hdnCatFilter.value = objForm.hdnCatFilter.value + '@' + strFilter;
	}
	//alert(objForm.hdnCatFilter.value);
	objForm.submit();
}

function removeCatFilter() {
	var objForm = document.frmsortby;
	objForm.hdnCatFilter.value = "";
	objForm.submit();
}