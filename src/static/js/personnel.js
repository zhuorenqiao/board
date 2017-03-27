$(function() {


  //事件处理方法
  function bindEvents() {
    $('.footable').on('click','.edit', function() {
      var id = $(this).data('id');
      //获取iframe元素，动态改变src的取值
      $('#J_iframe', window.parent.document).attr('src','baseManagerEdit.html?id='+id);
    });
  }


  //入口函数
  function init() {

    //初始化footable
      $('#ajax-example-1').footable({
        "columns":  $.get('../../mock/columns.json'),
        "rows": $.get('../../mock/rows.json')
      });

    bindEvents();
  }

  init();

});


/*
jQuery(function($){
  $('.table').footable({
    "paging": {
      "enabled": true
    },
    "filtering": {
      "enabled": true
    },
    "sorting": {
      "enabled": true
    },
    "columns": $.get("docs/content/columns.json"),
    "rows": $.get("docs/content/rows.json")
  });
});
*/
