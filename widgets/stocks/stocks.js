//have to make it syncronus or else it'll interfere with weather.js
$.getJSON({
	type: 'GET',
	dataType: "json",
	async: false,
	url: 'http://localhost:8080/stocks',
	success: function(data){
		wrapperSetup(data);
	},
	fail: function(data){
		$.getJSON(this);
	}
});

function wrapperSetup(stockData){
	$('#stocks').before('<div id="stockHeader"><strong>Stocks</strong></div>');
	$('#stocks').html('<ul id="stockList"></ul>');
	addWidget(stockData);
}

function addWidget(stocks){
	for(var i = 0; i < stocks.length; i++){
		var stockSymbol = stocks[i].Symbol;
		var stockAsk = stocks[i].Ask;
		var stockChange = stocks[i].Change;
		var stockChangePercent = stocks[i].ChangeinPercent;
		var $stockList = $('#stockList');

		$stockList.append(`<li id="`+stockSymbol+`">
				<div id="stockName">`+stockSymbol+`</div>
				<div id="stockPrice">$ `+parseFloat(stockAsk).toFixed(2)+`</div>
				<div id="stockGain">`+stockChange+ ` (`+stockChangePercent+`)</div>
			</li>`);
	}
	divScrollDown();
	setInterval('updateInfo()', 60000);
}

function updateInfo(){
	$.getJSON({
		type: 'GET',
		dataType: "json",
		url: 'http://localhost:8080/stocks',
		success: function(data){
			var limit = 3
				for(var i = 0; i < limit; i++ ){
					$('#'+ data[0].symbol).find('#stockPrice').html('$ '+parseFloat(data[i].Ask).toFixed(2));
					$('#'+ data[0].symbol).find('#stockGain').html(data[i].Change+ ' ('+data[i].ChangeinPercent+')');
				}
			console.log("Updated");
		}
			
	});
}

function divScrollDown(){
	var $stocksDiv = $('#stocks');
	$stocksDiv.animate({
		scrollTop: $stocksDiv.get(0).scrollHeight
	}, 5000, function(){
		divScrollUp();
	});
}

function divScrollUp(){
	var $stocksDiv = $('#stocks');
	$stocksDiv.animate({
		scrollTop: 0
	}, 5000, function(){
		divScrollDown();
	});
}