$(document).ready(function(){
  $( ".products" ).hover(function() {
    $( "#prod" ).toggleClass('hide');
    //alert("1");
  });
  $( ".solutions" ).hover(function() {
    $( "#sol" ).toggleClass('hide');
    //alert("1");
  });
  $( ".partner" ).hover(function() {
    $( "#part" ).toggleClass('hide');
    //alert("1");
  });
  $( ".about" ).hover(function() {
    $( "#about" ).toggleClass('hide');
    //alert("1");
  });
  $('select').formSelect();
$('.sidenav').sidenav();
  $(".dropdown-trigger").dropdown();
  $('.collapsible').collapsible();
});
