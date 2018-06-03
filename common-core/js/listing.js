//messagebar.js initialized
var reqOptionBar = new MessageBar();
reqOptionBar.initialize();

jQuery(function () {
	//Quantity box
	jQuery('.qty-input .qty-up').click(function () {
		var qtyInput = jQuery(this).data('target');
		var incrementedVal = parseInt(jQuery(qtyInput).val()) + 1;
		jQuery(qtyInput).val(incrementedVal);
	});
	jQuery('.qty-input .qty-down').click(function () {
		var qtyInput = jQuery(this).data('target');
		var incrementedVal = parseInt(jQuery(qtyInput).val()) - 1;

		if (incrementedVal <= 1) incrementedVal = 1;
		jQuery(qtyInput).val(incrementedVal);
	});

	//Activate popover
	jQuery('[data-toggle="popover"]').popover();

	//Carousel for extra product images
	jQuery(window).load(function () {
		jQuery('.flexslider').flexslider({
			animation: "slide",
			animationLoop: true,
			slideshow: false,
			controlNav: false,
			itemWidth: 50,
			minItems: 4,
			maxItems: 4,
			itemMargin: 0,
			prevText: "",
			nextText: ""
		});

		setTimeout(function () {
			window.dispatchEvent(new Event('resize'));
			jQuery('#addl-images').addClass('addl-images-ready');
		}, 100);
	});


	//Responsive Tabs initialized
	if (jQuery('#rTabs > ul > li').length > 0) {
		jQuery('#rTabs').responsiveTabs({
			active: 0,
			rotate: false,
			startCollapsed: 'accordion',
			collapsible: 'accordion',
			setHash: false
		});
	
		if (document.body.clientWidth < 767) {
			jQuery('span.pipe').hide();
			jQuery('#rTabs').responsiveTabs('activate', 0);
		}
		if (document.body.clientWidth < 767) {
			jQuery('span.pipe').hide();
			jQuery('#rTabs').responsiveTabs('activate', 0);
		}
	}
	//Show realmedia on load if no product image is present
	if (jQuery('#main-image').length <= 0) {
		jQuery('#realmediaBlock').show();
	}

	//Show/Hide realmedia
	jQuery('.prod-thumb').click(function (e) {
		var aThumb = jQuery(this).find('a');

		if (jQuery(aThumb).attr('id') == 'showRealMedia') {
			jQuery('#main-image').hide();
			jQuery('#realmediaBlock').show();
		}
		else {
			jQuery('#realmediaBlock').hide();
			jQuery('#main-image').show();

			var caption = jQuery(aThumb).attr('title');
			jQuery('#imagecaptiont').text(caption);
		}
	});

	//Go to reviews tab
	jQuery('#review_count').click(function (e) {
		e.preventDefault();
		jQuery('#reviewsTab a').click();

		jQuery('html, body').animate({
			scrollTop: $("#tab-4").offset().top
		}, 1000);
	});
});


//Product Tabs
function viewTabs() {
	jQuery('html, body').animate({ scrollTop: jQuery('#rTabs').position().top }, 'fast');
}

(function () {
	// store the slider in a local variable
	var $window = jQuery(window),
		flexslider = { vars: {} };

	// tiny helper function to add breakpoints
	function getGridSize() {
		return (window.innerWidth <= 567) ? 1 :
				(window.innerWidth < 992) ? 2 : 4;
	}

	$window.load(function () {
		jQuery('.product-carousel').flexslider({
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


/**
* Old listing
***********************/
function popup(filename, width, height) {
	result = window.open(filename, "popped1", "width=" + width + ", height=" + height + ", location=no, menubar=no, status=no, toolbar=no, scrollbars=yes, resizable=no");
	if (result != null) html = "is not blocking";
	else alert("Your Browser is blocking popups which is preventing a 3dCart window to appear.");
}

function popupsimple(filename, width, height) {
	var w = 480, h = 340;

	if (document.all || document.layers) {
		w = screen.availWidth;
		h = screen.availHeight;
	}

	var leftPos = (w - width) / 2, topPos = (h - height) / 2;
	result = window.open(filename, "popped1", "width=" + width + ", height=" + height + ",top=" + topPos + ",left=" + leftPos + ",location=no, menubar=no, status=no, toolbar=no, scrollbars=no, resizable=no");
	if (result != null) html = "is not blocking";
	else alert("Your Browser is blocking popups which is preventing a 3dCart window to appear.");
}

var stocknum = '';

function SearchAndReplace(Content, SearchFor, ReplaceWith) {

	var tmpContent = Content;
	var tmpBefore = new String();
	var tmpAfter = new String();
	var tmpOutput = new String();
	var intBefore = 0;
	var intAfter = 0;

	if (SearchFor.length == 0)
		return;


	while (tmpContent.toUpperCase().indexOf(SearchFor.toUpperCase()) > -1) {

		// Get all content before the match
		intBefore = tmpContent.toUpperCase().indexOf(SearchFor.toUpperCase());
		tmpBefore = tmpContent.substring(0, intBefore);
		tmpOutput = tmpOutput + tmpBefore;

		// Get the string to replace
		tmpOutput = tmpOutput + ReplaceWith;


		// Get the rest of the content after the match until
		// the next match or the end of the content
		intAfter = tmpContent.length - SearchFor.length + 1;
		tmpContent = tmpContent.substring(intBefore + SearchFor.length);

	}

	return tmpOutput + tmpContent;

}

function Len(str)
	/***
	IN: str - the string whose length we are interested in
		
	RETVAL: The number of characters in the string
	***/
{ return String(str).length; }


function Left(str, n)
	/***
	IN: str - the string we are LEFTing
	n - the number of characters we want to return
		
	RETVAL: n characters from the left side of the string
	***/ {
	if (n <= 0) // Invalid bound, return blank string
		return "";
	else if (n > String(str).length) // Invalid bound, return
		return str; // entire string
	else // Valid bound, return appropriate substring
		return String(str).substring(0, n);
}


function Right(str, n)
	/***
	IN: str - the string we are RIGHTing
	n - the number of characters we want to return
		
	RETVAL: n characters from the right side of the string
	***/ {
	if (n <= 0) // Invalid bound, return blank string
		return "";
	else if (n > String(str).length) // Invalid bound, return
		return str; // entire string
	else { // Valid bound, return appropriate substring
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}


function Mid(str, start, len) {
	// Make sure start and len are within proper bounds
	if (start < 0 || len < 0) return "";

	var iEnd, iLen = String(str).length;
	if (start + len > iLen)
		iEnd = iLen;
	else
		iEnd = start + len;

	return String(str).substring(start, iEnd);
}

function InStr(strSearch, charSearchFor) {
	for (i = 0; i < Len(strSearch) ; i++) {
		if (charSearchFor == Mid(strSearch, i, 1)) {
			return i;
		}
	}
	return -1;
}



var listing_elemLenght = -1;

function validateValues(what, alerting, form_id) {
	var valid = true;
	var fieldnamemod = new String();
	var fieldvaluemod = new String();
	var checkBoxes = false;
	var checkboxChecked = false;
	var price= 0;
	var radioButtons = false;
	var radioChecked = false;
	var imagename= new Image;
	var itemid;
	var customTag;
    var isValidateExecuted = false;
    var intRewardsPointsOriginal = 0;
    var intRewardsPointsBundleOption = 0;
    var strRewardsButtonText = '';

	stocknum = '';

	if(what.std_price==null) {
	    //'Item has no options.
	}
	else {
		price =what.std_price.value; //document.add.std_price.value;

        var isRewardProduct = (document.add.reward_product != undefined && document.add.reward_product.value > 0);
        if (isRewardProduct) {
            intRewardsPointsOriginal = eval(document.add.reward_product.value)
            strRewardsButtonText = document.add.reward_text.value;
        }

		if (price == 0 && form_id != null && form_id != undefined)
			return;

		if (what.itemid != null)
			itemid=what.itemid.value;
		else
			itemid="";

		listing_elemLenght = what.elements.length;
		for (var i = 0, j = listing_elemLenght; i < j; i++) {
			myType = what.elements[i].type;

			try {
				customTag = what.elements[i].getAttribute("customoption"); 
			}
			catch (e) { customTag = null; }

			if(myType != null && myType != undefined && customTag == null) {
			    fieldnamemod = what.elements[i].name;
			    if (fieldnamemod != '' && fieldnamemod != 'recipientselect' && fieldnamemod != 'reminder' && fieldnamemod != 'qty-0' && fieldnamemod != 'recurring_frequency' && fieldnamemod != 'item_id') {
					var field_array;

			        // IMAGE dropdown's
			        //alert(fieldnamemod + fieldnamemod.indexOf("di_"));
					if (fieldnamemod.indexOf("di_") > -1) {
						// Have its own image per drop down
						SetSrc(what, "img_"+fieldnamemod, GetValue(what, "image_"+what.elements[i].options[what.elements[i].selectedIndex].value, form_id), form_id);
			            //don't process the price, because it'll be considered below when the dropdown option is parsed.
			        }

					if (myType == 'radio' && fieldnamemod != 'wishlist-optListType') {
						radioButtons = true;
						if (what.elements[i].checked) {
							radioChecked = true;
							price=eval(price) +eval(GetValue(what, "price_"+what.elements[i].value, form_id));
							itemid = (itemid) +GetValue(what, "OptID_"+ what.elements[i].value, form_id);
							stocknum=stocknum +what.elements[i].value + "#";
							if(!isValidateExecuted && isRewardProduct && (eval(GetValue(what, "reward_" + what.elements[i].value)) != undefined))
							    intRewardsPointsBundleOption = intRewardsPointsBundleOption + eval(GetValue(what, "reward_" + what.elements[i].value));
						}
						recalculateRewardPoints(price);
					}
					if (myType == 'checkbox') {
						checkBoxes = true;
						if (what.elements[i].checked) {
							if (fieldnamemod>"")
								price=eval(price) +eval(GetValue(what, "price_" +fieldnamemod, form_id));
							itemid = (itemid) +GetValue(what, "OptID_" +fieldnamemod, form_id);
						}
						recalculateRewardPoints(price);
                    }

					if (myType == 'hidden' || myType == 'password' || myType == 'text' || myType == 'textarea')
						if (what.elements[i].value == what.elements[i].defaultValue) valid = false;
					
					if (myType == 'select-one' || myType == 'select-multiple') {
                        if (what.elements[i].name.indexOf("otf_") < 0 && what.elements[i].options[what.elements[i].selectedIndex].value > "") {
                            fieldvaluemod = what.elements[i].options[what.elements[i].selectedIndex].value;
                            stocknum = stocknum +fieldvaluemod + "#";
							price=eval(price) +eval(GetValue(what, "price_" +what.elements[i].options[what.elements[i].selectedIndex].value));
                            itemid=itemid+ '' + GetValue(what, "OptID_" +what.elements[i].options[what.elements[i].selectedIndex].value);
                            if (!isValidateExecuted && isRewardProduct && (eval(GetValue(what, "reward_" +what.elements[i].value)) != undefined))
                                intRewardsPointsBundleOption = intRewardsPointsBundleOption +eval(GetValue(what, "reward_" +what.elements[i].value));
                        }
                        recalculateRewardPoints(price);
					}
				}
			}
		}
		if (isRewardProduct) {
			if (!isValidateExecuted) {
				strRewardsButtonText = strRewardsButtonText.replace("[reward_redeem]", intRewardsPointsOriginal +intRewardsPointsBundleOption);
		        document.getElementById("btnRedeemText").innerHTML = strRewardsButtonText;
                isValidateExecuted = true;
		    }
		}
		if ((checkBoxes && !checkboxChecked) || (radioButtons && !radioChecked)) valid = false;

		changeprice(price, form_id);
		changeid(itemid);
		if (alerting==1) {
			return check_stock(what, stocknum);
		}
			    //return valid;
	}
}

function recalculateRewardPoints(price)
    {
    if (document.getElementById("customPoints") != null) {
        var customPoints = parseInt(document.getElementById("customPoints").value);

        if (customPoints == 0)
            {
            if (document.getElementById("pointsMultiplier").value != null)
    {
        var pointsMultiplier = parseInt(document.getElementById("pointsMultiplier").value);
                var intPoints = Math.round(pointsMultiplier * price);

    if (document.getElementById("productRewardDesc").value != null)
        { 
                    var rewardItem = document.getElementById("productRewardDesc").value;
                    rewardItem = rewardItem.replace("[rewardsPointsValue]", intPoints);

                    if (document.getElementById("divRewardPoint").innerHTML != null)
                        document.getElementById("divRewardPoint").innerHTML = rewardItem;
                    }
                }
        }
    }
}



function changeid(itemid) {
	var txt = itemid
	changecontent('product_id', txt);
}


function GetValue(formx, name, form_id) {
    var element;
    if (form_id != undefined && form_id != null)
        element = jQuery("#add" + form_id + " input[name='" + name + "']");
		else
		element = document.getElementsByName(name);

	if (element != null && element != undefined && element.length > 0)
		if (form_id != undefined && form_id != null)
			return (element[0].value);
			else
			return (element.item(0).value);

	var i;
	for (i = 0; i < listing_elemLenght; i++) {
		if (formx.elements[i].name == name) {
			return formx.elements[i].value;
}
}
}

var listing_imgslength = -1;

function SetSrc(formx, sname, sourcename, form_id) {
	var element, imgs;
	if (form_id != undefined && form_id != null)
		element = jQuery("#add" + form_id + " input[name='" + sname + "']");
	else
		element = document.getElementsByName(sname);

	if (element != null && element != undefined && element.length > 0) {
		if (element.length > 0)
			element.item(0).src = sourcename;
		return;
	}

	if (form_id != undefined && form_id != null)
		imgs = jQuery("#add" + form_id + " img");
	else
		imgs = document.getElementsByTagName('img');

	if (listing_imgslength == -1)
		listing_imgslength = imgs.length;

	for (i = 0; i < listing_imgslength; i++) {
		if (imgs[i].name == sname)
			imgs[i].src = sourcename;
	}
}


function recalculate() {
}


function changecontent(fieldname, content1) {
	var txt = content1;

	if (document.getElementById) {
		if (document.getElementById(fieldname) != null) {
			document.getElementById(fieldname).innerHTML = txt;
			document.getElementById(fieldname).style.visibility = 'visible';
		}
	}
	else if (document.all) {
		if (document.all[fiendname] != null) {
			document.all[fiendname].innerHTML = txt;
			document.all[fieldname].style.visibility = 'visible';
		}
	}
	else if (document.layers) {

		if (document.layers[fieldname] != null) {
			document.layers[fieldname].document.open();
			document.layers[fieldname].document.write(txt);
			document.layers[fieldname].document.close();
			document.layers[fieldname].visibility = 'show';
		}
	}
}


function changegtin(gtin) {
    var txt = gtin
    changecontent('product_gtin', txt);
}

function changeprice(price, form_id) {
	var txt = formatCurrency(price);
	var currency_symbol_aux;
	try {
		if (currency_symbol != null && currency_symbol != undefined)
			currency_symbol_aux = currency_symbol;
	}
	catch (err) {
		currency_symbol_aux = "$"
	}

	var difference = 0;
	if (document.getElementById("std_price_novat") != null) {
		var price_novat = parseFloat(document.getElementById("std_price_novat").value);
		var vattaxrate = parseFloat(document.getElementById("vat_tax_rate").value);
		var price_vatformat = document.getElementById("vat_tax_price_format").value;
		var priceAux = price;
		if (vattaxrate >= 0) {
			var priceAux = price_novat + (price_novat * (vattaxrate / 100));
			txt = price_vatformat;
			txt = txt.replace("[price_vat]", formatCurrency(price));
			currency_symbol = '';
			// ----------------------------
			// Added this on 2/10/2014 to test - FM
			difference = price - priceAux; //Find the option value and remove the VAT, so we can display the item amount without VAT
			difference = difference / (1 + (vattaxrate / 100));
			price_novat = price_novat + difference;
			// ----------------------------
			currency_symbol = currency_symbol_aux;
			txt = txt.replace("[price_novat]", formatCurrency(price_novat));
			txt = txt.replace("[currency]" + currency_symbol_aux, currency_symbol_aux);
			txt = txt.replace("[currency]", currency_symbol_aux);
		}
	}

	if (form_id != undefined && form_id != null)
		changecontent('price' + form_id, txt);
	else
		changecontent('price', txt);
}

function formatCurrency(intNumber) {

    var currencySymbol;	//This variable gets the value of the currency_symbol variable declared on listing_x page template...
    var decimalPlaces;  //This variable gets the value of the prod_decimal_places variable declared on listing_x page template...
    try {
		currencySymbol = currency_symbol;
}
catch (err)
    {
		currencySymbol = '$';	//If there's no variable declared, uses '$' as default.
	}
	try
	    {
            decimalPlaces = parseInt(prod_decimal_places);
            }
        catch (err)
                {
            decimalPlaces = 2;	//If there's no variable declared, uses '$' as default.
            }

        intNumber = parseFloat(intNumber);	//Remove zeros on the right side
        intNumber = intNumber.toString();

        if (decimalPlaces > 2) {
            if (decimalPlaces -(intNumber.length -(intNumber.indexOf(".") +1)) > 0)
                decimalPlaces = intNumber.length -(intNumber.indexOf(".") +1);
            if (decimalPlaces < 2)
			decimalPlaces = 2;
			}

	if (decimalPlaces > 0)
	    return formatNumberListing(intNumber, decimalPlaces, ',', '.', currencySymbol, '', '', '');
	    else
	    return formatNumberListing(intNumber, decimalPlaces, '', '', currencySymbol, '', '', '') 
}
function formatNumberListing(num, dec, thou, pnt, curr1, curr2, n1, n2) { var x = Math.round(num * Math.pow(10, dec)); if (x >= 0) n1 = n2 = ''; var y = ('' + Math.abs(x)).split(''); var z = y.length - dec; if (z < 0) z--; for (var i = z; i < 0; i++) y.unshift('0'); if (z < 0) z = 1; y.splice(z, 0, pnt); if (y[0] == pnt) y.unshift('0'); while (z > 3) { z -= 3; y.splice(z, 0, thou); } var r = curr1 + n1 + y.join('') + n2 + curr2; return r; }


/**
* Old functions
***********************/

// Check stock
function check_stock(what, partnum) {
	var soption;
	var i;
	var product_availability = jQuery('#availability').val();
	var backordermode = jQuery("#allowbackorder").val();
	var advanceoption_waitlist = jQuery("#allowadvancedoption_waitlist").val();

	var avail_instock = jQuery("#productAvailability-Instock").val();
	var avail_outofstock = jQuery("#productAvailability-Outofstock").val();
	var avail_backorder = jQuery("#productAvailability-Backorder").val();

	var catalogid = jQuery('#catalogid').val();
	var optionfound = 0;

	var inventoryarray = window['inventoryarray' + catalogid];
	var idarray = window['idarray' + catalogid];
	var aopricearray = window['aopricearray' + catalogid];
	var gtinarray = window['gtinarray' + catalogid];

	var availabilityBar = new MessageBar();
	availabilityBar.initialize();

	if (typeof inventoryarray == 'undefined' || inventoryarray.length == 0) //if there is no advanced options, don't look for stock
	{
		return true;
	} else {
		for (i = 0; i < inventoryarray.length; i++) {
			soption = inventoryarray[i];
			field_array = soption.split("-");
			//Dynamic Part for advanced options
			if (typeof (idarray) != "undefined") {
				soptionid = idarray[i];
				aoprice = aopricearray[i];
				aogtin = gtinarray[i];
				if (field_array[0] == partnum) {
					if (soptionid != '') {
						changeid(soptionid);
						jQuery("#itemid_advancedoption").val(soptionid);
					}

					if (aoprice != '0')
					    changeprice(aoprice);
					if (aogtin != '')
					    changegtin(aogtin);
				}
			}

			if ((field_array[0] == partnum)) {
				changecontent("product_inventory", field_array[1]);
				if (eval(GetValue(what, "qty-0")) > field_array[1] || (eval(GetValue(what, "qty-0")) == undefined && advanceoption_waitlist == '1')) {
					optionfound = optionfound + 1;
					if (backordermode == 1) {
						changecontent("availability", avail_backorder);
						return true;
						optionfound = optionfound + 1;
					} else {
						changecontent("availability", avail_outofstock);

						if (advanceoption_waitlist == "1") {
							jQuery("#divAddToCart").slideUp();
							availabilityBar.alert('The options you selected are not currently available.');
							jQuery("#divWaitlist_AdvancedOptions").slideDown();
							return true;
						}

						//alert("The options you selected are not currently available.");
						availabilityBar.alert('The options you selected are not currently available.');
						optionfound = optionfound + 2;
						return false;
					}
				} else {
					jQuery("#divWaitlist_AdvancedOptions").slideUp();
					jQuery("#divAddToCart").slideDown();
				}

			}
		}

		if (optionfound == 0) {
			changecontent("availability", product_availability);
			return true;
		}

		if (optionfound == 1) {
			changecontent("availability", avail_instock);
			return true;
		}
	}
}


/**
* wishlist
***********************/
jQuery('#wishlist-add').click(function () {
	//jQuery('#wishlist-error').collapse('hide');

	var wishlist_optListType = jQuery('.wishlist-optListType:checked').val();
	var wishlist_drpLists = jQuery('#wishlist-drpLists').val();
	var wishlist_txtNewList = jQuery.trim(jQuery('#wishlist-txtNewList').val());

	if ((wishlist_optListType == "1" && wishlist_drpLists == "")) {
		var text = GetLanguagItem('wishlist_multiple-addtolist-select-the-list');
		alert(text);
	}
	else if ((wishlist_optListType == "2" && wishlist_txtNewList == "")) {
		var text = GetLanguagItem('wishlist_multiple-addtolist-enter-the-name-list');
		alert(text);
	}
	else {
		try {
			add_wishlistcustom(wishlist_optListType, wishlist_drpLists, wishlist_txtNewList);
		}
		catch (ex) {
			add_wishlistcustom(wishlist_optListType, wishlist_drpLists, wishlist_txtNewList)
		}
	}
});
function add_wishlist() {

	var enabledMultipleWishList = jQuery('#Enabled_Multiple_WishList').val();
	var link_addtolist = jQuery('#link_addtolist').val();

	if(jQuery('body').hasClass('not-logged-in')) {
		window.location.href = "/myaccount.asp?catalogid="+ jQuery('#catalogid').val();
		return;
	}

	if (enabledMultipleWishList == "1") {
		jQuery('#wishlist-modal').modal('show');
		var src = link_addtolist;
	}
	else {
		document.add.action = "add_cart.asp?action=addWishList";
		document.add.submit();
	}
}
function add_wishlistcustom(strListType, intListId, strListName) {
	document.add.wishListCustomType.value = strListType;
	document.add.wishListCustomId.value = intListId;
	document.add.wishListCustomname.value = strListName;
	document.add.action = "add_cart.asp?action=addWishList";
	document.add.submit();
}


/**
* Captcha reusable functions
***********************/
function processCaptchaEexcute(modalID, callBack) {

	if (jQuery('#' +modalID+  ' [name="g-recaptcha-response"]')) {
		jQuery('#' +modalID+  ' .loading-overlay').show();
		var captchaId = parseInt(jQuery('#' +modalID+  ' .recaptchaRobot').data('widgetid'));

		if(jQuery('#' +modalID+  ' .recaptchaRobot').data('size') == 'invisible') 
			grecaptcha.execute(captchaId);

		setTimeout(function () {
			window[callBack]();
		}, 500);
	}
	else {
		window[callBack]();
	}
}

function refereshAllCaptchas() {
	if(jQuery('.simple-captcha > .captcha > img').length > 0) {
		var src = jQuery('.simple-captcha > .captcha > img').first().attr('src');
		src = src + '?timestamp=" + new Date().getTime()';
		jQuery('.simple-captcha > .captcha > img').each(function(index, element) {
			jQuery(element).attr('src', src);
		});
	}

	if((jQuery('.recaptchaRobot').length > 0)) {
		
	}
}

/**
* add_giftregistry
***********************/
function add_giftregistry() {
	document.add.action = "add_cart.asp?action=addGiftRegistry";
	document.add.submit();
}

/**
* email_friend
***********************/
function recommendaFriendRequest() {
	var name = jQuery.trim(jQuery('#visitorname').val());
	var email = jQuery.trim(jQuery('#visitormail').val());
	var friendName = jQuery.trim(jQuery('#friendname').val());
	var friendEmail = jQuery.trim(jQuery('#friendmail').val());
	var notes = jQuery.trim(jQuery('#recommendafriend-message').val());
	var siteurl = jQuery('#product_url').val();
	var ramdomWord = jQuery.trim(jQuery('#recommendafriend-modal input[name="ramdomWord"]').val());
	var recaptcha_response_field = jQuery.trim(jQuery('#recommendafriend-modal input[name="recaptcha_response_field"]').val());
	var recaptcha_challenge_field = jQuery.trim(jQuery('#recommendafriend-modal input[name="recaptcha_challenge_field"]').val());
	var g_recaptcha_response = jQuery.trim(jQuery('#recommendafriend-modal  [name="g-recaptcha-response"]').val());

	var valid = true;
	var friendValidationMsg = "";

	if (name == '') { friendValidationMsg += "Please enter your Your Name.. \n"; valid = false; }
	if (email == '') { friendValidationMsg += "Please enter a valid email address. \n"; valid = false; }
	if (friendName == '') { friendValidationMsg += "Please enter your Friend's Name. \n"; valid = false; }
	if (friendEmail == '') { friendValidationMsg += "Friend's Email: enter a valid email address. \n"; valid = false; }
	if (notes == '' || notes.length > 500) { friendValidationMsg += "Please enter your Note to friend:. Max length is 500. \n"; valid = false; }

	if (!valid) {
		jQuery('#recommendafriend-modal .loading-overlay').fadeOut(500);
		alert(friendValidationMsg);
		return;
	}
	else {
		jQuery('#recommendafriend-modal .loading-overlay').show();

		jQuery.ajax({
			method: "POST",
			url: '/recommendafriend.asp?action=ajaxSend',
			data: {
				catalogid: jQuery('#catalogid').val(),
				visitorname: name,
				visitormail: email,
				friendname: friendName,
				friendmail: friendEmail,
				message: notes,
				siteurl: siteurl + "/product.asp?itemid=" + jQuery('#catalogid').val(),
				ramdomWord: ramdomWord,
				recaptcha_response_field: recaptcha_response_field,
				recaptcha_challenge_field: recaptcha_challenge_field,
				'g-recaptcha-response': g_recaptcha_response
 			},
			success: function (data) {
				var response = JSON.parse(data);
				if (response.resCode != undefined && response.resCode == 1) {
					jQuery('#recommendafriend-modal .loading-overlay').hide();
					jQuery('#recommendafriend-modal .modal-response').fadeIn(500);
				}
				else {
					alert(response.resMsg);
				}
			},
			error: function () {
				alert('Something went wrong. Please try again later.');
			},
			complete: function () {
				jQuery('#recommendafriend-modal .loading-overlay').fadeOut(500);
			}
		});
	}
}
jQuery('#recommendafriend_button').click(function () {
	jQuery('.recommendafriend-error').hide();
	processCaptchaEexcute('recommendafriend-modal', 'recommendaFriendRequest');
});
function showRecFriend() {
	jQuery('#recommendafriend-modal').modal('show');
}
/**
* waitinglist
***********************/
jQuery('#waitinglist-btn').click(function (e) {
	e.preventDefault();

	jQuery('#waitinglist-modal').modal('show');
});

function sendWaitingListRequest() {
	var name = jQuery.trim(jQuery('#waitinglist-name').val());
	var email = jQuery.trim(jQuery('#waitinglist-email').val());
	var phone = jQuery.trim(jQuery('#waitinglist-phone').val());
	var ramdomWord = jQuery.trim(jQuery('#waitinglist-modal input[name="ramdomWord"]').val());
	var recaptcha_response_field = jQuery.trim(jQuery('#waitinglist-modal input[name="recaptcha_response_field"]').val());
	var recaptcha_challenge_field = jQuery.trim(jQuery('#waitinglist-modal input[name="recaptcha_challenge_field"]').val());
	var g_recaptcha_response = jQuery.trim(jQuery('#waitinglist-modal  [name="g-recaptcha-response"]').val());

	var valid = true;
	var wlValidationMsg = "";

	if (name == '') { wlValidationMsg += "Please enter your Name. \n"; valid = false; }
	if (email == '') { wlValidationMsg += "Please enter your Email. \n"; valid = false; }
	if (phone == '') { wlValidationMsg += "Please enter your Phone. \n"; valid = false; }

	if (!valid) {
		jQuery('#waitinglist-modal .loading-overlay').fadeOut(500);
		alert(wlValidationMsg);
		return;
	}
	else {
		jQuery('#waitinglist-error').collapse('hide');

		jQuery.ajax({
			method: "POST",
			url: '/notify.asp?action=ajaxSend',
			data: {
				catalogid: jQuery('#catalogid').val(),
				itemid_advanced: jQuery("#itemid_advancedoption").val(),
				name: name,
				email: email,
				phone: phone,
				ramdomWord: ramdomWord,
				recaptcha_response_field: recaptcha_response_field,
				recaptcha_challenge_field: recaptcha_challenge_field,
				'g-recaptcha-response': g_recaptcha_response

			},
			success: function (data) {
				var response = JSON.parse(data);
				if (response.resCode != undefined) {
					if (response.resCode == 1) {
						jQuery('#waitinglist-response').text(response.resMsg);
						jQuery('#waitinglist-modal .modal-response').fadeIn(500);
						refereshAllCaptchas();
					}
					else {
						alert(response.resMsg);
					}
				}
			},
			error: function () {
				alert('Something went wrong. Please try again later.');
			},
			complete: function () {
				jQuery('#waitinglist-modal .loading-overlay').fadeOut(500);
			}
		});
	}
}

jQuery('#waitinglist_button').click(function () {
	jQuery('.waitinglist-error').hide();
	processCaptchaEexcute('waitinglist-modal', 'sendWaitingListRequest');
});
/**
* make an offer
***********************/
jQuery('#makeanoffer-btn').click(function () {
	jQuery('#makeanoffer-modal').modal('show');
});

function sendMakeAnOfferRequest() {
	var amount = jQuery.trim(jQuery('#makeanoffer-amount').val());
	var name = jQuery.trim(jQuery('#makeanoffer-name').val());
	var email = jQuery.trim(jQuery('#makeanoffer-email').val());
	var comment = jQuery.trim(jQuery('#makeanoffer-comment').val());
	var ramdomWord = jQuery.trim(jQuery('#makeanoffer-modal input[name="ramdomWord"]').val());
	var recaptcha_response_field = jQuery.trim(jQuery('#makeanoffer-modal input[name="recaptcha_response_field"]').val());
	var recaptcha_challenge_field = jQuery.trim(jQuery('#makeanoffer-modal input[name="recaptcha_challenge_field"]').val());
	var g_recaptcha_response = jQuery.trim(jQuery('#makeanoffer-modal  [name="g-recaptcha-response"]').val());

	var valid = true;
	var moValidationMsg = "";

	if (name == '') { moValidationMsg += "Please enter your Name. \n"; valid = false; }
	if (email == '') { moValidationMsg += "Please enter your Email. \n"; valid = false; }
	if (amount == '') { moValidationMsg += "Please enter offer amount. \n"; valid = false; }

	if (!valid) {
		alert(moValidationMsg);
		jQuery('#makeanoffer-modal .loading-overlay').hide();
		return;
	}
	else {

		jQuery('#makeanoffer-error').collapse('hide');
		jQuery('#makeanoffer-modal .loading-overlay').show();

		jQuery.ajax({
			method: "POST",
			url: '/makeanoffer.asp?action=ajaxsend&catalogid=' +jQuery('#catalogid').val(),
			data: {
				catalogid: jQuery('#catalogid').val(),
				amount: amount,
				name: name,
				email: email,
				comment: comment,
				ramdomWord: ramdomWord,
				recaptcha_response_field: recaptcha_response_field,
				recaptcha_challenge_field: recaptcha_challenge_field,
				'g-recaptcha-response': g_recaptcha_response
			},
			success: function (data) {
				var response = JSON.parse(data);
				if (response.resCode != undefined) {
					if (response.resCode == 1) {
						jQuery('#makeanoffer-response').text(response.resMsg);
						jQuery('#makeanoffer-modal .modal-response').fadeIn(500);
					}
					else {
						alert(response.resMsg);
						jQuery('#makeanoffer-error').collapse('show');
					}
				}
			},
			error: function () {
				alert('Something went wrong. Please try again later.');
			},
			complete: function () {
				jQuery('#makeanoffer-modal .loading-overlay').fadeOut(500);
			}
		});
	}
}

jQuery('#makeanoffer-submit').click(function () {
	jQuery('.makeanoffer-error').hide();
	processCaptchaEexcute('makeanoffer-modal', 'sendMakeAnOfferRequest');
});

/**
* Show/Hide 'Multipule Ship-To' Recipient field/note
***********************/
function showAddName() {
	if (jQuery('.multipleShipToBlock .send-to select').val() == 'selectother') {
			jQuery('.multipleShipToBlock .add-name, .multipleShipToBlock .note').show();
	}
	else {
        jQuery('.multipleShipToBlock .add-name, .multipleShipToBlock .note').hide();
	}
}

/**
* check_and_add
***********************/
function ask_check_and_add(formx, IsAddToCart, replaceitemname) {
	if(confirm(replaceitemname + '\n\n' +GetLanguagItem('recurringorders_replace-confirm')))
		check_and_add(formx, IsAddToCart);

}


function check_and_add(formx) {
	var reqOption = validateReqOption(formx);
	if (reqOption != null) {
		//alert("Please select all required options.");
		reqOptionBar.alert('Please select all required options.');
		varx1 = '[name="' + reqOption.name + '"]';
		jQuery(varx1).closest('.opt-regular').addClass('option-required');
		return;
	}

	if (document.add.std_price == null) {
		document.add.submit();
	}
	else {
		var readytoadd = validateValues(formx, 1)
		if (readytoadd == true) {
			document.add.submit();
		}
	}
}
var currency_symbol = jQuery("#currency").val();
var prod_decimal_places = jQuery("#prod_decimal_places").val();
validateValues(document.add, 1);


/**
* Option Rules
***********************/
function selectOption(objElement) {

	var strElementName = "";
	var strElementType = "";
	var intHasRules = jQuery("#has_rules").val();
	objElement = null;

	if (intHasRules != "1") {
		return;
	}

	add_overlay("divOptionsBlock", 1);
	var url = 'prod_options.asp?ajax=1&action=buildOptions&strElementType=' +escape(strElementType) + '&strElementName=' +escape(strElementName) + '&no-cache=' +Math.random();

	jQuery.ajax({
		url: url,
		dataType: 'html',
		type: 'POST',
			data: jQuery(add).serialize(),
			cache: false,
			success: function (strResult) {
				//Keep the values for the text options
				var textCollection = jQuery("#divOptionsBlock").find("input:text");

				jQuery("#divOptionsBlock").html(strResult);

				if (textCollection.length > 0)
					for (var i = 0; i < textCollection.length; i++) {
						jQuery("[name='" + textCollection[i].name + "']").val(textCollection[i].value);
				}

			jQuery('#add input[type="radio"]:checked').each(function () {
				jQuery(this).next('div').addClass('radio-selected');
			});
		},
		complete: afterOptionSelection,
				error: reportError
	});
}

function afterOptionSelection(req) {
	remove_overlay("divOptionsBlock");
	return;
}
function getElementById_s(strId) {
	var obj = null;
	if (document.getElementById) {
		obj = get_Element(strId);
		} else if (document.all) {
			obj = document.all[strId];
			}
	return obj;
}

function remove_overlay(panel) {
	var objBody = getElementById_s('overlay_' +panel);
	if (objBody != null && objBody != 'null' && objBody != undefined && objBody != 'undefined')
		objBody.style.display = 'none';
}

function add_overlay(panel, loading) {
	var objBody = getElementById_s(panel);
	var objOverlay = document.createElement("div");
	if (!objBody) return;
	objOverlay.setAttribute('id', 'overlay_' +panel);
	objOverlay.className = 'overlay';
	objOverlay.style.position = 'absolute';
	objOverlay.style.textAlign = 'center';
	objOverlay.style.width = objBody.clientWidth + "px";
	objOverlay.style.height = objBody.clientHeight + "px";
	//alert(objOverlay.style.height);
	objBody.insertBefore(objOverlay, objBody.firstChild);
	objOverlay.style.display = 'block';

	if (loading == 1) {
		get_Element('overlay_' +panel).innerHTML = '<table border=0 width=100% height=100%><tr><td style="text-align: center;"><img src="assets/templates/common-html5/images/loading.gif"></td></tr></table>';
	}
	else {
		get_Element('overlay_' +panel).innerHTML = '<table border=0 width=100% height=100%><tr><td align="center"></td></tr></table>';
	}
}

function get_Element(i) {
	return document.getElementById(i) || document.getElementsByName(i).item(0);
}

function reportError(jqXHR, textStatus) {
	remove_overlay("divOptionsBlock");

	//jqXHR.responseText
	if (jqXHR.status > 0)
		alert("Error processing request " + jqXHR.status + " - " +textStatus);
}

selectOption(null);

function countChars(countfrom, displayto, countmax) {
	var str = document.getElementById(countfrom).value;
	var CountBreaks = str.split("\n").length -1;

	document.getElementById(countfrom).maxLength = (Number(countmax) +Number(CountBreaks * 1));
	var len = countmax -(document.getElementById(countfrom).value.length);
	if (len < 0) {
		document.getElementById(countfrom).value = str.substring(0, str.length -1)
		return false;
	}
		document.getElementById(displayto).innerHTML = len;
}

jQuery(window).load(function () {
	jQuery('#get_quote-iframe').load(function () {
		if (jQuery('#get_quote-iframe').length > 0) {
			document.getElementById('get_quote-iframe').style.height = (document.getElementById('get_quote-iframe').contentWindow.document.body.scrollHeight +20) + 'px';
		}
	});
});