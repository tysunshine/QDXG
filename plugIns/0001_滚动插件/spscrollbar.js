(function (window, document) {

	function SpScrollBar (o) {
		this._init(o);
	}

	SpScrollBar.prototype = {
		// 初始化
		_init: function (o) {
			if ( typeof o != 'object' || typeof o.el != 'string' ) {
				return false;
			}

			this.oWrapper = document.querySelector(o.el);
			if ( !this.oWrapper ) {
				return false;
			}

			this.oScroll = this.oWrapper.children[0];
			if ( !this.oScroll ) {
				return false;
			}

			this._initParam(o);
			this._initStructure();

			this._initState(o);
			this._initEvent();
		},

		// 初始化状态
		_initState: function (o) {
			var pos = getStyle(this.oWrapper, 'position');
			if (pos == 'static') {
				setStyle(this.oWrapper, {
					position: 'relative'
				})
			}
			setStyle(this.oScroll, {
				position: 'relative',
				transition: 'transform ' + this.iTime + 'ms linear'
			})

			if (!isNull(o.scrollTop)) {
				this._scrollTop(o.scrollTop);
			}
			if (!isNull(o.scrollLeft)) {
				this._scrollLeft(o.scrollLeft);
			}

			if (this.XExist) {
				setStyle(this.oXAxis, {
					position: 'absolute',
					opacity: 0,
					transition: 'opacity 200ms',
					top: this.XAxis.top,
					bottom: this.XAxis.bottom,
					left: this.XAxis.left,
					right: this.XAxis.right,
					height: this.XAxis.height,
					borderRadius: this.XAxis.borderRadius,
					backgroundColor: this.XAxis.bgColor
				})

				setStyle(this.oXBar, {
					position: 'absolute',
					cursor: 'pointer',
					height: '100%',
					transition: 'left ' + this.iTime + 'ms linear',
					borderRadius: this.XBar.borderRadius,
					backgroundColor: this.XBar.bgColor
				})
			}

			if (this.YExist) {
				setStyle(this.oYAxis, {
					position: 'absolute',
					opacity: 0,
					transition: 'opacity 200ms',
					top: this.YAxis.top,
					bottom: this.YAxis.bottom,
					left: this.YAxis.left,
					right: this.YAxis.right,
					width: this.YAxis.width,
					borderRadius: this.YAxis.borderRadius,
					backgroundColor: this.YAxis.bgColor
				})

				setStyle(this.oYBar, {
					position: 'absolute',
					cursor: 'pointer',
					width: '100%',
					transition: 'top ' + this.iTime + 'ms linear',
					borderRadius: this.YBar.borderRadius,
					backgroundColor: this.YBar.bgColor
				})
			}

			this._setBarSize();

		},

		// 初始化事件
		_initEvent: function () {
			var _this = this;

			onelresize(this.oWrapper, function () {
				console.log(1);
			});

			// 滚动层高度改变时，更新尺寸，更新滚动距离
			onelresize(this.oScroll, function () {
				_this._setBarSize();
				if (_this.XExist) {
					var iLeft = _this.iScrollLeft;
					_this.scrollLeft(iLeft);
				} else if (_this.YExist) {
					var iTop = _this.iScrollTop;
					_this.scrollTop(iTop);
				}
			})

			// 滚动*******************************************
			var sUserAgent = window.navigator.userAgent.toLowerCase();
			if ( sUserAgent.indexOf('firefox') != -1 ) {
				// 火狐浏览器滚轴滚动
				this.oWrapper.addEventListener('DOMMouseScroll', function (e) {
					e.preventDefault();

					var iMove = e.detail > 0 ? 60 : -60;
					if (_this.YExist) {
						iMove += _this.iScrollTop;
						_this.scrollTop(iMove);

					} else if (_this.XExist) {
						iMove += _this.iScrollLeft;
						_this.scrollLeft(iMove);
					}
				})

			} else {
				// 谷歌、ie滚轴滚动
				this.oWrapper.onmousewheel = function (evt) {
					var e = evt || window.event;
					evt ? e.preventDefault() : e.returnValue = false;

					var iMove = e.wheelDelta < 0 ? 60 : -60;
					if (_this.YExist) {
						iMove += _this.iScrollTop;
						_this.scrollTop(iMove);

					} else if (_this.XExist) {
						iMove += _this.iScrollLeft;
						_this.scrollLeft(iMove);
					}
				}
			}

			// 拖动*******************************************
			var bYDown = false, bXDown = false;
			var iStartY = 0, iStartX = 0;
			var iStartTop = 0, iStartLeft = 0;
			if (this.XExist) {
				this.oXBar.onmousedown = function (evt) {
					var e = evt || window.event;
					evt ? e.preventDefault() : e.returnValue = false;

					bXDown = true;
					iStartX = e.clientX;
					_this._setTransX(0);
					_this._setTransS(0);
					iStartLeft = parseInt(getStyle(this, 'left'));
					iStartLeft = iStartLeft > 0 ? iStartLeft : 0;
				}
			} else if (this.YExist) {
				this.oYBar.onmousedown = function (evt) {
					var e = evt || window.event;
					evt ? e.preventDefault() : e.returnValue = false;

					bYDown = true;
					iStartY = e.clientY;
					_this._setTransY(0);
					_this._setTransS(0);
					iStartTop = parseInt(getStyle(this, 'top'));
					iStartTop = iStartTop > 0 ? iStartTop : 0;
				}
			}
			document.addEventListener('mousemove', function (evt) {
				var e = evt || window.event;
				evt ? e.preventDefault() : e.returnValue = false;

				if (bYDown) {
					var iMove = e.clientY - iStartY;
					var iTop = 0;
					iMove += iStartTop;
					iTop = _this._calcScrollTop(iMove);
					_this._setYBarTop(iMove);
					_this._scrollTop(iTop);

				} else if (bXDown) {
					var iMove = e.clientX - iStartX;
					var iLeft = 0;
					iMove += iStartLeft;
					iLeft = _this._calcScrollLeft(iMove);
					_this._setXBarLeft(iMove);
					_this._scrollLeft(iLeft);
				}
			})
			document.addEventListener('mouseup', function () {
				if (bYDown) {
					bYDown = false;
					_this._setTransY(_this.iTime);
					_this._setTransS(_this.iTime);
					if (!bEnter) {
						_this._setAxisShow(false);
					}
				}
				if (bXDown) {
					bXDown =false;
					_this._setTransX(_this.iTime);
					_this._setTransS(_this.iTime);
					if (bEnter) {
						_this._setAxisShow(false);
					}
				}
			})

			// 进出*******************************************
			var bEnter = false;
			this.oWrapper.onmouseenter = function () {
				bEnter = true;
				_this._setAxisShow(true);

			}
			this.oWrapper.onmouseleave = function () {
				bEnter = false;
				if (!bXDown && !bYDown) {
					_this._setAxisShow(false);
				}
			}

		},

		// 初始参数
		_initParam: function (o) {
			var overflowX = getStyle(this.oWrapper, 'overflow-x');
			var iMaxW = parseInt(getStyle(this.oWrapper, 'maxWidth'));
			if (overflowX == 'hidden' && iMaxW > 0) {
				this.XExist = true;
				this.XAxis = o.XAxis || {};
				this.XAxis.top = this.XAxis.top ? parseInt(this.XAxis.top) + 'px' : 'auto';
				this.XAxis.bottom = this.XAxis.bottom ? parseInt(this.XAxis.bottom) + 'px' : 0;
				this.XAxis.left = this.XAxis.left ? parseInt(this.XAxis.left) + 'px' : 0;
				this.XAxis.right = this.XAxis.right ? parseInt(this.XAxis.right) + 'px' : 0;
				this.XAxis.height = this.XAxis.height ? parseInt(this.XAxis.height) + 'px' : '10px';
				this.XAxis.borderRadius = this.XAxis.borderRadius ? parseInt(this.XAxis.borderRadius) + 'px' : 0;
				this.XAxis.bgColor = this.XAxis.bgColor || 'rgba(255, 255, 255, 0)';
				this.XAxis.enterShow = this.XAxis.enterShow || true;

				this.XBar = o.XBar || {};
				this.XBar.borderRadius = this.XBar.borderRadius ? parseInt(this.XBar.borderRadius) + 'px' : 0;
				this.XBar.bgColor = this.XBar.bgColor || 'rgba(144,147,153,.3)';
				this.XBar.enterColor = this.XBar.enterColor || 'rgba(144,147,153,.3)';
			}

			var overflowY = getStyle(this.oWrapper, 'overflow-y');
			var iMaxH = parseInt(getStyle(this.oWrapper, 'maxHeight'));
			if (overflowY && iMaxH > 0) {
				this.YExist = true;
				this.YAxis = o.YAxis || {};
				this.YAxis.top = this.YAxis.top ? parseInt(this.YAxis.top) + 'px' : 0;
				this.YAxis.bottom = this.YAxis.bottom ? parseInt(this.YAxis.bottom) + 'px' : 0;
				this.YAxis.left = this.YAxis.left ? parseInt(this.YAxis.left) + 'px' : 'auto';
				this.YAxis.right = this.YAxis.right ? parseInt(this.YAxis.right) + 'px' : 0;
				this.YAxis.width = this.YAxis.width ? parseInt(this.YAxis.width) + 'px' : '10px';
				this.YAxis.borderRadius = this.YAxis.borderRadius ? parseInt(this.YAxis.borderRadius) + 'px' : 0;
				this.YAxis.bgColor = this.YAxis.bgColor || 'rgba(255, 255, 255, 0)';
				this.YAxis.enterShow = this.YAxis.enterShow || true;

				this.YBar = o.YBar || {};
				this.YBar.borderRadius = this.YBar.borderRadius ? parseInt(this.YBar.borderRadius) + 'px' : 0;
				this.YBar.bgColor = this.YBar.bgColor || 'rgba(144,147,153,.3)';
				this.YBar.enterColor = this.YBar.enterColor || 'rgba(144,147,153,.3)';
			}

			this.iTime = parseInt(o.time) > 0 ? parseInt(o.time) : 100;
			this.iScrollTop = 0;
			this.iScrollLeft = 0;
		},

		// 初始化结构
		_initStructure: function () {
			if (this.XExist) {
				this.oXAxis = document.createElement('div');
				this.oXBar = document.createElement('div');
				this.oXAxis.appendChild(this.oXBar);
				this.oWrapper.appendChild(this.oXAxis);
			}

			if (this.YExist) {
				this.oYAxis = document.createElement('div');
				this.oYBar = document.createElement('div');
				this.oYAxis.appendChild(this.oYBar);
				this.oWrapper.appendChild(this.oYAxis);
			}
		},

		// 获取包裹层、滚动层各种尺寸
		_getSize: function () {
			this.iWW = this.oWrapper.clientWidth;
			this.iWH = this.oWrapper.clientHeight;

			this.iSW = this.oScroll.clientWidth;
			this.iSH = this.oScroll.clientHeight;

			if (this.XExist) {
				this.iSXMin = 0;
				this.iSXMax = this.iSW > this.iWW ? this.iSW - this.iWW : 0;

				this.iXAW = this.oXAxis.clientWidth;
				this.iXBW = this.iWW / this.iSW * this.iXAW;

				this.iXMin = 0;
				this.iXMax = this.iXAW - this.iXBW;
			}
			if (this.YExist) {
				this.iSYMin = 0;
				this.iSYMax = this.iSH > this.iWH ? this.iSH - this.iWH : 0;

				this.iYAH = this.oYAxis.clientHeight;
				this.iYBH = this.iWH / this.iSH * this.iYAH;
				
				this.iYMin = 0;
				this.iYMax = this.iYAH - this.iYBH;
			}
		},

		// 设置滚动条尺寸
		_setBarSize: function () {
			this._getSize();
			if (this.XExist) {
				setStyle(this.oXBar, {
					width: this.iXBW + 'px'
				})
			}

			if (this.YExist) {
				setStyle(this.oYBar, {
					height: this.iYBH +'px'
				})
			}
		},

		// X轴滚动时间
		_setTransX: function (time) {
			setStyle(this.oXBar, {
				transition: "left " + (time <= 0 ? 0 : time) + "ms linear"
			})
		},

		// Y轴滚动时间
		_setTransY: function (time) {
			setStyle(this.oYBar, {
				transition: "top " + (time <= 0 ? 0 : time) + "ms linear"
			})
		},

		// 内容滚动时间
		_setTransS: function (time) {
			setStyle(this.oScroll, {
				transition: 'transform ' + (time <= 0 ? 0 : time) + 'ms linear'
			})
		},

		// 设置滚动轴显隐
		_setAxisShow: function (bl) {
			if (bl) {
				if (this.XExist) {
					setStyle(this.oXAxis, {
						opacity: 1
					})
				}
				if (this.YExist) {
					setStyle(this.oYAxis, {
						opacity: 1
					})
				}
			} else {
				if (this.XExist) {
					setStyle(this.oXAxis, {
						opacity: 0
					})
				}
				if (this.YExist) {
					setStyle(this.oYAxis, {
						opacity: 0
					})
				}
			}
		},

		// 设置X滚动条滚动距离
		_setXBarLeft: function (num) {
			var result = this._limitXRange(num);
			setStyle(this.oXBar, {
				left: result + 'px'
			})
		},

		// 设置Y滚动条滚动距离
		_setYBarTop: function (num) {
			var result = this._limitYRange(num);
			setStyle(this.oYBar, {
				top: (num <= this.iYMin ? this.iYMin : num >= this.iYMax ? this.iYMax : num) + 'px'
			})
		},

		// 获取（不传参）/设置顶部滚动距离
		_scrollTop: function (num) {
			if (!isNull(num)) {
				var result = this._limitSRange(num, this.iScrollLeft);
				this.iScrollTop = result.top;
				this.iScrollLeft = result.left;
				setStyle(this.oScroll, {
					transform: "translate(" + (-1 * this.iScrollLeft) + "px, " + (-1 * this.iScrollTop) + "px)"
				})
			}
		},

		// 获取（不传参）/设置左边滚动距离
		_scrollLeft: function (num) {
			if (!isNull(num)) {
				var result = this._limitSRange(this.iScrollTop, num);
				this.iScrollTop = result.top;
				this.iScrollLeft = result.left;
				setStyle(this.oScroll, {
					transform: "translate(" + (-1 * this.iScrollLeft) + "px, " + (-1 * this.iScrollTop) + "px)"
				})
			}
		},

		// 滚动到固定位置
		scrollTop: function (num) {
			if (!isNull(num)) {
				var iYTop = this._calcYTop(num);
				this._scrollTop(num);
				this._setYBarTop(iYTop);
			} else {
				return this.iScrollTop;
			}
		},

		// 滚动到固定位置
		scrollLeft: function (num) {
			if (!isNull(num)) {
				var iXLeft = this._calcXLeft(num);
				this._scrollLeft(num);
				this._setXBarLeft(iXLeft);
			} else {
				return this.iScrollTop;
			}
		},

		// 限制X滚动条滚动高度
		_limitXRange: function (num) {
			return num <= this.iXMin ? this.iXMin : num >= this.iXMax ? this.iXMax : num;
		},

		// 限制Y滚动条滚动高度
		_limitYRange: function (num) {
			return num <= this.iYMin ? this.iYMin : num >= this.iYMax ? this.iYMax : num;
		},

		// 限制滚动层滚动高度
		_limitSRange: function (top, left) {
			return {
				top: top <= this.iSYMin ? this.iSYMin : top >= this.iSYMax ? this.iSYMax : top,
				left: left <= this.iSXMin ? this.iSXMin : left >= this.iSXMax ? this.iSXMax : left
			}
		},

		// 滚动内容，计算X轴滚动距离
		_calcXLeft: function (num) {
			return num / this.iSW * this.iXAW;
		},

		// 滚动内容，计算Y轴滚动距离
		_calcYTop: function (num) {
			return num / this.iSH * this.iYAH;
		},

		// 拖动X轴，计算内容滚动距离
		_calcScrollLeft: function (num) {
			return num / this.iXAW * this.iSW;
		},

		// 拖动Y轴，计算内容滚动距离
		_calcScrollTop: function (num) {
			return num / this.iYAH * this.iSH;
		}
	}


	// 获取样式
	function getStyle (obj, name) {
		if(window.getComputedStyle) {
			return getComputedStyle(obj, null)[name];
		} else {
			return obj.currentStyle[name];
		}
	}
	// 设置样式
	function setStyle (obj, oStyle) {
        for(var i in oStyle) {
            obj.style[i] = oStyle[i];
        }
    }

    // 给节点绑定resize事件
	var onelresize = function (el, handler) {
		if (!(el instanceof HTMLElement)) {
			throw new TypeError("参数1不是HTMLElement实例对象。")
		}
		if (/^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr|script|style|textarea|title)$/i.test(el.tagName)) {
			throw new TypeError('不支持的标签类型。更改标签或将其包装在支持的标记中（例如，DIV）。')
		}
		if (typeof handler !== 'function') { 
			throw new TypeError("参数2不是类型不是方法。") 
		}

		var lastWidth = el.offsetWidth || 1
		var lastHeight = el.offsetHeight || 1
		var maxWidth = 10000 * (lastWidth)
		var maxHeight = 10000 * (lastHeight)

		var expand = document.createElement('div')
		expand.style.cssText = 'position:absolute;top:0;bottom:0;left:0;right:0;z-index=-10000;overflow:hidden;visibility:hidden;'
		var shrink = expand.cloneNode(false)

		var expandChild = document.createElement('div')
		expandChild.style.cssText = 'transition:0s;animation:none;'
		var shrinkChild = expandChild.cloneNode(false)

		expandChild.style.width = maxWidth + 'px'
		expandChild.style.height = maxHeight + 'px'
		shrinkChild.style.width = '250%'
		shrinkChild.style.height = '250%'

		expand.appendChild(expandChild)
		shrink.appendChild(shrinkChild)
		el.appendChild(expand)
		el.appendChild(shrink)

		if (expand.offsetParent !== el) {
			el.style.position = 'relative'
		}

		expand.scrollTop = shrink.scrollTop = maxHeight
		expand.scrollLeft = shrink.scrollLeft = maxWidth

		var newWidth = 0
		var newHeight = 0
		function onResize () {
			if (newWidth !== lastWidth || newHeight !== lastHeight) {
			  	lastWidth = newWidth
			  	lastHeight = newHeight
			  	handler()
			}
		}

		function onScroll () {
			newWidth = el.offsetWidth || 1
			newHeight = el.offsetHeight || 1
			if (newWidth !== lastWidth || newHeight !== lastHeight) {
			  	requestAnimationFrame(onResize)
			}
			expand.scrollTop = shrink.scrollTop = maxHeight
			expand.scrollLeft = shrink.scrollLeft = maxWidth
		}

		expand.addEventListener('scroll', onScroll, false)
		shrink.addEventListener('scroll', onScroll, false)
	}

	function isNull (val) {
		return !val && val!==0 && typeof val!=="boolean"?true:false;
	}


	window.SpScrollBar = SpScrollBar;
})(window, document);