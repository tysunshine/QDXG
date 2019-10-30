;(function ($, window, document) {
	/**
	 * (src) -> 图片路径
	 * (option) -> option.src图片路径，option.type图片尺寸类型
	 */
	function CenterImg () {
		this.data = {
			$dom: null, // 图片盒子
			src: '', // 居中显示的图片
			type: 'max', // max最大值是100%，min最小值是100%
		}
	}

	CenterImg.prototype = {
		init: function ($dom, options) {

			this.data.$dom = $dom;

			for (var key in options) {
				if (key in this.data) {
					this.data[key] = options[key];
				}
			}

			this.appendImg(); // 插入图片
		},

		// 插入图片
		appendImg: function () {
			var _this = this;

			var innerWidth = this.data.$dom.innerWidth(), innerHeight = this.data.$dom.innerHeight();

			var oImg = $('<img src="' + this.data.src + '"/>');

			oImg.css({
				position: 'absolute',
				zIndex: 1,
				top: 0,
				left: 0,
				visibility: 'hidden'
			})



			$('body').append(oImg);

			oImg.on('load', function () {
				var $this = $(this);

				// 设置图片的宽高
				var width = $this.width(), height = $this.height();
				// max最大值是100%
				if (_this.data.type == 'max') {
					oImg.css({
						maxWidth: innerWidth,
						maxHeight: innerHeight
					})
				// min最小值是100%
				} else {
					// 图片的高设为100
					if (width / height > innerWidth / innerHeight) {
						oImg.css({
							height: '100%'
						})
					// 图片宽设为100%
					} else {
						oImg.css({
							width: '100%'
						})
					}
				}


				_this.data.$dom.empty().append($this);

				var top = 0, left = 0;

				// max最大值是100%
				if (innerWidth == $this.width()) {
					top = (innerHeight - $this.height()) / 2;
				} else {
					left = (innerWidth - $this.width()) / 2;
				}
					
				$this.css({
					top: top,
					left: left,
					visibility: 'visible'
				})
			})
		}
	}

	$.fn.centerImg = function () {
		var options = {}, args = arguments;

		if (typeof args[0] == 'string') {
			options = {
				src: args[0]
			}
		} else {
			options = args[0];
		}

		this.each(function () {
			var $this = $(this);
			var obj = $this.data('centerImg');
			if (!obj) {
				obj = new CenterImg();
				$.data(this, 'centerImg', obj);
			}

			obj.init($this, options);
		})
    };
})(jQuery, window, document);