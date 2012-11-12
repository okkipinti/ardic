/*
 *
 *  Home page Slider.
 *
* */
jQuery(document).ready(function(){
    
    jQuery('#slider').nivoSlider({
        effect:'fade',
        pauseTime: 6000,
        controlNav: true,
        controlNavThumbs: false,
        directionNav: false
    });

    jQuery('#mainLeft .newsContent').eq(0).css('display','block');
    var hoverIndex = 0;
	jQuery('#mainLeft .newsList li').hover(
		function(){
			
			jQuery('.newsList li').eq(hoverIndex).removeClass('open').addClass('close');
			jQuery('.newsList li').eq(hoverIndex).children('.newsContent').stop().slideUp('fast');
			
			if(jQuery(this).hasClass('close')){ //if self is close, open it
				jQuery(this).removeClass('close').addClass('open');
				jQuery(this).children('.newsContent').stop().slideDown('fast');
			}
			hoverIndex = jQuery(this).index();
		},
		function(){
			console.log('leave');
		}
			
	);


});

