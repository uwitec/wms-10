var basepath = $("#basepath").val();

var newurl=basepath + '/outstock/ListOutStockBiLL?flag=4';
$(function() {
//交接任务
	init(newurl);

});
// 初始化方法
function init(url) {
	// 日期配置对象
	var configObject = {
		language: 'cn',
		startOfWeek: 'monday',
		separator: ' 至 ',
		format: 'YYYY-MM-DD HH:mm',
		autoClose: false,
		time: {
			enabled: true
		}
	};
	$('#datetimeRange').dateRangePicker(configObject).bind('datepicker-change', function (event, obj) {
		$("#starTime").val(obj.date1.format("yyyy-MM-dd hh:mm"));
		$("#endTime").val(obj.date2.format("yyyy-MM-dd hh:mm"));
	});
	var queryParams = {};
	$('#finishListSearch').find('*').each(function() {
		queryParams[$(this).attr('name')] = $(this).val();
	});
	var pageNo = 1;
	var rows = 10;
	if (queryParams.pageNo && queryParams.pageNo != '') {
		pageNo = queryParams.pageNo;
		rows = queryParams.rows;
	}
	$('#finish_list').datagrid({
		width : 'auto',
		height : 'auto',
		nowrap : true,// True 数据将在一行显示
		striped : true,// True 就把行条纹化
		collapsible : false,// True 可折叠
		url : url,
		remoteSort : true, // 定义是否从服务器给数据排序
		singleSelect : false, // True 只能选择一行
		fit : true,
		toolbar : '#box',
		scrollbarSize : 0,
		fitColumns : true,
		frozenColumns : [ [ {
			field : 'ck',
			checkbox : true
		}, ] ],
		columns : [ [ {
			field : 'id',
			titel : '出库单id',
			hidden : true
		}, {
			field : 'orderNo',
			title : '订单号',
			width : 100,
			formatter : function(value, row, index) {
				return '<a style="color:#1556e8;" target="_blank" onclick="getInstockBiLLInfo(' + row.id + ')" class="ellipsis" >' + value + '</a>';
			},
			align : 'center'
		}, {
			field : 'orderdate',
			title : '订单日期',
			width : 120,
			align : 'center',
			formatter : formatDatebox
		}, {
			field : 'wareName',
			title : '发货仓库',
			width : 100,
			align : 'center'
		}, {
			field : 'goodsAmount',
			title : '件数',
			width : 60,
			align : 'center'
		}, {
			field : 'goodsSum',
			title : '金额',
			width : 60,
			align : 'center'
		}, {
			field : 'parcelWeight',
			title : '包装重量(KG)',
			width : 60,
			align : 'center',
			formatter : function(value, row, index) {
				return parseFloat(value).toFixed(2);
			}
		}, {
			field : 'logisComName',
			title : '承运商',
			width : 100,
			align : 'center'
		}, {
			field : 'logisticsNo',
			title : '运单号',
			width : 100,
			align : 'center'
		},  {
			field : 'status',
			title : '交接状态',
			width : 100,
			align : 'center',
			formatter : function(val, row, index) {
				if (val == "12104") {
					return "已交接";
				}else{
					return "未交接";
				}
			}
		}] ],
		pagination : true,// 显示分页栏。
		rownumbers : true,// 显示行号的列。
		pageSize : rows,
		pageNumber:pageNo,
		queryParams: queryParams,
		pageList : [ 10, 20, 30, 40 ],
	});

}

// 根据订单号获取意向单详情
function getInstockBiLLInfo(a) {
	var l = (screen.availWidth - 900) / 2;
	var t = (screen.availHeight - 550) / 2;
	window.open(basepath + "/outstock/OutstockBiLLInfo?Id=" + a, "", "height=550, width=900, top=" + t + ",left=" + l + ",toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no");

}

// 时间格式化
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};
function formatDatebox(value) {
	if (value == null || value == '') {
		return '';
	}
	var dt;
	if (value instanceof Date) {
		dt = value;
	} else {
		dt = new Date(value);
	}

	return dt.format("yyyy-MM-dd hh:mm:ss"); // 扩展的Date的format方法(上述插件实现)
};
//搜索事件
function finishListSearchBox(){
	init(newurl);
}

//重置按钮
function formReset() {
	location.reload();
}