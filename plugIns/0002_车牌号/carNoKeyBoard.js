(function (window, document) {

	var oKeyBoard = {
		init: function (o) {

			this.areas = [];		// 地区
			this.keyNums = [];		// 号码

			this.idx = -1;
			this.type = 0;			// 键盘类型0隐藏，1地区，2号码

			this._initParams(o);
			this._initStructure();

			this._initEvent();
		},

		_initEvent: function () {
			var _this = this;

			this.oUl.on('click', function (evt) {
				var tag = evt.target;
				if (tag.tagName.toLowerCase() == 'span') {

					var val = $(tag).text();

					if ($(tag).hasClass('is-disabled')) {
						return false;
					}

					if (_this.keyClick) {
						_this.keyClick(val == '删' ? -1 : val);
					}
				}
			})

			this.oOkBtn.on('click', function () {
				_this.hide();
			})

		},

		// 初始化参数
		_initParams: function (o) {
			this.areas = ["冀","豫","云","辽","黑","湘","皖","鲁","苏","浙",
			"赣","鄂","桂","甘","晋","蒙","陕","吉","闽","贵",
			"粤","青","藏","川","宁","琼","渝","津","沪","新",
			"京"];

            this.keyNums = [1,2,3,4,5,6,7,8,9,0,
            "A","B","C","D","E","F","G","H","I","J",
            "K","L","M","N","O","P","Q","R","S","T",
            "U","V","W","X","Y","Z"];

            // 禁止项
            this.aBan = [
            	[],
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
                ['O'],
                ['O'],
                ['O'],
                ['O'],
                ['O'],
                []
            ]

            this.keyClick = o.keyClick || null;
		},

		// 初始化结构
		_initStructure: function () {
			this.oKeyBoardBox = $(`<div class="keyboard-box">
				<div class="header">
					<span class="ok-btn">确定</span>
				</div>
				<div class="content">
					<ul></ul>
				</div>
			</div>`);
			this.oOkBtn = this.oKeyBoardBox.find('.ok-btn');
			this.oUl = this.oKeyBoardBox.find('ul');
			
			$("body").append(this.oKeyBoardBox);
		},

		_setKeyType: function () {
			var html = '';
			for (var i = 0; i < 39; i++) {
				var arr = this.idx == 0 ? this.areas : this.keyNums;

				html += '<li>';
				html += arr.length > i ? ('<span' + (this.aBan[this.idx].indexOf(arr[i]) == -1 ? '' : ' class="is-disabled"') + '>' + arr[i] + '</span>') : '';
				html += '</li>';
			}
			html += '<li><span>删</span></li>';
			this.oUl.html(html);
		},

		show: function (idx) {
			var isShow = this.idx == -1 ? false : true;
			this.idx = idx > 0 ? idx : 0;
			this._setKeyType();

			if (!isShow) {
				this.oKeyBoardBox.css({
					transform: 'translateY(0)',
					opacity: 1
				});
			}
		},

		hide: function () {
			if (this.idx != -1) {
				this.type = -1;
				this.oKeyBoardBox.css({
					transform: 'translateY(100%)',
					opacity: 0
				});
			}
		}
	}


	window.carNoKeyBoard = oKeyBoard;
})(window, document);