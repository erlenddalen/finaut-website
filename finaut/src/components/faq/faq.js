$(function() {
  $('.js-faq-expand-control')
    .on('click', function() {
      var $container=$(this).closest('li');
      $('.faq-questions-item-expanded').not($container).removeClass('faq-questions-item-expanded');
      $container.toggleClass('faq-questions-item-expanded');
      return false;
    });
});
