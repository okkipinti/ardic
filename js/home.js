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
    
	jQuery('#mainLeft .newsSwitch').click(

		function(){
			
			//jQuery('.newsList li').eq(hoverIndex).removeClass('open').addClass('close');
			//jQuery('.newsList li').removeClass('open').addClass('close');
			//jQuery('.newsList li').children('.newsContent').stop().slideUp('fast');

			var newsLi = jQuery(this).parent('li'); 
			if(newsLi.hasClass('close')){ //if self is close, open it
				
				newsLi.removeClass('close').addClass('open');
				//newsLi.children('.newsSwitch').removeClass('close').addClass('open');
				newsLi.children('.newsContent').stop().slideDown('fast');
			}else if(newsLi.hasClass('open')){
				newsLi.removeClass('open').addClass('close');
				newsLi.children('.newsContent').stop().slideUp('fast');
			}

		}
			
	);


});

