$(function () {

  //事件处理方法
	function bindEvents() {
    //todo something here.
	}

  //初始化表头
	function initTableHead() {
		$.ajax({
			"url": "../../mock/columns.json"
		}).done(function (data) {
			if (data.status === "1000") {
				var datas = data.list;
				var dom = "<tr>";
				for (var i = 0; i < datas.length; i++) {
					dom += "<th>" + datas[i].title + "</th>";
				}
				dom += "</tr>";
				$("#theadDom").html(dom);
			}
		}).fail(function (err) {
			console.log(err);
		});
	}

  //初始化表内容
	function renderTabDom(data) {
		$.ajax({
			"type": "get",
			url: "../../mock/rows.json",
			data: data || {}
		}).done(function (data) {
			if (data.status === "1000") {
				$("#tbodyDom").html(template("rows", data));
				pageInit();
			}
		}).fail(function (err) {
			console.log(err);
		});
	}

	function pageInit() {
		$("#pageLimit").bootstrapPaginator({
			currentPage: 1,
			totalPages: 6,
			size: "normal",
			bootstrapMajorVersion: 3,
			alignment: "right",
			numberOfPages: 5,
			itemTexts: function (type, page, current) {
				switch (type) {
				case "first":
					return "首页";
				case "prev":
					return "上一页";
				case "next":
					return "下一页";
				case "last":
					return "末页";
				case "page":
					return page;
				}
			}
		});
	}

  //入口函数
	function init() {

		initTableHead();

		renderTabDom();

    //分页初始化


		bindEvents();
	}

	init();

});
