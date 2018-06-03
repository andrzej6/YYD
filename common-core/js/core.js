var _3dThemeType = "core";
jQuery(function () {
	jQuery('.ajax-mailinglist form').submit(function () {
		mailing_list(this);
		return false;
	});

	jQuery('.product-item .quickview').click(function (e) {
	    e.preventDefault();
	    var productDiv = jQuery(this).parents('.product-item');
	    var catalogId = jQuery(productDiv).data('catalogid');
	    quickview("/product.asp?lt_c=1&itemid=" + catalogId + "&qv=1");
	});

	jQuery('.product-item[data-ajaxcart="1"] .add-to-cart').click(function (e) {
		e.preventDefault();
		jQuery(this).blur();
		var productDiv = jQuery(this).parents('.product-item');

		if (jQuery(productDiv).hasClass('ajaxcart-loading')) return;

		jQuery(productDiv).addClass('ajaxcart-loading');

		var catalogId = jQuery(productDiv).data('catalogid');

		var product = get_product(catalogId);

		var	stock = parseInt(product.Stock);
		var inventoryControl = parseInt(product.InventoryControl);
		var inventoryControlGlobal = parseInt(product.InventoryControlGlobal);

		if(stock <= 0) {
			if(inventoryControl != -1) {
				if(inventoryControl == 3) {
					window.location.href = product.ProductLink;
				}
			}
			else {
				if(inventoryControlGlobal == 3) {
					window.location.href = product.ProductLink;
				}
			}
		}

		var hasOptions = false;
		if (product.OptionSetList) {
			var product_options = JSON.parse(product.OptionSetList);
			if (product_options.length > 0) hasOptions = true;
		}

		if (isQuickviewEnabled() && hasOptions) {
			//quickview(product);
			quickview("/product.asp?lt_c=1&itemid=" + catalogId + "&qv=1");
			jQuery(productDiv).removeClass('ajaxcart-loading');
		}
		else if (!isQuickviewEnabled() && hasOptions) {
			window.location.href = "/" + product.ProductLink;
		}
		else {
			add_to_cart(product.CatalogID, product.SKU, 0, product.Price, 1, [], false, productDiv);
		}
	});

	//jQuery('#qv-modal .qv-addcart[data-ajaxcart="1"]').click(function (e) {
	//	e.preventDefault();
	//	jQuery(this).blur();
    //
	//	if (jQuery(productDiv).hasClass('ajaxcart-loading')) return;
    //
	//	var productDiv = jQuery('#qv-modal .product-item');
	//	jQuery(productDiv).addClass('ajaxcart-loading');
    //
	//	var catalogId = jQuery('#qv-modal [name="item_id"]').val();
	//	var sku = jQuery('#qv-modal [name="itemid"]').val();
	//	var price = jQuery('#qv-modal [name="std_price"]').val();
	//	var qty = jQuery('#qv-modal [name="qty-0"]').val();
	//	var JsonOptions = get_qv_options();
    //
	//	//Options Validation
	//	var qvOptionsValid = true;
	//	jQuery('.qv-option.required-option').each(function (index, element) {
	//		var optiontype = jQuery(element).data('optiontype');
    //
	//		switch (optiontype) {
	//			case 'radio':
	//				var radios = jQuery(element).find('input[type="radio"]');
	//				if (radios.filter(":checked").length <= 0) {
	//					qvOptionsValid = false;
	//				}
	//				break;
	//			case 'checkbox':
	//				var radios = jQuery(element).find('input[type="checkbox"]');
	//				if (radios.filter(":checked").length <= 0) {
	//					qvOptionsValid = false;
	//				}
	//				break;
	//			case 'select':
	//				var select = jQuery(element).find('select');
	//				if (!jQuery(select).val() || jQuery(select).val() == "") {
	//					qvOptionsValid = false;
	//				}
	//				console.log(jQuery(select).val());
	//				break;
	//		}
    //
	//	});
    //
	//	if (qvOptionsValid) {
	//		jQuery('#qvOptionsError').slideUp();
	//		add_to_cart(catalogId, sku, 0, price, qty, JsonOptions, false, productDiv);
	//	}
	//	else {
	//		jQuery(productDiv).removeClass('ajaxcart-loading');
	//		jQuery('#qvOptionsError').slideDown();
	//	}
	//});

	//Adjust height of grid items
	var maxHeightItem = 0;
	jQuery('div.product-items .product-item').each(function(index, element) {
		var height = jQuery(element).height();
		if (height > maxHeightItem) {
			jQuery(element).parents('div.product-items').attr('data-itemsHeight', height);
		}
	});
	jQuery('div.product-items').each(function (index, element) {
		var height = jQuery(element).attr('data-itemsHeight');
		if (height != undefined && height+"" != "") {
			jQuery(element).find('.product-item').height(height);
		}
	});
});

//Quickview status
function isQuickviewEnabled() {
    if (jQuery('body').hasClass('qv-enabled')) return true;
    else return false;
}

//Email validation
function validate_email(email) {
    var email_reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return email_reg.test(email);
}
//Mailing list API
function mailing_list(form) {
    var formDiv = jQuery(form).parent('.ajax-mailinglist');
    var callback = jQuery(formDiv).data('callback');
    var callfront = jQuery(formDiv).data('callfront');
    window[callfront](form);
    var email = jQuery.trim(jQuery(form).find('input[name="email"]').val());
    var action = jQuery(form).find('input[name="subscribe"]:checked').val();

    if (!validate_email(email)) {
        window[callback](form, 2); // 2: when email is invalid
        return;
    }

    jQuery.ajax({
        method: "POST",
        url: _cart_secure_url + '/mailing_list.asp?ajax=1',
        data: {
            email: email,
            action: action
        },
        success: function (data) {
            window[callback](form, data);
        },
        error: function () {
            window[callback](form, 0);
            return;
        }
    });
}

//Get product via API
function get_product(catalogId) {

	var product = false;

    jQuery.ajax({
        method: "POST",
        url: '/frontapi.asp',
        dataType: 'json',
        type: 'GET',
        cache: false,
        async: false,
        data: {
            productid: catalogId,
            limit: 1,
            module: 'products',
            offset: 1
        },
        success: function (data) {
        	product = data;
        },
        error: function (objResponse) {
			console.log(objResponse);
    		jQuery('.product-item').removeClass('ajaxcart-loading');
    		alert(GetErrorMessage("error.asp?error=902") +' (902)');
		}
    });
    return product;
}
//
function changeDropImage(select) {
	var img = jQuery(select).find(":selected").data('img');
	var target = jQuery(select).attr('name');
	jQuery('#' + target).attr('src', img);
}
//Quickview
function quickview(producturl) {

	jQuery('#qv-modal .product-item').css({ 'opacity': 0, 'min-height': 600 });
    jQuery('#qv-modal .qv-loader').show();
    jQuery('#qv-modal').modal('show');
    jQuery('#qvOptionsError').slideUp();

	hasFileOption = false;

	jQuery('#qv-modal iframe').attr('src', producturl);
	document.getElementById('qvIframe').style.height = 0;

	jQuery('#qv-modal iframe').load(function () {
		document.getElementById('qvIframe').style.height = (document.getElementById('qvIframe').contentWindow.document.body.scrollHeight + 20 ) + 'px';
		jQuery('#qv-modal .qv-loader').fadeOut(300);
		jQuery('#qv-modal .product-item').css({ 'opacity': 1, 'min-height': 0 });

	});
}

function add_to_cart(intCatalogID, strSKU, intCategoryID, intPrice, intQuantity, JsonOptions, qv, productDiv) {

    var formData = new FormData();
    formData.append('item_id', intCatalogID);
    formData.append('itemid', strSKU);
    formData.append('category_id', intCategoryID);
    formData.append('std_price', intPrice);
    formData.append('qty-0', intQuantity);
    for (var i = 0; i < JsonOptions.length; i++)
    	formData.append(JsonOptions[i].name, JsonOptions[i].id);

    var qryStr = '?module=addcartajax&ajaxadd=1';
    jQuery.ajax({
        url: '/frontapi.asp' + qryStr,
        dataType: 'json',
        type: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: function (data) {
            jQuery(productDiv).removeClass('ajaxcart-loading');

            if (data.AddedToCart == 1) {
                if (data.redirecturl.indexOf('view_cart.asp') >= 0 || data.redirecturl.indexOf('checkout.asp') >= 0) {
                    //If the add cart action is "view cart" or "checkout", it should take precedence over any other callback function.
                    window.location.href = data.redirecturl;
                    return;
                }
                

            	//Show quick cart if enabled
                if (jQuery('body').hasClass('qc-enabled')) {
					launch_qcart();
				}

            	//addcart_callback
				var callback = jQuery(productDiv).data('addcart-callback');
                window[callback](productDiv, data);
            }
            else {
            	if (data.errorurl != undefined) {
            		//window.location.href = data.errorurl;
					window.location.href = '/product.asp?itemid='+data.catalogid;
            	}
            	else {
            		window.location.href = '/error.asp?error=901';
            	}
            }
        },
        error: function (objResponse) {
        	jQuery(productDiv).removeClass('ajaxcart-loading');
        	window.location.href = '/error.asp?error=901';
        }
    });
}

function launch_qcart() {
	if (jQuery('#qcart-modal').length <= 0) {
		var modal = jQuery('<aside id="qcart-modal" class="qcart qcart-modal modal" tabindex="-1" role="dialog" data-backdrop="true"></aside>');
		jQuery(modal).append('<div class="modal-dialog" role="document"><div class="modal-vcenter"><div class="qv-loader"><span class="mailing-btn-load icon-spin2 animate-spin"></span></div><div class="modal-content"><button type="button" class="qv-close close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><iframe src="view_cart_quick.asp" id="qcart-Iframe" frameborder="0"></iframe></div></div></div>');
		jQuery(modal).appendTo('body');

		jQuery('#qcart-modal .modal-content').css({'opacity': 0, 'min-height': 600});
		jQuery('#qcart-modal .qv-loader').show();
		jQuery('#qcart-modal').modal('show');

		jQuery('#qcart-modal iframe').load(function () {
			document.getElementById('qcart-Iframe').style.height = document.getElementById('qcart-Iframe').contentWindow.document.body.scrollHeight + 'px';
			jQuery('#qcart-modal .qv-loader').fadeOut(300);
			jQuery('#qcart-modal .modal-content').css({'opacity': 1, 'min-height': 0 });
		});
	}
	else {
		jQuery('#qcart-modal .modal-content').css({'opacity': 0, 'min-height': 600});
		//jQuery('#qcart-modal .qv-loader').show();
		document.getElementById('qvIframe').src = document.getElementById('qvIframe').src;

		document.getElementById('qvIframe').style.height = 0;

		document.getElementById('qcart-Iframe').style.height = document.getElementById('qcart-Iframe').contentWindow.document.body.scrollHeight + 'px';
		jQuery('#qcart-modal .qv-loader').fadeOut(300);
		jQuery('#qcart-modal .modal-content').css({'opacity': 1, 'min-height': 0 });
		jQuery('#qcart-modal').modal('show');
	}
}

function get_qv_options() {
    var JsonOptions =[];

    jQuery('#qv-modal .options :checked, #qv-modal .options :selected').each(function () {

        if (jQuery(this).is("option")) {
            JsonOptions.push({
                "name": jQuery(this).parent().attr('name'),
                "id": jQuery(this).val()
    });
    }
        else {
            JsonOptions.push({
                "name": jQuery(this).attr('name'),
                "id": jQuery(this).val()
    });
        }

        });

    return JsonOptions;
}

/**
* Quick Cart
***********************/
jQuery(function () {
	if (window.location.search.indexOf("quickcart") != -1 || window.location.search.indexOf("quick") != -1) {
		launch_qcart();
	}
});
function closeQuickCartModal() {
    jQuery('#qcart-modal').modal('hide');
}


window.closeRewardWidgetModal = function(){
    jQuery('#divRewardWidgetModal').modal('hide');
};

/**
* Helper Functions
***********************/
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getVariableVal(varName) {
	return jQuery('#variablesVals').data(varName);
}

function removeMarkupTags(strString) {
	var strInputCode = strString;
	strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1) {
		return (p1 == "lt") ? "<" : ">";
	});
	var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
	strTagStrippedText = strTagStrippedText.replace(/\u00a0/g, '');
	strTagStrippedText = strTagStrippedText.replace(/&nbsp;/gi, '');
	return strTagStrippedText;
}

function GetErrorMessage(errorUrl) {
	var errorMsg = "";
	jQuery.ajax({
		url: errorUrl + '&ajax=1&hdnSecurityToken=[securityToken]',
		type: 'POST',
		dataType: 'json',
		cache: false,
		async: false,
		success: function (objResponse) {
			errorMsg = removeMarkupTags(objResponse.message);
		},
		error: function (objResponse) {
		    console.log(objResponse);
			errorMsg = "Something went wrong. Please try again.";
		}
	});
	return errorMsg;
}
function GetLanguagItem(itemName) {
	var languageItem = "";
	jQuery.ajax({
		url: 'error.asp?msgType=2&itemName=' + itemName,
		type: 'POST',
		dataType: 'json',
		cache: false,
		async: false,
		success: function (objResponse) {
			languageItem = objResponse.message;
		},
		error: function (objResponse) {
		    console.log(objResponse);
			languageItem = "Something went wrong. Please try again.";
		}
	});
	return languageItem;
}