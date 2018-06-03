// =============================================================================
//
//  SECTION 1
//    1.1 - Create Menus
//    1.2 - Dropdown/Mega Menus
//    1.3 - Mobile Menu
//    1.4 - Sticky Header
//    1.5 - Sticky Footer
//
//  SECTION 2
//    2.1 - Fullwidth Rows
//    2.2 - Heading Accent
//
//  SECTION 3
//    3.1 - Resize Caption Heading
//    3.2 - Resize Caption Description
//    3.3 - Resize Caption Title Divider
//    3.4 - Resize Caption Button
//
//  SECTION 4
//    4.1 - Fullwidth Flexslider
//    4.2 - Responsive Slider Content
//
//  SECTION 5
//    5.1 - Module Featured Images
//    5.2 - Module Product Carousel
//    5.3 - Module Product Grid
//    5.4 - Module Testimonial Carousel
//    5.5 - Module Newsletter
//
//  SECTION 6
//    6.1 - Modal Resize/Open/Close
//    6.2 - Modal Account Login
//    6.3 - Modal Account Forgot Password
//    6.4 - Modal Account Register
//    6.5 - Modal Search
//    6.6 - Modal Cart
//    6.7 - Modal Quick View
//    6.8 - Modal Newsletter Popup
//
//  SECTION 7
//    7.1 - JS Quantity Buttons
//
//  SECTION 8
//    8.1 - Product Grid - Mobile Click
//    8.2 - Sidebar - First/Last Child Class
//    8.3 - Sidebar - Section Toggle
//
//  SECTION 10
//    10.1 - Smart Resize
//    10.2 - Smart Scroll
//
// =============================================================================

jQuery(document).ready(function($) {
    "use strict";
    // =============================================================================
    // SECTION 1
    // =============================================================================
    // 1.1 - Create Menus
    // =============================================================================
    // Mini-Cart grammar fix.
    var noItems = $('.no-items').text();

    $(document).find('.no-items-text').each(function() {
        var noItemsText = $(this);
        if ( noItems > 1 || noItems == 0 ) {
            $(noItemsText).text('Items');
        } else {
            $(noItemsText).text('Item');
        }
    });

    // Move links from FRAME_MENU
    $(document).find('.main-header .main-menu .navbar-nav #FRAME_MENU').each(function() {
        var frameMenu = $(this);
        $(frameMenu).children('.nav-item').each(function() {
            var menuLink = $(this);
            $(frameMenu).before(menuLink);
        });
    });

    // Remove Empty Dropdown Menus
    $(document).find('.main-header .main-menu .navbar-nav .dropdown-menu').each(function() {
        var dropdownMenu = $(this);
        var dropdownMenuLink = $(dropdownMenu).find('.nav-item');

        if ( !$(dropdownMenuLink).length ) {
            $(dropdownMenu).remove();
        }
    });

    // Move home link to 1st link
    var homeText = $('.main-header:not(.main-header.sticky-header)').data('home-icon-text');
    $(document).find('.main-menu.main-menu-init .navbar-nav > .nav-item.nav-menu-item').each(function() {
        var linkText = $(this).find('.nav-link').first().text();
        if ( (homeText.length >= 1) && (linkText == homeText) ) {
            $(this).addClass('nav-menu-item-home');
            $('.main-menu.main-menu-init .navbar-nav').prepend(this);
        }
    });

    // Create Sticky Header
    var mainHeaderUpperNav = $('.main-header:not(.main-header.sticky-header)').children('.nav.upper-navigation').first();
    var mainHeaderPrimaryNav = $('.main-header:not(.main-header.sticky-header)').children('.nav.primary-navigation').first();
    $('.main-header.sticky-header').append(mainHeaderUpperNav.clone(true));
    $('.main-header.sticky-header').append(mainHeaderPrimaryNav.clone(true));

    if ( $('.main-header').hasClass('header-logo-center') ) {
        $('.main-header.sticky-header').addClass('header-logo-center');
    }

    if ( $('.main-header').hasClass('header-logo-left') ) {
        $('.main-header.sticky-header').addClass('header-logo-left');
    }

    // Create Upper Header Promo Text
    var upperHeaderModule = $('#footer').find('.upper-header-module').first();
    if ( upperHeaderModule.length ) {
        var upperHeaderModuleHtml = $(upperHeaderModule).html();
        $('.main-header .upper-navigation .upper-menu-left').append(upperHeaderModuleHtml);
        $('.main-header .upper-navigation').show();
    }

    // Create Mega Menus
    $('#footer').find('.mega-menu-module').each(function() {
        var megaMenuModule = $(this);
        var megaMenuMainLinkText = $.trim($(this).find('.main-link').text());
        var megaMenuViewAllLinkText = $.trim($(this).find('.view-all-link').text());
        var megaMenuColumnsPerRowText = $.trim($(this).find('.columns-per-row').text());

        if ( !megaMenuMainLinkText.length ) {
            return;
        }

        // Check if the mega menu main link exists
        var megaMenuMainLinkMatch = $('.main-header:not(.main-header.sticky-header)').find('.main-menu.main-menu-init .navbar-nav > .nav-item.nav-menu-item:not(.nav-menu-item-home) > .nav-link').filter(function(index) { return $.trim($(this).text()) === megaMenuMainLinkText; }).first();

        if ( !megaMenuMainLinkMatch.length ) {
            return;
        }

        // If mega menu has dropdown menu, empty the dropdown menu. If mega menu link does not have dropdown-menu, add one.
        if ( megaMenuMainLinkMatch.parent().children('.dropdown-menu').length ) {
            megaMenuMainLinkMatch.parent().children('.dropdown-menu').empty();
        } else {
            megaMenuMainLinkMatch.parent().append('<ul class="dropdown-menu"></ul>')
        }

        // Map mega menu columns to an array
        var megaMenuMainColumns = [];
        $(megaMenuModule).find('.column').each(function() {
            var megaMenuColumnText = $.trim($(this).text());
            if ( megaMenuColumnText.length >= 1 ) {
                megaMenuMainColumns.push(megaMenuColumnText);
            }
        });

        if ( !megaMenuMainColumns.length ) {
            return;
        }

        // Find links that match mega menu columns, move links to mega menu link
        $(megaMenuMainColumns).each(function(index, value) {
            var columnText = value;

            var columnTextMatch = $('.main-header:not(.main-header.sticky-header)').find('.main-menu.main-menu-init .navbar-nav > .nav-item.nav-menu-item:not(.nav-menu-item-home) > .nav-link').filter(function(index) { return $.trim($(this).text()) === columnText; }).first();

            if ( columnTextMatch.length ) {
                $(megaMenuMainLinkMatch.parent().children('.dropdown-menu')).append(columnTextMatch.parent());
                megaMenuMainLinkMatch.parent().addClass('init-mega-menu');
            }
        });

        // Number of columns per row
        if ( megaMenuColumnsPerRowText == 1 ) {
            var megaMenuColumnsPerRow = 'col-lg-12';
        } else if ( megaMenuColumnsPerRowText == 2 ) {
            var megaMenuColumnsPerRow = 'col-lg-6';
        } else if ( megaMenuColumnsPerRowText == 3 ) {
            var megaMenuColumnsPerRow = 'col-lg-4';
        } else if ( megaMenuColumnsPerRowText == 4 ) {
            var megaMenuColumnsPerRow = 'col-lg-3';
        } else {
            var megaMenuDropdownWrapper = $(megaMenuMainLinkMatch).parent().children('.dropdown-menu').first();
            var menuColumns = $(megaMenuDropdownWrapper).children('.nav-item').length;

            if ( menuColumns == 1 ) {
                var megaMenuColumnsPerRow = 'col-lg-12';
            } else if ( menuColumns == 2 ) {
                var megaMenuColumnsPerRow = 'col-lg-6';
            } else if ( menuColumns == 3 ) {
                var megaMenuColumnsPerRow = 'col-lg-4';
            } else if ( menuColumns == 4 ) {
                var megaMenuColumnsPerRow = 'col-lg-3';
            } else {
                var megaMenuColumnsPerRow = 'col-lg-3';
            }
        }

        $(megaMenuMainLinkMatch).parent().attr('data-mega-menu-column-class', megaMenuColumnsPerRow);

        // Create mega menu column titles
        $(megaMenuMainLinkMatch).parent().children('.dropdown-menu').each(function() {
            $(this).children('.nav-item').addClass('nav-item-title');
        });

        // Create mega menu view all links
        if ( megaMenuViewAllLinkText.length ) {
            $(megaMenuMainLinkMatch).parent().children('.dropdown-menu').each(function() {
                $(this).children('.nav-item').each(function() {
                    var menuTitleLink = $(this);
                    var menuTitleLinkHref = $(menuTitleLink).children('a').attr('href');
                    $(menuTitleLink).children('.dropdown-menu').append('<li class="nav-item nav-item-view-all"><a href="' + menuTitleLinkHref + '" class="nav-link">' + megaMenuViewAllLinkText + '</a></li>');
                });
            });
        }
    });

    // Move Links To Left/Right/Upper Menus
    function initializeMainHeader() {
        var mainHeader = $('.main-header:not(.main-header.sticky-header)');

        var mainHeaderLeftMenu = $(mainHeader).find('.main-menu-left .navbar-nav');
        var mainHeaderRightMenu = $(mainHeader).find('.main-menu-right .navbar-nav');
        var mainHeaderUpperMenu = $(mainHeader).find('.upper-navigation .upper-menu-right .navbar-nav');
        var stickyHeaderLeftMenu = $(document).find('.main-header.sticky-header .main-menu-left .navbar-nav');
        var stickyHeaderRightMenu = $(document).find('.main-header.sticky-header .main-menu-right .navbar-nav');
        var stickyHeaderUpperMenu = $(document).find('.main-header.sticky-header .upper-menu-right .navbar-nav');
        var leftMenuLimit = parseInt($('.main-header:not(.main-header.sticky-header)').data('left-menu-limit')) || 3;
        var rightMenuLimit = parseInt($('.main-header:not(.main-header.sticky-header)').data('right-menu-limit')) || 3;

        // Add temporary link
        $(mainHeaderRightMenu).prepend('<li class="nav-menu-item-placeholder hidden"></li>');
        $(stickyHeaderRightMenu).prepend('<li class="nav-menu-item-placeholder hidden"></li>');


        if ( $(mainHeader).hasClass('header-logo-center') ) {
            // Header Logo Center
            $(mainHeader).find('.main-menu.main-menu-init .navbar-nav > .nav-item.nav-menu-item:not(.nav-menu-item-home)').each(function(index) {
                var menuLink = $(this);

                if ( index < leftMenuLimit ) {
                    $(mainHeaderLeftMenu).append(menuLink.clone(true));
                    $(stickyHeaderLeftMenu).append(menuLink.clone(true));
                }

                if ( index >= leftMenuLimit && index < (leftMenuLimit + rightMenuLimit) ) {
                    $(mainHeaderRightMenu).children('.nav-menu-item-placeholder').before(menuLink.clone(true));
                    $(stickyHeaderRightMenu).children('.nav-menu-item-placeholder').before(menuLink.clone(true));
                }

                if ( index >= (leftMenuLimit + rightMenuLimit) ) {
                    // Add any extra links to the upper header
                    $(mainHeaderUpperMenu).append(menuLink.clone(true));
                    $(stickyHeaderUpperMenu).append(menuLink.clone(true));
                    $(document).find('.main-header .upper-navigation').show();
                }
            });

            // Remove temporary link
            $(mainHeaderRightMenu).children('.nav-menu-item-placeholder').remove();
            $(stickyHeaderRightMenu).children('.nav-menu-item-placeholder').remove();

            // Create home icon
            var homeLink = $(document).find('.main-menu.main-menu-init .navbar-nav > .nav-item.nav-menu-item.nav-menu-item-home').first();
            if ( homeLink.length ) {
                var homeHref = $(homeLink).find('.nav-link').first().attr('href');
                $(mainHeaderLeftMenu).prepend(
                    '<li class="nav-item nav-item-icon nav-item-home">'+
                    '<a class="nav-link" href="' + homeHref + '"><i class="fontawesome-home largeicon"></i></a>'+
                    '</li>'
                );
                $(stickyHeaderLeftMenu).prepend(
                    '<li class="nav-item nav-item-icon nav-item-home">'+
                    '<a class="nav-link" href="' + homeHref + '"><i class="fontawesome-home largeicon"></i></a>'+
                    '</li>'
                );
            }
        } else {
            // Header Logo Left
            $(mainHeader).find('.main-menu.main-menu-init .navbar-nav > .nav-item.nav-menu-item:not(.nav-menu-item-home)').each(function(index) {
                var menuLink = $(this);

                if ( index < (leftMenuLimit + rightMenuLimit) ) {
                    $(mainHeaderRightMenu).children('.nav-menu-item-placeholder').before(menuLink.clone(true));
                    $(stickyHeaderRightMenu).children('.nav-menu-item-placeholder').before(menuLink.clone(true));
                }

                if ( index >= (leftMenuLimit + rightMenuLimit) ) {
                    // Add any extra links to the upper header
                    $(mainHeaderUpperMenu).append(menuLink.clone(true));
                    $(stickyHeaderUpperMenu).append(menuLink.clone(true));
                    $(document).find('.main-header .upper-navigation').show();
                }
            });

            // Remove temporary link
            $(mainHeaderRightMenu).children('.nav-menu-item-placeholder').remove();
            $(stickyHeaderRightMenu).children('.nav-menu-item-placeholder').remove();

            // Create home icon
            var homeLink = $(document).find('.main-menu.main-menu-init .navbar-nav > .nav-item.nav-menu-item.nav-menu-item-home').first();
            if ( homeLink.length ) {
                var homeHref = $(homeLink).find('.nav-link').first().attr('href');
                $(mainHeaderRightMenu).prepend(
                    '<li class="nav-item nav-item-icon nav-item-home">'+
                    '<a class="nav-link" href="' + homeHref + '"><i class="fontawesome-home largeicon"></i></a>'+
                    '</li>'
                );
                $(stickyHeaderRightMenu).prepend(
                    '<li class="nav-item nav-item-icon nav-item-home">'+
                    '<a class="nav-link" href="' + homeHref + '"><i class="fontawesome-home largeicon"></i></a>'+
                    '</li>'
                );
            }
        }

        // Create Mega Menus
        $(document).find('.main-header .main-menu.main-menu-left .navbar-nav > .nav-item.nav-menu-item.init-mega-menu, .main-header .main-menu.main-menu-right .navbar-nav > .nav-item.nav-menu-item.init-mega-menu').each(function() {
            var megaMenuLink = $(this);
            var megaMenuDropdown = $(this).children('.dropdown-menu');
            var megaMenuColumnClass = $(this).data('mega-menu-column-class');

            megaMenuLink.append('<div class="mega-menu-container"><div class="row"></div></div>');
            var megaMenuRow = $(megaMenuLink).find('.mega-menu-container > .row');

            $(megaMenuDropdown).children('.nav-item').each(function() {
                $(this).find('.dropdown-menu').addClass('mega-menu').removeClass('dropdown-menu');

                megaMenuRow.append('<div class="mega-menu-col col-xs-12 ' + megaMenuColumnClass + '"><ul class="mega-menu-col-inner"></ul></div>');
                var megaMenuColumn = $(megaMenuRow).find('.mega-menu-col > .mega-menu-col-inner').last();

                megaMenuColumn.append(this);
            });

            // Remove Empty Dropdown Menu
            $(megaMenuLink).children('.dropdown-menu').each(function() {
                var dropdownMenu = $(this);
                var dropdownMenuLink = $(dropdownMenu).find('.nav-item');

                if ( !$(dropdownMenuLink).length ) {
                    $(dropdownMenu).remove();
                }
            });
        });

    }

    initializeMainHeader();

    // Remove Empty Dropdown Menus Again to Empty Any Other Dropdown Menus
    $(document).find('.main-header .main-menu .navbar-nav .dropdown-menu').each(function() {
        var dropdownMenu = $(this);
        var dropdownMenuLink = $(dropdownMenu).find('.nav-item');

        if ( !$(dropdownMenuLink).length ) {
            $(dropdownMenu).remove();
        }
    });

    // Add has-dropdown-menu Class to List Items That Contain A Dropdown Menu
    $(document).find('.main-header .main-menu .navbar-nav .nav-item').each(function() {
        var navItem = $(this);
        var dropdownMenu = $(navItem).find('.dropdown-menu');

        if ( $(dropdownMenu).length ) {
            $(navItem).addClass('has-dropdown-menu');
        }
    });

    // Add has-mega-menu Class to First Level List Items That Contain A Mega Menu
    $(document).find('.main-header .main-menu .navbar-nav > .nav-item').each(function() {
        var navItem = $(this);
        var megaMenu = $(navItem).find('.mega-menu');

        if ( $(megaMenu).length ) {
            $(navItem).addClass('has-mega-menu');
        }
    });

    // Create Mobile Menu Links
    $(document).find('.main-header .main-menu.main-menu-init .navbar-nav > .nav-item.nav-menu-item:not(.main-header.sticky-header .main-menu.main-menu-init .navbar-nav > .nav-item.nav-menu-item)').each(function() {
        var menuLink = $(this);
        var mainHeaderMobileMenu = $(document).find('.main-header .mobile-menu .navbar-nav:not(.main-header.sticky-header .mobile-menu .navbar-nav)');
        var stickyHeaderMobileMenu = $(document).find('.main-header.sticky-header .mobile-menu .navbar-nav');

        if ( $(mainHeaderMobileMenu).length ) {

            //do not include homelink
            homeText = $('.main-header:not(.main-header.sticky-header)').data('home-icon-text');
            var linkText = menuLink.find('.nav-link').first().text();
            if (  (linkText != homeText) ) {
                $(mainHeaderMobileMenu).append(menuLink.clone(true));
            }
        }

        if ( $(stickyHeaderMobileMenu).length ) {
            $(stickyHeaderMobileMenu).append(menuLink.clone(true));
        }
    });

    // Add Mobile Dropdown Toggle Button To Link Items That Contain A Dropdown Menu
    $(document).find('.main-header .mobile-menu .navbar-nav .nav-item.has-dropdown-menu').each(function() {
        var navItem = $(this);
        $(navItem).append('<div class="dropdown-toggle-button"><span class="dropdown-toggle-button-icon"></span></div>');
    });

    // =============================================================================
    // 1.2 - Dropdown/Mega Menus
    // =============================================================================
    // Fade Dropdown Menu On Hover
    $('.main-header .main-menu .navbar-nav .has-dropdown-menu').hover(function() {
        $(this).children('.dropdown-menu').stop(false, true).fadeIn(300);
    },
    function() {
        $(this).children('.dropdown-menu').stop(false, true).fadeOut(300);
    });

    // Dropdown Menu Offscreen Fix - First Level
    $('.main-header .main-menu .navbar-nav > li > .dropdown-menu').parent().hover(function() {
        var maincontainerWidth = $('.main-content').width();
        var maincontainerOffset = $('.main-content').offset();
        var maincontainerfullOffset = maincontainerOffset.left + maincontainerWidth;
        var menu = $(this).children('.dropdown-menu');

        // Reset Dropdown Menu Position
        menu.css({ left: '', right: '' });

        // If Dropdown Menu Is Offscreen, Fix It
        if ($(menu).offset().left + menu.width() > maincontainerfullOffset) {
            menu.css({ left: 'auto', right: '0' });
        }
    },
    function() {
        // Do not perform offscreen fix on mouseout
    });

    // Dropdown Menu Offscreen Fix - Second/Third/Fourth Level
    $('.main-header .main-menu .navbar-nav > li > .dropdown-menu > li > .dropdown-menu').parent().hover(function() {
        var maincontainerWidth = $('.main-content').width();
        var maincontainerOffset = $('.main-content').offset();
        var maincontainerfullOffset = maincontainerOffset.left + maincontainerWidth;
        var menu = $(this).find('.dropdown-menu');
        var menuWidth = menu.width();

        // Reset Dropdown Menu Position
        menu.css({ left: '' });

        // Count Total Number of Dropdown Menus
        if ( $(this).find('.dropdown-menu .dropdown-menu .dropdown-menu').length ) {
            // Fourth Level
            var menuWidthTotal = (menuWidth * 3);
        } else if ( $(this).find('.dropdown-menu .dropdown-menu').length ) {
            // Third Level
            var menuWidthTotal = (menuWidth * 2);
        } else {
            // Second Level
            var menuWidthTotal = menuWidth;
        }

        // If Dropdown Menu Is Offscreen, Fix It
        if ( $(menu).offset().left + menuWidthTotal > maincontainerfullOffset ) {
            menu.css({ left: -menuWidth });
        }
    },
    function() {
        // Do not perform offscreen fix on mouseout
    });

    // Fade Mega Menu On Hover
    $('.main-header .main-menu .navbar-nav > .has-mega-menu').hover(function() {
        $(this).children('.mega-menu-container').stop(false, true).fadeIn(300);
    },
    function() {
        $(this).children('.mega-menu-container').stop(false, true).fadeOut(300);
    });

    // =============================================================================
    // 1.3 - Mobile Menu
    // =============================================================================
    // Toggle Main Header Mobile Menu
    $('.main-header .nav-item-mobile-menu .nav-link:not(.main-header.sticky-header .nav-item-mobile-menu .nav-link)').click(function() {
        var menuButton = $(this);
        var mobileMenu = $(document).find('.main-header .mobile-menu .navbar-nav:not(.main-header.sticky-header .mobile-menu .navbar-nav)');

        if ($(menuButton).hasClass('active')) {
            $(menuButton).removeClass('active');
            $(mobileMenu).stop(false, true).slideUp(300, function(){ $(mobileMenu).css('overflow','') });
        } else {
            $(menuButton).addClass('active');
            $(mobileMenu).stop(false, true).slideDown(300, function(){ $(mobileMenu).css('overflow','') });
        }
    });

    // Toggle Sticky Header Mobile Menu
    $('.main-header.sticky-header .nav-item-mobile-menu .nav-link').click(function() {
        var menuButton = $(this);
        var mobileMenu = $(document).find('.main-header.sticky-header .mobile-menu .navbar-nav');

        if ($(menuButton).hasClass('active')) {
            $(menuButton).removeClass('active');
            $(mobileMenu).stop(false, true).slideUp(300, function(){ $(mobileMenu).css('overflow','') });
        } else {
            $(menuButton).addClass('active');
            $(mobileMenu).stop(false, true).slideDown(300, function(){ $(mobileMenu).css('overflow','') });
        }
    });

    // Toggle Mobile Menu Dropdown Links
    $('.main-header .mobile-menu .navbar-nav .nav-item .dropdown-toggle-button').click(function() {
        var toggleButton = $(this);
        var toggleLink = $(this).parent();
        var dropdownMenu = $(toggleLink).children('.dropdown-menu');

        if ($(toggleButton).hasClass('active')) {
            $(toggleButton).removeClass('active');
            $(dropdownMenu).stop(false, true).slideUp(300);
        } else {
            $(toggleButton).addClass('active');
            $(dropdownMenu).stop(false, true).slideDown(300);
        }
    });

    $(document).on('selectlayers.responsiveMobileMenuLinks', function(e) {
        var mainHeaderWidth = $('.main-header').width();
        var mainHeaderContainerWidth = $('.main-header .container').width();
        if ( mainHeaderWidth > 0 && mainHeaderContainerWidth > 0 && mainHeaderWidth > mainHeaderContainerWidth ) {
            var navLinkOffset = (mainHeaderWidth - mainHeaderContainerWidth) / 2;
            $(document).find('.main-header .mobile-menu .navbar-nav').each(function() {
                $(this).find('.nav-item').each(function() {
                    var navLink = $(this).children('.nav-link');
                    var navToggle = $(this).children('.dropdown-toggle-button');
                    $(navLink).css({'paddingLeft': navLinkOffset + 'px', 'paddingRight': (navLinkOffset + 26) + 'px'});
                    $(navToggle).css({'right': navLinkOffset + 'px'});
                });
            });
        } else {
            var navLinkOffset = 0;
            $(document).find('.main-header .mobile-menu .navbar-nav').each(function() {
                $(this).find('.nav-item').each(function() {
                    var navLink = $(this).children('.nav-link');
                    var navToggle = $(this).children('.dropdown-toggle-button');
                    $(navLink).css({'paddingLeft': navLinkOffset + 'px', 'paddingRight': (navLinkOffset + 26) + 'px'});
                    $(navToggle).css({'right': navLinkOffset + 'px'});
                });
            });
        }
    });

    $(document).trigger('selectlayers.responsiveMobileMenuLinks', []);

    // =============================================================================
    // 1.4 - Sticky Header
    // =============================================================================
    var mainHeader = $(document).find('.main-header:not(.main-header.sticky-header)');
    var stickyHeader = $(document).find('.main-header.sticky-header');

    if ( $(stickyHeader).length ) {
        $(stickyHeader).data('sticky-header-active', 'false');
        var stickyheaderHeight = (parseInt($(stickyHeader).attr('data-sticky-header-height')) || 0) + 10;

        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
            var stickyheaderanimationDuration = 500;
            var headertopOffset = 0;
            var mobileOffset = 0;
            var upperHeaderHeight = (parseInt($(document).find('.main-header .upper-navigation:not(.main-header.sticky-header .upper-navigation)').height()) || 0);

            if ( $(mainHeader).length ) {
                var headertopOffset = $(mainHeader).offset().top + $(mainHeader).height();
            }

            var desktopLogo = $('.main-header .main-menu-logo');
            var mobilemenuiconWrapper = $('.main-header .main-menu.mobile-menu-icon-wrapper .navbar-nav');

            if ( $(desktopLogo).length && $(mobilemenuiconWrapper).length ) {
                if ( $(mainHeader).width() < ( $(desktopLogo).width() + $(mobilemenuiconWrapper).width() ) ) {
                    var mobileOffset = stickyheaderHeight;
                }
            }

            var stickyheaderOffset = 0;

            if ( scrollTop > headertopOffset ) {
                if ( $(stickyHeader).data('sticky-header-active') == 'false' ) {
                    $(stickyHeader).data('sticky-header-active', 'true');
                    $(stickyHeader).css({top: -((stickyheaderHeight + upperHeaderHeight + mobileOffset))});
                    $(stickyHeader).addClass('sticky-header-active');
                    $(stickyHeader).stop(true, false).animate({top: stickyheaderOffset + 'px'}, stickyheaderanimationDuration);
                }
            } else {
                if ( $(stickyHeader).data('sticky-header-active') == 'true') {
                    $(stickyHeader).data('sticky-header-active', 'false');
                    $(stickyHeader).removeClass('sticky-header-active');
                }
            }
        });
    }

    // =============================================================================
    // 1.5 - Sticky Footer
    // =============================================================================
    function initializestickyFooter() {
        var footer = $(document).find('#footer.sticky-footer');
        var mainContent = $(document).find('.main-content');

        if (!$(footer).length || !$(mainContent).length) {
            return false;
        }

        var windowHeight = $(window).height();
        var footerHeight = $(footer).height();
        var footeroffsetTop = $(footer).offset().top;
        var maincontentoffsetTop = $(mainContent).offset().top;

        if ( (footerHeight + footeroffsetTop) < windowHeight ) {
            $(mainContent).animate({minHeight: (windowHeight - footerHeight - maincontentoffsetTop) + 'px'}, 500);
        }
    }

    $(window).load(function() {
        setTimeout(function() {
            initializestickyFooter();
        }, 500);
    });

    // =============================================================================
    // SECTION 3
    // =============================================================================
    // 2.1 - Create Fullwidth Page Title Bar
    // =============================================================================
    if ( $(document).find('.full-width-page-title-container').length ) {
        var displayPageTitleBar = false;
        var pageTitleBarContainer = $('.full-width-page-title-container');
        $(pageTitleBarContainer).append('<div class="page-title-bar"><div class="container"></div></div>');
        var pageTitleBarInnerContainer = $(pageTitleBarContainer).find('.page-title-bar .container');

        if ( $(document).find('#blog').length ) {
            // Blog Page
            if ( $('.blog-content-container').children('.blogPost').length > 1 && $(document).find('h3.page_headers').length ) {
                var pageTitle = $(document).find('h3.page_headers').first();
            } else {
                var pageTitle = $(document).find('h1:not(.main-header h1)').first();
            }
        } else {
            // Other pages
            var pageTitle = $(document).find('h1:not(.main-header h1)').first();
        }

        var breadcrumbs = $(document).find('.breadcrumbs');

        if ( $(pageTitle).length && $(pageTitle).text().length > 0 ) {
            $(pageTitleBarInnerContainer).append('<h1 class="page-title">' + pageTitle.text() + '</h1>');
            if ( $(pageTitle).hasClass('page-header-duplicate') && $(pageTitle).hasClass('blog-title') ) {
                $(pageTitle).after('<h3 class="blog-title">' + pageTitle.text() + '</h3>');
                $(pageTitle).remove();
            } else if ( $(pageTitle).hasClass('page-header-duplicate') ) {
                $(pageTitle).after('<h3 class="page-title">' + pageTitle.text() + '</h3>');
                $(pageTitle).remove();
            } else {
                $(pageTitle).remove();
            }
            var displayPageTitleBar = true;
        }

        if ( $(breadcrumbs).length ) {
            $(pageTitleBarInnerContainer).append('<nav class="breadcrumbs" role="navigation" aria-label="breadcrumbs"><ul></ul></nav>');
            var breadcrumbContainer = $(pageTitleBarContainer).find('.breadcrumbs ul');

            $(breadcrumbs).find('a').each(function(index) {
                var breadcrumbLink = $(this).prop('outerHTML');

                if ( index == 0 ) {
                    $(breadcrumbContainer).append('<li class="breadcrumb"><span class="breadcrumb-icon breadcrumb-icon-home" aria-hidden="true"><i class="fontawesome-home"></i></span> ' + breadcrumbLink + ' </li>');
                } else {
                    $(breadcrumbContainer).append(' <li class="breadcrumb"><span class="breadcrumb-icon breadcrumb-icon-arrow" aria-hidden="true"><i class="fontawesome-arrow-circle-right"></i></span></span> ' + breadcrumbLink + ' </li>');
                }
            });

            // Remove empty search breadcrumb on search pages
            if ( $(document).find('section#search').length ) {
                var searchBreadcrumbLink = $(pageTitleBarInnerContainer).find('.breadcrumb:eq(1) > a:empty');
                if ( $(searchBreadcrumbLink).length ) {
                    $(searchBreadcrumbLink).parent().remove();
                }
            }

            $(breadcrumbs).remove();

            var displayPageTitleBar = true;
        } else {
            $(pageTitleBarContainer).find('.page-title').addClass('page-title-no-margin');
        }

        if ( displayPageTitleBar == true ) {
            $(pageTitleBarContainer).show();
        }
    }

    // =============================================================================
    // 2.2 - Page Breadcrumbs
    // =============================================================================
    $(document).find('.breadcrumbsBlock li').each(function() {
        var breadcrumbLink = $(this);

        $(breadcrumbLink).html(
            $(breadcrumbLink).html().replace('&gt;', '/')
        );
    });

    // =============================================================================
    // 2.3 - Content/Sidebars
    // =============================================================================
    var mainContent = $('.content-container');
    var leftSidebar = $('#leftBar');
    var rightSidebar = $('#rightBar');

    if ( $(leftSidebar).length ) {
        var leftSidebarVisible = true;
    } else {
        var leftSidebarVisible = false;
    }

    if ( $(rightSidebar).length ) {
        var rightSidebarVisible = true;
    } else {
        var rightSidebarVisible = false;
    }

    if ( $(leftSidebar).height() < 15 || $(leftSidebar).css('display') == 'none' ) {
        var leftSidebarVisible = false;
    }

    if ( $(rightSidebar).height() < 15 || $(rightSidebar).css('display') == 'none' ) {
        var rightSidebarVisible = false;
    }

    if ( $(mainContent).length && leftSidebarVisible == true && rightSidebarVisible == true ) {
        $(mainContent).addClass('col-lg-6').removeClass('col-lg-12');
        $(leftSidebar).addClass('col-lg-3').removeClass('col-lg-12');
        $(rightSidebar).addClass('col-lg-3').removeClass('col-lg-12');
    } else if ( $(mainContent).length && leftSidebarVisible == true ) {
        $(mainContent).addClass('col-lg-9').removeClass('col-lg-12');
        $(leftSidebar).addClass('col-lg-3').removeClass('col-lg-12');
    } else if ( $(mainContent).length && rightSidebarVisible == true ) {
        $(mainContent).addClass('col-lg-9').removeClass('col-lg-12');
        $(rightSidebar).addClass('col-lg-3').removeClass('col-lg-12');
    }


    // =============================================================================
    // 2.4 - Fullwidth Rows
    // =============================================================================
    $(document).on('selectlayers.fullwidthRows', function(e) {
        // Create full width rows if the page does not have a sidebar
        if ( $('.content-container').hasClass('col-lg-12') ) {
            $(document).find('.row-fullwidth-background').each(function() {
                var elem = $(this);
                var rowContainerWidth = $(elem).find('.container').width();
                var pageWrapWidth = $('.page-wrap').width();
                var rowOffset = ((pageWrapWidth - rowContainerWidth) / 2);
                if ( pageWrapWidth > 592 ) {
                    //$(elem).css({marginLeft: -rowOffset + 'px', marginRight: -rowOffset + 'px'});
                } else {
                    $(elem).css({marginLeft: '-15px', marginRight: '-15px'});
                }
            });
        }
    });

    $(document).trigger('selectlayers.fullwidthRows', []);

    // =============================================================================
    // 2.5 - Product Block Container Fix
    // =============================================================================
    // Remove clearfix divs
    $(document).find('.productBlockContainer > div:empty').each(function() {
        $(this).remove();
    });

    // Remove empty product containers
    $(document).find('.productBlockContainer .product-container').each(function() {
        if ( !$(this).children().length > 0 ) {
            $(this).remove();
        }
    });

    // Move products to the 1st productBlockContainer
    $(document).find('.productBlockContainer').each(function() {
        var productBlockContainer = $(this);
        var containerElement = $(this).parent();
        $(containerElement).find('.productBlockContainer').each(function(index) {
            if ( index >= 1 ) {
                $(this).find('.product-container').each(function() {
                    var productContainer = $(this);
                    $(containerElement).find('.productBlockContainer:eq(0)').append(productContainer);
                });
            }
        });
    });

    // Remove empty productBlockContainer
    $(document).find('.productBlockContainer').each(function() {
        if ( !$(this).children().length > 0 ) {
            $(this).remove();
        }
    });

    // =============================================================================
    // SECTION 4
    // =============================================================================
    // 4.1 - Fullwidth Flexslider
    // =============================================================================
    function fullwidthFlexslider(elem) {
        $(elem).appendTo('.full-width-slider-container');
    }

    if ( $('.flexslider').length && $('.full-width-slider-container').length ) {
        var elem = $('.flexslider');
        fullwidthFlexslider(elem);
    }

    // =============================================================================
    // 5.3 - Module Product Carousel
    // =============================================================================
    // Add .owl-carousel class to product container
    $(document).find('.productBlockContainer > .product-container:eq(0) > .product-carousel-wrapper').each(function() {
        $(this).parent().parent().addClass('owl-carousel');
    });

    // Add .owl-carousel class to category wrapper
    $(document).find('#subcategoriesBlock > div > ul > li:eq(0)').each(function() {
        $(this).parent().addClass('owl-carousel');
    });

    $(document).on('selectlayers.initializeproductcarousel', function(e, elem) {
        var productCarousel = elem;

        var productcarouselslidebyData = 1;
        if ( productcarouselslidebyData != 1 ) {
            var productcarouselslidebyData = 'page';
        }

        if ( $(productCarousel).hasClass('columns-1') ) {
            var productcarouselresponsiveData = 1;
        } else if ( $(productCarousel).hasClass('columns-2') ) {
            var productcarouselresponsiveData = 2;
        } else if ( $(productCarousel).hasClass('columns-3') ) {
            var productcarouselresponsiveData = 3;
        } else if ( $(productCarousel).hasClass('columns-4') ) {
            var productcarouselresponsiveData = 4;
        } else if ( $(productCarousel).hasClass('columns-5') ) {
            var productcarouselresponsiveData = 5;
        } else if ( $(productCarousel).hasClass('columns-6') ) {
            var productcarouselresponsiveData = 6;
        } else  {
            var productcarouselresponsiveData = 3;
        }

        if ( productcarouselresponsiveData == 1 ) {
            var productcarouselresponsiveData1 = 1;
            var productcarouselresponsiveData2 = 1;
            var productcarouselresponsiveData3 = 1;
            var productcarouselresponsiveData4 = 1;
            var productcarouselresponsiveData5 = 1;
        } else if ( productcarouselresponsiveData == 2 ) {
            var productcarouselresponsiveData1 = 1;
            var productcarouselresponsiveData2 = 1;
            var productcarouselresponsiveData3 = 2;
            var productcarouselresponsiveData4 = 2;
            var productcarouselresponsiveData5 = 2;
        } else if ( productcarouselresponsiveData == 3 ) {
            var productcarouselresponsiveData1 = 1;
            var productcarouselresponsiveData2 = 2;
            var productcarouselresponsiveData3 = 2;
            var productcarouselresponsiveData4 = 3;
            var productcarouselresponsiveData5 = 3;
        } else if ( productcarouselresponsiveData == 4 ) {
            var productcarouselresponsiveData1 = 1;
            var productcarouselresponsiveData2 = 2;
            var productcarouselresponsiveData3 = 2;
            var productcarouselresponsiveData4 = 3;
            var productcarouselresponsiveData5 = 4;
        } else if ( productcarouselresponsiveData == 5 ) {
            var productcarouselresponsiveData1 = 1;
            var productcarouselresponsiveData2 = 2;
            var productcarouselresponsiveData3 = 3;
            var productcarouselresponsiveData4 = 4;
            var productcarouselresponsiveData5 = 5;
        } else {
            var productcarouselresponsiveData1 = 1;
            var productcarouselresponsiveData2 = 2;
            var productcarouselresponsiveData3 = 3;
            var productcarouselresponsiveData4 = 4;
            var productcarouselresponsiveData5 = 6;
        }

        $(productCarousel).on('initialized.owl.carousel resized.owl.carousel', function(e) {
            setTimeout(function() {
                $(productCarousel).find('.owl-nav').each(function() {
                    var navigationWrapper = $(this);
                    var navigationButton = $(navigationWrapper).find('.owl-btn').first();
                    if ( $(navigationButton).is(':visible') ) {
                        var productHeight = $(productCarousel).find('.product-wrapper').height();
                        var productImageHeight = $(productCarousel).find('.product-image').height();
                        var navigationButtonHeight = $(navigationButton).height();
                        var navigationImageOffset = (productHeight - productImageHeight) / 2;
                        var navigationButtonOffset = navigationButtonHeight / 2;
                        var navigationWrapperOffset = (navigationImageOffset + navigationButtonOffset) * -1;
                        $(navigationWrapper).css({'marginTop': navigationWrapperOffset + 'px'});
                    }
                });
            }, 50);
        });

        $(productCarousel).owlCarousel({
            loop: false,
            margin: 30,
            mouseDrag: false,
            touchDrag: false,
            pullDrag: false,
            freeDrag: false,
            nav: true,
            navText: [ '<i class="fontawesome-chevron-left"></i>', '<i class="fontawesome-chevron-right"></i>' ],
            navClass: [ 'owl-prev owl-btn', 'owl-next owl-btn' ],
            dots: false,
            smartSpeed: 200,
            autoplay: false,
            autoplayHoverPause: false,
            autoplayTimeout: 7000,
            //responsiveBaseElement:productCarousel,
            responsiveBaseElement: $('.main-content').children('.container'),
            responsive:{
                0:{ // Breakpoint Up (xs)
                    items:productcarouselresponsiveData1,
                    slideBy:productcarouselslidebyData,
                },
                497:{ // Breakpoint Up (sm)
                    items:productcarouselresponsiveData2,
                    slideBy:productcarouselslidebyData,
                },
                690:{ // Breakpoint Up (md)
                    items:productcarouselresponsiveData3,
                    slideBy:productcarouselslidebyData,
                },
                910:{ // Breakpoint Up (lg)
                    items:productcarouselresponsiveData4,
                    slideBy:productcarouselslidebyData,
                },
                1110:{ // Breakpoint Up (xl)
                    items:productcarouselresponsiveData5,
                    slideBy:productcarouselslidebyData,
                }
            }
        });

        $(productCarousel).data('owl.carousel').invalidate('all');
        $(productCarousel).trigger('refresh.owl.carousel');
        setTimeout(function() {
            $(productCarousel).data('owl.carousel').invalidate('all');
            $(productCarousel).trigger('refresh.owl.carousel');
        }, 500);
    });

    $(window).load(function() {
        $(document).find('.productBlockContainer.owl-carousel').each(function() {
            var elem = $(this);
            $(document).trigger('selectlayers.initializeproductcarousel', [elem]);
        });
    });

    $(window).load(function() {
        $(document).find('#subcategoriesBlock > div > ul.owl-carousel').each(function() {
            var elem = $(this);
            $(document).trigger('selectlayers.initializeproductcarousel', [elem]);
        });
    });

    // =============================================================================
    // 5.7 - Newsletter
    // =============================================================================
    $(document).find('.js-newsletter-options').each(function() {
        var newsletterOptionsContainer = $(this);

        $(newsletterOptionsContainer).find('.newsletter-option-label').each(function() {
            var newsletterOptionToggle = $(this);
            $(newsletterOptionToggle).click(function(e) {
                var newsletterOptionToggleData = $(this).data('newsletter-option');
                if ( $(newsletterOptionsContainer).hasClass('active') ) {
                    $(newsletterOptionsContainer).removeClass('active');
                } else {
                    $(newsletterOptionsContainer).addClass('active');
                }
            });
        });

        $(newsletterOptionsContainer).find('.dropdown-menu .nav-link').click(function(e) {
            e.preventDefault();
            var newsletterOptionToggleData = $(this).data('newsletter-option');

            $(document).find('.newsletter-option-label').each(function() {
                var currentData = $(this).data('newsletter-option');

                if ( newsletterOptionToggleData == currentData ) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });

            if ( newsletterOptionToggleData == 'subscribe' ) {
                $(document).find('.newsletter-options input[name=subscribe][value=1]').each(function() {
                    $(this).prop('checked', true);
                });
            } else if ( newsletterOptionToggleData == 'unsubscribe' ) {
                $(document).find('.newsletter-options input[name=subscribe][value=0]').each(function() {
                    $(this).prop('checked', true);
                });
            }

            $(newsletterOptionsContainer).removeClass('active');
        });
    });

    // =============================================================================
    // SECTION 6
    // =============================================================================
    // 6.1 - Modal Open/Close
    // =============================================================================
    $(document).on('selectlayers.modal.open', function(e, modalId, modalAnimation) {
        $('html, body').animate({
            scrollTop: "0px"
        }, 500);

        var modalContainer = $(document).find('.modal-container[data-modal-id="'+modalId+'"]');
        var modalBackdrop = $(document).find('.modal-backdrop');
        var animationDuration = 0;
        var timeoutDuration = 0;

        if ( !modalContainer.length || !modalBackdrop.length ) {
            return false;
        }

        if ( modalAnimation == 'fade' ) {
            var animationDuration = 650;
        }

        // If a modal container is already open and it is not the current modal, then close it before opening the new modal, does not close modal if only the modal background is open
        if ( $('.modal-container.active').length ) {
            var closemodalId = $('.modal-container.active').data('modal-id');
            var closemodalAnimation = modalAnimation;
            var closeactivemodalContainer = true;
            var closeactivemodalBackdrop = true;

            if ( modalId != closemodalId ) {
                $(document).trigger('selectlayers.modal.close', [closemodalId, closemodalAnimation, closeactivemodalContainer, closeactivemodalBackdrop]);
                var timeoutDuration = (timeoutDuration + animationDuration);
            }
        }

        setTimeout(function() {
            $(modalContainer).addClass('active').fadeIn(animationDuration);
            $(modalBackdrop).addClass('active').fadeIn(animationDuration);
        }, timeoutDuration);
    });

    $(document).on('selectlayers.modal.close', function(e, closemodalId, closemodalAnimation, closemodalContainer, closemodalBackdrop) {
        var modalContainer = $(document).find('.modal-container[data-modal-id="'+closemodalId+'"]');
        var modalBackdrop = $(document).find('.modal-backdrop');

        if ( closemodalAnimation == 'fade' ) {
            var animationDuration = 650;
        } else {
            var animationDuration = 0;
        }

        if ( closemodalContainer == true ) {
            $(modalContainer).fadeOut(animationDuration).removeClass('active');
        }

        if ( closemodalBackdrop == true ) {
            $(modalBackdrop).fadeOut(animationDuration).removeClass('active');
        }
    });

    $(document).on('selectlayers.modal.closeclick', function(e) {
        $(document).find('.modal-container .modal-close').each(function() {
            $(this).off('click.selectlayers.modalcloseclick').on('click.selectlayers.modalcloseclick', function(e) {
                e.preventDefault();
                var closemodalId = $('.modal-container.active').data('modal-id');
                var closemodalAnimation = 'fade';
                var closemodalContainer = true;
                var closemodalBackdrop = true;
                $(document).trigger('selectlayers.modal.close', [closemodalId, closemodalAnimation, closemodalContainer, closemodalBackdrop]);
            });
        });
    });

    $(document).trigger('selectlayers.modal.closeclick', []);

    $(document).on('selectlayers.modal.backdropclick', function(e) {
        $(document).find('.modal-backdrop').each(function() {
            $(this).off('click.selectlayers.modalbackdropclick').on('click.selectlayers.modalbackdropclick', function(e) {
                e.preventDefault();
                var closemodalId = $('.modal-container.active').data('modal-id');
                var closemodalAnimation = 'fade';
                var closemodalContainer = true;
                var closemodalBackdrop = true;
                $(document).trigger('selectlayers.modal.close', [closemodalId, closemodalAnimation, closemodalContainer, closemodalBackdrop]);
            });
        });
    });

    $(document).trigger('selectlayers.modal.backdropclick', []);

    // =============================================================================
    // 6.5 - Modal Search
    // =============================================================================
    if ( $('#FRAME_SEARCH').css('display') != 'none' ) {
        $(document).find('.nav-item-search').each(function() {
            $(this).show();
        });
    }

    $('.main-header .nav-item-search .nav-link').click(function(e) {
        if ( !$('.modal-container[data-modal-id="search"]').length || !$('.modal-container[data-modal-id="search"] .search-bar').length ) {
            return;
        }
        e.preventDefault();
        var modalId = 'search';
        var modalAnimation = 'fade';
        $(document).trigger('selectlayers.modal.open', [modalId, modalAnimation]);
    });

    // =============================================================================
    // 6.6 - Modal Cart
    // =============================================================================
    $(document).on('selectlayers.toggleQuickCartModal', function(e) {
        var src = 'view_cart_quick.asp';
        var modalContent = $('.modal-container[data-modal-id="quickcart"] .modal-content');
        var modalId = 'quickcart';
        var modalAnimation = 'fade';

        $(modalContent).html('');
        $(modalContent).append('<div class="modal-loading-progress"><div class="mdl-progress mdl-js-progress mdl-progress__indeterminate"><div class="progressbar bar bar1" style="width: 0%;"></div><div class="bufferbar bar bar2" style="width: 100%;"></div></div></div>');

        //$(modalContent).append('<div class="modal-loading-progress"><img src="assets/templates/common-html5/images/loading.gif"> </div>');


        $(modalContent).append('<iframe src="' + src + '" frameborder="0" scrolling="no" class="modal-iframe" style="height: 104px;"></iframe>');

        var modalIframe = $(modalContent).find('iframe.modal-iframe');
        $(modalIframe).css({'opacity': '0'});

        $(modalIframe).iFrameResize({
            resizedCallback: function (messageData) {
                $(document).find('.modal-loading-progress').remove();
                $(modalIframe).animate({'opacity': '1'}, 150);
            },
            messageCallback: function(messageData) {
                if ( messageData.message.name == 'toggle-quickview-modal' ) {
                    // Close the current modal
                    var closemodalId = $('.modal-container.active').data('modal-id');
                    var closemodalAnimation = 'fade';
                    var closemodalContainer = true;
                    var closemodalBackdrop = true;
                    $(document).trigger('selectlayers.modal.close', [closemodalId, closemodalAnimation, closemodalContainer, closemodalBackdrop]);

                    setTimeout(function() {
                        // Open the new modal
                        var quickviewUrl = messageData.message.value;
                        $(document).trigger('selectlayers.toggleQuickviewModal', [quickviewUrl]);
                    }, 650);
                }

                if ( messageData.message.name == 'add-to-cart' ) {
                    var addtocartUrl = messageData.message.value;
                    window.location = addtocartUrl;
                }
            }
        });

        $(document).trigger('selectlayers.modal.open', [modalId, modalAnimation]);
    });

    $('.main-header .nav-item-shop .nav-link').click(function(e) {
        if ( !$('.modal-container[data-modal-id="quickcart"]').length ) {
            return;
        }

        var itemsInCart = parseInt($(this).find('.no-items').text()) || 0;

        if ( itemsInCart == 0 ) {
            return;
        }

        e.preventDefault();

        $(document).trigger('selectlayers.toggleQuickCartModal', []);
    });

    if ( window.location.search.indexOf('quickcart') != -1 ) {
        if ( !$('.modal-container[data-modal-id="quickcart"]').length ) {
            return;
        }

        $(document).trigger('selectlayers.toggleQuickCartModal', []);

        $('html').addClass('hide-simple-modal');

        setTimeout(function() {
            if ( $(document).find('.simplemodal-container').length ) {
                $(document).find('.simplemodal-overlay').remove();
                $(document).find('.simplemodal-container').remove();

                $('html').removeClass('hide-simple-modal');
            }
        }, 1000);
    }

    // =============================================================================
    // 6.7 - Modal Quick View
    // =============================================================================
    $(window).load(function() {
        if ( $('#qv_buttons').length ) {
            $(document).find('.product-container .btn-quickview').each(function() {
                var buttonWrapper = $(this).parent();

                if ( $(buttonWrapper).hasClass('btn-wrapper') ) {
                    $(buttonWrapper).show();
                }
            });
        }
    });

    $(document).on('selectlayers.toggleQuickviewModal', function(e, quickviewUrl) {
        var modalContent = $('.modal-container[data-modal-id="quickview"] .modal-content');
        var modalId = 'quickview';
        var modalAnimation = 'fade';

        $(modalContent).html('');
        $(modalContent).append('<div class="modal-loading-progress"><div class="mdl-progress mdl-js-progress mdl-progress__indeterminate"><div class="progressbar bar bar1" style="width: 0%;"></div><div class="bufferbar bar bar2" style="width: 100%;"></div></div></div>');
        $(modalContent).append('<iframe src="' + quickviewUrl + '" frameborder="0" scrolling="no" class="modal-iframe" style="height: 104px;"></iframe>');

        var modalIframe = $(modalContent).find('iframe.modal-iframe');
        $(modalIframe).css({'opacity': '0'});

        $(modalIframe).iFrameResize({
            resizedCallback: function (messageData) {
                $(document).find('.modal-loading-progress').remove();
                $(modalIframe).animate({'opacity': '1'}, 150);
            },
            messageCallback: function(messageData) {
                if ( messageData.message.name == 'toggle-quickview-modal' ) {
                    // Close the current modal
                    var closemodalId = $('.modal-container.active').data('modal-id');
                    var closemodalAnimation = 'fade';
                    var closemodalContainer = true;
                    var closemodalBackdrop = true;
                    $(document).trigger('selectlayers.modal.close', [closemodalId, closemodalAnimation, closemodalContainer, closemodalBackdrop]);

                    setTimeout(function() {
                        // Open the new modal
                        var quickviewUrl = messageData.message.value;
                        $(document).trigger('selectlayers.toggleQuickviewModal', [quickviewUrl]);
                    }, 650);
                }

                if ( messageData.message.name == 'scroll-modal' ) {
                    // Scroll modal
                    var modalScrollTop = messageData.message.value;

                    var modalOffsetTop = $('.modal-container[data-modal-id="quickview"] .modal-wrapper').offset().top;
                    var modalScrollTop = modalScrollTop + modalOffsetTop;

                    $('html, body').animate({
                        scrollTop: modalScrollTop
                    }, 750);
                }

                if ( messageData.message.name == 'add-to-cart' ) {
                    var addtocartUrl = messageData.message.value;
                    window.location = addtocartUrl;
                }
            }
        });

        $(document).trigger('selectlayers.modal.open', [modalId, modalAnimation]);
    });

    $(document).find('.product-container .btn-quickview').click(function(e) {
        if ( !$('.modal-container[data-modal-id="quickview"]').length ) {
            return;
        }

        e.preventDefault();

        var quickviewUrl = $(this).data('quickview-url');
        $(document).trigger('selectlayers.toggleQuickviewModal', [quickviewUrl]);
    });

    // =============================================================================
    // 6.8 - Modal Newsletter Popup
    // =============================================================================
    $(window).load(function() {

        //first on load we check if popup is displayed, if yes set cookie value to hide
        if ( $('.modal-container[data-modal-id="newsletter"]').length ) {
            if ( $.cookie('modal-newsletter-popup') != 'hide-newsletter-popup' ) {
                $.cookie('modal-newsletter-popup', 'display-newsletter-popup', { expires: 365, path: '/' });
            }
        }
        //then only if no other popups are open run showNesletterPopup
        setTimeout(function() {
            // Open newsletter popup if no other popups are open
            if ( !$('.modal-container.active').length ) {
                showNewsletterPopup();
            }
        }, 10000);
    });



    function showNewsletterPopup() {
        //only if cookie is set to display-newsletter-popup
        if ( $('.modal-container[data-modal-id="newsletter"]').length && $.cookie('modal-newsletter-popup') == 'display-newsletter-popup' ) {
            var modalId = 'newsletter';
            var modalAnimation = 'fade';
            $(document).trigger('selectlayers.modal.open', [modalId, modalAnimation]);

            setTimeout(function() {
                $.cookie('modal-newsletter-popup', 'hide-newsletter-popup', { expires: 365, path: '/' });
                // $.cookie('modal-newsletter-popup', 'hide-newsletter-popup', { expires: 1, path: '/' });
                // $.cookie('modal-newsletter-popup', 'hide-newsletter-popup', { expires: 0.001, path: '/' });
            }, 1000);
        }
    }

    // =============================================================================
    // 7.3 - Js Quantity Buttons
    // =============================================================================
    $(document).on('selectlayers.initializeJsQuantityButtons', function(e) {
        $(document).find('.qty-btn-wrapper').each(function() {
            var qtyBtnWrapper = $(this);
            $(qtyBtnWrapper).addClass('qty-btn-wrapper-initialized')
            $(document).find('.qty-btn').each(function() {
                $(this).off('click.selectlayers.initializeqtybtn').on('click.selectlayers.initializeqtybtn', function () {
                    var qtyButton = $(this);
                    var qtybuttonAmount = $(qtyButton).data('action');
                    var qtyInput = $(qtyButton).closest('.qty-btn-wrapper').find('input.form-control');
                    var qtyinputValue = parseInt($(qtyInput).val()) || 1;

                    if (qtyinputValue < 1) {
                        var qtyinputValue = 1;
                    }

                    if ( qtybuttonAmount == 'inc' ) {
                        $(qtyInput).val((qtyinputValue + 1));
                    } else {
                        if (qtyinputValue > 1) {
                            $(qtyInput).val((qtyinputValue - 1));
                        } else {
                            $(qtyInput).val(1);
                        }
                    }
                });
            });
        });
    });

    $(document).trigger('selectlayers.initializeJsQuantityButtons', []);

    // =============================================================================
    // SECTION 8
    // =============================================================================
    // 8.1 - Product Grid - Add to Cart
    // =============================================================================
    $(document).find('.product-container .btn-addtocart').click(function(e) {
        e.preventDefault();

        var addtocartUrl = $(this).data('addtocart-url');
        window.location = addtocartUrl;
    });

    // =============================================================================
    // 8.2 - Product Grid - Badge
    // =============================================================================
    $(document).find('.badge').each(function() {
        var productBadge = $(this);
        var productWrapper = $(this).parent().parent().parent();
        if ( $(productWrapper).find('.product-background-overlay').length ) {
            $(productWrapper).find('.product-background-overlay').after(productBadge);
        }
    });

    // =============================================================================
    // 8.3 - Product Grid - Mobile Click
    // =============================================================================
    if ( $('html').hasClass('touch') ) {
        $(document).find('.product-container .product-wrapper').click(function(e){
            e.stopPropagation();
            var elem = $(this);
            toggleProductHoverState(elem);
        });

        $(document).click(function(e){
            clearProductHoverState();
        });
    }

    function toggleProductHoverState(elem) {
        var productWrapper = elem;

        if ( productWrapper.hasClass('product-wrapper') ) {
            if ( productWrapper.hasClass('active') ) {
                productWrapper.removeClass('active');
            } else {
                clearProductHoverState();
                productWrapper.addClass('active');
            }
        }
    }

    function clearProductHoverState() {
        $(document).find('.product-container .product-wrapper').each(function() {
            $(this).removeClass('active');
        });
    }

    // =============================================================================
    // 8.4 - IOS iframe fix
    // =============================================================================
    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    }

    if ( getMobileOperatingSystem() == 'iOS' ) {
        $(document).find('html').addClass('iOS-Device');
    }

    // =============================================================================
    // 8.4 - Sidebar - First/Last Child Class
    // =============================================================================
    $(document).find('.sidebar-container, .blog-sidebar-container').each(function() {
        var sidebarContainer = $(this);

        $(sidebarContainer).find('.sidebar-section-container').first().addClass('first-child');
        $(sidebarContainer).find('.sidebar-section-container').last().addClass('last-child');
    });

    // =============================================================================
    // 8.5 - Sidebar - Section Toggle
    // =============================================================================
    $(document).find('.sidebar-container .sidebar-section-container, .blog-sidebar-container .sidebar-section-container').each(function() {
        var sidebarSection = $(this);
        var sidebarContent = $(sidebarSection).find('.sidebar-section-content');

        if ($(sidebarSection).hasClass('active')) {
            $(sidebarContent).css({'display': 'block'});
        } else {
            $(sidebarContent).css({'display': 'none'});
        }
    });

    $(document).find('.sidebar-container .dropdown-toggle-button, .blog-sidebar-container .dropdown-toggle-button').click(function() {
        var toggleButton = $(this);
        var toggleSection = $(this).parent().parent();
        var toggleContent = $(toggleSection).find('.sidebar-section-content');

        if ($(toggleSection).hasClass('active')) {
            $(toggleContent).stop(false, true).slideUp(300);
            $(toggleSection).removeClass('active');
        } else {
            $(toggleContent).stop(false, true).slideDown(300);
            $(toggleSection).addClass('active');
        }
    });

    // =============================================================================
    // 8.6 - Product Layout Toggle
    // =============================================================================
    if ( $('.product-layout-toggle').length && $('.product-layout-toggle').is(':visible') && $.cookie('product-layout-view') == 'list' ) {
        $('.product-layout-icon.product-layout-grid').removeClass('active');
        $('.product-layout-icon.product-layout-list').addClass('active');
        $('#itemsBlock .productBlockContainer').addClass('product-view-list');
    }

    $(document).find('.product-layout-toggle .product-layout-icon').click(function(e){
        if ( $(this).hasClass('active') ) {
            return;
        }

        if ( $(this).hasClass('product-layout-list') && !$(this).hasClass('active') ) {
            $(document).find('.product-layout-icon').removeClass('active');
            $(this).addClass('active');
            $('#itemsBlock .productBlockContainer').addClass('product-view-list');
            $.cookie('product-layout-view', 'list', { expires: 30, path: '/' });
        } else {
            $(document).find('.product-layout-icon').removeClass('active');
            $(this).addClass('active');
            $('#itemsBlock .productBlockContainer').removeClass('product-view-list');
            $.cookie('product-layout-view', 'grid', { expires: 30, path: '/' });
        }
    });


    // =============================================================================
    // SECTION 10
    // =============================================================================
    // 10.1 - Smart Resize
    // =============================================================================
    var selectlayersSmartResize = false;
    $(window).resize(function() {
        selectlayersSmartResize = true;
    });

    setInterval(function() {
        if ( selectlayersSmartResize ) {
            selectlayersSmartResize = false;

            // Responsive Mobile Menu Links
            $(document).trigger('selectlayers.responsiveMobileMenuLinks', []);

            // Fullwidth Rows
            $(document).trigger('selectlayers.fullwidthRows', []);

            // Resize Newsletter
            $(document).trigger('selectlayers.resizenewsletter', []);
        }
    }, 250);

    // =============================================================================
    // 10.1 - Smart Scroll
    // =============================================================================
    var selectlayersSmartScroll = false;
    $(window).scroll(function() {
        selectlayersSmartScroll = true;
    });

    setInterval(function() {
        if ( selectlayersSmartScroll ) {
            selectlayersSmartScroll = false;

        }
    }, 250);
});


/*!
* classie - class helper functions
* from bonzo https://github.com/ded/bonzo
*
* classie.has( elem, 'my-class' ) -> true/false
* classie.add( elem, 'my-new-class' )
* classie.remove( elem, 'my-unwanted-class' )
* classie.toggle( elem, 'my-class' )
*/

/*jshint browser: true, strict: true, undef: true */

(function(window) {

    'use strict';

    // class helper functions from bonzo https://github.com/ded/bonzo

    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }

    // classList support for class management
    // altho to be fair, the api sucks because it won't accept multiple classes at once
    var hasClass, addClass, removeClass;

    if ('classList' in document.documentElement) {
        hasClass = function(elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function(elem, c) {
            elem.classList.add(c);
        };
        removeClass = function(elem, c) {
            elem.classList.remove(c);
        };
    }
    else {
        hasClass = function(elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function(elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function(elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }

    window.classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };

})(window);

/* IE Fix for the use of attribute ='placeholder' */
if (!jQuery.support.placeholder) {
    var active = document.activeElement;

    jQuery(':text').focus(function() {
        if (jQuery(this).attr('placeholder') != '' && jQuery(this).val() == jQuery(this).attr('placeholder')) {
            jQuery(this).val('').removeClass('hasPlaceholder');
        }
    }).blur(function() {
        if (jQuery(this).attr('placeholder') != '' && (jQuery(this).val() == '' || jQuery(this).val() == jQuery(this).attr('placeholder'))) {
            jQuery(this).val(jQuery(this).attr('placeholder')).addClass('hasPlaceholder');
        }
    });
    jQuery(':text').blur();

    jQuery(active).focus();
}

/* Initiates <select> for Sub-Category & Blog menus at a specified width. */
if (jQuery(window).width() <= 767) {

    jQuery('#blog .blogNav ul, #modManufacturer ul').each(function() {
        var list = jQuery(this),
        select = jQuery(document.createElement('select')).insertBefore(jQuery(this).hide());

        jQuery('>li a', this).each(function() {
            var target = jQuery(this).attr('target'),
            option = jQuery(document.createElement('option'))
            .appendTo(select)
            .val(this.href)
            .html(jQuery(this).html())
            .click(function() {
            });
        });
        list.remove();
    });

    jQuery('#blog .blogNav select:eq(0)').prepend('<option> --- Select Category ---</option>');
    jQuery('#blog .blogNav select:eq(1)').prepend('<option> --- Select Recent Posts ---</option>');
    jQuery('#blog .blogNav select:eq(2)').prepend('<option> --- Select Archives ---</option>');

    jQuery('#modManufacturer select:eq(0)').prepend('<option> --- Select A Manufacturer ---</option>');

    jQuery('#blog .blogNav select, #subcategoriesBlock select, #modManufacturer select').change(function() {
        window.location.href = jQuery(this).val();
    });
}
