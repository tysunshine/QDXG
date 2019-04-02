(function (window, document) {

	function Confirm() {
		var arg1 = arguments[0];
		var arg2 = arguments[1];
		var arg3 = arguments[2];

		var ty1 = typeof arg1;
		var ty2 = typeof arg2;
		var ty3 = typeof arg3;

		if (!arg1) {
			return;
		}

		if (ty2 == 'object') {
			arg3 = arg2;
		}

		if (ty2 != 'object' && ty3 != 'object') {
			arg3 = {}
		}

		if (ty2 != 'string') {
			arg2 = '提示';
		}

		this._init(arg1, arg2, arg3);
	}

	Confirm.prototype = {
		_init: function (msg, title, config) {
			this.msg = msg;
			this.title = title;
			this.config = config;

			this.oRoot = null;		// 根节点
			this.oContent = null;	// 显示内容
			this.oOk = null;		// 确定按钮
			this.oCancel = null;	// 取消按钮

			this._initParam();
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
				if (_this.config.onOk) {
					_this.config.onOk.apply(_this);
				} else {
					_this.close();
				}
			})

			// 取消按钮点击
			this.oCancel.on('click', function () {
				if (_this.config.onCancel) {
					_this.config.onCancel.apply(_this);
				} else {
					_this.close();
				}
			})
		},

		_initParam: function () {
			this.okText = this.config.okText || '确定';
			this.cancelText = this.config.cancelText || '取消';
		},

		_initStructure: function () {
			this.oRoot = $(`<div class="confirm-box _wrapper">
						<div class="_content">
						<div class="_header">${this.title}</div>
						<div class="_message"><p>${this.msg}</p></div>
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