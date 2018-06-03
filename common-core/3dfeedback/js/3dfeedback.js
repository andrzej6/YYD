//** Site Logo/ Watermark Script- (c) Dynamic Drive DHTML code library: http://www.dynamicdrive.com.
//** Available/ usage terms at http://www.dynamicdrive.com
//** v2.0 (April 19th, 09')


var ddFeedBack = {
    setting: { orientation: 4, visibleduration: 0, fadeduration: [1000, 500] }, //orientation=1|2|3|4, duration=millisec or 0, fadedurations=millisecs
    offsets: { x: 0, y: 280 }, //offset of logo relative to window corner
    logoHTML: '<div title=\"Feedback\" onClick=\"javascript: window.open (\'feedback.asp\',\'feedback\',\'menubar=0,resizable=1,width=456,height=650\');\" style=\"background: transparent none repeat scroll 0 0; bottom: 0; cursor:pointer; height: 104px; right: 0px; line-height: normal; margin: 0; padding: 0; position: fixed; top: 35% !important; z-index: 4000000000 !important; float: right;\"><div id=\"holder\"><img src=\"assets/images/default/Animated-Badge-Vertical.gif\" alt=\"Feedback\" width=\"40\" height=\"104\" border=\"0\"></div></div>', //HTML for logo, which is auto wrapped in DIV w/ ID="mysitelogo"

    coord: {},

    keepfixed: function () {
        if (!this.cssfixedsupport) {
            var $window = jQuery(window)
            var is1or3 = /^[13]$/.test(this.setting.orientation)
            var is1or2 = /^[12]$/.test(this.setting.orientation)
            var x = $window.scrollLeft() + (is1or3 ? this.offsets.x : $window.width() - this.$control.width() - this.offsets.x)
            var y = $window.scrollTop() + (is1or2 ? this.offsets.y : $window.height() - this.$control.height() - this.offsets.y)
            this.$control.css({ left: x + 'px', top: y + 'px' })
            //alert('a');
        }
    },

    showlogo: function () {
        var mainobj = ddFeedBack
        this.$control.animate({ opacity: 1 }, this.setting.fadeduration[0])
        if (this.setting.visibleduration > 0) {
            setTimeout(function () {
                mainobj.$control.stop().animate({ opacity: 0 }, mainobj.setting.fadeduration[1], function () {
                    jQuery(window).unbind('scroll.fixed resize.fixed')
                })
            }, this.setting.visibleduration + this.setting.fadeduration[0])
        }
    },


    checkpage: function () {
        var mainobj = ddFeedBack
        this.$control.animate({ opacity: 1 }, this.setting.fadeduration[0])
        var pagename = escape(window.location);
        if ((pagename.search("_c_") == -1) && (pagename.search("_ep_") == -1) && (pagename.search("_p_") == -1)) {
            jQuery("#editlink").hide();
        }       
    },

    init: function () {
        jQuery(document).ready(function ($) {
            var mainobj = ddFeedBack
            var iebrws = document.all
            mainobj.cssfixedsupport = !iebrws || iebrws && document.compatMode == "CSS1Compat" && window.XMLHttpRequest //not IE or IE7+ browsers in standards mode
            if (mainobj.cssfixedsupport) {
                mainobj.coord[(/^[13]$/.test(mainobj.setting.orientation)) ? 'left' : 'right'] = mainobj.offsets.x
                mainobj.coord[(/^[12]$/.test(mainobj.setting.orientation)) ? 'top' : 'bottom'] = mainobj.offsets.y
            }
            mainobj.$control = $('<div id="FeedbackBadge">' + mainobj.logoHTML + '</div>')
				.css({ position: mainobj.cssfixedsupport ? 'fixed' : 'absolute', opacity: 0, width: '40px'})
				.css(mainobj.coord)
				.appendTo('body')
            if (document.all && !window.XMLHttpRequest && mainobj.$control.text() != '') //loose check for IE6 and below, plus whether control contains any text
                mainobj.$control.css({ width: mainobj.$control.width() }) //IE6- seems to require an explicit width on a DIV containing text
            mainobj.keepfixed()
            mainobj.checkpage()
            mainobj.showlogo()
            $(window).bind('scroll.fixed resize.fixed', function () { mainobj.keepfixed() })
        })
    }
}

ddFeedBack.init()