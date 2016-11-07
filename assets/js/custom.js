/*!
 *	Template Functions
*/

(function($){

	"use strict";

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('.page-loader').animate({width: 'toggle'});
	});

	$(document).ready(function() {

		$('.style-toggle').on('click', function(e) {
			$('body').toggleClass('dark')
			e.preventDefault();
		});

		var mobileTest;

		/* ---------------------------------------------- /*
		 * Mobile detect
		/* ---------------------------------------------- */

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			mobileTest = true;
		} else {
			mobileTest = false;
		}

		/* ---------------------------------------------- /*
		 * Setting background of modules
		/* ---------------------------------------------- */

		$('[data-background]').each(function() {
			$(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
		});

		/* ---------------------------------------------- /*
		 * Show/Hide menu
		/* ---------------------------------------------- */

		$('.show-menu-btn').on('click', function() {
			$(this).toggleClass('open');
			$('.overlay-menu').toggleClass('active');
			$('body').toggleClass('menu-opened');
			return false;
		});

		$(window).keydown(function(e) {
			if ($('.overlay-menu').hasClass('active')) {
				if (e.which === 27) {
					$('.show-menu-btn').removeClass('open');
					$('.overlay-menu').removeClass('active');
					$('body').removeClass('menu-opened');
				}
			}
		});

		/* ---------------------------------------------- /*
		 * Portfolio masonry
		/* ---------------------------------------------- */

		var filters   = $('#filters'),
			worksgrid = $('.row-portfolio');

		$('a', filters).on('click', function() {
			var selector = $(this).attr('data-filter');
			$('.current', filters).removeClass('current');
			$(this).addClass('current');
			worksgrid.isotope({
				filter: selector
			});
			return false;
		});

		$(window).on('resize', function() {
			$('.row-portfolio').imagesLoaded(function() {
				$('.row-portfolio').isotope({
					layoutMode: 'masonry',
					itemSelector: '.portfolio-item',
				});
			});
		}).resize();

		/* ---------------------------------------------- /*
		 * Progress bars, counters, pie charts animations
		/* ---------------------------------------------- */

		$('.progress-bar').each(function() {
			$(this).appear(function() {
				var percent = $(this).attr('aria-valuenow');
				$(this).animate({'width' : percent + '%'});
				$(this).parent('.progress').prev('.progress-title').find('.p-coutn').countTo({
					from: 0,
					to: percent,
					speed: 900,
					refreshInterval: 30
				});
			});
		});

		$('.counter-timer').each(function() {
			$(this).appear(function() {
				var number = $(this).attr('data-to');
				$(this).countTo({
					from: 0,
					to: number,
					speed: 1500,
					refreshInterval: 10,
					formatter: function (number, options) {
						number = number.toFixed(options.decimals);
						number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
						return number;
					}
				});
			});
		});

		$('.chart').each(function() {
			$(this).appear(function() {
				$(this).easyPieChart({
					barColor:   "#252525",
					trackColor: "#d9d9d9",
					scaleColor: false,
					lineCap:    'square',
					size:       160,
				});
			});
		});

		/* ---------------------------------------------- /*
		 * Lightbox, Gallery
		/* ---------------------------------------------- */

		$('.lightbox').magnificPopup({
			type: 'image'
		});

		$('[rel=gallery]').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				titleSrc: 'title',
				tError: 'The image could not be loaded.',
			}
		});

		$('.lightbox-video').magnificPopup({
			type: 'iframe',
		});

		/* ---------------------------------------------- /*
		 * A jQuery plugin for fluid width video embeds
		/* ---------------------------------------------- */

		$('body').fitVids();

/* ---------------------------------------------- /*
		 * E-mail validation
		/* ---------------------------------------------- */

		function isValidEmailAddress(emailAddress) {
			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
			return pattern.test(emailAddress);
		};

		/* ---------------------------------------------- /*
		 * Contact form ajax
		/* ---------------------------------------------- */

		$('#contact-form').submit(function(e) {

			e.preventDefault();

			var c_name = $('#c_name').val();
			var c_email = $('#c_email').val();
			var c_message = $('#c_message ').val();
			var responseMessage = $('#contact-form .ajax-response');

			if (( c_name== '' || c_email == '' || c_message == '') || (!isValidEmailAddress(c_email) )) {
				responseMessage.fadeIn(500);
				responseMessage.html('<i class="fa fa-warning"></i> Please fix the errors and try again.');
			}

			else {
				$.ajax({
					type: 'POST',
					url: '//formspree.io/roxannesfarkas@gmail.com',
					dataType: 'json',
					data: {
						c_email: c_email,
						c_name: c_name,
						c_message: c_message
					},
					beforeSend: function(result) {
						$('#contact-form button').empty();
						$('#contact-form button').append('<i class="fa fa-cog fa-spin"></i> Wait...');
					},
					success: function(result) {
						if(result.success == "email sent") {
							$('#contact-form .ajax-hidden').fadeOut(500);
							responseMessage.html(result.message).fadeIn(500);
						} else {
							$('#contact-form button').empty();
							$('#contact-form button').append('<i class="fa fa-retweet"></i> Try again.');
							responseMessage.html(result.message).fadeIn(1000);
						}
					}
				});
			}

			return false;

		});

		/* ---------------------------------------------- /*
		 * Scroll Animation
		/* ---------------------------------------------- */

		$('.smoothscroll').on('click', function(e) {
			var target  = this.hash;
			var $target = $(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top - header.height()
			}, 600, 'swing');

			e.preventDefault();
		});

		/* ---------------------------------------------- /*
		 * Scroll top
		/* ---------------------------------------------- */

		$('a[href="#top"]').on('click', function() {
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			return false;
		});

		/* ---------------------------------------------- /*
		 * Disable hover on scroll
		/* ---------------------------------------------- */

		var body = document.body,
			timer;
		window.addEventListener('scroll', function() {
			clearTimeout(timer);
			if (!body.classList.contains('disable-hover')) {
				body.classList.add('disable-hover')
			}
			timer = setTimeout(function() {
				body.classList.remove('disable-hover')
			}, 100);
		}, false);

	});

})(jQuery);
