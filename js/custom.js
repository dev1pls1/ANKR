(function( $ ) {

	if($('#main').length) {
		$('.main__header').stop().addClass('home');
	}

	if(!$('#main').length) {
		$('.main__menu li').stop().removeClass('active');
		$('.main__menu li a[href^="' + location.pathname.split("/")[1] + '"]').parent().addClass('active');
	}

	if($('.request-demo-btn').length) {
		var requestBtnOffset = $('.request-demo-btn').offset().top;
	}

	function accordion (parent, question, answer) {
		$(parent).find($(answer).not('.show-answer')).hide();
		$(parent).find($(question)).on('click', function(e) {
			e.preventDefault();
			var thisLink = $(this);
			var thisParent = thisLink.parent();
			var thisHeight = thisLink.outerHeight();
			var openItemHeight = $(thisParent).prevAll('.item-opened').find($(answer)).outerHeight();
			/*if($(thisParent).prevAll().hasClass('item-opened')) {
				$('html, body').animate({
					scrollTop: $(this).offset().top - openItemHeight - ($(window).height()/2 - thisHeight)
				}, 400);
			}*/
			// $(parent).find($(question).not(thisLink)).parent().removeClass('item-opened');
			// $(parent).find($(question).not(thisLink)).removeClass('opened');
			thisLink.parent().stop().toggleClass('item-opened');
			thisLink.stop().toggleClass('opened');
			// $(parent).find($(answer)).not($(this).next()).slideUp(400).removeClass('show-answer');
			$(parent).find(thisLink).next().stop().slideToggle(400).toggleClass('show-answer');
			return false;
		});
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
	
	var maxWidth = 0;


	$.validator.addMethod('customphone', function (value, element) {
		return this.optional(element) || /^\d{3}-\d{3}-\d{4}$/.test(value);
	}, "Please enter a valid phone number");

	$.validator.addMethod('filesize', function (value, element, param) {
		return this.optional(element) || (element.files[0].size <= param)
	}, 'File size must be less than 10mb');


	/*document ready*/
	$(document).ready(function(){

		if($('#canvas').length && $(window).width() > 719) {
			var canvas = document.getElementById("canvas");
			var ctx = canvas.getContext("2d");

			var W;
			var H = window.innerHeight * 2;
			

		if($(window).width() > 1024) {
			W = window.innerWidth * 1.5;

		}

		var mp = 5500; //max particles

		if($(window).width() < 1025) {
			W = window.innerWidth * 2;
			mp = 3000;
		}

		if($(window).width() < 768) {
			W = window.innerWidth * 3;
		}

		if($(window).width() < 600) {
			W = window.innerWidth * 4;
		}

		canvas.width = W;
		canvas.height = H;

		var particles = [];
		for(var i = 0; i < mp; i++) {
			particles.push({
				x: Math.random()*W,
				y: Math.random()*H,
				r: Math.random()*1.2+1,
				d: Math.random()*mp
			})
		}

		function draw() {
			ctx.clearRect(0, 0, W, H);

			ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
			ctx.beginPath();
			for(var i = 0; i < mp; i++)
			{
				var p = particles[i];
				ctx.moveTo(p.x, p.y);
				ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
			}
			ctx.fill();
			update();
		}

		var angle = 0;
		function update() {
			angle += 0.01;
			for(var i = 0; i < mp; i++)
			{
				var p = particles[i];
				p.y += Math.cos(angle+p.d) + 1 + p.r/2;
				p.x += Math.sin(angle) * 0.5;

				if(p.x > W+5 || p.x < -5 || p.y > H)
				{
					if(i%3 > 0)
					{
						particles[i] = {x: Math.random()*W, y: 0, r: p.r, d: p.d};
					}
					else{

					}
				}
			}
		}


		setInterval(draw, 33);
	}

		




		
		$('.words span').each(function() {
			if($(this).width() > maxWidth) {
				maxWidth = $(this).width();
			}
		});

		$('.words').width(maxWidth);
		$('.words').each(function() {
			$(this).height($(this).prev().height());
		});


		var wordDelay = Number($('.words-rotate').attr('data-word-delay')),
				animationType = $('.words-rotate').attr('data-animation-type');

				setTimeout(function() {
					$('.words span').css({
						'animationName' : animationType,
						'animationDuration' : '9s',
						'animationIterationCount': 'infinite'
					});
				}, 0);
		

		for(var i = 0, j = 0; i < $('.words span').length; i++, j += wordDelay) {
			$('.words span').each(function() {
				if($(this).index() == i) {
					$(this).css('animation-delay', j + "s");
				}
			});
		}



		var player = new Plyr('#player', {
			controls: [
    		'play-large',
    		// 'restart', 
    // 'rewind', 
    'play', // Play/pause playback
    // 'fast-forward',
    'progress', // The progress bar and scrubber for playback and buffering
    'current-time', // The current time of playback
    'duration', // The full duration of the media
    'mute',
    'volume', // Volume control
    // 'captions', 
    // 'settings',
    // 'pip', // Picture-in-picture (currently Safari only)
    // 'airplay',
    // 'download',
    'fullscreen',
		]
		});

		if($('.pc-mob-tab').length) {
			player.poster = '../img/screenshot.jpg';
		}
		else {
			player.poster = '../img/poster.jpg';
		}
		

		window.player = player;

		player.on('ready', function() {
			$('.video-container').stop().addClass('ready');
		});


		$('.show-video').on('click', function() {
			if($(this).hasClass('show')) {
				$(this).stop().removeClass('show');
				$('.video-container').removeClass('show');
				player.pause();
			}
			else {
				$(this).stop().addClass('show');
				$('.video-container').addClass('show');
				setTimeout(function() {
					player.play();
					setTimeout(function() {
						console.log($('.plyr__volume').next());
						$('.plyr__volume').next().click();
					}, 1000);
					
				}, 500);
				
			}
		});


		$('.run-player').on('click', function() {
			player.play();
			$('.demo__screenshot .video-container').stop().addClass('go');
		});


		/* ---------- html scroll ---------- */

		/*function htmlScroller() {
				$("html").niceScroll({
					cursoropacitymax: 1,
					cursorcolor: "#2a8bcb",
					autohidemode: false,
					zindex: "999",
					scrollspeed: 50,
					cursordragontouch: true,
					cursorborderradius: "0px",
					Smoothscroll : true,
					cursorwidth: "6px",
					cursorborder: "0px solid transparent"
				});
		}*/


		if($(window).width() > 1024) {
			// htmlScroller();
		}



		/* ---------- header ---------- */

		var wlst = $(window).scrollTop();




		if($(window).width() > 718) {
			
			if($('.request-demo-btn').length) {
				$('.main__header').stop().addClass('backup');

				if(wlst > requestBtnOffset) {
					$('.main__header').stop().addClass('sticky').removeClass('home totop');
						setTimeout(function() {
							$('.main__header').stop().removeClass('backup');
						}, 500);
				}

				$(window).on('scroll', function() {
					var st = $(this).scrollTop();

					if(st > (requestBtnOffset + $('.request-demo-btn').height())) {
						$('.main__header').stop().addClass('sticky').removeClass('home totop');
						setTimeout(function() {
							$('.main__header').stop().removeClass('backup');
						}, 500);
					}
					else {
						$('.main__header').stop().removeClass('sticky').addClass('home totop');
						setTimeout(function() {
							$('.main__header').stop().addClass('backup');
						}, 500);
					}
				});
			}

		}

		
		if($(window).width() < 719) {
			$('.main__header_content > ul').wrapAll('<nav class="main__nav"><div class="inner"></div></nav>');

			if($('.request-demo-btn').length) {

				var topSpace = $(window).height()/4;

				if(wlst > topSpace) {
					$('.main__header').stop().addClass('sticky').removeClass('home');
				}

				$(window).on('scroll', function() {
					var st = $(this).scrollTop();

					if(st > topSpace) {
						$('.main__header').stop().addClass('sticky').removeClass('home');
					}
					else {
						$('.main__header').stop().removeClass('sticky').addClass('home');
					}
				});
			}

		}


		$(document).on('click', '.mobile-menu-button', function() {
			$(this).stop().toggleClass('menu-opened');
			$('.main__nav').stop().toggleClass('active');
		});


		if($('#sub-main').length) {
			$('.main__header').addClass('submain__header');
		}
		



		/* ---------- go to ---------- */

		$('.go-to').on('click', function() {
			var mainOffset = $('#what').offset().top;
			$('html, body').animate({
				scrollTop: mainOffset
			}, 1000);
		});




		/* ---------- SHEMAS ---------- */

		/* ---------- what schema ---------- */


		if($('.what').length) {

			var wscontroller = new ScrollMagic.Controller(),
				wstl = new TimelineMax(),
				wcloudTl = new TimelineMax({repeat:-1, yoyo:true}),
				wsignal = new TimelineMax({repeat:-1, yoyo:true}),
				wserversignal = new TimelineMax({repeat:-1}),
				wsiconPulse = new TimelineMax({repeat:-1, yoyo:true}),
				wscloudPath1 = MorphSVGPlugin.pathDataToBezier("#wscmove-1", {align:"relative"}),
				wscloudPath2 = MorphSVGPlugin.pathDataToBezier("#wscmove-2", {align:"relative"}),
				wssignalPath1 = MorphSVGPlugin.pathDataToBezier("#signal-line-1", {align:"#wssignal-1"}),
				wssignalPath2 = MorphSVGPlugin.pathDataToBezier("#signal-line-2", {align:"#wssignal-2"});

				TweenMax.set("#wscloud-1", {xPercent:-20, yPercent:-20});
				TweenMax.set("#wscloud-2", {xPercent:-20, yPercent:-20});

				TweenMax.set("#wssignal-1", {xPercent:-50, yPercent:-50});
				TweenMax.set("#wssignal-2", {xPercent:-50, yPercent:-50});


				wstl
						.set($('.what-schema *'), {visibility: 'visible'})
						.set($('.what-schema .main-icon .origin, .what-schema .main-icon .copy'), {y: -20})
						.fromTo($('.what-schema .main-icon .copy *'), 1.5, {drawSVG:"0%"}, {drawSVG:"102%", ease: Power4.easeOut})
						.to($('.what-schema .main-icon .copy *'), 0.2, {opacity: 0, ease: Power0.easeNone}, '-=1')
						.from($('.what-schema .main-icon .origin'), 1, {opacity: 0, ease: Power4.easeOut}, '-=1')
						.to($('.what-schema .main-icon .origin'), 1, {y: 0, ease: Power4.easeOut}, '-=0.9')
						.from($('.what-schema .icon-shadow-wrapper'), 1, {opacity: 0}, '-=0.5')
						.from($('.what-schema .icon-shadow'), 0.25, {opacity: 0, ease: Power0.easeNone}, '-=0.7')
						.fromTo($('.what-schema .line'), 1, {drawSVG:"0%"}, {drawSVG:"102%", ease: Power4.easeOut}, '-=0.4')
						.from($('.what-schema .line-end, .what-schema .end-plate .bottom'), 0.3, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, '-=0.6')
						.from($('.what-schema .end-plate .top'), 0.3, {opacity: 0, y: -10, ease: Back.easeOut.config(2)}, '-=0.4')
						.staggerFrom($('.what-schema .end-plate .top .dot'), 0.2, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, 0.05, '-=0.15')
						.staggerFrom($('.what-schema .tuba .tuba-plate .plate'), 0.5, {opacity: 0, y: -10, ease: Power4.easeOut}, 0.1, '-=1.5')
						.staggerFrom($('.what-schema .tuba .tuba-plate .shadow'), 0.5, {opacity: 0, ease: Power4.easeOut}, 0.1, '-=1.4')
						.staggerFrom($('.what-schema .tuba .tuba-post'), 1, {y: "100%", ease: Power4.easeOut}, 0.1, '-=1.3')
						.staggerFrom($('.what-schema .gray-connectors .connector'), 0.3, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, 0.05, '-=1')
						.from($('.what-schema .cloud, .what-schema .signal'), 2, {opacity: 0, ease: Power4.easeOut, onComplete: function() {

							wsiconPulse
									.set($('.what-schema .main-icon, .what-schema .icon-shadow'), {className : '+=pulse'});

						}}, '-=0.5');

				wcloudTl
						.to($("#wscloud-1"), 20, {bezier:{values:wscloudPath1, type:"cubic"}})
						.to($("#wscloud-2"), 20, {bezier:{values:wscloudPath2, type:"cubic"}}, '-=20');

				wsignal
						.to($("#wssignal-1"), 2, {bezier:{values:wssignalPath1, type:"cubic"}})
						.to($("#wssignal-2"), 2, {bezier:{values:wssignalPath2, type:"cubic"}}, '-=1');

				wserversignal
						.staggerTo($('.what-schema .server-signal'), 1, {opacity: 0, ease: Power4.easeOut}, 0.2);


				var whatSchemaScene = new ScrollMagic.Scene({
							duration: 0,
							triggerElement: '#what',
							triggerHook: 0.5,
							reverse: false
						})
						.setTween(wstl)
						.addTo(wscontroller);
		}

		

			/* ---------- product schema 1 ---------- */

			if($('.vision').length) {

		var pscontroller1 = new ScrollMagic.Controller(),
				pstl1 = new TimelineMax(),
				pcloudTl1 = new TimelineMax({repeat:-1, yoyo:true}),
				psignal1 = new TimelineMax({repeat:-1, yoyo:true}),
				wellitems = new TimelineMax(),
				pcloudPath1 = MorphSVGPlugin.pathDataToBezier("#pcmove-1", {align:"relative"}),
				pcloudPath2 = MorphSVGPlugin.pathDataToBezier("#pcmove-2", {align:"relative"}),
				pcloudPath3 = MorphSVGPlugin.pathDataToBezier("#pcmove-3", {align:"relative"}),
				psignalPath1 = MorphSVGPlugin.pathDataToBezier("#psignal-line-1", {align:"#psignal-1"}),
				psignalPath2 = MorphSVGPlugin.pathDataToBezier("#psignal-line-2", {align:"#psignal-2"});

				TweenMax.set("#pcloud-1", {xPercent:-20, yPercent:-20});
				TweenMax.set("#pcloud-2", {xPercent:-20, yPercent:-20});
				TweenMax.set("#pcloud-3", {xPercent:-20, yPercent:-20});

				TweenMax.set("#psignal-1", {xPercent:-50, yPercent:-50});
				TweenMax.set("#psignal-2", {xPercent:-50, yPercent:-50});



				wellitems
						.set($('.product-schema-1 .well-stars .rect-item'), {transformOrigin: "50% 50%"})
						.staggerTo($('.product-schema-1 .well-stars .item, .product-schema-1 .well-stars .rect-item'), 0, {className: '+=show'}, 0.2);


				pstl1
						.set($('.product-schema-1 *'), {visibility: 'visible'})
						.from($('.product-schema-1 .foundation'), 1, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)})
						.fromTo($('.product-schema-1 .line'), 1, {drawSVG:"0%"}, {drawSVG:"102%", ease: Power4.easeOut}, '-=0.2')
						.from($('.product-schema-1 .line-end, .product-schema-1 .end-plate .bottom'), 0.3, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, '-=0.6')
						.from($('.product-schema-1 .end-plate .top'), 0.3, {opacity: 0, y: -10, ease: Back.easeOut.config(2)}, '-=0.3')
						.staggerFrom($('.product-schema-1 .end-plate .top .dot'), 0.2, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, 0.05, '-=0.15')
						.from($('.product-schema-1 .slate-1'), 1, {opacity: 0, y: -10, ease: Power4.easeOut}, '-=1')
						.from($('.product-schema-1 .cube-shadow'), 0.5, {opacity: 0, ease: Power0.easeNone}, '-=0.85')
						.from($('.product-schema-1 .slate-2'), 1, {opacity: 0, y: -10, ease: Power4.easeOut}, '-=0.8')
						.from($('.product-schema-1 .well-fundation'), 0.5, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, '-=0.6')
						.from($('.product-schema-1 .well-shadow'), 1, {y: "100%", ease: Power4.easeOut}, '-=0.3')
						.from($('.product-schema-1 .well-stars'), 1, {opacity: 0, ease: Power4.easeOut}, '-=0.3')
						.staggerFrom($('.product-schema-1 .step'), 2, {opacity: 0, ease: Power4.easeOut}, 0.1, '-=2')
						.from($('.product-schema-1 .step-2'), 1, {x:5, y:-5, ease: Back.easeOut.config(4)}, '-=2')
						.from($('.product-schema-1 .step-3'), 1, {x:10, y:-10, ease: Back.easeOut.config(4)}, '-=1.95')
						.from($('.product-schema-1 .step-4'), 1, {x:15, y:-15, ease: Back.easeOut.config(4)}, '-=1.9')
						.from($('.product-schema-1 .step-5'), 1, {x:20, y:-20, ease: Back.easeOut.config(4)}, '-=1.85')
						.from($('.product-schema-1 .icon-tab .plate'), 0.5, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, '-=1.5')
						.from($('.product-schema-1 .glass-wrapper .inner'), 1, {y: "100%", ease: Power4.easeOut}, '-=1.2')
						.from($('.product-schema-1 .glass-wrapper .icon'), 1, {y: 5, x: 5, opacity: 0, ease: Power4.easeOut}, '-=0.5')
						.from($('.product-schema-1 .signal'), 0.5, {opacity: 0, ease: Power4.easeOut}, '-=2')
						.from($('.product-schema-1 .cloud'), 0.5, {opacity: 0, ease: Power4.easeOut}, '-=1')
						.staggerFrom($('.product-schema-1 .gray-connectors .connector'), 0.3, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, 0.05, '-=1');

				pcloudTl1
						.to($("#pcloud-1"), 20, {bezier:{values:pcloudPath1, type:"cubic"}})
						.to($("#pcloud-2"), 20, {bezier:{values:pcloudPath2, type:"cubic"}}, '-=20')
						.to($("#pcloud-3"), 20, {bezier:{values:pcloudPath3, type:"cubic"}}, '-=20');

				psignal1
						.to($("#psignal-1"), 2, {bezier:{values:psignalPath1, type:"cubic"}})
						.to($("#psignal-2"), 2, {bezier:{values:psignalPath2, type:"cubic"}}, '-=1');


				var productSchemaScene1 = new ScrollMagic.Scene({
							duration: 0,
							triggerElement: '.vision',
							triggerHook: 0.5,
							reverse: false
						})
						.setTween(pstl1)
						.addTo(pscontroller1);

			}



			/* ---------- product schema 2 ---------- */


			if($('.technology').length) {

				var pscontroller2 = new ScrollMagic.Controller(),
						pstl2 = new TimelineMax();

						pstl2
								.set($('.product-schema-2 *'), {visibility: 'visible'})
								.from($('.product-schema-2 .main-plate .fundament'), 1, {y:-20, opacity: 0, ease: Power4.easeOut})
								.from($('.product-schema-2 .main-plate .shadow'), 0.5, {opacity: 0, ease: Power4.easeOut}, '-=0.7')
								.from($('.product-schema-2 .main-plate .icon'), 0.5, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, '-=0.5')
								.fromTo($('.product-schema-2 .line'), 4, {drawSVG:"0%"}, {drawSVG:"102%", ease: Power4.easeOut}, '-=0.2')
								.from($('.product-schema-2 .line-end'), 0.3, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, '-=3.8')
								.staggerFrom($('.product-schema-2 .plate .fundament'), 1, {y:-20, opacity: 0, ease: Power4.easeOut}, 0.1, '-=3.8')
								.staggerFrom($('.product-schema-2 .plate .shadow'), 0.5, {opacity: 0, ease: Power4.easeOut}, 0.1, '-=3.6')
								.staggerFrom($('.product-schema-2 .plate .icon'), 0.5, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, 0.1, '-=3.5');


				var productSchemaScene2 = new ScrollMagic.Scene({
							duration: 0,
							triggerElement: '.technology',
							triggerHook: 0.5,
							reverse: false
						})
						.setTween(pstl2)
						.addTo(pscontroller2);

			}








			/* ---------- boinc schema ---------- */

			if($('.boinc__brief_schema').length) {

					var bocontroller = new ScrollMagic.Controller(),
				bstl = new TimelineMax(),
				bcloudTl1 = new TimelineMax({repeat:-1, yoyo:true}),
				bcloudTl2 = new TimelineMax({repeat:-1, yoyo:true}),
				bcloudTl3 = new TimelineMax({repeat:-1, yoyo:true}),
				bcloudTl4 = new TimelineMax({repeat:-1, yoyo:true}),
				bsignal1 = new TimelineMax({repeat:-1, yoyo:true}),
				bsignal2 = new TimelineMax({repeat:-1, yoyo:true}),
				bserversignal = new TimelineMax({repeat:-1}),
				bcloudPath1 = MorphSVGPlugin.pathDataToBezier("#bmove-1", {align:"relative"}),
				bcloudPath2 = MorphSVGPlugin.pathDataToBezier("#bmove-2", {align:"relative"}),
				bcloudPath3 = MorphSVGPlugin.pathDataToBezier("#bmove-3", {align:"relative"}),
				bcloudPath4 = MorphSVGPlugin.pathDataToBezier("#bmove-4", {align:"relative"}),
				bsignalPath1 = MorphSVGPlugin.pathDataToBezier("#bsignal-line-1", {align:"#bsignal-1"}),
				bsignalPath2 = MorphSVGPlugin.pathDataToBezier("#bsignal-line-2", {align:"#bsignal-2"});

				TweenMax.set("#bsignal-1", {xPercent:-50, yPercent:-50});
				TweenMax.set("#bsignal-2", {xPercent:-50, yPercent:-50});


				bstl
						.set($('.boinc-schema *'), {visibility: 'visible'})
						.from($('.boinc-schema .main-icon'), 1, {opacity: 0, y: -10, ease: Power4.easeOut})
						.from($('.boinc-schema .icon-shadow'), 0.5, {opacity: 0, ease: Power4.easeOut}, '-=0.8')
						.from($('.boinc-schema .plus'), 1, {opacity: 0, y: -10, ease: Power4.easeOut}, '-=0.7')
						.from($('.boinc-schema .plus-shadow-wrapper'), 0.5, {opacity: 0, ease: Power4.easeOut}, '-=0.8')
						.from($('.boinc-schema .boinc-word'), 1, {opacity: 0, y: -10, ease: Power4.easeOut}, '-=0.7')
						.from($('.boinc-schema .boinc-shadow'), 0.5, {opacity: 0, ease: Power4.easeOut}, '-=0.8')
						.fromTo($('.boinc-schema .line'), 1, {drawSVG:"0%"}, {drawSVG:"102%", ease: Power4.easeOut}, '-=1')
						.from($('.boinc-schema .line-end, .boinc-schema .end-plate .bottom, .boinc-schema .server-plate, .boinc-schema .laptop-shadow'), 0.5, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, '-=0.6')
						.from($('.boinc-schema .end-plate .top, .boinc-schema .server-post, .boinc-schema .laptop'), 0.5, {opacity: 0, y: -10, ease: Back.easeOut.config(2)}, '-=0.2')
						.staggerFrom($('.boinc-schema .end-plate .top .dot'), 0.2, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, 0.05, '-=0.15')
						.staggerFrom($('.boinc-schema .gray-connectors .connector'), 0.3, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, 0.05, '-=1')
						.from($('.boinc-schema .cloud, .boinc-schema .signal'), 2, {opacity: 0, ease: Power4.easeOut}, '-=0.5');

				bcloudTl1
						.to($("#bcloud-1"), 30, {bezier:{values:bcloudPath1, type:"cubic"}});
				bcloudTl2
						.to($("#bcloud-2"), 150, {bezier:{values:bcloudPath2, type:"cubic"}});
				bcloudTl3
						.to($("#bcloud-3"), 70, {bezier:{values:bcloudPath3, type:"cubic"}});
				bcloudTl4
						.to($("#bcloud-4"), 20, {bezier:{values:bcloudPath4, type:"cubic"}});		

				bsignal1
						.to($("#bsignal-1"), 5, {bezier:{values:bsignalPath1, type:"cubic"}});
				bsignal2
						.to($("#bsignal-2"), 10, {bezier:{values:bsignalPath2, type:"cubic"}});


				var boincSchemaScene2 = new ScrollMagic.Scene({
							duration: 0,
							triggerElement: '.boinc__brief_schema',
							triggerHook: 0.5,
							reverse: false
						})
						.setTween(bstl)
						.addTo(bocontroller);

			}



			/* ---------- contact schema ---------- */


			if($('.contacts').length) {

				var concontroller = new ScrollMagic.Controller(),
				contl = new TimelineMax(),
				conwellitems1 = new TimelineMax(),
				conwellitems2 = new TimelineMax(),
				conwellitems3 = new TimelineMax(),
				conwellitems4 = new TimelineMax();

				conwellitems1
						.set($('.contact-schema .well-1 .well-stars .item'), {transformOrigin: "50% 50%"})
						.staggerTo($('.contact-schema .well-1 .well-stars .item'), 0, {className: '+=show'}, 0.2);

				conwellitems2
						.set($('.contact-schema .well-2 .well-stars .item'), {transformOrigin: "50% 50%"})
						.staggerTo($('.contact-schema .well-2 .well-stars .item'), 0, {className: '+=show'}, 0.2);

				conwellitems3
						.set($('.contact-schema .well-3 .well-stars .item'), {transformOrigin: "50% 50%"})
						.staggerTo($('.contact-schema .well-3 .well-stars .item'), 0, {className: '+=show'}, 0.2);

				conwellitems4
						.set($('.contact-schema .well-4 .well-stars .item'), {transformOrigin: "50% 50%"})
						.staggerTo($('.contact-schema .well-4 .well-stars .item'), 0, {className: '+=show'}, 0.2);


				contl
						.set($('.contact-schema *'), {visibility: 'visible'})
						.from($('.contact-schema .plate-1'), 1, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)})
						.fromTo($('.contact-schema .line'), 1, {drawSVG:"0%"}, {drawSVG:"102%", ease: Power4.easeOut}, '-=0.2')
						.from($('.contact-schema .line-end'), 0.5, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, '-=0.6')
						.from($('.contact-schema .plate-2'), 1, {y: -20, opacity: 0, ease: Power4.easeOut}, '-=1')
						.from($('.contact-schema .plate-2-shadow'), 1, {opacity: 0, ease: Power4.easeOut}, '-=0.7')
						.from($('.contact-schema .plate-3'), 1, {y: -20, opacity: 0, ease: Power4.easeOut}, '-=1.1')
						.from($('.contact-schema .laptop'), 1, {y: -20, opacity: 0, ease: Power4.easeOut}, '-=0.8')
						.from($('.contact-schema .glass'), 1, {opacity: 0, ease: Power4.easeOut}, '-=0.5')
						.from($('.contact-schema .well-fundation'), 0.5, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, '-=1.5')
						.from($('.contact-schema .well-shadow'), 1, {y: "100%", ease: Power4.easeOut}, '-=1.2')
						.from($('.contact-schema .well-stars'), 1, {opacity: 0, ease: Power4.easeOut}, '-=1.2')
						.staggerFrom($('.contact-schema .gray-connectors .connector'), 0.3, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, 0.05, '-=1')
						.staggerFrom($('.contact-schema .envelop'), 2, {opacity: 0, y: 50, ease: Back.easeOut.config(4)}, 0.2, '-=1')




						.from($('.product-schema-1 .end-plate .top'), 0.3, {opacity: 0, y: -10, ease: Back.easeOut.config(2)}, '-=0.3')
						.staggerFrom($('.product-schema-1 .end-plate .top .dot'), 0.2, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, 0.05, '-=0.15')
						.from($('.product-schema-1 .slate-1'), 1, {opacity: 0, y: -10, ease: Power4.easeOut}, '-=1')
						.from($('.product-schema-1 .cube-shadow'), 0.5, {opacity: 0, ease: Power0.easeNone}, '-=0.85')
						.from($('.product-schema-1 .slate-2'), 1, {opacity: 0, y: -10, ease: Power4.easeOut}, '-=0.8')
						
						.staggerFrom($('.product-schema-1 .step'), 2, {opacity: 0, ease: Power4.easeOut}, 0.1, '-=2')
						.from($('.product-schema-1 .step-2'), 1, {x:5, y:-5, ease: Back.easeOut.config(4)}, '-=2')
						.from($('.product-schema-1 .step-3'), 1, {x:10, y:-10, ease: Back.easeOut.config(4)}, '-=1.95')
						.from($('.product-schema-1 .step-4'), 1, {x:15, y:-15, ease: Back.easeOut.config(4)}, '-=1.9')
						.from($('.product-schema-1 .step-5'), 1, {x:20, y:-20, ease: Back.easeOut.config(4)}, '-=1.85')
						.from($('.product-schema-1 .icon-tab .plate'), 0.5, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, '-=1.5')
						.from($('.product-schema-1 .glass-wrapper .inner'), 1, {y: "100%", ease: Power4.easeOut}, '-=1.2')
						.from($('.product-schema-1 .glass-wrapper .icon'), 1, {y: 5, x: 5, opacity: 0, ease: Power4.easeOut}, '-=0.5')
						.from($('.product-schema-1 .signal'), 0.5, {opacity: 0, ease: Power4.easeOut}, '-=2')
						.from($('.product-schema-1 .cloud'), 0.5, {opacity: 0, ease: Power4.easeOut}, '-=1')
						.staggerFrom($('.product-schema-1 .gray-connectors .connector'), 0.3, {scaleY:0, scaleX:0, transformOrigin: "50% 50%", ease: Back.easeOut.config(2)}, 0.05, '-=1');



						var contactSchemaScene = new ScrollMagic.Scene({
							duration: 0,
							triggerElement: '.write__us',
							triggerHook: 0.5,
							reverse: false
						})
						.setTween(contl)
						.addTo(concontroller);

			}


			/* ---------- base animation ---------- */

			var basecontroller = new ScrollMagic.Controller();

			$('.animate-box').each(function() {

				var contentAnimation = new ScrollMagic
				.Scene({
					triggerElement: this,
					triggerHook: 0.7,
					reverse: false
				})
				.setClassToggle(this, "animated")
				.addTo(basecontroller);
			});


			var footerContentAnimation = new ScrollMagic
				.Scene({
					triggerElement: '.main__footer_bottom',
					triggerHook: 0,
					reverse: false
				})
				.setClassToggle('.main__footer_bottom', "animated")
				.addTo(basecontroller);






		$('.animation').each(function() {
			var thisDataDelay = $(this).attr('data-delay');
			$(this).css('transition-delay', thisDataDelay + "s");
		});

		$('.opacity').each(function() {
			var thisDataDelay = $(this).attr('data-delay');
			$(this).css('transition-delay', thisDataDelay + "s");
		});





		/* ---------- roadmap slider ---------- */

		$('.roadmap__slider').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			speed: 500,
			swipe: true,
			arrows: true,
			dots: false,
			infinite: false,
			fade: false,
			autoplay: false,
			prevArrow: '<button class="prev-slide"></button>',
			nextArrow: '<button class="next-slide"></button>',
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});


		if($(window).width() > 991) {
			$(".roadmap__slider").slick( "slickGoTo", 6);
		}

		if($(window).width() < 992 && $(window).width() > 599) {
			$(".roadmap__slider").slick( "slickGoTo", 8);
		}

		if($(window).width() < 600) {
			$(".roadmap__slider").slick( "slickGoTo", 10);
		}


		


		setTimeout(function() {

			$('.roadmap__slider .slide:not(.last)').each(function() {
				var thisTitlePosLeft = $(this).find('.slide__content--description-title').position().left,
				thisTitleWidth = $(this).find('.slide__content--description-title').width(),
				rightSpace = $(this).width() - (thisTitlePosLeft + thisTitleWidth),
				nextSlide = $(this).next('.slide'),
				nextSlideTitlePosLeft = nextSlide.find('.slide__content--description-title').position().left,
				sumSpace = rightSpace + nextSlideTitlePosLeft,
				lineHalfWidth = $(this).find('.line').width()/2;
				$(this).find('.line').css('margin-left', (sumSpace/2 - lineHalfWidth) + "px");	
			});

		}, 4);




		/* ---------- news slider ---------- */

		/*$('.news-slider').slick({
			slidesToShow: 3,
			slidesToScroll: 3,
			speed: 500,
			swipe: true,
			arrows: true,
			dots: false,
			infinite: true,
			fade: false,
			autoplay: false,
			// autoplaySpeed: 7000,
			prevArrow: '<button class="prev-slide btn"><span></span><i></i></button>',
			nextArrow: '<button class="next-slide btn"><span></span><i></i></button>',
			responsive: [
			{
				breakpoint: 720,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true
					}
				}
			]
		});*/


		$(document).on('click', '.show-news', function() {
			document.querySelectorAll('.news__items .hide').forEach(function(el, index) {
				if(index < 6) {
					el.classList.remove('hide');
					el.children[0].style.display = 'block';
				}
				if($('.news__hided .hide').length == 0) {
					$('.show-news').hide();
				}
			});
		});



		$('.more-news').on('click', function() {
			$('.news__hided').stop().slideDown(400);
			$('.more__wrapper').stop().addClass('more');
		});

		$('.less-news').on('click', function() {
			$('.news__hided').stop().slideUp(400);
			$('.more__wrapper').stop().removeClass('more');
			$('html, body').animate({
				scrollTop: $('#news').offset().top
			});
		});



		



		
		$('.accordion').each(function() {
			var $this = $(this);
			accordion($this, '.question', '.answer');
		});



			/* ---------- footer ---------- */


			var currentWinPos = window.location.hash;

			$('.info-item').each(function() {
				var thisId = $(this).attr('id');
				var hashId = "#" + thisId;
				var thisOffset = $(this).offset().top;
				if(hashId == currentWinPos) {
					$('html, body').stop().animate({
						scrollTop: thisOffset,
						easing: "easein"
					}, 800);
					history.pushState(null, null, window.location.href.split('#')[0]);
				}
			});


			$('.footer-menu li a').on('click', function(e) {
				var thisGo = $(this).attr('data-go');
				$('.info-item').each(function() {
					var thisId = $(this).attr('id');
					var thisOffset = $(this).offset().top;
					if(thisGo == thisId) {
						$('html, body').stop().animate({
							scrollTop: thisOffset,
							easing: "easein"
						}, 1000);
					}
				});
			});






			/* ---------- MODALS ---------- */

			var swiper,
					parentIndex;

			$('.modal-open').on('click', function() {

				parentIndex = $(this).parents('.animate-box').index();

				var currentModal = $(this).attr('href');
				$('.modal-window').each(function() {
					var currentId = '#' + $(this).attr('id');
					if(currentId === currentModal) {
						var $this = $(this);
						$(this).fadeIn(400).addClass('modal-show');
						if($(window).width() > 1024) {
							setTimeout(function() {
								$this.niceScroll({
									cursoropacitymax: 1,
									cursorcolor: "#2a8bcb",
									autohidemode: false,
									zindex: "999",
									scrollspeed: 50,
									cursordragontouch: true,
									cursorborderradius: "0px",
									Smoothscroll : true,
									cursorwidth: "6px",
									cursorborder: "0px solid transparent"
								});
							}, 700);
						}
					}
				});

				setTimeout(function() {
					swiper = new Swiper($('.persons__slider'), {
						loop: false,
						slidesPerView: 1,
						slideClass: "slide__person",
						setWrapperSize: true,
						centeredSlides: true,
						autoHeight: true,
						pagination: {
							el: '.swiper-pagination',
							dynamicBullets: true,
							dynamicMainBullets: 7
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
					});
					swiper.slideTo(parentIndex);
				}, 100);
				

			});



			if($(window).width() > 719) {
				$('.modal-close').on('click', function() {
					$('.modal-window').fadeOut(400).removeClass('modal-show').niceScroll().remove();
					setTimeout(function() {
						swiper.destroy(true, true);
					}, 500);
				});

				$('.modal-window').on('click touchstart', function (event) {
					if (!$(event.target).closest('.modal-content-wrapper').length) {
						$(this).fadeOut(400).removeClass('modal-show');
						setTimeout(function() {
							swiper.destroy(true, true);
						}, 500);
					}
				});
			}

			if($(window).width() < 720) {
				$('.modal-close').on('click', function() {
					$('.modal-window').removeClass('modal-show');
					setTimeout(function() {
						swiper.destroy(true, true);
					}, 500);
				});
			}

			$('.modal-window').each(function() {
				var dataOffset = $(this).children('.modal-content-wrapper').attr('data-offset');
				$(this).children('.modal-content-wrapper').height($(window).height() - dataOffset + 'px');
			});


			$('.popup__form input[type="file"]').on('change', function() {
				var uploadedFileName = $(this).val().replace(/C:\\fakepath\\/i, '');
				$(this).parents('form').find('.uploaded-file-name').html('<span>Attached:</span>' + uploadedFileName);
				$(this).parents('form').find('.input-wrapper-text').stop().addClass('loaded');
				$(this).parents('form').find('.input-wrapper-text span').text('delete file');
			});


			var f = document.querySelectorAll('input[type=file]');
			var clearInput = function(){
				this.value=''
			};
			for(var i=0;i<f.length; i++)
				f[i].addEventListener('click', clearInput);

			$('.input-wrapper-text').on('click', function() {
				$(this).stop().removeClass('loaded');
				$(this).find('span').text('attach file');
				$(this).parents('form').find('.uploaded-file-name').html('');
				$(this).parents('form').find('input[type="file"]').val('');
			});


			if($(window).width() > 1024) {
				$('.wechat-link').parent().hover(function() {
					$(this).addClass('show-qr');
				}, function() {
					$(this).removeClass('show-qr');
				});
			}

			if($(window).width() < 1025) {

				$('.wechat-link').parent().on('click', function() {
					$(this).stop().addClass('show-qr');
				});

				$(document).on('click touchstart', function (event) {
					if (!$(event.target).closest('.tooltip-parent').length) {
						$('.tooltip-parent').removeClass('show-qr');
					}
				});
			}
			


			$('.positions__table_item--list .modal-open').on('click', function() {
				var thisPosLinkText = $(this).parents('.positions__table_item--list').find('.pos-link').text();

				$('#select-position option').each(function() {
					if($(this).val() == thisPosLinkText) {
						$(this).attr('selected',true);
					}
				});

			});


			if($(window).width() < 720) {

				$('.base-scroll .modal-close').on('click', function() {
					$('.main__nav').stop().removeClass('active');
					$('.mobile-menu-button').stop().removeClass('menu-opened');
				});

			}




			/* ---------- forms ---------- */

		/*$('form input[type="file"]').on('change', function() {
			var uploadedFileName = $(this).val().replace(/C:\\fakepath\\/i, '');
			$(this).parents('form').find('.uploaded-file-name').val(uploadedFileName);
		});*/


		/* ---------- forms validation ---------- */

		$('form.info').each(function() {
			var $this = $(this);

			$this.validate({

				rules: {

					Name: {
						required: true
					},

					Email: {
						required: true,
						email: true
					},

					Phone: {
						required: true
					},

					Option: {
						required: true
					},

					Company: {
						required: true
					},

					CompanyWeb: {
						required: true
					},

					file: {
						required: false,
						filesize: 10000000
					}

				},


				submitHandler: function(form) {
					var formData = new FormData(form);

					$.ajax({
						type: "POST",
						url: "mail-info.php",
						data: formData,
						cache: false,
						processData: false,
						contentType: false,
						beforeSend: function() {

						},
						success: function(data) {
						donePopup();
						form.reset();

					},
					complete: function() {

					}
				});

					form.reset();
					form.submit();
				}

			});

		});



		$('.modal-window form.career').each(function() {
			var $this = $(this);

			$this.validate({

				rules: {

					Name: {
						required: true
					},

					Email: {
						required: true,
						email: true
					},

					Phone: {
						required: true
					},

					Option: {
						required: true
					},

					Company: {
						required: true
					},

					CompanyWeb: {
						required: true
					},

					file: {
						required: false,
						filesize: 10000000
					}

				},


				submitHandler: function(form) {
					var formData = new FormData(form);

					$.ajax({
						type: "POST",
						url: "mail-career.php",
						data: formData,
						cache: false,
						processData: false,
						contentType: false,
						beforeSend: function() {

						},
						success: function(data) {
						donePopup();
						form.reset();

					},
					complete: function() {

					}
				});

					form.reset();
					form.submit();
				}

			});

		});


		function donePopup() {
			$('#done-window').fadeIn(400).addClass('modal-show');

			var lastOpenedWindow = $('.modal-window.modal-show').attr('id');
			var lastCurrentId = '#' + lastOpenedWindow;

			console.log(lastOpenedWindow);
			console.log(lastCurrentId);

			$('.modal-window').not('#done-window').fadeOut(400).removeClass('modal-show');

			$('.re-open').on('click', function() {
				$('#done-window').fadeOut(400).removeClass('modal-show');
				$('.modal-window').each(function() {
					var thisId = $(this).attr('id');
					if(thisId == lastOpenedWindow) {
						$(this).fadeIn(400).addClass('modal-show');
					}
				});
			});

		}



		
		


	});











	/*window load*/
	$(window).on('load', function() {

		setTimeout(function() {
			history.pushState(null, null, window.location.href.split('#')[0]);
		}, 1000);
		
		

	});




	






	/*window resize*/
	$(window).resize(function() {


		setTimeout(function() {
			if($(window).width() > 991) {
				$(".roadmap__slider").slick( "slickGoTo", 6);
			}

			if($(window).width() < 992 && $(window).width() > 599) {
				$(".roadmap__slider").slick( "slickGoTo", 8);
			}

			if($(window).width() < 600) {
				$(".roadmap__slider").slick( "slickGoTo", 10);
			}
		}, 1000);
		


		/* ---------- header ---------- */
		if($('.request-demo-btn').length) {
			requestBtnOffset = $('.request-demo-btn').offset().top;

			$(window).on('scroll', function() {
				var rst = $(this).scrollTop();
				if(rst > (requestBtnOffset + $('.request-demo-btn').height())) {
					$('.main__header').stop().addClass('sticky').removeClass('home');
				}
				else {
					$('.main__header').stop().removeClass('sticky').addClass('home');
				}
			});
		}



		$('.modal-window').each(function() {
			var dataOffset = $(this).children('.modal-content-wrapper').attr('data-offset');
			$(this).children('.modal-content-wrapper').height($(window).height() - dataOffset + 'px');
		});

		$('.words span').each(function() {
			if($(this).width() > maxWidth) {
				maxWidth = $(this).width();
			}
		});
		$('.words').width(maxWidth);
		$('.words').each(function() {
			$(this).height($(this).prev().height());
		});




		setTimeout(function() {

			$('.roadmap__slider .slide:not(.last)').each(function() {
				var thisTitlePosLeft = $(this).find('.slide__content--description-title').position().left,
				thisTitleWidth = $(this).find('.slide__content--description-title').width(),
				rightSpace = $(this).width() - (thisTitlePosLeft + thisTitleWidth),
				nextSlide = $(this).next('.slide'),
				nextSlideTitlePosLeft = nextSlide.find('.slide__content--description-title').position().left,
				sumSpace = rightSpace + nextSlideTitlePosLeft,
				lineHalfWidth = $(this).find('.line').width()/2;
				$(this).find('.line').css('margin-left', (sumSpace/2 - lineHalfWidth) + "px");	
			});

		}, 200);
		

		
		
	});




})(jQuery);	


	