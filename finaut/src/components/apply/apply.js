$(function() {
  $('.order-form-item')
    .on('click', function() {
      $(this).toggleClass('order-form-item-selected');
      return false;
    });
})
