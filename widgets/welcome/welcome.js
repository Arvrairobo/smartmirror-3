var messages = [
	"Good morning!",
	"Hey there good lookin'!",
	"Long time no see.",
	"You could use a cup of coffee..",
	"Have a splendid day!",
	"Thanks for using S.A.M. human!",
	"Great outfit choice!"
];

function loadWelcomeMessage(messages) {
	var htmlId = '#welcome-message';
	var rand = Math.floor(Math.random() * messages.length);
	var choice = messages[rand];
	$(htmlId).html(choice);
}

loadWelcomeMessage(messages);