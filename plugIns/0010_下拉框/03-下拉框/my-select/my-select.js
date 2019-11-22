/*
模板

<div class="my-select">
    <div class="_ipt-box">
        <input readonly type="text" placeholder="请选择"/>
        <i class="icon iconfont iconsanjiaoxia"></i>
    </div>
    <ul class="_option-list">
        <li class="active" data-value="20170424">2017-04-24</li>
        <li data-value="20170425">2017-04-25</li>
        <li data-value="20170426">2017-04-26</li>
    </ul>
</div>

设置默认值
设置input的value为name，设置data-value为value
li中data-value为value

获取选中值
input.data('value')获取value值
input.value获取name
*/

;(function ($, window) {
	var oMySelect = {
		init: function () {
			this.initEvent();
		},

		initEvent: function () {
			var _this = this;

			// 点击文本框切换下拉框的状态
			$(document).on('click', '.my-select > ._ipt-box', function (event) {
				event.stopPropagation();

				var $this = $(this);
				var oSelect = $this.parent();

				// 切换下拉框的状态
				var open = oSelect.hasClass('is-open');
				if (open) {
					_this.close(oSelect);
				} else {
					_this.show(oSelect);
				}

				// 给my-select绑定show与close方法到data上
				if (!oSelect.data('show')) {
					oSelect.data('show', _this.show);
				}
				if (!oSelect.data('close')) {
					oSelect.data('close', _this.close);
				}
			})

			// option点击
			$(document).on('click', '.my-select > ._option-list li', function (event) {
				event.stopPropagation();

				var $this = $(this);
				var oSelect = $this.parent().parent();
				var oIpt = oSelect.find('input');
				var oOption = oSelect.find('li');

				var value = $this.data('value');
				var name = $this.text();

				// 设置选中状态
				oOption.removeClass('active');
				$this.addClass('active');

				// 设置值
				oIpt.val(name);
				oIpt.data('value', value);

				// 隐藏弹窗
				_this.close(oSelect);
			})

			// 点击document隐藏下拉框
			$(document).on('click', function () {
				var oSelect = $('.my-select');
				for (var i = 0; i < oSelect.length; i++) {
					var oItem = oSelect.eq(i);

					if (oItem.hasClass('is-open')) {
						oItem.data('close')(oItem);
					}
				}
			})
		},

		// 显示下拉框
		show: function (oSelect) {
			oSelect.addClass('is-open');

			var oIpt = oSelect.find('input'); // 文本框
			var oOptions = oSelect.find('._option-list'); // 下拉框
			var oOption = oSelect.find('li'); // 所有option
			var oItem = null; // 当前选中的option


			var osH = oOptions.outerHeight(); // 下拉框高度
			var top = 0; // 选中option的滚动高度


			// 设置block好获取元素属性
			oOptions.css({
				display: 'block',
				opacity: 0
			})

			// 根据input的data-value给option添加选中状态active
			var value = oIpt.data('value');
			oOption.removeClass('active');
			for (var i = 0; i < oOption.length; i++) {
				oItem = oOption.eq(i)

				top += oItem.outerHeight();

				if (oItem.data('value') == value) {
					oItem.addClass('active');
					break;
				}

				if (i == oOption.length - 1) {
					top = 0;
				}
			}

			// 根据下拉框计算滚动高度
			if (top) {
				top = top - osH / 2;
				top = top > 0 ? top : 0;
			}

			// 设置滚动高度为0
			oOptions.scrollTop(top);

			// 显示下拉框
			oOptions.animate({
				opacity: 1
			}, 300);
		},

		// 隐藏下拉框
		close: function (oSelect) {
			oSelect.removeClass('is-open');
			oSelect.find('._option-list').fadeOut(300);
		},
	}
	
	oMySelect.init();
})(jQuery, window);