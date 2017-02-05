$(document).ready(function() {
	global.config = [];

	//load configurations
	$.get('/config', function(ret){
		for(var item in ret[0]){
			if(!(ret[0][item].script.trim() === "")){
			 	global.config.push(ret[0][item]);
			}
		}
		
		for(var i = 0; i < global.config.length; i++){
			useConfig(global.config[i].script);
		}
		
	});

	//will work for now. Will be changed once
	//we figure out how we're going to
	//handle rendering each individual
	//widget amongst their own js scripts
	function useConfig(scriptPath){
		$.getScript(scriptPath, function(){
	   		console.log('scripts are loaded');
		});
	}
});