(function (window, document) {

	function Dialog(o) {
		this._init(o);
	}

	Dialog.prototype = {
		_init: function (o) {
			if (!o || !o.el) {
				return;
			}

			this.oDialog = $(o.el);

			this.oContent = null;


			this._initParam(o);
			this._initStructure();
			this._initEvent();
		},

		_initEvent: function () {
			var _this = this;

			this.oDialog.on('click', function () {
				_this.hide();
			})

			this.oMain.on('click', function (evt) {
				evt.stopPropagation();
			})

			this.oCancelBtn.on('click', function () {
				if (!_this.cancelClick) {
					_this.hide();
				} else {
					_this.cancelClick();
				}
			})

			this.oOkBtn.on('click', function () {
				if (!_this.okClick) {
					_this.hide();
				} else {
					_this.okClick();
				}
			})
		},

		_initParam: function (o) {
			this.title = o.title || '这是标题'
			this.cancelText = o.cancelText || '取消'
			this.okText = o.okText || '确定'

			this.oContent = this.oDialog.html();

			this.cancelClick = o.cancleClick || null;
			this.okClick = o.okClick || null;
		},

		_initStructure: function () {
			this.oMain = $(`<div class="_main">
					<div class="_header">${this.title}</div>
					<div class="_content">${this.oContent}</div>
					<div class="_footer">
						<button class="_btn _cancle-btn">${this.cancelText}</button>
						<button class="_btn _ok-btn">${this.okText}</button>
					</div>
				</div>`)
			this.oCancelBtn = this.oMain.find('._cancle-btn');
			this.oOkBtn = this.oMain.find('._ok-btn');
			this.oDialog.html(this.oMain);
		},

		show: function () {
			this.oDialog.css({
				display: 'block'
			})
			this.oDialog.animate({
				opacity: 1
			}, 300);
		},

		hide: function () {
			var _this = this;
			this.oDialog.animate({
				opacity: 0
			}, 300, function () {
				_this.oDialog.css({
					display: 'none'
				})
			})
		}
	}


	window.Dialog = Dialog;
})(window, document);