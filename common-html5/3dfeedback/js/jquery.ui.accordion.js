﻿(function(n){n.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:!0,clearStyle:!1,collapsible:!1,event:"click",fillSpace:!1,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:!1,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var t=this,i=t.options,r,u;t.running=0,t.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"),t.headers=t.element.find(i.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){i.disabled||n(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){i.disabled||n(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){i.disabled||n(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){i.disabled||n(this).removeClass("ui-state-focus")}),t.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"),i.navigation&&(r=t.element.find("a").filter(i.navigationFilter).eq(0),r.length&&(u=r.closest(".ui-accordion-header"),t.active=u.length?u:r.closest(".ui-accordion-content").prev())),t.active=t._findActive(t.active||i.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"),t.active.next().addClass("ui-accordion-content-active"),t._createIcons(),t.resize(),t.element.attr("role","tablist"),t.headers.attr("role","tab").bind("keydown.accordion",function(n){return t._keydown(n)}).next().attr("role","tabpanel"),t.headers.not(t.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide(),t.active.length?t.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):t.headers.eq(0).attr("tabIndex",0),n.browser.safari||t.headers.find("a").attr("tabIndex",-1),i.event&&t.headers.bind(i.event.split(" ").join(".accordion ")+".accordion",function(n){t._clickHandler.call(t,n,this),n.preventDefault()})},_createIcons:function(){var t=this.options;t.icons&&(n("<span><\/span>").addClass("ui-icon "+t.icons.header).prependTo(this.headers),this.active.children(".ui-icon").toggleClass(t.icons.header).toggleClass(t.icons.headerSelected),this.element.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.children(".ui-icon").remove(),this.element.removeClass("ui-accordion-icons")},destroy:function(){var t=this.options,i;return this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"),this.headers.find("a").removeAttr("tabIndex"),this._destroyIcons(),i=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled"),(t.autoHeight||t.fillHeight)&&i.css("height",""),n.Widget.prototype.destroy.call(this)},_setOption:function(t,i){n.Widget.prototype._setOption.apply(this,arguments),t=="active"&&this.activate(i),t=="icons"&&(this._destroyIcons(),i&&this._createIcons()),t=="disabled"&&this.headers.add(this.headers.next())[i?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(t){if(!this.options.disabled&&!t.altKey&&!t.ctrlKey){var i=n.ui.keyCode,u=this.headers.length,f=this.headers.index(t.target),r=!1;switch(t.keyCode){case i.RIGHT:case i.DOWN:r=this.headers[(f+1)%u];break;case i.LEFT:case i.UP:r=this.headers[(f-1+u)%u];break;case i.SPACE:case i.ENTER:this._clickHandler({target:t.target},t.target),t.preventDefault()}return r?(n(t.target).attr("tabIndex",-1),n(r).attr("tabIndex",0),r.focus(),!1):!0}},resize:function(){var i=this.options,t,r;return i.fillSpace?(n.browser.msie&&(r=this.element.parent().css("overflow"),this.element.parent().css("overflow","hidden")),t=this.element.parent().height(),n.browser.msie&&this.element.parent().css("overflow",r),this.headers.each(function(){t-=n(this).outerHeight(!0)}),this.headers.next().each(function(){n(this).height(Math.max(0,t-n(this).innerHeight()+n(this).height()))}).css("overflow","auto")):i.autoHeight&&(t=0,this.headers.next().each(function(){t=Math.max(t,n(this).height("").height())}).height(t)),this},activate:function(n){this.options.active=n;var t=this._findActive(n)[0];return this._clickHandler({target:t},t),this},_findActive:function(t){return t?typeof t=="number"?this.headers.filter(":eq("+t+")"):this.headers.not(this.headers.not(t)):t===!1?n([]):this.headers.filter(":eq(0)")},_clickHandler:function(t,i){var r=this.options,u,f;if(!r.disabled){if(!t.target){if(!r.collapsible)return;this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(r.icons.headerSelected).addClass(r.icons.header),this.active.next().addClass("ui-accordion-content-active");var e=this.active.next(),s={options:r,newHeader:n([]),oldHeader:r.active,newContent:n([]),oldContent:e},o=this.active=n([]);this._toggle(o,e,s);return}if(u=n(t.currentTarget||i),f=u[0]===this.active[0],r.active=r.collapsible&&f?!1:this.headers.index(u),!this.running&&(r.collapsible||!f)){var h=this.active,o=u.next(),e=this.active.next(),s={options:r,newHeader:f&&r.collapsible?n([]):u,oldHeader:this.active,newContent:f&&r.collapsible?n([]):o,oldContent:e},c=this.headers.index(this.active[0])>this.headers.index(u[0]);this.active=f?n([]):u,this._toggle(o,e,s,f,c),h.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(r.icons.headerSelected).addClass(r.icons.header),f||(u.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(r.icons.header).addClass(r.icons.headerSelected),u.next().addClass("ui-accordion-content-active"));return}}},_toggle:function(t,i,r,u,f){var o=this,e=o.options,c,h;if(o.toShow=t,o.toHide=i,o.data=r,c=function(){if(o)return o._completed.apply(o,arguments)},o._trigger("changestart",null,o.data),o.running=i.size()===0?t.size():i.size(),e.animated){h={},h=e.collapsible&&u?{toShow:n([]),toHide:i,complete:c,down:f,autoHeight:e.autoHeight||e.fillSpace}:{toShow:t,toHide:i,complete:c,down:f,autoHeight:e.autoHeight||e.fillSpace},e.proxied||(e.proxied=e.animated),e.proxiedDuration||(e.proxiedDuration=e.duration),e.animated=n.isFunction(e.proxied)?e.proxied(h):e.proxied,e.duration=n.isFunction(e.proxiedDuration)?e.proxiedDuration(h):e.proxiedDuration;var l=n.ui.accordion.animations,a=e.duration,s=e.animated;!s||l[s]||n.easing[s]||(s="slide"),l[s]||(l[s]=function(n){this.slide(n,{easing:s,duration:a||700})}),l[s](h)}else e.collapsible&&u?t.toggle():(i.hide(),t.show()),c(!0);i.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur(),t.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()},_completed:function(n){(this.running=n?0:--this.running,this.running)||(this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""}),this.toHide.removeClass("ui-accordion-content-active"),this.toHide.length&&(this.toHide.parent()[0].className=this.toHide.parent()[0].className),this._trigger("change",null,this.data))}}),n.extend(n.ui.accordion,{version:"1.8.11",animations:{slide:function(t,i){if(t=n.extend({easing:"swing",duration:300},t,i),!t.toHide.size()){t.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},t);return}if(!t.toShow.size()){t.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},t);return}var s=t.toShow.css("overflow"),f=0,u={},e={},h=["height","paddingTop","paddingBottom"],o,r=t.toShow;o=r[0].style.width,r.width(parseInt(r.parent().width(),10)-parseInt(r.css("paddingLeft"),10)-parseInt(r.css("paddingRight"),10)-(parseInt(r.css("borderLeftWidth"),10)||0)-(parseInt(r.css("borderRightWidth"),10)||0)),n.each(h,function(i,r){e[r]="hide";var f=(""+n.css(t.toShow[0],r)).match(/^([\d+-.]+)(.*)$/);u[r]={value:f[1],unit:f[2]||"px"}}),t.toShow.css({height:0,overflow:"hidden"}).show(),t.toHide.filter(":hidden").each(t.complete).end().filter(":visible").animate(e,{step:function(n,i){i.prop=="height"&&(f=i.end-i.start==0?0:(i.now-i.start)/(i.end-i.start)),t.toShow[0].style[i.prop]=f*u[i.prop].value+u[i.prop].unit},duration:t.duration,easing:t.easing,complete:function(){t.autoHeight||t.toShow.css("height",""),t.toShow.css({width:o,overflow:s}),t.complete()}})},bounceslide:function(n){this.slide(n,{easing:n.down?"easeOutBounce":"swing",duration:n.down?1e3:200})}}})})(jQuery)