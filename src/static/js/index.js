$(document).ready(function ($) {

  //事件绑定函数
	function bindEvents() {
		$(".nav-second-level").on("click", ".item-second-link", function () {
			var href = $(this).attr("href");
			$("#J_iframe").attr("src", href);
			return false;
		});
	}

  //菜单管理初始化
	function renderMenuDom() {
		$.ajax({
			url: "../../mock/menu.json",
			type: "GET",
			dataType: "json"
		})
      .done(function (data) {
	if (data.status == "1000") {

		$("#side-menu").html(template("menus", data));
		$("#side-menu").metisMenu();
		bindEvents();

	}
})
      .fail(function () {
	alert("数据加载异常！");
});
	}

  //入口函数
	function init() {
		renderMenuDom();
	}

	init();

});


