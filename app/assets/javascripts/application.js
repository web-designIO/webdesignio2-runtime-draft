$(function() {
  console.log('fade in');
  $('#alert-space').fadeIn();
  setTimeout(function() {
    $('#alert-space').fadeOut();
  }, 2000);
});
