jQuery(document).ready(function($) {

    if (!$(".reviewsBlock")[0]){
        $("#no-reviews-yet").css({'display':'block'})
    }
    else {}


    /* below for corporate sales remove error messages when uploading form for first time*/
    if ($("#mc_embed_signup"))
    {
        $( "div.mce_inline_error" ).each(function( index, element ) {
            // element == this
            $( element ).css( "display", "none" );
        });

        $("div").removeClass("mce_inline_error");
        $("input").removeClass("mce_inline_error");

    }


    /* below remove Advice tab for Yo-Yo Mat */
    if ($("#product_name_ad")[0]){
        if ($("#product_name_ad").html()=='Yo-Yo Mat')
        {

             $('#rTabs').responsiveTabs('activate', 1);
            $("#advice-tab").remove();
            $("#product-other-sizes").remove();

            $("#benefits-mat").addClass("custom-blue");
        }
		else if ($("#product_name_ad").html()=='Yo-Yo Desk CUBE')
        {
             $('#rTabs').responsiveTabs('activate', 1);
            $("#advice-tab").remove();
        } 
        else {
            $("#benefits-st").addClass("custom-blue");
        }
    }




    /* below remove Advice tab for Yo-Yo Mat */
    if ($("#category")[0]){
        if ($('#category .page_headers').html()=='Yo-Yo Desk CLASSIC')
        {
            $("#yy-other-cl").css({display:'none'});
        }
        else if ($('#category .page_headers').html()=='Yo-Yo Desk GO'){
            $("#yy-other-go").css({display:'none'});
        }
    }








});



