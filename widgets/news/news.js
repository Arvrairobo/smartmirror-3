// API KEY: 2608f524434e4e2fb24546a02bcf624d

var headlines = [];
var limit = 5;

$.get('/news', function(response){
  $.each(response.articles, function(i){
    headlines[i] = response.articles[i].title;
  });

  addNewsWidget(headlines);
});

function addNewsWidget(headlines) {
  for (var i = 0; i < limit; i++){
    $('#news').append('<div class="news-item">'+headlines[i]+'</div>');
  }
}
