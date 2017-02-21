// API KEY: 2608f524434e4e2fb24546a02bcf624d

var headlines = [];
var limit = 5;

$.get('/news', function(response){
  $.each(response.articles, function(i){
    headlines[i] = response.articles[i];
  });

  addNewsWidget(headlines);
});

function addNewsWidget(headlines) {
  var i = 0;
  $('#news').append('<div class="news-title"">Lastest in <strong>Google News<strong></div>');
  $('#news').append('<div class="news-item" style="display:none;">'+headlines[i].title+'</div>');
  $('#news').append('<div class="news-desc" style="display:none;">'+headlines[i].description+'</div>');
  $('#news .news-item').fadeIn(250).delay(4500).fadeOut(250);
  if (headlines[i].description !== 'null') {
    $('#news .news-desc').fadeIn(250).delay(4500).fadeOut(250);
  }
  setInterval(function() {
    if (i < headlines.length - 1) { i++; } else { i = 0; }
    $('#news .news-item').html('<div class="news-item" style="display:none;">'+headlines[i].title+'</div>');
    if (headlines[i].description !== null) {
      $('#news .news-desc').html('<div class="news-desc" style="display:none;">'+headlines[i].description+'</div>');
      $('#news .news-desc').fadeIn(250).delay(4500).fadeOut(250);
    }
    $('#news .news-item').fadeIn(250).delay(4500).fadeOut(250);


  }, 5000);
}
