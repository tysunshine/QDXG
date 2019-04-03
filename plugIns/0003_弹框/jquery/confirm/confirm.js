(function (window, document) {

	function Confirm() {
		var arg1 = arguments[0],
			arg2 = arguments[1],
			arg3 = arguments[2],
			arg4 = arguments[3];

		var ty1 = typeof arg1,
			ty2 = typeof arg2,
			ty3 = typeof arg3,
			ty4 = typeof arg4;

		var text = '',
			title = '提示',
			okText = '确定',
			cancelText = '取消',
			onOk = null,
			onCancel = null;

		if (ty1 == 'object') {
			text = arg1.text || text;
			title = arg1.title || title;
			okText = arg1.okText || okText;
			cancelText = arg1.cancelText || cancelText;
			onOk = typeof arg1.onOk == 'function' ? arg1.onOk : null;
			onCancel = typeof arg1.onCancel == 'function' ? arg1.onCancel : null;
		} else {
			text = ty1 == 'string' ? arg1 : text;
			title = ty2 == 'string' ? arg2 : title;
			onOk = ty3 == 'function' ? arg3 : onOk;
			onCancel = ty4 == 'function' ? arg4 : onCancel;
		}

		this.text = text;
		this.title = title;
		this.okText = okText;
		this.cancelText = cancelText;
		this.onOk = onOk;
		this.onCancel = onCancel;

		this._init();
	}

	Confirm.prototype = {
		_init: function () {
			this.oRoot = null;		// 根节点
			this.oContent = null;	// 显示内容
			this.oOk = null;		// 确定按钮
			this.oCancel = null;	// 取消按钮

			this._initStructure();
			this._initEvent();
			this.show();
		},

		_initEvent: function () {
			var _this = this;

			// 背景点击
			this.oRoot.on('click', function () {
				_this.close();
			})

			// 内容点击
			this.oContent.on('click', function (evt) {
				evt.stopPropagation();
			})

			// 确定按钮点击
			this.oOk.on('click', function () {
				_this.close();
				if (_this.onOk) {
					_this.onOk();
				}
			})

			// 取消按钮点击
			this.oCancel.on('click', function () {
				_this.close();
				if (_this.onCancel) {
					_this.onCancel();
				}
			})
		},

		_initStructure: function () {
			this.oRoot = $(`<div class="confirm-box _wrapper">
						<div class="_content">
						<div class="_header">${this.title}</div>
						<div class="_message"><p>${this.text}</p></div>
						<div class="_footer">
							<button class="_cancel-btn">${this.cancelText}</button>
							<button class="_ok-btn">${this.okText}</button>
						</div>
					</div>
				</div>`);
			this.oContent = this.oRoot.find('._content');
			this.oCancel = this.oRoot.find('._cancel-btn');
			this.oOk = this.oRoot.find('._ok-btn');
			$('body').append(this.oRoot);
		},

		show: function () {
			var _this = this;
			new Delay(function () {
				_this.oRoot.css({
					display: 'block'
				})
			}).then(function () {
				_this.oRoot.addClass('is-show');
			}).do();
		},

		close: function () {
			var _this = this;
			new Delay(function () {
				_this.oRoot.removeClass('is-show');
			}).then(300, function () {
				_this.oRoot.remove();
			}).do();
		}
	}

	window.Confirm = Confirm;
})(window, document);