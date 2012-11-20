var PRODUCT_WAPPER_MARGIN_TOP     = 0
    ,PRODUCT_WAPPER_MARGIN_LEFT   = 0
    ,PRODUCT_WAPPER_MARGIN_RIGHT  = 0
    ,PRODUCT_WAPPER_MARGIN_BOTTOM = 0;

var curImgId = 1;
var numberOfImages = 5; // Change this to the number of background images

var Goto = new Array();
Goto.push(0);

Goto.push(5500); //features
Goto.push(8650); //interchange
Goto.push(12500); //system
Goto.push(19900); //applications
Goto.push(25900); //media
Goto.push(27700); //appli papers
Goto.push(29900); //technical-specifications

var NavSection = new Array();
NavSection.push(0);

NavSection.push(1); //features
NavSection.push(1); //interchange
NavSection.push(1); //system
NavSection.push(2); //applications
NavSection.push(3); //media
NavSection.push(4); //appli papers
NavSection.push(5); //technical-specifications

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
        
        currentScrollX = jQuery(window).scrollTop();

        //  這是控制 submenu 中的 position
        if (jQuery(window).scrollTop() > 75) {
            jQuery(".submenu").css({'position':'fixed', 'top':'0px'});
        } else {
            jQuery(".submenu").css({'position':'relative'});
        }

        // 需要加入判斷當 scrollTop <= 0 就不需要去計算.
        if (currentScrollX <= 0) {
            activeLayer = 0;
            isAnimatingTo = false;
            return;
        }

        if (currentScrollX == Goto[activeLayer]) {
            return;
        }

        if (isAnimatingTo == true) {
            return false;
        }

        // console.log(ScrollState());
        var status = ScrollState();


        console.log(status);

        lastScrollX = jQuery(window).scrollTop();

        if (status == "UP") {
            if (isAnimatingTo == false) {
                activeLayer--;
                if (activeLayer < 0) {
                    activeLayer = 0;
                }
                Snapping();
                console.log("0. activeLayer = " + activeLayer);
            }
            return;
        }

        if (status == "DOWN") {
            if (isAnimatingTo == false) {
                // console.log("1. activeLayer = " + activeLayer);
                activeLayer++;
                if (activeLayer > Goto.length - 1) {
                    activeLayer = Goto.length - 1;
                }
                Snapping();
                console.log("2. activeLayer = " + activeLayer);
            }
            return;
        }

    }); //end scroll

    //  submenu
    jQuery(".submenu ul li").each(function(index, value){
        if (index != 0){
            jQuery(this).children().click(function(){
                var destinationIndex;
                jQuery(".submenu ul li a").removeClass("current");
                switch (index)
                {
                    case 1: //overview
                    destinationIndex = 0;
                    jQuery(this).addClass("current");
                    break;
                    case 2: //features
                    destinationIndex = 1;
                    jQuery(this).addClass("current");
                    break;
                    case 3: //applications
                    destinationIndex = 4;
                    jQuery(this).addClass("current");
                    break;
                    case 4: //media
                    destinationIndex = 5;
                    jQuery(this).addClass("current");
                    break;
                    case 5: //appli papers
                    destinationIndex = 6;
                    jQuery(this).addClass("current");
                    break;
                    case 6: //tech specifications
                    destinationIndex = 7;
                    jQuery(this).addClass("current");
                    break;

                }
                //jQuery("body").animate({ scrollTop: Goto[index - 1] }, 1000);
                jQuery("body, html").scrollTop(Goto[destinationIndex]);
                activeLayer = destinationIndex;
                return false;
            });
        }  
    });

    function Snapping () {

        console.log("MrTimer = " + MrTimer);

        var X = 0;

        if (MrTimer == 0)
            MrTimer = window.setInterval(function(){

                console.log("step 1");

                X = MrTimer;

                isAnimatingTo = true;

                jQuery("body, html").animate({"scrollTop" : Goto[activeLayer]}, 
                    {
                        queue : false, 
                        step : function () {
                            //console.log("activeLayer = " + activeLayer);
                            console.log("step 2");
                            //isAnimatingTo = true;
                        }, 
                        //Speed Me
                        duration : 900, complete : function(){
                            // console.log('complete');
                            isAnimatingTo = false;
                            currentLayer = activeLayer;
                            MrTimer = 0;
                            // console.log('complete.activeLayer = ' + activeLayer);
                            lastScrollX = jQuery(window).scrollTop();
                            // jQuery(window).bind('scroll');
                            jQuery(".submenu ul li a").removeClass("current").eq(NavSection[activeLayer]).addClass("current");                            
                            console.log("step 3");
                        }
                    }
                );
//console.log(X);
                window.clearInterval(X);

            }, 1);
    }

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
                    "top" : "-260px"
                });
            }

        });

        jQuery(".textWindow").each(function(index, value){
            jQuery(this).children('div').css({
                "top" : jQuery(this).parent().height() / 3 + "px"
            });
        });
    } //end resize()

    // window.setInterval(function(){
    //     console.log('window.scrollTop = ' + $(window).scrollTop());
    // }, 1000);

    //
    //ScrollDown Animation
    //
    window.setInterval(function() {
        jQuery('.scrolldown_arrow').css('background','url(img/products/scrollDown_arrow_' + curImgId + '.png)');
        curImgId = (curImgId +1) % numberOfImages;
    }, 200);

    //openLayout animation 
    jQuery('#openLayout-slide > div:first').show();
    setInterval(function(){    
        jQuery('#openLayout-slide > div:first').fadeIn('1000',function(){          
            //console.log(this); //move1
            //console.log(jQuery('#openLayout-slide div:eq(1)'));//probably move2
            jQuery('#openLayout-slide div:eq(1)').fadeIn('1000');
            jQuery(this).fadeOut(1000);
            jQuery(this).appendTo('#openLayout-slide');
        });
    }, 2000);

    //interchange animation
    jQuery('#interchange-slide > div:first').show();
    setInterval(function(){       
        jQuery('#interchange-slide > div:first').fadeIn('1000',function(){         
            jQuery('#interchange-slide div:eq(1)').fadeIn('1000');
            jQuery(this).fadeOut(1000);
            jQuery(this).appendTo('#interchange-slide');
        });
    }, 2000);

    function between (x, y, z) {
        if ((z >= x) && (z <= y)) {
            return true;
        } else {
            return false;
        }
    }

    function ScrollState() {
        if (currentScrollX <= 0) {
            return "UP";
        }
        return (currentScrollX > lastScrollX) ? "DOWN" : "UP";
    }


});


