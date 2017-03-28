$(function () {

  //日历初始化
  /*		$(".input-group.date").datepicker({
   todayBtn: "linked",
   keyboardNavigation: false,
   forceParse: false,
   calendarWeeks: true,
   autoclose: true
   });*/

  //编辑的时候需要的data数据
	var _params = {};
	var _data = {};

  //js获取url中的中文参数
	function getQueryString(key) {
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	}

  //创建新的列表
	function createDom() {
		$("#formContent").html(template("detailInfoNew", {}));
		summerNoteInit();
	}

  //查询列表详情
	function queryDom(params) {
		$.ajax({
			"url": "../../mock/managerDetail.json",
			data: params || {}
		}).done(function (data) {
			if (data.status === "1000") {
				_data = data;
				$("#formContent").html(template("detailInfo", data));
			}
		}).fail(function (err) {
			console.log(err);
		});
	}

  //保存方法
	function saveDom(params) {
		$("#managerDetailForm").validate({
			"rules": {
				"productName": {
					"required": true
				},
				"price": {
					"required": true,
					"digits": true
				}
			},
			messages: {
				"productName": {
					"required": "请输入产品名称"
				},
				"price": {
					"required": "请输入价格",
					"digits": "必须是数字"
				}
			}
		});

		if ($("#managerDetailForm").valid()) {
			$.ajax({
				"url": "../../mock/success.json",
				data: params || {}
			}).done(function (data) {
				if (data.status === "1000") {
					layer.alert("操作成功", {
						icon: 1,
						closeBtn: 0
					}, function () {
						$("#editor").attr("disabled", false);
						$(this).hide();
						window.location.href="personnelList.html";
					});
				}
			}).fail(function (err) {
				console.log(err);
			});
		}

	}


  //事件绑定
	function bindEvent() {
    //编辑操作
		$("#editor").on("click", function () {
			console.log(_data);
			$("#formContent").html(template("detailInfoEditor", _data));
			summerNoteInit();
			$(this).attr("disabled", true);
			$("#save").show();
		});

    //保存操作
		$("#save").on("click", function () {
			_params.productName = $.trim($("#productName").val());
			_params.price = $.trim($("#price").val());
			_params.telphone = $.trim($("#telphone").val());
			_params.desc = $("#desc").val();
			_params.tips = $("#tips").val();
			_params.address = $.trim($("#address").val());
			_params.telphone = $.trim($("#telphone").val());

			saveDom(_params);

		});
	}

  //编辑器初始化
	function summerNoteInit() {
		$(".summernote").summernote({
			height: 300,
			lang: "zh-CN",
			placeholder: "请输入内容",
			dialogsInBody: true,
			disableDragAndDrop: true,
			dialogsFade: true,  //遮罩层添加淡入效果
			callbacks: {
				onInit: function () {
					console.log("Summernote is launched");
				}
			}
		});
	}


  //入口函数
	function init() {
    /*
     * 新增，修改，保存
     * 判定如果url上参数有id值并且action=view则为查询列表详情状态；
     * 判定如果url上参数为action=new；
     *
     * */
		if (getQueryString("id") && getQueryString("action") === "view") {
			queryDom(); //查询列表
			$("#save").hide();
		} else if (getQueryString("action") === "new") {
			createDom(); //新建列表
			$("#editor").hide();
		} else {
			location.href = "welcome.html";
		}

		bindEvent(); //包含修改和保存的事件
	}

  //执行开始
	init();

});
