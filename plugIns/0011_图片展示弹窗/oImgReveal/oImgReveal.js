;(function ($, window, document) {

	/**
	 * list -> 图片列表
	 * index -> 下标
	 */
	var oImgReveal = {
		init: function (data) {
			// 参数
			this.data = {
				dom: null, // 整个元素节点

				list: data.list || [], // 图片列表
				index: data.index || 0, // 当前展示的图片下标

				top: 0, // 图片的marginTop
				left: 0, // 图片的marginLeft
				scale: 1, // 图片缩放

				isDown: false, // 是否点击
				startX: 0, // 鼠标点下X位置
				startY: 0, // 鼠标点下Y位置
				endX: 0, // 鼠标抬起X位置
				endY: 0, // 鼠标抬起Y位置
				moveX: 0, // 鼠标移动X轴位置
				moveY: 0, // 鼠标移动Y轴位置

				bodyOverflow: '' // body的overflow
			}

			this.initState();
			this.initEvent();
		},

		initState: function () {
			this.createDom(); // 创建模板到body中

			this.data.dom.fadeIn(300);

		},

		initEvent: function () {
			var _this = this;

			// 点击背景关闭弹窗功能
			// 背景点击
			this.data.dom.on('click', function () {
				_this.close();
			})
			// 图片点击-阻止冒泡
			$('#_imgHandleBox').on('click', 'img', function (event) {
				event.stopPropagation();
			})

			// 向左点击
			this.data.dom.on('click', '._prev', function (event) {
				event.stopPropagation();
				_this.data.index--;
				if (_this.data.index < 0) {
					_this.data.index = _this.data.list.length - 1;
				}

				_this.setImgHtml();
			})

			// 向右点击
			this.data.dom.on('click', '._next', function (event) {
				event.stopPropagation();
				_this.data.index++;
				if (_this.data.index >= _this.data.list.length) {
					_this.data.index = 0;
				}

				_this.setImgHtml();
			})

			// 图片滚动
			$('#_imgHandleBox').on('mousewheel', 'img', function (event) {
				event.stopPropagation();

				if (event.deltaY < 0) {
					_this.data.scale -= 0.1;
					if (_this.data.scale < 0.3) {
						_this.data.scale = 0.3;
					}
				} else if (event.deltaY > 0) {
					_this.data.scale += 0.1;
					if (_this.data.scale > 3) {
						_this.data.scale = 3;
					}
				}

				_this.setImgStyle(); // 设置图片位置，大小样式
			})

			// 图片拖拽
			// 鼠标点下
			$('#_imgHandleBox').on('mousedown', 'img', function (event) {
				// 记录鼠标点下
				_this.data.isDown = true;

				_this.data.startX = event.clientX;
				_this.data.startY = event.clientY;

			})
			// 鼠标移动
			$('body').on('mousemove', function (event) {
				if (_this.data.isDown) {
					_this.data.endX = event.clientX;
					_this.data.endY = event.clientY;

					_this.data.moveX = _this.data.endX - _this.data.startX;
					_this.data.moveY = _this.data.endY - _this.data.startY;

					_this.setImgStyle();
				}
			})
			// 鼠标松开
			$('window, body').on('mouseup', function (event) {
				if (_this.data.isDown) {
					_this.data.isDown = false;

					_this.data.left += _this.data.moveX;
					_this.data.top += _this.data.moveY;

					_this.data.moveX = _this.data.moveY = 0;
				}
			})
			// 禁止图片的默认拖动事件
			document.ondragstart = function (e) {
				return false;
			}
		},

		// 创建模板对象
		createDom: function () {
			var list = this.data.list;
			var index = this.data.index;

			var html = '<div class="_img-reveal-box" id="_imgReveal">' +
			'			    <div class="_container">';
			if (list.length > 1) {
				html += '		<span class="_prev">&lt;</span><span class="_next">&gt;</span>';
			}
			html += '			<div class="_img-box" id="_imgHandleBox">' +
			'			            <img src="' + list[index] + '"/>' +
			'			        </div>' +
			'			    </div>' +
			'			</div>';

			this.data.dom = $(html);
			$('body').append(this.data.dom);
			// 显示图片
			$('#_imgHandleBox img').fadeIn();
		},

		// 设置当前显示的图片
		setImgHtml: function () {
			var html = '<img src="' + this.data.list[this.data.index] + '"/>';
			$('#_imgHandleBox').html(html);
			$('#_imgHandleBox img').fadeIn();

			// 还原图片、鼠标参数
			this.resetParams();
		},

		// 设置图片位置，大小样式
		setImgStyle: function () {
			$('#_imgHandleBox img').css({
				marginTop: (this.data.top + this.data.moveY) + 'px',
				marginLeft: (this.data.left + this.data.moveX) + 'px',
				transform: 'translate(-50%, -50%) scale(' + this.data.scale + ')',
				oTransform: 'translate(-50%, -50%) scale(' + this.data.scale + ')',
				webkitTransform: 'translate(-50%, -50%) scale(' + this.data.scale + ')',
				mozTransform: 'translate(-50%, -50%) scale(' + this.data.scale + ')',
				msTransform: 'translate(-50%, -50%) scale(' + this.data.scale + ')'
			})
		},

		// 还原图片、鼠标参数
		resetParams: function () {
			this.data.top = 0; // 图片的marginTop
			this.data.left = 0; // 图片的marginLeft
			this.data.scale = 1; // 图片缩放

			this.data.isDown = false; // 是否点击
			this.data.startX = 0; // 鼠标点下X位置
			this.data.startY = 0; // 鼠标点下Y位置
			this.data.endX = 0; // 鼠标抬起X位置
			this.data.endY = 0; // 鼠标抬起Y位置
			this.data.moveX = 0; // 鼠标移动X轴位置
			this.data.moveY = 0; // 鼠标移动Y轴位置
		},

		// 显示图片展示弹窗
		show: function (data) {
			this.init(data);

			// 缓存默认状态
			this.data.bodyOverflow = $('body').css('overflow');
			$('body').css('overflow', 'hidden');
		},

		// 关闭图片展示弹窗
		close: function () {
			var _this = this;
			this.data.dom.fadeOut(300, function () {
				$('body').css('overflow', _this.data.bodyOverflow);
				_this.data.dom.remove();
			});
		}
	}

	window.oImgReveal = oImgReveal;
})(jQuery, window, document);