$(document).ready(function($) {

  //事件绑定函数
  function bindEvents() {
    $('.nav-second-level').on('click', '.item-second-link', function(event) {
      event.preventDefault();
      var href = $(this).data('href');
      $('#J_iframe').attr('src',href);
    })
  }


  //菜单管理初始化
  function renderMenuDom() {
    $.ajax({
      url: '../../mock/menu.json',
      type: 'GET',
      dataType: 'json'
    })
    .done(function(data) {
      if(data.status == 1000) {
        $('#side-menu').html(template('menus', data));
        bindEvents();
      }
    })
    .fail(function() {
      alert('数据加载异常！');
    })
  }

  //入口函数
  function init() {
    // MetsiMenu
    $('#side-menu').metisMenu();

    $('#sidebar').slimScroll({
           height: '100%'
       });


    renderMenuDom();

    bindEvents();
  }


  init();

});


