/**
 * @下拉框构造函数
 * 参数：el -> 选择器 必须
 		list -> 列表数据 必须
 		maxH -> 列表最大高度 默认200
 		valKey -> 值得key 默认val
 		txtKey -> 文本key 默认val
 		val -> 当前值默认值,
 		itemClick -> 行点击回调函数
 		btnClick -> 确定按钮点击
 		inputChange($(input)) -> 文本框改变
 	方法：show -> 显示列表
 		close -> 关闭列表
 		setList -> 设置列表数据与html
 		setVal -> 设置当前值
 		getVal -> 获取当前值
 */
(function (window, document) {
	var MyDropDownBox = function (o) {
		this.init(o);
	}
	MyDropDownBox.prototype = {
		init: function (o) {
			if (!o.el) {
				return;
			}
			this.el = o.el; // 选择器
			this.list = o.list || []; // 数据列表
			this.maxH = o.maxH || 200; // 最大高度
			// 文本域值得key
			this.valKey = o.valKey || 'val';
			this.txtKey = o.txtKey || 'txt';
			this.val = o.val || ''; // 当前值
			this.txt = ''; // 文本框内容
			this.itemClick = o.itemClick || null; // 行点击回调函数
			this.btnClick = o.btnClick || null; // 按钮点击回调
			this.inputChange = o.inputChange || null; // 文本框改变

			// 添加下拉框的对象
			this.dom = $(this.el);
			this.isShow = false; // 下拉框是否显示

			this.setHtml(); // 设置html

			this.initState();
			this.initEvent();
		},

		initState: function () {
			this.setList(this.list); // 设置列表
			this.setVal(this.val); // 设置默认值
		},

		initEvent: function () {
			var _this = this;

			// 页面点击关闭弹窗
			$('html').on('click', function () {
				_this.close(); // 关闭弹窗
			})

			// 阻止冒泡
			this.dom.on('click', function (event) {
				event.stopPropagation();
			})

			// 输入框点击
			this.dom.find('.my-drop-down-ipt').on('click', function () {
				var oThis = this;
				$('.my-drop-down-ipt').each(function () {
					if (oThis != this) {
						$(this)[0].close();
					}
				})

				if (!_this.isShow) {
					_this.show();
					return false;
				} else {
					_this.close();
				}
			})
			this.dom.find('.my-drop-down-ipt')[0].close = this.close.bind(this);

			// 列表项点击
			this.dom.find('.drop-down-list').on('click', 'li', function () {
				var val = $(this).data('val');

				_this.close(); // 关闭弹窗

				if (!$(this).hasClass('no-data')) {
					_this.setVal(val); // 设置值
					// 调用回调
					if (_this.itemClick) {
						_this.itemClick();
					}
				}

				return false;
			})

			// 添加按钮点击
			this.dom.find('.add-btn').on('click', function () {
				var txt = _this.dom.find('.add-ipt').val();
				
				// 设置文本框
				_this.setInput('', txt);

				_this.close();

				if (_this.btnClick) {
					_this.btnClick();
				}
			})
		},

		// 设置html
		setHtml: function () {
			var html = '<div class="my-drop-down-box">' +
			'				<input class="my-drop-down-ipt" type="text" readonly>' +
			'				<div class="drop-down-wrapper">' +
			'					<ul class="drop-down-list" style="max-height: ' + this.maxH + 'px">' +
			'						<li class="no-data">当前列表为空</li>' +
			'					</ul>' +
			'					<div class="input-box">' +
			'						<input class="add-ipt" type="text">' +
			'						<button class="add-btn">确定</button>' +
			'					</div>' +
			'				</div>' +
			'			</div>';

			this.dom.html(html);
		},

		// 设置列表数据
		setList: function (list) {
			this.list =  list || [];

			var html = '';
			for (var i = 0; i < this.list.length; i++) {
				html += '<li data-val="' + this.list[i][this.valKey] + '">' + this.list[i][this.txtKey]  + '</li>';
			}
			if (this.list.length == 0) {
				html = '<li class="no-data">当前列表为空</li>';
			}

			this.dom.find('.drop-down-list').html(html);
		},

		// 设置当前值
		setVal: function (val) {
			for (var i = 0; i < this.list.length; i++) {
				if (val == this.list[i][this.valKey]) {
					// 设置输入框文本
					var txt = this.list[i][this.txtKey];

					// 设置文本框
					this.setInput(val, txt);

					// 设置列表选中状态
					this.dom.find('li').removeClass('is-active');
					this.dom.find('li').eq(i).addClass('is-active');

					break;
				}
			}
			if (i >= this.list.length) {
				this.setInput(val, '');
			}
		},

		// 设置文本框
		setInput: function (val, txt) {
			this.val = val;
			this.txt = txt;
			this.dom.find('.my-drop-down-ipt').val(txt);

			if (this.inputChange) {
				this.inputChange(this.dom.find('.my-drop-down-ipt'));
			}
		},

		// 获取当前值
		getVal: function () {
			return this.val;
		},

		// 设置默认状态
		setDefault: function () {
			this.dom.find('.add-ipt').val('');
		},

		// 显示下拉框
		show: function () {
			if (this.isShow) {
				return;
			}
			this.isShow = true; // 下拉框显示状态设置为开启
			this.setDefault(); // 设置默认状态
			this.dom.find('.my-drop-down-ipt').addClass('isShow');
			this.dom.find('.drop-down-wrapper').fadeIn(300);
		},

		// 关闭下拉框
		close: function () {
			this.isShow = false; // 下拉框显示状态设置为关闭
			this.dom.find('.my-drop-down-ipt').removeClass('isShow');
			this.dom.find('.drop-down-wrapper').fadeOut(300);
		}
	}

	window.MyDropDownBox = MyDropDownBox;
})(window, document);