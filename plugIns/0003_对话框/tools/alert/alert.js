(function (window, document) {

	function Alert() {
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

	Alert.prototype = {
		_init: function (msg, title, config) {
			this.msg = msg;
			this.title = title;
			this.config = config;

			this.oRoot = null;		// 根节点
			this.oContent = null;	// 显示内容
			this.oConfrim = null;	// 确定按钮

			this._initParam();
			this._initStructure();
			this._initEvent();
			this.show();
		},

		_initEvent: function () {
			var _this = this;

			// 背景点击
			this.oRoot.onclick = function () {
				_this.close();
			}

			// 内容点击
			this.oContent.onclick = function (evt) {
				var e = evt || window.event;
				evt ? e.stopPropagation() : e.cancelBubble = true;
			}

			// 确定按钮点击
			this.oConfirm.onclick = function () {
				if (_this.config.confirmFn) {
					_this.config.confirmFn.apply(_this);
				} else {
					_this.close();
				}
			}
		},

		_initParam: function () {
			this.confirmText = this.config.confirmText || '确定';
		},

		_initStructure: function () {
			this.oRoot = document.createElement('div');
			this.oRoot.className = 'alert-box _wrapper';
			this.oRoot.innerHTML = `<div class="_content">
					<div class="_header">${this.title}</div>
					<div class="_message"><p>${this.msg}</p></div>
					<div class="_footer">
						<button class="_confirm-btn">${this.confirmText}</button>
					</div>
				</div>`;
			this.oContent = this.oRoot.querySelector('._content');
			this.oCancel = this.oRoot.querySelector('._cancel-btn');
			this.oConfirm = this.oRoot.querySelector('._confirm-btn');
			document.body.appendChild(this.oRoot);
		},

		show: function () {
			var _this = this;
			new Delay(function () {
				tools.setStyle(_this.oRoot, {
					display: 'block'
				})
			}).then(function () {
				tools.addClass(_this.oRoot, 'is-show');
			}).do();
		},

		close: function () {
			var _this = this;
			new Delay(function () {
				tools.delClass(_this.oRoot, 'is-show');
			}).then(300, function () {
				document.body.removeChild(_this.oRoot);
			}).do();
		}
	}


	window.Alert = Alert;
})(window, document);