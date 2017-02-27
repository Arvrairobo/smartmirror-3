var options = [
  {"script":"news", "name":"News"},
  {"script":"weather", "name":"Weather"},
  {"script":"stocks", "name":"Stocks"},
  {"script":"today", "name":"Clock and Date"},
  {"script":"welcome", "name":"Welcome Message"},
  {"script":"ootd", "name":"Outfit of the Day"}
];

$(document).ready(function() {
  for (var option in options) {
    $('select').append('<option value="'+ options[option].script +'">'+ options[option].name +'</option>');
  }
  $('select').material_select();
});
