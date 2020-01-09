;(function (window, document) {

	var oDefault = {
		id: '',
		images: [],
		imgIdx: 0, // 当前图片的下标
		width: 300, // 图片宽度
		height: 150, // 图片高度
		isAbs: false, // 图片是否绝对定位
		success: null, // 成功回调
		error: null, // 失败回调
	}

	// 缺失块参数
	var mb = {
		width: 46,
		height: 50,
		radius: 10
	}

	var slideVerify = {
		id: '',				// id
		width: 0,			// 图片宽度
		height: 0,			// 图片高度
		images: [],			// 图片列表
		imgIdx: 0,			// 当前图片的下标 
		isAbs: false,		// 图片是否绝对定位
		pos: {x: 0, y: 0},  // 缺失块定位

		mb: null, 			// 缺失块参数

		drag: {
			width: 0,		// 拖动按钮宽度
			startX: 0,		// 开始点相对于屏幕的X坐标
			endX: 0,		// 结束点相对于屏幕的X坐标
			moveX: 0,		// 移动的距离
			down: false,	// 鼠标是否按下
			dragged: false,	// 该图片是否已经拖动过
		},

		init: function (param) {
			if (!param.id) {
				return;
			}
			if (param.images.length == 0) {
				return;
			}

			this.setParam(param); // 设置默认参数，默认值
			this.setHtml(); // 设置html

			this.setCanvas(); // 设置canvas
		
			this.initEvent(); // 初始化事件
		},

		// @初始化事件
		initEvent: function () {
			var _this = this;

			this.oIcon1.onmousedown = function (event) {
				if (_this.drag.dragged) {
					return;
				}

				// 设置body的文字不能再拖动
				setStyle(document.body, {
					webkitUserSelect:'none',
					mozUserSelect:'none',
					msUserSelect:'none',
					userSelect:'none'
				})

				// 显示拖动组件
				if (_this.isAbs) {
					setStyle(_this.oImgBox, {
						display: 'block'
					})
					setStyle(_this.oImgBox, {
						opacity: 1
					})
				}

				_this.drag.dragged = true;
				_this.drag.down = true;
				_this.drag.width = parseInt(getStyle(this, 'width'));
				_this.drag.startX = event.screenX;
			}

			document.onmousemove = function (event) {
				if (!_this.drag.down) {
					return;
				}

				_this.drag.endX = event.screenX;
				_this.drag.moveX = _this.drag.endX - _this.drag.startX;
				if (_this.drag.moveX < 0) {
					_this.drag.moveX = 0;
				} else if (_this.drag.moveX > _this.width - _this.drag.width) {
					_this.drag.moveX = _this.width - _this.drag.width;
				}

				setStyle(_this.oDragBtn, {
					left: -1 * (_this.width - _this.drag.width) + _this.drag.moveX + 'px'
				})
				setStyle(_this.oCanvas2, {
					left: -1 * (_this.pos.x - _this.drag.moveX) + 'px'
				})
			}
			window.onmouseup = function (event) {
				if (!_this.drag.down) {
					return;
				}

				// 还原body的文字不能再拖动
				setStyle(document.body, {
					webkitUserSelect:'text',
					mozUserSelect:'text',
					msUserSelect:'text',
					userSelect:'text'
				})

				// 隐藏拖动组件
				if (_this.isAbs) {
					setStyle(_this.oImgBox, {
						opacity: 0
					})
					setTimeout(function () {
						setStyle(_this.oImgBox, {
							display: 'none'
						})
					}, 300);
				}

				_this.drag.down = false;

				// 拖动结束，判断拖动结果
				_this.judgeDragResults();
			}
		},

		// @设置默认参数
		setParam: function (param) {
			var oDf = JSON.parse(JSON.stringify(oDefault));
			var oMb = JSON.parse(JSON.stringify(mb));

			for (var key in param) {
				if (key in oDf) {
					oDf[key] = param[key];
				}
			}

			this.id = oDf.id;
			this.width = oDf.width;
			this.height = oDf.height;
			this.images = oDf.images;
			this.isAbs = oDf.isAbs;
			this.pos = {x: 0, y: 0}
			this.drag = {width: 0, startX: 0,endX: 0,moveX: 0, down: false, dragged: false}
			this.success = oDf.success;
			this.error = oDf.error;

			this.mb = oMb;
			this.oBox = document.querySelector('#' + this.id);
		},

		// @设置html
		setHtml: function () {
			var html = `<div class="_slide-vertify-box">
							<div class="_img-box${this.isAbs ? ' absolute' : ''}" style="width: ${this.width}px; height: ${this.height}px;">
								<div class="ct">
									<canvas class="cv1" id="cv1" width="${this.width}" height="${this.height}"></canvas>
									<canvas class="cv2" id="cv2" width="${this.width}" height="${this.height}"></canvas>
								</div>
							</div>
							<div class="_drag-btn-box" style="width: ${this.width}px;">
								<div class="_bg">按住左边滑块，拖动完成上方拼图</div>
								<div class="_drag-btn info">
									<div class="icon icon1">&gt;</div>
									<div class="icon icon2">
										<div>
											<span class="line1"></span><span class="line2"></span>
										</div>
									</div>
									<div class="icon icon3">
										<div>
											<span class="line1"></span><span class="line2"></span>
										</div>
									</div>
								</div>
							</div>
						</div>`;

			this.oBox.innerHTML = html;

			this.oSlideBox = document.querySelector('#' + this.id + ' ._slide-vertify-box');
			this.oImgBox = document.querySelector('#' + this.id + ' ._slide-vertify-box ._img-box');
			this.oCt = document.querySelector('#' + this.id + ' ._slide-vertify-box ._ct');
			this.oCanvas1 = document.querySelector('#' + this.id + ' ._slide-vertify-box .cv1');
			this.oCanvas2 = document.querySelector('#' + this.id + ' ._slide-vertify-box .cv2');

			this.oDragBtnBox = document.querySelector('#' + this.id + ' ._slide-vertify-box ._drag-btn-box');
			this.oDragBtnBg = document.querySelector('#' + this.id + ' ._slide-vertify-box ._drag-btn-box ._bg');
			this.oDragBtn = document.querySelector('#' + this.id + ' ._slide-vertify-box ._drag-btn-box ._drag-btn');
			this.oIcon1 = document.querySelector('#' + this.id + ' ._slide-vertify-box ._drag-btn-box .icon1');
			this.oIcon2 = document.querySelector('#' + this.id + ' ._slide-vertify-box ._drag-btn-box .icon2');
			this.oIcon2Box = document.querySelector('#' + this.id + ' ._slide-vertify-box ._drag-btn-box .icon2 > div');
			this.oIcon2Line1 = document.querySelector('#' + this.id + ' ._slide-vertify-box ._drag-btn-box .icon2 .line1');
			this.oIcon2Line2 = document.querySelector('#' + this.id + ' ._slide-vertify-box ._drag-btn-box .icon2 .line2');
			this.oIcon3 = document.querySelector('#' + this.id + ' ._slide-vertify-box ._drag-btn-box .icon3');
			this.oIcon3Box = document.querySelector('#' + this.id + ' ._slide-vertify-box ._drag-btn-box .icon3 > div');
			this.oIcon3Line1 = document.querySelector('#' + this.id + ' ._slide-vertify-box ._drag-btn-box .icon3 line1');
			this.oIcon3Line2 = document.querySelector('#' + this.id + ' ._slide-vertify-box ._drag-btn-box .icon3 line2');
		},

		// @拖动结束，判断拖动结果
		judgeDragResults: function () {
			var differ = this.drag.moveX - this.pos.x;

			delClass(this.oDragBtn, 'info');
			// 失败
			if (differ > 2 || differ < -2) {
				addClass(this.oDragBtn, 'error');

				if (this.error) {
					this.error();
				}

			// 成功
			} else {
				addClass(this.oDragBtn, 'success');

				if (this.success) {
					this.success();
				}
			}
		},

		// @设置canvas图片
		setCanvas: function () {
			var _this = this;
			// 获取缺失块位置
			this.pos = this.getMissingBlockPosition(this.width, this.height, this.mb.width, this.mb.height);

			var oImg = new Image();
			oImg.src = this.images[this.imgIdx];
			oImg.onload = function () {
				var ctx1 = _this.oCanvas1.getContext('2d');
				var ctx2 = _this.oCanvas2.getContext('2d');

				// 绘制图1
				_this.drawCanvas1(ctx1, oImg)
				// 绘制图2
				_this.drawCanvas2(ctx2, oImg);
			}
		},

		// @画背景canvas
		drawCanvas1: function (ctx, oImg) {
			ctx.drawImage(oImg, 0, 0, this.width, this.height);
			this.drawMissingBlock(ctx, this.pos.x, this.pos.y, this.mb);
		},

		// @画滑动图
		drawCanvas2: function (ctx, oImg) {
			setStyle(this.oCanvas2, {
				left: -1 * this.pos.x + 'px'
			})

			ctx.beginPath();
			ctx.fillStyle = "rgba(255, 255, 255, 0)";
			ctx.fillRect(0, 0, this.width, this.height);

			this.drawMissingBlock(ctx, this.pos.x, this.pos.y, this.mb, '#000');
			ctx.clip();

			ctx.drawImage(oImg, 0, 0, this.width, this.height);
		},

		/**
		 *获取缺失块位置
		 *@param {Number} width [canvas的宽度]
		 *@param {Number} height [canvas的宽度]
		 *@param {Number} blockW [缺失块的宽度]
		 *@param {Number} blockH [缺失块的高度]
		 */
		getMissingBlockPosition: function (width, height, blockW, blockH) {
			// 缺失块上下左右都留出一定位置
			var res = {
				x: parseInt(Math.random() * (width - 2*(blockW+10)) + (blockW+10)),
				y: parseInt(Math.random() * (height - 2*10 - blockH) +10)
			}

			return res;
		},

		/**
		 *画缺失块
		 *@param [Object] ctx [canvas对象]
		 *@param [Number] x [缺失块的x坐标]
		 *@param [Number] y [缺失块的y坐标]
		 *@param [Object] mb [缺失块参数]
		 */
		drawMissingBlock: function (ctx, x, y, mb, color) {
			var lineW = (mb.width - mb.radius*2) / 2,
				lineH = (mb.height - mb.radius*2) / 2;

			ctx.beginPath();
			ctx.lineTo(x, y + mb.radius);
			ctx.lineTo(x + lineW, y + mb.radius);
			ctx.arc(x + lineW + mb.radius, y + mb.radius, mb.radius, Math.PI, 2*Math.PI);
			ctx.lineTo(x + (lineW + mb.radius)*2, y + mb.radius);
			ctx.lineTo(x + (lineW + mb.radius)*2, y + lineH + mb.radius);
			ctx.arc(x + (lineW + mb.radius)*2, y + lineH + mb.radius*2, mb.radius, 1.5*Math.PI, 0.5*Math.PI);
			ctx.lineTo(x + (lineW + mb.radius)*2, y + lineH*2 + mb.radius*3);
			ctx.lineTo(x, y + lineH*2 + mb.radius*3);
			ctx.lineTo(x, y + mb.radius);
			ctx.closePath();
			ctx.fillStyle = 'rgba(255, 255, 225, 0.5)';

			if (color) {
				ctx.shadowColor = color;
				ctx.shadowBlur = 10;
			}

			ctx.fill();
		},
	}

	function getStyle (obj, name) {
	    if(window.getComputedStyle) {
	        return getComputedStyle(obj, null)[name];
	    } else {
	        return obj.currentStyle[name];
	    }
	}
	function setStyle (obj, oStyle) {
	    for(var i in oStyle) {
	        obj.style[i] = oStyle[i];
	    }
	}

	// 获取节点的class列表
	function getClassList (obj) {
		var sClass = obj.className;
		var aClass = sClass.split(' ');
		var list = [];
		aClass.forEach(function (item, index) {
			if ( item ) {
				list.push(item);
			}
		})
		return list;
	}
	// 判断是否存在class
	function hasClass (obj, name) {
		var sClass = obj.className;
		var reg = new RegExp('\\b' + name + '\\b');
		if ( reg.test(sClass) ) {
			return true;
		}
		return false;
	}
	// 添加样式名
	function addClass (obj, name) {
		var hasName = hasClass(obj, name);

		if ( !hasName ) {
			var aClass = getClassList(obj);
			var sClass = '';
			aClass.push(name);

			aClass.forEach(function (item, index, arr) {
				sClass += item;
				if ( index < arr.length - 1) {
					sClass += ' ';
				}
			})

			obj.className = sClass;
		}
	}
	// 删除样式名
	function delClass (obj, name) {
		var hasName = hasClass(obj, name);

		if ( hasName ) {
			var sClass = obj.className;
			var arr = sClass.split(name);
			sClass = '';
			arr.forEach(function (item) {
				sClass += item;
			})
			sClass = sClass.replace(/\s+/g, ' ');
			sClass = sClass.replace(/^\s|\s$/g, '');
			obj.className = sClass;
		}
	}

	window.slideVerify = slideVerify;
})(window, document);