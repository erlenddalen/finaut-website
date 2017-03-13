$(function() {
  $('.js-process-navigation-link')
    .on('click', function() {
      $(this).closest('.process-navigation').toggleClass('process-navigation-expanded');
      $('.process-navigation-link-active').removeClass('process-navigation-link-active');
      $(this).addClass('process-navigation-link-active');
      return false;
    });
  $('.js-process-timeline-left')
    .on('click', function() {
      console.log('click');
      $('.process-timeline, .process-grid')
        .each(function() {
          var offset    = $(this).data('offset')?$(this).data('offset'):0,
              maxOffset = $(this).children().length;
          if(offset > 0) {
            offset--;
          }
          $(this).data('offset', offset);
          $(this).css({transform: 'translate(-'+(offset*100)+'%, 0)'});
        });
      return false;
    });
  $('.js-process-timeline-right')
    .on('click', function() {
      $('.process-timeline, .process-grid')
        .each(function() {
          var offset    = $(this).data('offset')?$(this).data('offset'):0,
              maxOffset = $(this).children().length;
          if(offset < maxOffset-1) {
            offset++;
          }
          $(this).data('offset', offset);
          $(this).css({transform: 'translate(-'+(offset*100)+'%, 0)'});
        });
      return false;
    });

  $(window)
    .on('resize', function() {
      var $target=$('.process-timeline, .process-grid');
      $target.css({transform: 'translate(0, 0)'});
    })
});
