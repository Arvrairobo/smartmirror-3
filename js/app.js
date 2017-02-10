$(document).ready(function() {
	//load configurations
	$.get('/config', function(ret){
		var modulesToLoad = [];

		//loop through return object
		//grab only the one's with scripts
		for(var item in ret[0]){
			if(!(ret[0][item].script.trim() === "")){
			 	modulesToLoad.push(ret[0][item]);
			}
		}
		
		//load each widget
		//General concept of how each widget will be loading:
		//A wrapper div will be created for each widget at specified spot
		//within each individual script, they will only add elements to the wrapper
		for(var i = 0; i < modulesToLoad.length; i++){
			addWidgetWrapper(modulesToLoad[i]);
		}
	});

	//add wrapper div to dom to prepare for widgets
	//which will be added in addWidget function
	function addWidgetWrapper(module, finished){
		var $spotDivTag = $('#' + module.location);
		$spotDivTag.html('<div id="'+module.module+'"></div>');

		addWidget(module.script)
	}
	
	//add widget amongst their specified location
	function addWidget(scriptPath){
		$.getScript(scriptPath, function(data){
	   		console.log('widgets are loaded');
		});
	}
});