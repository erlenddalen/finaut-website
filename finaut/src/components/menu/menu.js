$(function() {
  $('.js-menu-expand-control')
    .on('click', function() {
      $('.menu').removeClass('menu-collapsed');
      return false;
    });
  $('.js-menu-collapse-control')
    .on('click', function() {
      $('.menu').addClass('menu-collapsed');
      return false;
    });
});
