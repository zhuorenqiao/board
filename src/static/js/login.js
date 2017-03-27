$(function () {
	"use strict";
	function bindEvents() {
		$(".submit").on("click", function () {
			if (!($("#user").val() === "123" && $("#password").val() === "123")) {
				alert("用户名或密码错误，请重新输入。");
			} else {
				window.location.href = "/";
			}
		});
	}
	function init() {
		bindEvents();
	}
	init();
});
