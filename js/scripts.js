var cv = window.cv || {};

cv.mike = (function ($) {
	var my = {};
	// initialization
	pageCrawler = $('body').data('controller');
	
	// jQuery selectors:
	var $openSocial, $socialMenu, $pageCrawler;
	
	my.init = function () {
		initSelectors();

		initCommon();

		switch(pageCrawler) {
			case 'home':
				playHome();
				break;
			case 'education':
				playEducation();
				break;
			case 'portfolio':
				playPortfolio();
				break;
			case 'experience': 
				playExperience();
				break;
			case 'single':
				playSingle();
				break;
			case 'blog':
				playBlog();
				break;
			case 'post':
				playPost();
				break;
			case 'contact':
				playContact();
				break;
		}
	};
	function initSelectors(){
		$openSocial = $('#open-social-menu');
		$socialMenu = $('#social-menu');
	}

	function initCommon () {
		$openSocial
		.click(function (e) {
				e.preventDefault();
				$socialMenu.addClass('animated');
			});
		$socialMenu.mouseleave(function () {
			$(this).removeClass('animated');
		});

		if($('.cv-accordion').length) {
			$('.cv-accordion').accordion({ icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }, heightStyle: "content" });
		}

		$('#openmenu').click(function (e) {
			e.preventDefault();
			$('#main').addClass('menu-opened');
			$('#closemenu').show();
			$('#navigation').addClass('open');
		});

		$('#closemenu').click(function (e) {
			$('#main').removeClass('menu-opened');
			$(this).hide();
			$('#navigation').removeClass('open');
			$('#social-menu').removeClass('animated');
		});

		$(".scroller").mCustomScrollbar({
		    //horizontalScroll:true
		});
	}

	function playHome () {
		$('#home-slider').bxSlider({
			pager: false,
			auto: true
		});
	}

	function playEducation () {
		$('.feature-slider').bxSlider({
			pager: false,
			nextText: '>',
			prevText: '<'
		})
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

	function playExperience() {

		$('.cv-tabs').tabs();

		$('.testimonials-slider').bxSlider({ 
			adaptiveHeight: true, 
			pager: false,
			nextText: '>',
			prevText: '<'
		});
	}

	function playSingle () {
		
		$('.single-slider').bxSlider({
			pager: false
		})
	}

	function playBlog () {
		console.log('Blog');
	}

	function playPost () {
		
		$('.post-slider').bxSlider({
			pager: false
		})
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

$(document).ready(function(){
	jQuery(cv.mike.init);
})


