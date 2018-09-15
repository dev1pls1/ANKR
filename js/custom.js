(function( $ ) {


	var img = document.getElementsByTagName('img');

	for(var i in img)
	{
		img[i].oncontextmenu = function()
		{
			return false;
		}
	}

	function equalHeight(element) {
		var maxHeightTabBlock = 0;
		$(element).outerHeight('');
		$(element).each(function() {
			if ($(this).outerHeight() > maxHeightTabBlock) {
				maxHeightTabBlock = $(this).outerHeight();
			}
			return maxHeightTabBlock;
		});
		$(element).outerHeight(maxHeightTabBlock);
	}


	var controller = new ScrollMagic.Controller();

	var shemaTl = new TimelineMax(),
			ptl = new TimelineMax();


	$.validator.addMethod('customphone', function (value, element) {
		return this.optional(element) || /^\d{3}-\d{3}-\d{4}$/.test(value);
	}, "Please enter a valid phone number");

	$.validator.addMethod('filesize', function (value, element, param) {
		return this.optional(element) || (element.files[0].size <= param)
	}, 'File size must be less than 10mb');




	function tabs(parent, tab, tabpanel) {
		$(parent).find($(tabpanel)).not(":first").css({
			'visibility' : 'hidden',
			'opacity' : '0'
		});
		$(parent).find($(tab)).hover(function() {
			if($(this).hasClass('active')) {
				return false;
			}
			$(parent).find($(tab)).removeClass("active").eq($(this).index()).addClass("active");
			$(parent).find($(tabpanel)).css({'visibility': 'hidden', 'opacity': '0'}).removeClass("active").eq($(this).index()).css({'visibility': 'visible', 'opacity': '1'}).addClass("active");
		}).eq(0).addClass("active");
	}

	function mobiletabs(parent, tab, tabpanel) {
		$(parent).find($(tabpanel)).not(":first").css({
			'visibility' : 'hidden',
			'opacity' : '0'
		});
		$(parent).find($(tab)).on('click', function() {
			if($(this).hasClass('active')) {
				return false;
			}
			$(parent).find($(tab)).removeClass("active").eq($(this).index()).addClass("active");
			$(parent).find($(tabpanel)).css({'visibility': 'hidden', 'opacity': '0'}).removeClass("active").eq($(this).index()).css({'visibility': 'visible', 'opacity': '1'}).addClass("active");
		}).eq(0).addClass("active");
	}





	/*document ready*/
	$(document).ready(function(){

		if($(window).width() < 768) {
			$('.investors-slider .pantera').parent('.slide').prependTo('.investors-slider');
		}



		ptl
			.set($('.preloader__inner'), {visibility:"visible"})
			.from($('.preloader__inner--icon'), 0.5, {opacity: 0})
			.from($('.preloader__inner .line'), 0.5, {opacity: 0})
			.addLabel('line')
			.to($('.line-wrapper.top .line'), 0.3, {css:{top: 0}})
			.to($('.line-wrapper.top .line'), 0.3, {css:{height: '0%'}}, '-=0.3')
			.to($('.line-wrapper.bottom .line'), 0.3, {css:{bottom: 0}}, 'line')
			.to($('.line-wrapper.bottom .line'), 0.3, {css:{height: '0%'}}, '-=0.3')
			.to($('.preloader__inner .line'), 1, {opacity: 0})
			.to($('.preloader__inner--icon'), 1, {opacity: 0, scaleX: 2, scaleY: 2, transformOrigin: 'center center'}, '-=1')
			.set($('.preloader__overlay'), {className:"+=moved", onComplete: function() {
				$('.animation').each(function() {

					var delay = $(this).attr('data-delay');

					$(this).css('transition-delay', delay + 's');

					var animateContent = new ScrollMagic
					.Scene({
						triggerElement: this,
						triggerHook: 0.95,
						reverse: false
					})
					.setClassToggle(this, "animated")
					.addTo(controller);
				});

				$('.footer-animation').each(function() {

					var delay = $(this).attr('data-delay');

					$(this).css('transition-delay', delay + 's');

					var animateContent = new ScrollMagic
					.Scene({
						triggerElement: this,
						triggerHook: 1,
						reverse: false
					})
					.setClassToggle(this, "animated")
					.addTo(controller);
				});

				shemaTl
				.set($('.shema-wrapper'), {visibility:"visible"})
				.staggerFrom($('#shema .st0'), 3, {drawSVG: 0}, {ease: Power1.easeInOut, drawSVG: '100%'})
				.from($('#shema .st1'), 1, {opacity: 0, ease: Power1.easeInOut}, '-=0.4');

			}}, '-=0.5')
			.set($('.preloader'), {className:"+=pre-hidden"})
			.set($('html'), {overflow: 'visible'}, '+=2.5');


		var shemaCounter = 0;

		if($('.shema-wrapper').hasClass('animated')) {



			shemaCounter++;

			if(shemaCounter > 0 && shemaCounter < 2) {
				shemaTl
				.set($('.shema-wrapper'), {visibility:"visible"})
				.staggerFrom($('#shema .st0'), 3, {drawSVG: 0}, {ease: Power1.easeInOut, drawSVG: '100%'})
				.from($('#shema .st1'), 1, {opacity: 0, ease: Power1.easeInOut}, '-=0.4');
			}
		}




		var scrollax = new Scrollax().init();


		$('.hamb').on('click', function() {
			$(this).stop().toggleClass('opened');
			$('.main__header').stop().toggleClass('opened');
			if($('.main__header').hasClass('auto')) {
				setTimeout(function() {
					$('.main__header').removeClass('auto');
				}, 400);
			}
			else {
				$('.main__header').addClass('auto');
			}
		});


		var lastScrollTop = $(window).scrollTop();



		if($(window).width() > 767) {


			if(lastScrollTop > 0) {
				$('.main__header').addClass('light');
				$('.main__header .icon-wrapper').addClass('show');
			}
			else {
				$('.main__header').removeClass('light');
				$('.main__header .icon-wrapper').removeClass('show');
			}


			$(window).on('scroll', function() {
				var st = $(this).scrollTop();

				if(st > 0) {
					$('.main__header').addClass('light');
				}
				else {
					$('.main__header').removeClass('light');
				}

				if(st > 150) {
					$('.hero__content').addClass('postpone');
				}
				else {
					$('.hero__content').removeClass('postpone');
				}

			});



			$(window).on('scroll', function() {
				var wst = $(this).scrollTop();

				if(wst > 0) {
					$('.main__header--inner .icon-wrapper').addClass('show');
					$('.main__header .icon-wrapper').addClass('show');
				}
				else {
					$('.main__header--inner .icon-wrapper').removeClass('show');
					$('.main__header .icon-wrapper').removeClass('show');
				}

			});
		}



		if($(window).width() < 768) {

			var mainOffset = $('#main').offset().top;

			if(lastScrollTop > mainOffset) {
				$('.main__header').addClass('light');
			}
			else {
				$('.main__header').removeClass('light');
			}


			$(window).on('scroll', function() {
				var mst = $(this).scrollTop();

				if(mst > mainOffset) {
					$('.main__header').addClass('light');
				}
				else {
					$('.main__header').removeClass('light');
				}

			});

		}


		/* ---------- main menu ---------- */

		var activeItemHeight = $('.main-menu li.active').outerHeight(), activeItemPos = $('.main-menu li.active').position().top;

		$('.main-menu .carret').css('top', activeItemHeight/2 + activeItemPos + 'px');



		$('.main-menu li').hover(function() {
			if($('.main__header').hasClass('opened')) {
				var thisPositionTop = $(this).position().top, thisHeight = $(this).outerHeight();

				$('.main-menu .carret').css('top', thisHeight/2 + thisPositionTop + 'px');
			}
		});



		$('.go-to').on('click', function() {
			var mainOffset = $('#main').offset().top;
			console.log(mainOffset);

			$('html, body').animate({
				scrollTop: mainOffset
			}, 1000);
		});





		/* ---------- action link ---------- */

		$('.action-link').on('click', function() {
			$("html, body").animate({ scrollTop: $(document).height() }, 2000);
		});


		if($(window).width() > 767) {
			equalHeight('.vision__advance .equal');
		}


		$('.main-menu li a').on('click', function(element) {
			element.preventDefault();
			$('.hamb').removeClass('opened');
			$('.main__header').removeClass('opened');
			setTimeout(function() {
				$('.main__header').removeClass('auto');
			}, 400);
			var el = $( element.target.getAttribute('href') );
			var elOffset = el.offset().top;
			$('html, body').stop().animate({
				scrollTop:elOffset
			}, 1500);
			return false;
		});


		/* ---------- forms ---------- */

		$('form input[type="file"]').on('change', function() {
			var uploadedFileName = $(this).val().replace(/C:\\fakepath\\/i, '');
			$(this).parents('form').find('.file-name').val(uploadedFileName);
		});


		/* ---------- forms validation ---------- */

		$('.career-add-form').validate({

			rules: {
				file: {
					required: false,
					filesize: 10000000
				}

			},


			submitHandler: function(form) {
				var formData = new FormData(form);

				$.ajax({
					type: "POST",
					url: "mail-file.php",
					data: formData,
					cache: false,
					processData: false,
					contentType: false,
					beforeSend: function() {

					},
					success: function(data) {
						popup();
						form.reset();

					},
					complete: function() {

					}
				});

				form.reset();
				form.submit();
			}

		});


		$('.sign-up-form').validate({

				rules: {
					Email: {
						required: true,
						email: true
					}

				},

				messages: {
					Email: "Please enter a valid email address"
				},


				submitHandler: function(form) {
					var formData = new FormData(form);

					$.ajax({
						type: "POST",
						url: "mail.php",
						data: formData,
						cache: false,
						processData: false,
						contentType: false,
						beforeSend: function() {

						},
						success: function(data) {
							popup();
							form.reset();

						},
						complete: function() {

						}
					});

					form.reset();
					form.submit();
				}

			});



		function popup() {
			$('#form-submit-window').fadeIn(400).addClass('modal-show');

			setTimeout(function() {
				$('.modal-window').fadeOut(400).removeClass('modal-show');
			}, 6000);

		}

		$('#form-submit-window .modal-close').on('click', function() {
			$('.modal-window').fadeOut(400).removeClass('modal-show');
		});



		/* ---------- team popups ---------- */

		if($(window).width() > 767) {

			$('.persons__item .more').on('click', function(e) {
				e.preventDefault();
				$('.person__item-overlay').stop().fadeIn(400);
				$(this).parents('.persons__item').stop().addClass('item-active');
				$('.basic-slider').stop().addClass('overlay');
				$(this).parents('.persons__item').find('.persons__item--popup').stop().fadeIn(400);
			});

			$('.persons__item--popup .close').on('click', function() {
				$('.person__item-overlay').stop().fadeOut(400);
				$('.basic-slider').stop().removeClass('overlay');
				$(this).parent().stop().fadeOut(400);
				setTimeout(function() {
					$('.persons__item').removeClass('item-active');
				}, 200);

			});
		}


		if($(window).width() < 768) {

			$('.persons__item .more').on('click', function(e) {
				e.preventDefault();
				$('.persons__item .persons__item--popup').not($(this).parents('.persons__item').find('.persons__item--popup')).slideUp(400);
				$(this).parents('.persons__item').find('.persons__item--popup').stop().slideToggle(400);
			});
		}


		function isMobileSafari() {
			return /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent);
		}

		if(isMobileSafari()) {
			$('body').addClass('ios');
		}


		$(".telegram-link-list .telegram-link").on("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
			$(this).removeClass("move");
		});

		$(".telegram-link-list .telegram-link").hover(function(){
			$(this).addClass("move");
		});


		$('.main__header > .icon-wrapper').on('click', function() {
			$('html, body').stop().animate({
				scrollTop: 0
			}, 1500);
		});





		/* ---------- white paper modal ---------- */

		var dataOffset = $('#white-paper-modal').children('.modal-content-wrapper').attr('data-offset');
		$('#white-paper-modal').children('.modal-content-wrapper').height($(window).height() - dataOffset + 'px');


		$('.white-paper-button').on('click', function() {
			$('#white-paper-modal').fadeIn(400).addClass('modal-show');
		});

		$('#white-paper-modal .close').on('click', function() {
			$('#white-paper-modal').fadeOut(400).removeClass('modal-show');
		});

		$('#white-paper-modal').on('click touchstart', function (event) {
			if (!$(event.target).closest('.modal-content-wrapper').length) {
				$(this).fadeOut(400).removeClass('modal-show');
			}
		});

		/* ---------- white list button ---------- */

		$('.white-list-button').attr('href', 'http://app.opentoken.com/contribute/ankr').on('click', function() {
			var href = $(this).attr('href')
			window.open(href,'contribute_opentoken','width=500,height=700,toolbar=0,menubar=0,status=1,scrollbars=1,resizable=0,left=0,top=0')
			return false;
		});





		/* ---------- partners modal ---------- */

		var pdataOffset = $('#partners-window').children('.modal-content-wrapper').attr('data-offset');
		$('#partners-window').children('.modal-content-wrapper').height($(window).height() - pdataOffset + 'px');


		$('.partners-all').on('click', function() {
			$('#partners-window').fadeIn(400).addClass('modal-show');
		});

		$('#partners-window .close').on('click', function() {
			$('#partners-window').fadeOut(400).removeClass('modal-show');
		});

		$('#partners-window').on('click touchstart', function (event) {
			if (!$(event.target).closest('.modal-content-wrapper').length) {
				$(this).fadeOut(400).removeClass('modal-show');
			}
		});




		/* ---------- team sliders ---------- */

		$('.basic-slider').on('init', function(event, slick, currentSlide, nextSlide){
			$('.slider-preloader').addClass('slider-loaded');
			$('.slider-wrapper').css('height', 'auto');
		});

		if($(window).width() < 768) {
			$('.basic-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
				$(this).find('.persons__item--popup').slideUp(400);
			});
		}




		// inititalize slider
		$('.basic-slider').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			speed: 700,
			swipe: false,
			arrows: true,
			dots: false,
			infinite: false,
			fade: false,
			// autoplay: true,
			autoplaySpeed: 7000,
			prevArrow: '<button class="prev-slide"></button>',
			nextArrow: '<button class="next-slide"></button>',
			responsive: [
				{
					breakpoint: 1025,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 993,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						infinite: true
					}
				}
			]
		});

		$('.basic-slider .slick-dots li button').text('');



		/* ---------- investors slider ---------- */



		$('.roadmap__slider').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			speed: 700,
			swipe: false,
			arrows: true,
			dots: false,
			infinite: false,
			fade: false,
			variableWidth: true,
			// autoplay: true,
			autoplaySpeed: 7000,
			prevArrow: '<button class="prev-slide"></button>',
			nextArrow: '<button class="next-slide"></button>',
			responsive: [
				{
					breakpoint: 1025,
					settings: {
						slidesToShow: 5
					}
				},
				{
					breakpoint: 719,
					settings: {
						slidesToShow: 1,
						variableWidth: false
					}
				}
			]
		});

		$(".roadmap__slider").slick( "slickGoTo", 2);


		setTimeout(function() {
			$('.roadmap__slider .slide').each(function() {
				var infoHalfWidth = $(this).find('.info').width()/2;
				var infoTitleWidth = $(this).find('.item-title').width()/2;

				if(infoTitleWidth > infoHalfWidth) {
					$(this).find('.item-title').css('left', -1*((infoTitleWidth - infoHalfWidth)) + 1 + 'px');
				}
			});
		},100);






		/* ---------- investors slider ---------- */

		$('.investors-slider').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			speed: 700,
			swipe: true,
			arrows: true,
			dots: false,
			infinite: true,
			fade: false,
			// autoplay: true,
			autoplaySpeed: 7000,
			prevArrow: '<button class="prev-slide"></button>',
			nextArrow: '<button class="next-slide"></button>',
			responsive: [
				{
					breakpoint: 1025,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 993,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 601,
					settings: {
						slidesToShow: 1,
						swipe: true
					}
				}
			]
		});


		/* ---------- map ---------- */

		$('.group-info').hover(function() {
			var target = $(this).attr('data-target');


			$('.area-group').each(function() {
				var source = $(this).attr('data-source');

				if(target == source) {
					$(this).addClass('active');
				}
			});
		}, function() {
			$('.area-group').removeClass('active');
		});




		/* ---------- allocation ---------- */

		Highcharts.chart('donut', {
			colors: ['#5bccdd', '#4a94da', '#d470a2', '#ffcd7f', '#55c2b3'],
			chart: {
				type: 'pie',
				options3d: {
					enabled: true,
					alpha: 60,
					beta: 0
				}
			},
			title: false,
			tooltip: false,
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					depth: 65,
					innerSize: 190,
					dataLabels: {
						enabled: false
					}
				}
			},
			series: [{
				type: 'pie',
				data: [
					{
						name: '',
						y: 28,
						className: 'action private'
					},
					{
						name: '',
						y: 7,
						className: 'action public'
					},
					{
						name: '',
						y: 36,
						className: 'action mining'
					},
					{
						name: '',
						y: 22,
						className: 'action team'
					},
					{
						name: '',
						y: 5,
						className: 'action marketing'
					}

				]
			}]
		});



		if($(window).width() > 1024) {
			tabs('.allocation-content', '.tab', '.tab-panel');

			$('#donut .highcharts-series g .action').hover(function() {
				var currentIndex = $(this).parent('g').index();

				$('.tab-panel').each(function() {
					var thisIndex = parseInt($(this).attr('data-index'));

					if(currentIndex == thisIndex) {
						$('.tab-panel').css({'visibility': 'hidden', 'opacity': '0'}).removeClass("active");
						$(this).css({'visibility': 'visible', 'opacity': '1'}).addClass("active");
					}
				});
			});
		}

		if($(window).width() < 1025) {
			mobiletabs('.allocation-content', '.tab', '.tab-panel');

			$('#donut .highcharts-series g .action').on('click', function() {
				var currentIndex = $(this).parent('g').index();

				$('.tab-panel').each(function() {
					var thisIndex = parseInt($(this).attr('data-index'));

					if(currentIndex == thisIndex) {
						$('.tab-panel').css({'visibility': 'hidden', 'opacity': '0'}).removeClass("active");
						$(this).css({'visibility': 'visible', 'opacity': '1'}).addClass("active");
					}
				});
			});
		}







		/* ---------- NEW CHANGES FOR FOOTER SOCIALS LIST ---------- */

		$('.main__footer .telegram-link-list .telegram-link').on('click', function() {
			$('.main__footer .telegram-link-list').stop().toggleClass('telegram-active');
		});

		$(document).on('click touchstart', function (event) {
			if (!$(event.target).closest('.main__footer .telegram-link-list').length) {
				$('.main__footer .telegram-link-list').removeClass('telegram-active');
			}
		});




	});



	/*window load*/
	$(window).on('load', function() {


	});











	/*window resize*/
	$(window).resize(function() {


		/* ---------- white paper modal ---------- */

		var rdataOffset = $('#white-paper-modal').children('.modal-content-wrapper').attr('data-offset');
		$('#white-paper-modal').children('.modal-content-wrapper').height($(window).height() - rdataOffset + 'px');

		var pdataOffset = $('#partners-window').children('.modal-content-wrapper').attr('data-offset');
		$('#partners-window').children('.modal-content-wrapper').height($(window).height() - pdataOffset + 'px');



		if($(window).width() > 767) {
			equalHeight('.vision__advance .equal');
		}

	});




})(jQuery);
