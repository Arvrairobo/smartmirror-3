var options = [
  {"script":"news", "name":"News"},
  {"script":"weather", "name":"Weather"},
  {"script":"stocks", "name":"Stocks"},
  {"script":"today", "name":"Clock and Date"},
  {"script":"welcome", "name":"Welcome Message"},
  {"script":"ootd", "name":"Outfit of the Day"}
];

var config;

function initselect() {
  $('select').material_select();
}

$(document).ready(function() {
  for (var option in options) {
    $('select').append('<option value="'+ options[option].script +'">'+ options[option].name +'</option>');
  }

  $.get('/config', function(data) {
    for (var x=1; x < 9; x++) {
      var widget = data['spots']['spot'+x]['module'];
      $('#spot'+x+' option[value="'+widget+'"]').attr('selected','selected');
    }
    $('#zipcode').val(data['zipCode']);
    $('#newsapi').val(data['newsApiKey']);
    $('#voiceapi').val(data['voiceApiKey']);
    initselect();
  });

  $('#saveconfig').click(function(e) {
    e.preventDefault();

    console.log('config saved');
  });


});
