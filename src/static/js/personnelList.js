$(function () {

	var _params = {};
	var detailName = $("#infos").data("detailpage");

  //事件处理方法
	function bindEvents() {

    //新增按钮
		$("#newBtn").on("click", function () {
			location.href= detailName +".html?action=new";
		});


		$("#table").on("click", ".view", function () {

			location.href= detailName +".html?id="+$(this).data("id")+"&action=view";
		});

		$("#table").on("click", ".del", function () {
      //询问框
			layer.confirm("确定要删除吗？", {
				btn: ["确定","取消"] //按钮
			}, function(){
				layer.msg("删除成功", {icon: 1});
			});
		});

    //点击查询列表事件
		$(".ibox-content").on("click", "#search", function () {
			_params.product_name = $("#product_name").val();
			_params.price = $("#price").val();
			_params.quantity = $("#quantity").val();
			_params.status = $("#status").val();
			_params.page = {
				pageNo: 1,
				pageSize: 10
			};

			console.log("开始查询....");
			console.log(_params);
			renderTabDom(_params);
			console.log("结束查询....");
		});
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

  //分页组件初始化
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

		bindEvents();
	}

	init();

});
