(function (window, document) {
	function Alert() {
		var arg1 = arguments[0],
			arg2 = arguments[1],
			arg3 = arguments[2];

		var ty1 = typeof arg1,
			ty2 = typeof arg2,
			ty3 = typeof arg3;

		var text = '',
			title = '提示',
			okText = '确定',
			onOk = null;

		if (ty1 == 'object') {
			text = arg1.text || text;
			title = arg1.title || title;
			onOk = arg1.onOk || onOk;
			okText = arg1.okText || okText;
		} else {
			text = ty1 == 'string' ? arg1 : text;
			title = ty2 == 'string' ? arg2 : title;
			onOk = ty3 == 'function' ? arg3 : onOk;
		}

		this.text = text;
		this.title = title;
		this.okText = okText;
		this.onOk = onOk;

		this._init();
	}

	Alert.prototype = {
		_init: function () {
			this.oRoot = null;		// 根节点
			this.oContent = null;	// 显示内容
			this.oOk = null;		// 确定按钮

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
			this.oOk.onclick = function () {
				_this.close();
				if (_this.onOk) {
					_this.onOk();
				}
			}
		},

		_initStructure: function () {
			this.oRoot = document.createElement('div');
			this.oRoot.className = 'alert-box _wrapper';
			this.oRoot.innerHTML = `<div class="_content">
					<div class="_header">${this.title}</div>
					<div class="_message"><p>${this.text}</p></div>
					<div class="_footer">
						<button class="_ok-btn">${this.okText}</button>
					</div>
				</div>`;
			this.oContent = this.oRoot.querySelector('._content');
			this.oCancel = this.oRoot.querySelector('._cancel-btn');
			this.oOk = this.oRoot.querySelector('._ok-btn');
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