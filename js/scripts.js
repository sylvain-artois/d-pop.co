var cv = window.cv || {};

cv.mike = (function($) {

	var my = {
        pageCrawler: null,
        $openSocial: null,
        $socialMenu: null,
        $cvAccordion: null,
        $openmenu: null,
        $main: null,
        $closemenu: null,
        $navigation: null,
        $scroller: null,
        $homeSlider: null
    };

    //Callback called at Dom Ready
	my.init = function () {

        initCommon();

		switch(my.pageCrawler) {

            case 'home':
				playHome();
				break;

            case 'portfolio':
                playPortfolio();
                break;

            case 'contact':
                playContact();
                break;

            default :
                //what about profile page ?
		}
	};

	function initCommon () {

        my.pageCrawler  = $('body').data('controller');
        my.$openSocial  = $('#open-social-menu');
        my.$socialMenu  = $('#social-menu');
        my.$cvAccordion = $('.cv-accordion');
        my.$openmenu    = $('#openmenu');
        my.$main        = $('#main');
        my.$closemenu   = $('#closemenu');
        my.$navigation  = $('#navigation');
        my.$scroller    = $(".scroller");
        my.$homeSlider  = $('#home-slider')

        my.$openSocial
		    .click(function(e) {
				e.preventDefault();
                my.$socialMenu.addClass('animated');
			});

        my.$socialMenu
            .mouseleave(function() {
			    $(this).removeClass('animated');
		    });

		if(my.$cvAccordion.length) {

            my.$cvAccordion.accordion({
                icons: {
                    "header": "ui-icon-plus",
                    "activeHeader": "ui-icon-minus"
                },
                heightStyle: "content"
            });
		}

        my.$openmenu
            .click(function(e) {
			    e.preventDefault();
                my.$main.addClass('menu-opened');
                my.$closemenu.show();
                my.$navigation.addClass('open');
		    }
        );

        my.$closemenu
            .click(function(e) {
                my.$main.removeClass('menu-opened');
                $(this).hide();
                my.$navigation.removeClass('open');
                my.$socialMenu.removeClass('animated');
		});

        my.$scroller.mCustomScrollbar({
		    //horizontalScroll:true
		});
	}

	function playHome () {
        my.$homeSlider.bxSlider({
            speed: 1000,
			pager: false,
			auto: true,
            easing: 'ease-out',
            autoControls: true
		});
	}

	function playPortfolio () {

		// bind radiobuttons in the form
		//var $filterType = $('#filter input[name="type"]');
		var $filterType = $('.portfolio-links > li > a');
		var $filterSort = $('#filter input[name="sort"]');

		// get the first collection
		var $applications = $('#applications');

		// clone applications to get a second collection
		var $data = $applications.clone();

		// attempt to call Quicksand on every form change
		//$filterType.add($filterSort).change(function(e) {
		$filterType.click(function(e) {
		    // if ($('#filter input[name="type"]:checked').val() == 'all') {
		    // 	var $filteredData = $data.find('li');
		    // } else {
		    //   	var $filteredData = $data.find('li[data-type=' + $("#filter input[name='type']:checked").val() + ']');
		    // }

		    if ($(this).data('type') == 'all') {
		    	var $filteredData = $data.find('li');
		    } else {
		      	var $filteredData = $data.find('li[data-type=' + $(this).data('type') + ']');
		    }

		    // if sorted by size
		    if ($('#filter input[name="sort"]:checked').val() == "size") {
		    	var $sortedData = $filteredData.sorted({
		        	by: function(v) {
		          		return parseFloat($(v).find('span[data-type=size]').text());
		        	}
		      	});
		    } else {
		      	// if sorted by name
		      	var $sortedData = $filteredData.sorted({
		        	by: function(v) {
		          		return $(v).find('strong').text().toLowerCase();
		        	}
		      	});
		    }   

		    // finally, call quicksand
		    $applications.quicksand($filteredData, {
		    	duration: 800,
		      	easing: 'easeInOutQuad'
		    });

		});

		$('#applications > li > a').fancybox({
	    	openEffect	: 'elastic',
	    	closeEffect	: 'elastic'
	    });
	}

    function playContact () {
		
		// Quick Connect Form AJAX validation and submition
		// Validation Plugin : http://bassistance.de/jquery-plugins/jquery-plugin-validation/
		// Form Ajax Plugin : http://www.malsup.com/jquery/form/
		var contact_options = { 
			target: '#message-sent p',
			beforeSubmit: function(){
								$('#contact-loader').fadeIn('fast');
								$('#message-sent').fadeOut('fast');
							}, 
			success: function(){
								$('#contact-loader').fadeOut('fast');
								$('#message-sent').fadeIn('fast');
								$('#contact-form').resetForm();
							}
	    	};
	
		$('#contact-form').validate({
			submitHandler: function(form) {
		   		$(form).ajaxSubmit(contact_options);
		   }
		});
	}
	
	return  my;

}(jQuery));

//Call cv.mike.init at dom ready
;(function($){
    $(cv.mike.init);
})(jQuery);



