(function( $ ) {


	$(document).ready(function(){

		if($('.pc-mob-tab').length) {
			
			var solution1 = new Plyr('#solution-1', {
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


			var solution2 = new Plyr('#solution-2', {
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

			solution1.poster = '../img/poster.jpg';
			solution2.poster = '../img/poster.jpg';


			window.solution1 = solution1;
			window.solution2 = solution2;

		solution1.on('ready', function() {
			$('.video-container').stop().addClass('ready');
		});

		

		solution2.on('ready', function() {
			$('.video-container').stop().addClass('ready');
		});



		}
		

		


		/*$('.show-video').on('click', function() {
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
		});*/


	});

	



})(jQuery);