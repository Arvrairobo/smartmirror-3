//global variables for youtube player
var player = null, vidID, done = false;

if (annyang) {
  // Add our commands to annyang
  var commands = {
    'hello (sam)': helloResponse,
    'show me (a) video(s) (of) *videoTitle': findVideo,
    'pause video': pauseVideo,
    'stop video': stopVideo,
    'play video': playVideo,
    'clear (video)': clearFeedbackArea,
    'mute video': muteVideo,
    'show commands': showCommands
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}

/*-----Hello Command-----*/
function helloResponse() {
    var messages = [
        "Hello, how can I assists you?",
        "SAM at your service.",
        "How can I help you?"
    ];

    var htmlId = '#voiceFeedback';
    var rand = Math.floor(Math.random() * messages.length);
    var choice = messages[rand];
    clearFeedbackArea();
    $(htmlId).html(choice);
}

/*-----Youtube Video Command----*/
function findVideo(videoTitle) {
    var queryString = encodeURIComponent(videoTitle.trim());
    clearFeedbackArea();
    $('#voiceFeedback').html('<div id="youtubeIframe"></div>');
    $.getJSON({
        type: 'GET',
        dataType: "json",
        async: false,
        url: 'http://localhost:8080/youtube?subject=' + queryString,
        success: function(data) {
            addVideo(data);
        }
    });
}

function addVideo(videoData) {
	//setup youtube iframe api
	var $youtubeAPIScriptTag = $("<script>", {src: "https://www.youtube.com/iframe_api"});
	$('script').first().before($youtubeAPIScriptTag);
    var rand = Math.floor(Math.random() * 5);
    vidID = videoData[rand].id;
    if(typeof window.YT !== 'undefined'){
    	player = new window.YT.Player('youtubeIframe', {
        height: '230',
        width: '420',
        videoId: vidID,
        events: {
            'onReady': playVideo
        	}
    	});
    }
    
}

//required by the youtubeIframeApi
//must be in the global scope
function onYouTubeIframeAPIReady() {
	player = new YT.Player('youtubeIframe', {
        height: '230',
        width: '420',
        videoId: vidID,
        events: {
            'onReady': playVideo
        }
    });
    console.log("player");
}

function playVideo() {
	if(player !== null) player.playVideo();
}

function stopVideo() {
    if(player !== null) player.stopVideo();
}

function pauseVideo() {
    if(player !== null) player.pauseVideo();
}

function muteVideo(){
	if(player !== null){
		if(player.isMuted()){
			player.unMute();
		}else{
			player.mute();
		}
	} 
}

/*-----Clean up commands----*/
function clearFeedbackArea(){
	player = null;
	$('#voiceFeedback').empty();
}

/*-----Help Commands-----*/
function showCommands() {
    clearFeedbackArea();
    $('#voiceFeedback').html('<div id="commandsWrapper"><ul id="commands"></ul></div>');
    $.getJSON({
        type: 'GET',
        dataType: "json",
        async: false,
        url: 'http://localhost:8080/commands',
        success: function(data) {
        	var $commandsList = $('#commands');
            for (var item in data) {
                $commandsList.append(`<li>
				<div id="command"><strong>"`+data[item].command+`"</strong></div>
				<div id="description">`+data[item].description+`</div>
			</li>`)
            }
            
        }
    });
    if ($('#commandsWrapper').height() > $('#voiceFeedback').height()) {
	    setInterval(function() {
	        start();
	    }, 5000);
	}

}

/*-----Helper functions to make things look cool-----*/
function animateContent(direction) {
    var animationOffset = $('#voiceFeedback').height() - $('#commandsWrapper').height();

    if (direction == 'up') animationOffset = 0;

    $('#commandsWrapper').animate({ "marginTop": (animationOffset) + "px" }, 5000);
}

function up() {
    animateContent("up");
}

function down() {
    animateContent("down");
}

function start() {
    setTimeout(function() {
        down();
    }, 2000);
    setTimeout(function() {
        up();
    }, 2000);
    setTimeout(function() {
        console.log("wait...");
    }, 5000);
}