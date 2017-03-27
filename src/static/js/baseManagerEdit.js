$(function () {


  //初始化变量
  var _id = ($("#J_iframe", window.parent.document).eq(0).attr("src")).split("?id=")[1];


  //入口函数
  function init() {

    console.log(_id);

    //编辑器初始化
    $(".summernote").summernote({
      height: 300,
      lang: "zh-CN",
      placeholder: "write here...",
      dialogsInBody: true,
      disableDragAndDrop: true,
      dialogsFade: true,  //遮罩层添加淡入效果
      callbacks: {
        onInit: function () {
          console.log("Summernote is launched");
        },
        onEnter: function () {
          console.log("Enter/Return key pressed");
        },
        onFocus: function () {
          console.log("Editable area is focused");
        },
        onBlur: function () {
          console.log("Editable area loses focus");
        },
        onKeyup: function (e) {
          console.log("Key is released:", e.keyCode);
        },
        onKeydown: function (e) {
          console.log("Key is downed:", e.keyCode);
        },
        onPaste: function (e) {
          console.log("Called event paste");
        }
      }
    });


    //日历初始化
    $(".input-group.date").datepicker({
      todayBtn: "linked",
      keyboardNavigation: false,
      forceParse: false,
      calendarWeeks: true,
      autoclose: true
    });


  }

  init();

});
