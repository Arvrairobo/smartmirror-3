//global variables for youtube player
var player = null, vidID, done = false;
var messages = [
    "Good morning!",
    "Hey there good lookin'!",
    "Long time no see.",
    "You could use a cup of coffee..",
    "Have a splendid day!",
    "Thanks for using S.A.M. human!",
    "Great outfit choice!"
];
var confirmbeep = new Audio('./widgets/voice/confirm.wav');

loadWelcomeMessage(messages);
if (annyang) {
  // Add our commands to annyang
  var commands = {
    'hello (sam)': helloResponse,
    'show (me) (a) video(s) (of) *videoTitle': findVideo,
    'pause video': pauseVideo,
    'stop video': stopVideo,
    'play video': playVideo,
    'clear (video)': clearFeedbackArea,
    'mute video': muteVideo,
    'show commands': showCommands,
    'refresh': reloadPage,
    '(show) (hide) display': mirrorMode,
    'show (me) (a) picture(s) (of) *picture': showImages,
    'enlarge picture *choice': enlargePicture
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}

/*-----Welcoming Message-----*/
function loadWelcomeMessage(messages) {
    var htmlId = '#voice';
    var rand = Math.floor(Math.random() * messages.length);
    var choice = messages[rand];
    $(htmlId).html(choice);
    //$(htmlId).addClass('center-align');
}

/*-----Hello Command-----*/
function helloResponse() {
    var messages = [
        "Hello, how can I assists you?",
        "SAM at your service.",
        "How can I help you?"
    ];

    confirmbeep.play();

    var htmlId = '#voice';
    var rand = Math.floor(Math.random() * messages.length);
    var choice = messages[rand];
    clearFeedbackArea();
    $(htmlId).html(choice);
}

/*-----Flickr Images Command-----*/
function showImages(picture){
  confirmbeep.play();
  clearFeedbackArea();
  var queryString = encodeURIComponent(picture.trim());
  $('#voice').html('<div id="pictures">Loading Images...</div>');
  $.getJSON({
        type: 'GET',
        dataType: "json",
        async: false,
        url: 'http://localhost:8080/pictures?subject=' + queryString,
        success: function(data) {
            addPictureSlide(data);
        }
  });
}

function addPictureSlide(pictureData){
  var referenceID = ["one", "two", "three", "four", "five"];
  $('#pictures').empty();
  for(var i = 0; i < pictureData.length; i++){
    var currentPicture = pictureData[i];
    var farm = currentPicture.farm;
    var serverID = currentPicture.server;
    var id = currentPicture.id;
    var secret = currentPicture.secret;
    var imgSrc = "https://c2.staticflickr.com/{farm}/{serverID}/{id}_{secret}.jpg"
    .replace('{farm}', farm)
    .replace('{serverID}', serverID)
    .replace('{id}', id)
    .replace('{secret}', secret);
    $('#pictures').append('<img id="' + referenceID[i] +'" class="img-small" src="' + imgSrc + '">');  
  }
}

function enlargePicture(choice){
  var filterChoice = commandCorrection(choice);
  console.log(choice);
  $('#pictures').children('img').each(function(){
      if($(this).hasClass("img-large")){
          $(this).removeClass("img-large");
          $(this).addClass("img-small");
      }
  });

  $('#' + filterChoice).removeClass('img-small').addClass('img-large');
}

/*-----Youtube Video Command----*/
function findVideo(videoTitle) {
    confirmbeep.play();
    var queryString = encodeURIComponent(videoTitle.trim());
    clearFeedbackArea();
    $('#voice').html('<div id="youtubeIframe">Loading Video...</div>');
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
      $('#youtubeIframe').empty();
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
  confirmbeep.play();
	if(player !== null) player.playVideo();
}

function stopVideo() {
  confirmbeep.play();
  if(player !== null) player.stopVideo();
}

function pauseVideo() {
  confirmbeep.play();
  if(player !== null) player.pauseVideo();
}

function muteVideo(){
  confirmbeep.play();
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
	$('#voice').empty();
}

function reloadPage(){
  location.reload();
}
/*-----Help Commands-----*/
function showCommands() {
  confirmbeep.play();
  clearFeedbackArea();
  $('#voice').html('<div id="commandsWrapper"><ul id="commands"></ul></div>');
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
  if ($('#commandsWrapper').height() > $('#voice').height()) {
    setInterval(function() {
      start();
    }, 5000);
	}

}

/*-----Mirror Mode Commands-----*/
function mirrorMode(){
  $('body').toggle("slow");
}

/*-----Helper functions to make things look cool-----*/
function commandCorrection(word){
  var oneWords = ["one", "1"];
  var twoWords = ["too", "to", "two", "2"];
  var threeWords = ["tree", "three", "3"];
  var fourWords = ["for", "four", "4"];
  var fiveWords = ["five", "5"];
  var realWord = "";
  if($.inArray(word, oneWords) > -1){
    realWord = "one";
  }else if($.inArray(word, twoWords) > -1){
    realWord = "two";
  }else if($.inArray(word, threeWords) > -1){
    realWord = "three";
  }else if($.inArray(word, fourWords) > -1){
    realWord = "four";
  }else if($.inArray(word, fiveWords) > -1){
    realWord = "five";
  }

  return realWord;
}

function animateContent(direction) {
    var animationOffset = $('#voice').height() - $('#commandsWrapper').height();
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
