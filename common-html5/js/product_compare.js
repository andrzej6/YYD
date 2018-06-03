//if (window != top)
//    top.location.href = location.href

if (typeof jQuery == 'undefined') {
    document.write("<script type=\"text/javascript\" src=\"assets/templates/common/js/jquery.min.js\"></" + "script>");
    var __noconflict = true;
    }

function CProduct(id, name, thumb, url) {
    this.id = id;
    this.name = name;
    this.thumb = thumb;
    this.url = url;
    }

function emptyBasket() {
	localStorage.setItem('itemsArray', JSON.stringify([]));
	jQuery('.product-item').removeClass('product--selected');
	jQuery('#compare-basket .product-icon').remove();
	jQuery('.compare-basket').removeClass('compare-basket--active');
	jQuery('.action--compare-add').removeClass('active-fa');
	jQuery('.product-item .check-hidden').prop('checked', false);
}
function addToSideBar(cProdItem) {

    var sideItem = jQuery('<div></div>').addClass('img product-icon');
    jQuery(sideItem).attr('id', 'newId_' + cProdItem.id);

    var sideItemA = jQuery('<a></a>').attr('href', cProdItem.url);
    var sideItemImg = jQuery('<img />').attr({
        src: cProdItem.thumb,
        alt: cProdItem.name
    });

    var remAction = "<button class='action action--remove'><i class='fa fa-remove'></i><span class='action__text action__text--invisible'>Remove product</span></button>"
    var onClickRemove = " javascript: removeProduct('" + cProdItem.id+ "'); "
    var remAction = jQuery(remAction).attr('onclick', onClickRemove);

    jQuery(sideItemA).append(sideItemImg);
    jQuery(sideItem).append(sideItemA);
    jQuery(sideItem).append(remAction);

    jQuery('#compare-basket').prepend(sideItem);

    jQuery('#prod_' + cProdItem.id).addClass('product--selected');

    if (typeof _3dThemeType !== 'undefined' && _3dThemeType == "core") {
    	jQuery('.category-products .product-item[data-catalogid="' + cProdItem.id + '"]').addClass('product--selected');
    }
    else {
    	jQuery('#prod_' + cProdItem.id).addClass('product--selected');
    }

    jQuery('#addCom_'+ cProdItem.id).addClass('active-fa');

}


function showCompareBasket(action) {
    /*
    ** Show items on load
    ------------------------------*/
    if (localStorage["itemsArray"]) {

        var items = localStorage.getItem("itemsArray");
        items = JSON.parse(items);

        if (items.length > 0) {

            if (action == 1) {
                jQuery('#compare-basket .product-icon').remove();
            }

            jQuery('#divcomparepopup').css('display', 'block');

            // Show Basket
            jQuery('.compare-basket').addClass('compare-basket--active');

            if (action == 1) {
                jQuery.each(items, function(index, item) {
                    addToSideBar(item);
                });
            }

            // More then 1 items in the basket
            if (items.length > 1) {
                jQuery('#btnCompareNow').addClass('action--compare--active');
        }
        }
        else {
            jQuery('.compare-basket').removeClass('compare-basket--active');
        }
    }

    jQuery('html, body').removeClass('product-compare-open');
}

// DOM with  Cookies and functionality to show option buttons
jQuery(document).ready(function () {
    jQuery("<div id='pc_buttons'></div>").appendTo("body");
    jQuery('body').addClass('overflow');

    // Add FontAwesome Library For Front End View Icons
    function addCss(fileName) {
        var link = '<link rel="stylesheet" type="text/css" href="' + fileName + '">'
        jQuery('head').append(link)
    }

    addCss('https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css')

    jQuery(".alert-notice").click(function () {
        jQuery(this).hide();
    });

    jQuery(function() {
        jQuery('#addcompare').submit(function() {
            return false;
        });
    });
});

jQuery(window).load(function() {
    //var t = setTimeout("do_pc();", 500)
	do_pc();
	});
// jQuery(window).resize(function() {
//     var t = setTimeout("do_pc();", 10)
// });

function do_pc() {
    var pcbuttons = '';

    if (typeof _3dThemeType !== 'undefined' && _3dThemeType == "core") {

    	showCompareBasket(1);

    	jQuery('.category-products .product-item').each(function (index, element) {
    		var catalogid = jQuery(element).data('catalogid');
    		if (jQuery(element).hasClass('action--compare-add')) return;

    		var img = jQuery(element).find('.img');
    		pcbuttons = '<div id="' + d + '"><label   id="' + 'addCom_' + catalogid + '" class="action action--compare-add" href="javascript:void();" onclick="return addToCompare(\'' + catalogid + '\', this);"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label></div>';
    		jQuery(pcbuttons).appendTo(img);
    		
    	});

    }
    else {
    	var pc_w = -288;
    	var pc_h = 26;
    	var pC_all_images = document.getElementsByTagName("img");
    	var pC_length = pC_all_images.length;
    	var pC_curr_image;

    	showCompareBasket(1);

    	for (xx = 0; xx < pC_length; xx++) {

    		pC_curr_image = pC_all_images[xx];
    		if (pC_curr_image.id.indexOf("qv_") != -1) {

    			var catalogid = pC_curr_image.id.replace("qv_", "");

    			if (jQuery('#prod_' + catalogid + ' .action--compare-add').length > 0) continue;

    			var w = findPosX(pC_all_images[xx]) + Math.floor((pC_all_images[xx].width - pc_w) / 2);
    			var h = findPosY(pC_all_images[xx]) + pC_all_images[xx].height - pc_h - 100;
    			var d = 'com_btn_' + catalogid;
    			var pctitle = (jQuery("#pc_buttontitle").length > 0 ? jQuery("#pc_buttontitle").html() : "Compare");
    			pcbuttons = '<div id="' + d + '"><label   id="' + 'addCom_' + catalogid + '" class="action action--compare-add" href="javascript:void();" onclick="return addToCompare(\'' + catalogid + '\', this);"><input class="check-hidden" type="checkbox" /><i class="fa fa-plus"></i><i class="fa fa-check"></i><span class="action__text action__text--invisible">Add to compare</span></label></div>';
    			jQuery(pcbuttons).appendTo('#prod_' + catalogid + ' .img');
    		}
    	}
    }

    //document.getElementById('pc_buttons').innerHTML = pcbuttons;
}

function pc_visible(a) {
    document.getElementById(a).style.visibility = "visible";
}

function pc_hidden(a) {
    document.getElementById(a).style.visibility = "hidden";
}

function productsItem(element) {
    this.element = element;
}

function addToCompare(itemid, element) {
    if (jQuery(element).hasClass('active-fa')) return;
    jQuery('#divcomparepopup').css('display', 'block');
    
    // Read localstorage array (if it is undefined, define it)
    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];

    if (oldItems.length > 3) {
        document.getElementById('comparelimit').style.display = 'block';
        jQuery('#divAdd').css('display', 'block');
        jQuery(".alert-notice").show().delay(2000).addClass('alert-notice-show').fadeOut();
        return;
    }
    else {
        document.getElementById('comparelimit').style.display = 'none';
        jQuery('#divAdd').css('display', 'none');
    }
    jQuery('.compare-basket').addClass('compare-basket--active');
    createPCCookie('prod_compare', itemid, 1);


    // Add Product and select Item
    var idProduct = "#prod_" + itemid;

    if (typeof _3dThemeType !== 'undefined' && _3dThemeType == "core") {
    	idProduct = '.category-products .product-item[data-catalogid="' + itemid + '"]';
    }

    var idBtn = "#addCom_" + itemid;
    var newId = "newId_" + itemid;


    jQuery(idProduct).addClass('product--selected').find('.img').css({ 'z-index': '1000' });
    jQuery(idProduct).find('.action--compare-add').toggleClass('active-fa');

    // Remove Clicked Item
    var remAction = "<button class='action action--remove'><i class='fa fa-remove'></i><span class='action__text action__text--invisible'>Remove product</span></button>"
    var onClickRemove = " javascript: removeProduct(" + itemid + "); "
    var remAction = jQuery(remAction).attr('onclick', onClickRemove);

    // New Product and select Item
    var newProduct = jQuery(idProduct).clone().find('.img').addClass('product-icon').removeAttr('style');
    var selectedItem = jQuery('.product-icon').attr('id');

    // Remove Clicked Item Appended in the product
    jQuery(remAction).appendTo(newProduct);

    // New Product Inserted Before  #comparepopupbuttons
    //jQuery(newProduct).attr('id', newId).insertBefore('#comparepopupbuttons');
    jQuery(newProduct).attr('id', newId);
    jQuery('#compare-basket').prepend(newProduct);


    // More then 1 items in the basket
    if (jQuery('.compare-basket--active').find('.product-icon').length > 1) {
        jQuery('#btnCompareNow').addClass('action--compare--active');
    }





    //var found = jQuery.inArray(itemid, oldItems);
    var found = jQuery.grep(oldItems, function (e) { return e.id == itemid; });

    if (found.length > 0) {
        // Element was found, remove it.
        oldItems.splice(oldItems.indexOf(itemid), 1);

    } else if (found.length <= 0) {
        // If id is not in there use array.push to insert the item
        var newPordName = jQuery(idProduct).find('.name').first().text();
        var newPordThumb = '/' + jQuery(idProduct).find('.img img').first().attr('src');
        var newPordURL = '/' + jQuery(idProduct).find('a').first().attr('href');

        var newProd = new CProduct(itemid, newPordName, newPordThumb, newPordURL);

        oldItems.push(newProd);

    }
    localStorage.setItem('itemsArray', JSON.stringify(oldItems));
}

function removeProduct(itemid) {
	//jQuery('.action--remove').live('click', function () {
	jQuery('body').on('click', '.action--remove', function () {

        // Remove Element from basket
        var itemidNew = jQuery(this).parent('.product-icon').attr('id');
        var removeProduct = "#" + itemidNew;
        jQuery(removeProduct).remove();

        // Remove Styles from each related  product
        var removedNum = itemidNew.split("_").pop();
        var idProduct = "#prod_" + removedNum;

        if (typeof _3dThemeType !== 'undefined' && _3dThemeType == "core") {
        	idProduct = '.category-products .product-item[data-catalogid="' + removedNum + '"]';
        }

        var idBtn = "#addCom_" + removedNum;

        jQuery(idProduct).removeClass('product--selected').find('.img').removeAttr('style');
        jQuery(idBtn).removeClass('active-fa');

        // Disable  btnCompareNow Button
        if (jQuery('.compare-basket--active').find('.product-icon').length <= 1) {
            jQuery('#btnCompareNow').removeClass('action--compare--active');
        }

        // JSON Array - LocalStorage
        var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
        if (oldItems.length <= 0) {
            return;
        }

        //var found = jQuery.inArray(itemid, oldItems);
        var found = jQuery.grep(oldItems, function (e) {
            return e.id == itemid;
        });

        if (found.length <= 0) {
            return;

        } else {
            //console.log("d-0:");

            var index = -1;
            for (var i = 0; i < oldItems.length; i++) {
                if (oldItems[i].id == itemid) {
                    index = i;
                    break;
                }
            }
            oldItems.splice(index, 1);
            if (oldItems.length <= 0) {
                jQuery('.compare-basket').removeClass('compare-basket--active');
            }
        }
        localStorage.setItem('itemsArray', JSON.stringify(oldItems));

    });
}


function createPCCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";

    var MyCookie = readCookie(name);
    if (MyCookie) {

        var arrayItemIds = MyCookie.split(",");
        if (arrayItemIds.length < 4) {
            var k = 0;

            for (k = 0; k < arrayItemIds.length; k++) {
                var flag = false;
                if (arrayItemIds[k] == value) {
                    document.getElementById('comparepopup').style.display = 'none';
                    document.getElementById('compareduplicate').style.display = 'block';
                    flag = true;
                    break;
                }
                if (arrayItemIds.length > 0) {
                    document.getElementById('btnCompareNow').style.display = 'block';
                    document.getElementById('btnCancel').style.display = 'block';
                }
            }
            if (flag == false) {
                document.cookie = name + "=" + MyCookie + ',' + value + "; path=/";
            }
        } else {
            document.getElementById('comparepopup').style.display = 'none';
            document.getElementById('btnCompareNow').style.display = 'block';
        }
    } else {
        document.cookie = name + "=" + value + expires + "; path=/";
    }
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function redirectCookie() {
    //var Itemids = readCookie('prod_compare');
    var Itemids = '';
    if (localStorage["itemsArray"]) {
        var items = localStorage.getItem("itemsArray");
        items = JSON.parse(items);
        jQuery.each(items, function (index, item) {
            Itemids += item.id + ','
        });
    }
    console.log(Itemids);
    // Get Comparison Page
    getUrl = window.location;
    baseUrl = getUrl.protocol + "//" + getUrl.host;
    newUrl = baseUrl + '/product_compare.asp?itemid=' + Itemids;
    console.log(newUrl);
    // Load Comparison Page Content
    jQuery('#resultCompare').load(newUrl + ' #view-fixed', function () {
        // close the compare products wrapper
        jQuery('.compare-basket').removeClass('compare-basket--active');

        jQuery('html, body').addClass('product-compare-open');

        setTimeout(function () {
            jQuery('.compare__effect').each(function(i, e) {
                var height = jQuery(e).outerHeight();
                jQuery(e).parent('.compare__item').height(height);
            });
        }, 300);

        jQuery('.action--close').on('click', function() {
            // animate remove..
          jQuery('#view-fixed').removeClass('view-fixed-compare');
        });


    });
}

function eraseCookie(name) {

    document.cookie = name + "=";
}

function checkCategoryChange(categoryid) {
    var prevCatId = readCookie('prod_compare_catid');
    if (prevCatId != categoryid) {
        eraseCookie('prod_compare');
        document.cookie = "prod_compare_catid=" + categoryid + "; path=/";
    }
}

function findPosX(obj) {
    var curLeft = 0;
    if (obj.offsetParent)
        while (1) {
            curLeft += obj.offsetLeft;
            if (!obj.offsetParent) break;
            obj = obj.offsetParent
        } else if (obj.x) curLeft += obj.x;
    return curLeft
}

function findPosY(obj) {
    var curTop = 0;
    if (obj.offsetParent)
        while (1) {
            curTop += obj.offsetTop;
            if (!obj.offsetParent) break;
            obj = obj.offsetParent
        } else if (obj.y) curTop += obj.y;
    return curTop
}