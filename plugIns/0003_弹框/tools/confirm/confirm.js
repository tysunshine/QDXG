(function (window, document) {
	function Confirm () {
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

			// 取消按钮点击
			this.oCancel.onclick = function () {
				_this.close();
				if (_this.onCancel) {
					_this.onCancel();
				}
			}
		},

		_initStructure: function () {
			this.oRoot = document.createElement('div');
			this.oRoot.className = 'confirm-box _wrapper';
			this.oRoot.innerHTML = `<div class="_content">
					<div class="_header">${this.title}</div>
					<div class="_message"><p>${this.text}</p></div>
					<div class="_footer">
						<button class="_cancel-btn">${this.cancelText}</button>
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


	window.Confirm = Confirm;
})(window, document);