var PRODUCT_WAPPER_MARGIN_TOP     = 0
    ,PRODUCT_WAPPER_MARGIN_LEFT   = 0
    ,PRODUCT_WAPPER_MARGIN_RIGHT  = 0
    ,PRODUCT_WAPPER_MARGIN_BOTTOM = 0;

var curImgId = 1;
var numberOfImages = 5; // Change this to the number of background images

var Goto = new Array();
Goto.push(1000);
Goto.push(5000);
Goto.push(10000);
Goto.push(15000);
Goto.push(20000);
Goto.push(25000);

var activeLayer = 0;

var currentScrollX = 0;
var lastScrollX = 0;

var isAnimatingTo = false;
var MrTimer = 0;

jQuery(document).ready(function(){

    //  initial fancybox();
    jQuery('.fancybox').fancybox();

    resize();

    jQuery(".product-wrap").css({
        "width"  : Geometry.getViewportWidth()  + "px",
        "height" : Geometry.getViewportHeight() + "px"
    });

    jQuery(window).resize(function(){
        resize();
    });

    jQuery(window).scroll(function() {
        
        //  需要加入判斷當 scrollTop <= 0 就不需要去計算.
        currentScrollX = jQuery(window).scrollTop();

        if (currentScrollX <= 0) {
            activeLayer = 0;
            isAnimatingTo = false;
            return;
        }

        if (currentScrollX == Goto[activeLayer]) {
            return;
        }

        // console.log(currentScrollX);

        //  判斷 scroll up | down
        console.log(ScrollState());

        //  這是控制 submenu 中的 position
        if ($(window).scrollTop() > 75) {
            jQuery(".submenu").css({'position':'fixed', 'top':'0px'});
        } else {
            jQuery(".submenu").css({'position':'relative'});
        }

        if (isAnimatingTo == true) {
            // console.log('return true');
            return false;
        }

        if (ScrollState() == "UP") {
            if (isAnimatingTo == false) {
                activeLayer--;
                if (activeLayer < 0) {
                    activeLayer = 0;
                }
            }
        }

        if (ScrollState() == "DOWN") {
            if (isAnimatingTo == false) {
                activeLayer++;
                if (activeLayer > Goto.length - 1) {
                    activeLayer = Goto.length - 1;
                }
            }
        }

        console.log(Goto[activeLayer]);

        if (MrTimer == 0)
            MrTimer = window.setInterval(function(){
                // console.log(activeLayer);
                // console.log(ScrollState());
                isAnimatingTo = true;

                jQuery("body").animate({"scrollTop" : Goto[activeLayer]}, 
                    {
                        quenu : false, 
                        step : function () {
                            // console.log("activeLayer = " + activeLayer);
                            isAnimatingTo = true;
                        }, 
                        duration : 3000, complete : function(){
                            console.log('complete');
                            isAnimatingTo = false;
                            currentLayer = activeLayer;
                            MrTimer = 0;
                            // jQuery(window).bind('scroll');
                        }
                    }
                );

                window.clearInterval(MrTimer);
        }, 1);

        lastScrollX = $(window).scrollTop();
        console.log('activeLayer = ' + activeLayer);
        // console.log('lastScrollX = ' + lastScrollX);
        // console.log('temp = ' + tempX);

    });

    jQuery(".submenu ul li").each(function(index, value){
        if (index != 0)
            jQuery(this).children().click(function(){
                console.log(Goto[index - 1]);
                jQuery("body").animate({ scrollTop: Goto[index - 1] }, 1000);
                return false;
            });
    });

    function resize () {

        if (Geometry.getViewportWidth() > 1600) {
            PRODUCT_WAPPER_MARGIN_LEFT  = ((Geometry.getViewportWidth() - 1600) / 2);
            // PRODUCT_WAPPER_MARGIN_RIGHT = ((Geometry.getViewportWidth() - 1600) / 2);
            // PRODUCT_WAPPER_MARGIN_TOP    = ((1000 - Geometry.getViewportHeight()) / 2);
            // PRODUCT_WAPPER_MARGIN_BOTTOM = ((1000 - Geometry.getViewportHeight()) / 2);
           jQuery(".product-wrap").css({
                "width"  : Geometry.getViewportWidth()  + "px",
                "height" : Geometry.getViewportHeight() + "px",
                "padding-top"    : PRODUCT_WAPPER_MARGIN_TOP    + "px",
                "padding-left"   : PRODUCT_WAPPER_MARGIN_LEFT   + "px",
                "padding-right"  : PRODUCT_WAPPER_MARGIN_RIGHT  + "px",
                "padding-bottom" : PRODUCT_WAPPER_MARGIN_BOTTOM + "px"
            });
        } else {

            PRODUCT_WAPPER_MARGIN_TOP    = ((Geometry.getViewportHeight() - 1600) / 2);
            PRODUCT_WAPPER_MARGIN_LEFT   = ((Geometry.getViewportWidth() - 1600) / 2);
            PRODUCT_WAPPER_MARGIN_RIGHT  = 0;
            PRODUCT_WAPPER_MARGIN_BOTTOM = 0;

            jQuery(".product-wrap").css({
                "width"  : Geometry.getViewportWidth()  + "px",
                "height" : Geometry.getViewportHeight() + "px",
                "margin-top"    : PRODUCT_WAPPER_MARGIN_TOP    + "px",
                "margin-left"   : PRODUCT_WAPPER_MARGIN_LEFT   + "px",
                "margin-right"  : PRODUCT_WAPPER_MARGIN_RIGHT  + "px",
                "margin-bottom" : PRODUCT_WAPPER_MARGIN_BOTTOM + "px",
                "padding-top"    : "0px",
                "padding-left"   : "0px",
                "padding-right"  : "0px",
                "padding-bottom" : "0px"
            });
        }

        jQuery(".content-wrap").each(function(index, value){
            jQuery(this).css({
                 "top"  : (Geometry.getViewportHeight() / 2) - 230 + "px"
            });
        });

        jQuery(".content-wrap-580").each(function(index, value){

            var 
                _CONTENT_WRAP_580_X      = 0,
                _CONTENT_WRAP_580_Y      = jQuery(this).offset().left,
                _CONTENT_WRAP_580_HEIGHT = jQuery(this).height(),
                _CONTENT_WRAP_580_WIDTH  = jQuery(this).width();

            //  需要重新計算 X 座標
            _CONTENT_WRAP_580_X = (Geometry.getViewportHeight() / 2) - 230 + "px";

            jQuery(this).css({
                 "top"  : _CONTENT_WRAP_580_X
            });

            if (jQuery(this).find('.scrollWindow')) {

                var _x = 0,
                    _y = 0,
                    _h = 0,
                    _w = 0;

                _h = jQuery(this).height() / 2;
                _x = jQuery(this).offset().top - _h + "px";

                jQuery(this).find('.scrollWindow').css({
                    "top" : "-206px"
                });
            }

        });

        jQuery(".textWindow").each(function(index, value){
            jQuery(this).children('div').css({
                "top" : jQuery(this).parent().height() / 3 + "px"
            });
        });
    }

    window.setInterval(function(){
        // console.log('window.scrollTop = ' + $(window).scrollTop());
    }, 1000);

    //
    //ScrollDown Animation
    //
    window.setInterval(function() {
        jQuery('.scrolldown_arrow').css('background','url(img/products/scrollDown_arrow_' + curImgId + '.png)');
        curImgId = (curImgId +1) % numberOfImages;
    }, 200);

    function between (x, y, z) {
        if ((z >= x) && (z <= y)) {
            return true;
        } else {
            return false;
        }
    }

    function ScrollState() {
        return (currentScrollX >= lastScrollX) ? "DOWN" : "UP";
    }

});



