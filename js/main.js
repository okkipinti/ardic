var isAnimate = false;

jQuery(document).ready(function(){
/*  Product Navigation Dropdown */
         jQuery(".nav-product")         
            .mouseenter(function(){
                if (isAnimate == false) {
                    isAnimate = true;
                    // console.log("productHoverd");
                    jQuery("#product-info").slideDown('slow', function(){
                        isAnimate = false;
                    });
                    jQuery("#overlayBG").fadeIn("slow");
                }
            }).mouseleave(function() {
                if (isAnimate == false) {
                    isAnimate = true;
                    // console.log("productLeave");
                    jQuery("#product-info").slideUp('slow', function(){
                        isAnimate = false;
                    });
                    jQuery("#overlayBG").fadeOut("slow");
                }
            });
/* end  Product Navigation Dropdown */

    jQuery("#backToTop").click(function(){
        jQuery("html body").animate({
            scrollTop: '0px'
        },1000);
    });

});
        $(function(){

          $(".jpWrap-media").jPages({
            containerID : "itemContainer-media",
            perPage: 6,
            links:"blank",
            callback: function(pages){
                $('#legend-media').html(pages.current+"/"+pages.count);
            }
          });
          $(".jpWrap-ap").jPages({
            containerID : "itemContainer-ap",
            perPage: 4,
            links:"blank",
            callback: function(pages){
                $('#legend-ap').html(pages.current+"/"+pages.count);
            }
          });
          $(".jpWrap-ts").jPages({
            containerID : "itemContainer-ts",
            perPage: 6,
            links:"blank",
            callback: function(pages){
                $('#legend-ts').html(pages.current+"/"+pages.count);
            }
          });

        });
