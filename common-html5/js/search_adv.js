//jQuery(function () {
jQuery(window).on("popstate", function (e) {
    parseSearh();
});
jQuery(".option").on("click", function (e) {
    e.preventDefault();
    var target = jQuery("#" + jQuery(e.target).closest("li.dropdown").children("a").attr("id") + "-selected");
    target.text(jQuery(e.target).text());
    target.data("val", jQuery(e.target).data("val"));
});

jQuery(document).ready(function (e) {
    parseSearh();
    jQuery("#loadimg").addClass("hidden");

    var title = $(document).prop('title'); 
    document.title = title.replace('Search','');

    var baseUrl = window.location.protocol + "//" + window.location.host + "/"; 

    jQuery.get(baseUrl, function(data) {
        var inputClass =  jQuery('form[name="searchForm"]  input[type=text]').attr('class');
        var buttonClass = jQuery('form[name="searchForm"]  input[type=submit]').attr('class');

        jQuery('#searchBox .form-control').addClass(clasess).removeClass('form-control');
        jQuery('#search-button').addClass(buttonClass);

    });

    jQuery('#searchBox').fadeIn( "slow");
    jQuery('#searchBox .form-control').addClass('search-text hasPlaceholder').removeClass('form-control');
    jQuery('#search-button').addClass('search-btn');
    var textIndent = 'text-indent';
    jQuery('#search-button').css({
            textIndent : '-9999px'
    });
});

var searchDefault = jQuery('form[name=searchForm]').attr('action', "search.asp");

var $form = jQuery('<form role="search"></form>');
var $input = jQuery('<input type="text" aria-label="keyword to search" class="form-control" id="keyword" name="keyword" placeholder="Search">');
var $btn = jQuery('<input type="submit" id="search-button" data-page="1" value="" data-loading-text="Searching...">');

jQuery(searchDefault).hide();
jQuery(searchDefault).after($form);
jQuery($input).appendTo($form);
jQuery($btn).appendTo($form);

jQuery(document).on("click", "#search-button, a.pagging", function (e) {
    e.preventDefault();

    if (jQuery("#keyword").val() !== "") {
        applySearch(jQuery(e.currentTarget));
        executeSearch();
    }
});

jQuery(document).on("click", "a.facetFilter", function (e) {
    e.preventDefault();

    if (jQuery("#keyword").val() !== "") {
        applyFacet(jQuery(e.currentTarget));
    }
});

jQuery(document).on("click", "a.appliedFilter", function (e) {
    e.preventDefault();

    removeFacet(jQuery(e.currentTarget));
    executeSearch();
});

function applySearch(target) {
    var sort = jQuery("#sort-selected").val();
    var pageSize = jQuery("#page-size-selected").val();
    var keyword = jQuery("#keyword").val();
    //var keyword = jQuery.url().param("keyword");
    var page = target.data("page");
    var filter = "";
    if (jQuery.url().param("filter") !== undefined) {
        filter = encodeURIComponent(jQuery.url().param("filter"));
    }

    history.pushState({ search2: "search2" }, "HTML Search (" + keyword + ")", "search_adv.asp" + "?keyword=" + keyword + "&sort=" + sort + "&page=" + page + "&pageSize=" + pageSize + (filter === "" ? "" : "&filter=" + filter));
}

function applyFacet(target) {
    var sort = jQuery("#sort-selected").val();
    var pageSize = jQuery("#page-size-selected").val();
    //var keyword = jQuery("#keyword").val();
    var keyword = jQuery.url().param("keyword");
    var page = "1";
    var filter = "";
    if (jQuery.url().param("filter") !== undefined) {
        filter = encodeURIComponent(jQuery.url().param("filter"));
    }
    if (filter.match(new RegExp("%23" + target.data("filter"))) === null) {
        filter += "%23" + target.data("filter");
        history.pushState({ search2: "search2" }, "HTML Search (" + keyword + ")", "search_adv.asp" + "?keyword=" + keyword + "&sort=" + sort + "&page=" + page + "&pageSize=" + pageSize + "&filter=" + filter);
        executeSearch();
    }
}

function removeFacet(target) {
    var sort = jQuery("#sort-selected").val();
    var pageSize = jQuery("#page-size-selected").val();
    //var keyword = jQuery("#keyword").val();
    var keyword = jQuery.url().param("keyword");
    var page = "1";

    var filter = encodeURIComponent(jQuery.url().param("filter").replace("#" + decodeURIComponent(target.data("filter")), ""));
    history.pushState({ search2: "search2" }, "HTML Search (" + keyword + ")", "search_adv.asp" + "?keyword=" + keyword + "&sort=" + sort + "&page=" + page + "&pageSize=" + pageSize + (filter === "" ? "" : "&filter=" + filter));
}

function parseSearh() {
    if (jQuery.url().param("keyword") !== undefined) {
        //var btn = jQuery("#search-button").button("loading");
        jQuery("#keyword").val(jQuery.url().param("keyword"));

        if (jQuery.url().param("pageSize") !== undefined) {
            jQuery("#page-size-selected").val(jQuery.url().param("pageSize"));
        }
        if (jQuery.url().param("sort") !== undefined) {
            jQuery("#sort-selected").val(jQuery.url().param("sort"));
        }
        executeSearch();
    }
    else {
        jQuery("#paggingTop").html("");
        jQuery("#paggingBottom").html("");
        jQuery("#products").html("");
    }
}

function executeSearch() {
    jQuery("#paggingTop").html("");
    jQuery("#paggingBottom").html("");
    jQuery("#products").html("");
    removeFacets();
    jQuery("#loadimg").removeClass("hidden");

    var sort = jQuery("#sort-selected").val();
    var pageSize = jQuery("#page-size-selected").val();
    //var keyword = jQuery("#keyword").val();
    var keyword = jQuery.url().param("keyword");
    var page = jQuery.url().param("page") ? parseInt(jQuery.url().param("page")) : 1;
    var filter = "";
    if (jQuery.url().param("filter") !== undefined) {
        filter = encodeURIComponent(jQuery.url().param("filter"));
    }

    if (keyword !== "") {
        var url = "search_adv.asp";

        jQuery.ajax(url, {
            dataType: 'json',
            data: {
                keyword: keyword,
                sort: sort,
                page: page,
                pageSize: pageSize,
                filter: filter,
                action: "products"
            },
            error: resultError,
            success: function (data, textStatus, jqXHR) {
                if (data.records !== undefined && data.records > 0) {
                    if (pageSize > 0) {
                        pagging(data.records, page, pageSize);
                    }
                    else {
                        jQuery("#pagesInfo").html(jQuery("#Search_Advanced-Matches-Found").text().replace("[total_matches_found]", data.records));
                    }
                    parseResult(data.suggests.Products);
                    parseFacets(data.suggests.Facets, filter);

                    equalHeight(jQuery(".thumbnail"));

                    jQuery(".sort-by").removeClass("hidden");

                    if (data.records <= pageSize)
                        jQuery("#paggingTop, #paggingBottom").html("");
                }
                else {
                    if (data.error !== undefined) {
                        jQuery("#products").append(data.error);
                    } else {
                        jQuery("#products").append(jQuery("#noresultsfound").html());
                    }
                    jQuery("#pagesInfo").html("");
                    jQuery(".sort-by").addClass("hidden");
                }
                jQuery("#loadimg").addClass("hidden");
                //jQuery("#search-button").button("reset");
            }
        });

        history.pushState({ search2: "search2" }, "HTML Search (" + keyword + ")", "search_adv.asp" + "?keyword=" + keyword + "&sort=" + sort + "&page=" + page + "&pageSize=" + pageSize + (filter === "" ? "" : "&filter=" + filter));
    }
}

function parseFacets(facets, filter) {
    if (facets !== undefined && facets.length > 0) {
        for (var i = 0; i < facets.length; i++) {
            if (facets[i].HitList.length > 0) {
                jQuery("#" + facets[i].Name).parent().removeClass("hidden");

                if (facets[i].Name === "FreeShipping" || facets[i].Name === "OnSale") {
                    jQuery("#" + facets[i].Name + " ul").html(parseBooleanFacets(facets[i].Name, facets[i].HitList));
                }
                if (facets[i].Name === "Manufacturer" || facets[i].Name === "Category") {
                    jQuery("#" + facets[i].Name + " ul").html(parseLabeledFacets(facets[i].Name, facets[i].HitList));
                }
                if (facets[i].Name === "PriceRange") {
                    var priceRangeTemplate = parseRangeFacets(facets[i].Name, facets[i].HitList);
                    if (priceRangeTemplate == "") {
                        jQuery("#Price").parent().addClass("hidden");
                    } else {
                        jQuery("#" + facets[i].Name + " ul").html(priceRangeTemplate);
                    }
                }
                if (facets[i].Name === "ReviewAverage") {
                    jQuery("#" + facets[i].Name + " ul").html(parseReviewFacets(facets[i].Name, facets[i].HitList));
                }
            }
            else {
                jQuery("#" + facets[i].Name).parent().addClass("hidden");
            }
        }
    }
    else {
        removeFacets();
    }

    if (filter !== "") {
        jQuery("#Filters ul").html("");
        jQuery("#Filters").parent().removeClass("hidden");
        var filters = jQuery.url().param("filter").substr(1, jQuery.url().param("filter").length).split("#");
        for (i = 0; i < filters.length; i++) {
            var info = filters[i].split(":");
            var search = encodeURIComponent(filters[i]);
            var title = jQuery("#" + info[0] + "GroupName").html();
            var f = jQuery("<div>").append(jQuery("[data-filter='" + search + "']").parent().clone()).remove().html();
            f = f.replace("facetFilter", "appliedFilter");
            jQuery("#Filters ul").append(f);
            jQuery("#Filters ul [data-filter='" + search + "']").html(title + ":" + jQuery("#Filters ul [data-filter='" + search + "']").html());
            jQuery("#Filters ul [data-filter='" + search + "']").children().remove("span");
            jQuery("#Filters ul [data-filter='" + search + "']").prepend("[x] ");
        }
    }
    else {
        jQuery("#Filters").parent().addClass("hidden");
        jQuery("#Filters ul").html("");
    }
}

function removeFacets() {
    jQuery("#Filters").parent().addClass("hidden");
    jQuery("#PriceRange").parent().addClass("hidden");
    jQuery("#FreeShipping").parent().addClass("hidden");
    jQuery("#OnSale").parent().addClass("hidden");
    jQuery("#Manufacturer").parent().addClass("hidden");
    jQuery("#ReviewAverage").parent().addClass("hidden");
    jQuery("#Category").parent().addClass("hidden");
}

function pagging(total, page, size) {
    var totalPages = Math.ceil(total / size);
    var previous = jQuery("<div>").append(jQuery("#previousPage").clone()).remove().html();
    var each = jQuery("<div>").append(jQuery("#eachPage").clone()).remove().html();
    var next = jQuery("<div>").append(jQuery("#nextPage").clone()).remove().html();

    previous = replacement(previous, "previous", page - 1);
    next = replacement(next, "next", page + 1);

    jQuery("#paggingTop").html("");

    var numberofpages = Math.ceil(total / size);

    var pagefrom = page;
    var pageplus = page + 2;
    var pageminus = page - 2;
    if (pageminus == 0) pageplus++;

    if (page == 1) {
        pageplus = page + 6;
        pageminus = 1;
    }

    if (pageminus < 0) { pageplus = pageplus + 3 + pageminus; }
    if (pageplus > numberofpages) { pageplus = numberofpages; }
    if ((page - pageplus) < 3 && pageplus == numberofpages) { pageminus = pageminus - 3 + (-1) * (page - numberofpages); }
    if (page - 1 < pageminus) { pageminus = 1; }
    if (pageminus <= 0) { pageminus = 1; }


    var toomany = false;
    if (numberofpages > 7) toomany = true;

    var pagetemplatelast = 0;
    if (pageplus < numberofpages) {
        pagetemplatelast = 1;
    }

    for (var i = 1; i <= numberofpages; i++) {

        if (toomany) {

            if (i == pageminus && pageminus > 1) {
                jQuery("#paggingTop").append('<li><strong>...</strong></li>');
            }

            if (i != page) {
                if (i <= pageplus && i >= pageminus) { }
                else if (i == 1 || i == numberofpages) { }
                else {
                    continue;
                }
            }

        }
        if (page === i) {
            jQuery("#paggingTop").append('<li id="eachPage' + i + '"><strong>' + i + '</strong></li>');
            jQuery("#eachPage" + i).addClass("active");
        }
        else {
            jQuery("#paggingTop").append(replacement(each, "page", i).replace("eachPage", "eachPage" + i));
        }

        if (toomany) {
            if (i == pageplus && pageplus < numberofpages) {
                jQuery("#paggingTop").append('<li><strong>...</strong></li>');
            }
        }
    }

    if (page > 1) {
        jQuery("#paggingTop").prepend(previous.replace("previousPage", "previousPageTop"));
        jQuery("#paggingTop #previousPageTop").removeClass("disabled");
        jQuery("#paggingTop #previousPageTop a").addClass("pagging");
    }
    if (page < totalPages) {
        jQuery("#paggingTop").append(next.replace("nextPage", "nextPageTop"));
        jQuery("#paggingTop #nextPageTop").removeClass("disabled");
        jQuery("#paggingTop #nextPageTop a").addClass("pagging");
    }
    jQuery("#paggingBottom").html(jQuery("#paggingTop").html().replace("Top", "Bottom"));

    jQuery("#pagesInfo").html(jQuery("#Search_Advanced-Matches-Found").text().replace("[total_matches_found]", total));
}

function parseResult(list) {
    var result = "";
    var template = jQuery("#productsTemplate").html();

    var each = "";
    for (var i = 0; i < list.length; i++) {
        var t = template;
        var thumb = list[i].Thumbnail;
        if (list[i].Thumbnail.match(/http:/gim) === null && thumb !== "") {
            thumb = "/" + thumb;
        }
        if (thumb === "") {
            thumb = "/assets/images/default.jpg";
        }
        t = replacement(t, "THUMBNAIL", thumb);
        t = replacement(t, "name", list[i].Name);
        //t = replacement(t, "nameHighlight", list[i].NameHighlight);
        //t = replacement(t, "id", list[i].Id);

        var priceStr = parseInt(list[i].Price * 100).toString();
        if (priceStr.length === 1) {
            priceStr = "000";
        }
        priceStr = priceStr.substr(0, priceStr.length - 2) + "." + priceStr.substr(priceStr.length - 2, priceStr.length);
        t = replacement(t, "ITEMPRICE", "$" + priceStr);

        var productUrl = "#";
        if (list[i].Name !== null) {
            productUrl = list[i].Name.replace(/[¨!?#\\\/\{\[|&;\"\'`´^:$*%\=~@"<>\(\)+,\}.\]]/g, "").replace(/ /g, "-") + "_p_" + list[i].Id;
        }
        //t = replacement(t, "category_buyitlink", productUrl);

        t = replacement(t, "review_average", list[i].ReviewAverage);
        t = replacement(t, "review_count", list[i].ReviewCount);
        //t = replacement(t, "description", list[i].Description);
        //t = replacement(t, "catalogid", list[i].CustomId);
        t = replacement(t, "id", list[i].Id);
        //t = replacement(t, "freeshipping", list[i].FreeShipping);
        //t = replacement(t, "manufacturer", list[i].Manufacturer);

        if (list[i].FreeShipping == 0) {
            t = replacement(t, "freeshipping", "");
        }
        else {
            t = replacement(t, "freeshipping", "Free Shipping");
        }

        each += t;
    }
    jQuery("#products").html(each);
}

function parseBooleanFacets(field, facets) {
    var template = jQuery("<div>").append(jQuery("#eachFacet").clone()).remove().html();

    var each = "";
    for (var i = 0; i < facets.length; i++) {
        var t = template;
        t = replacement(t, "name", facets[i].Name === "0" ? "No" : "Yes");
        t = replacement(t, "filter", encodeURIComponent(field + ":" + facets[i].Name));
        t = replacement(t, "hits", facets[i].Hits);
        t = t.replace("eachFacet", "eachFacet" + field + facets[i].Name);
        each += t;
    }
    return each;
}

function parseRangeFacets(field, facets) {
    var template = jQuery("<div>").append(jQuery("#eachFacet").clone()).remove().html();
    var jsonPriceRange = (jQuery.parseJSON(jQuery("#priceRange").html()));
    var allRangesTemplate = "";

    switch (field) {
        case "PriceRange":
            if (jsonPriceRange != null) {
                for (var rangeIndex = 0; rangeIndex < jsonPriceRange.PriceRange.length; rangeIndex++) {
                    for (var facetIndex = 0; facetIndex < facets.length; facetIndex++) {
                        if (jsonPriceRange.PriceRange[rangeIndex].Id == facets[facetIndex].Name) {
                            jsonPriceRange.PriceRange[rangeIndex].Hits = facets[facetIndex].Hits;
                            break;
                        }
                    }


                    if (jsonPriceRange.PriceRange[rangeIndex].Hits > 0) {
                        var newTemplate = template;

                        newTemplate = replacement(newTemplate, "name", jsonPriceRange.PriceRange[rangeIndex].Title);
                        newTemplate = replacement(newTemplate, "filter", encodeURIComponent(field + ":" + jsonPriceRange.PriceRange[rangeIndex].Id));
                        newTemplate = replacement(newTemplate, "hits", jsonPriceRange.PriceRange[rangeIndex].Hits);
                        newTemplate = newTemplate.replace("eachFacet", "eachFacet" + field + rangeIndex);

                        allRangesTemplate += newTemplate;
                    }
                }
            }

            break;
    }

    return allRangesTemplate;
}

function parseLabeledFacets(field, facets) {
    var template = jQuery("<div>").append(jQuery("#eachFacet").clone()).remove().html();

    var each = "";
    for (var i = 0; i < facets.length; i++) {
        var t = template;
        if (facets[i].Name === null || facets[i].Name === "") {
            t = replacement(t, "name", "Not Informed");
        }
        else {
            t = replacement(t, "name", facets[i].Name);
        }
        t = replacement(t, "filter", encodeURIComponent(field + ":" + facets[i].Name));
        t = replacement(t, "hits", facets[i].Hits);
        t = t.replace("eachFacet", "eachFacet" + field + facets[i].Name);
        each += t;
    }
    return each;
}

function parseReviewFacets(field, facets) {
    var template = jQuery("<div>").append(jQuery("#eachFacet").clone()).remove().html();

    var each = "";
    for (var i = 0; i < facets.length; i++) {
        var t = template;
        t = replacement(t, "name", "<img src=\"/assets/templates/common-html5/images/star" + facets[i].Name + ".png\" alt=\"Average Rating\" />");
        t = replacement(t, "filter", encodeURIComponent(field + ":" + facets[i].Name));
        t = replacement(t, "hits", facets[i].Hits);
        t = t.replace("eachFacet", "eachFacet" + field + facets[i].Name);
        each += t;
    }
    return each;
}

function resultError(jqXHR, textStatus, errorThrown) {
    if (jqXHR.status == 429) {
        window.location = "error.asp?error=210";
    }

    jQuery("#products").append(jQuery("#noresultsfound").html());
}

function equalHeight(group) {
    var tallest = 0;
    group.each(function () {
        var thisHeight = jQuery(this).height();
        if (thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    group.each(function () {
        jQuery(this).height(tallest);
    });
}

function replacement(template, label, value) {
    var re = new RegExp("\\[" + label + "\]", "gim");
    if (template.match(re) !== null) {
        return template.replace(re, value);
    }
    else {
        console.warn("No '" + label + "' found in template replacement.");
        return template;
    }
}
//});