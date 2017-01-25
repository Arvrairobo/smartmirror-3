$(document).ready(function() {
	$.get('widgets/welcome/messages.txt', function(messages) {
		var lines = messages.responseText.split("\n");
		var rand = Math.floor(Math.random() * lines.length);
		var choice = lines[rand];
		console.log(choice);
		$('#welcome-message').html(choice); 
	})
});