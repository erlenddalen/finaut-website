$(function() {
  $('.planetary-illustration-object')
    .on('mouseover', function() {
      if($(this).hasClass('active')) {
        return false;
      }
      var index=$(this).index();
      $('.planetary-illustration-object').removeClass('active');
      $(this).addClass('active');
      $('.planetary-description-active').removeClass('planetary-description-active');
      $('.planetary-description').eq(index).addClass('planetary-description-active');
    });
});
