(function (window, document) {
/*
创建对象
var oScroll = new TScrollBar('wrapper', {
	direction: 'vertical', // 方向 vertical纵向、horizontal横向、all纵横都有，横向内容需要设置固定宽度
});

oScroll.to(100); // 滚动到当前方向100
oScroll.to('auto', 100); // 纵向、横向都有滚动，'auto'表示当前方向不改变位置

*/

function TScrollBar (id, option) {
	this._init(id, option || {});
}

TScrollBar.prototype = {
	oScrollBar: null, // 包裹层 - 存放滚动条、滚动层
	oWrap: null, // 滚动层 - 设置overflow，根据包裹层的height或max-height设置max-height
	oView: null, // 内容层 - 将监听其大小变化
	oXAxis: null, // x横轴滚动盒子
	oXBar: null, // x横轴滚动条
	oYAxis: null, // y纵轴滚动盒子
	oYBar: null, // y纵轴滚动条
	option: null, // 配置参数

	_init: function (id, option) {
		this.oScrollBar = document.getElementById(id);
		this.oWrap = this.oScrollBar.children[0];
		this.oView = this.oWrap.children[0];
		addClass(this.oScrollBar, 't-scrollbar');
		addClass(this.oWrap, 't-scrollbar__wrap');
		addClass(this.oView, 't-scrollbar__view');

		this.option = {
			// 方向
			direction: option.direction || 'vertical',
			// y轴是否存在
			YExist: false,
			// x轴是否存在
			XExist: false,
			axis: {
				size: "6px"
			},
			bar: {
				radius: "3px",
				color: 'rgba(144,147,153,.3)', // 背景颜色
				hoverColor: 'rgba(144,147,153,.5)', // 鼠标移上颜色
				transition: '.3s background-color' // 过渡时间
			},
			width: option.width || null
		}
		// 纵
		this.option.YExist = this.option.direction != 'horizontal' ? true : false;
		// 横
		this.option.XExist = (this.option.direction != 'vertical' && parseInt(this.option.width) > this.oWrap.clientWidth) ? true : false;

		this._initStructure(); // 初始化结构
		this._initState(); // 初始化状态
		this._initEvent(); // 初始化事件
	},

	// 初始化状态
	_initState: function () {
		// 设置滚动盒子的定位属性
		var pos = getStyle(this.oScrollBar, 'position');
		if (pos == 'static') {
			setStyle(this.oScrollBar, {
				position: 'relative'
			})
		}

		// 设置包裹层样式
		var imaxh = getStyle(this.oScrollBar, 'max-height'),
			ih = getStyle(this.oScrollBar, 'height');
		var max = imaxh == 'none' ? ih : imaxh;
		if (this.option.XExist) {
			max = parseInt(max) + 17 + 'px';
		}
		setStyle(this.oWrap, {
			maxHeight: max
		})
		// 纵
		if (this.option.YExist) {
			setStyle(this.oWrap, {
				marginRight: '-17px',
				overflowY: 'auto'
			})
		}
		// 横
		if (this.option.XExist) {
			setStyle(this.oWrap, {
				marginBottom: '-17px',
				overflowX: 'auto'
			})
			this.setWidth(this.option.width);
		}

		this._setBarSize(); // 设置滚动轴尺寸
	},

	// 初始化事件
	_initEvent: function () {
		var _this = this;

		// 监听尺寸变化 - 改变滚动轴的长宽
		onelresize(this.oWrap, function () {
			_this._setBarSize();
		})
		onelresize(this.oView, function () {
			_this._setBarSize();
		})


		// 包裹层滚动-相应改变滚动条位置
		addEvet(this.oWrap, 'scroll', function (event) {
			var oSize = _this._getSize();
			// 纵
			if (_this.option.YExist) {
				// y轴滚动高度 = scrollTop * YAxisHeight / viewHeight
				setStyle(_this.oYBar, {
					top: oSize.wst * oSize.yh / oSize.vh + 'px'
				})
			}
			// 横
			if (_this.option.XExist) {
				setStyle(_this.oXBar, {
					left: oSize.wsl * oSize.xw / oSize.vw + 'px'
				})
			}
		})

		// 只有横向滚动轴时包裹滚动层添加鼠标滚动事件 - 改变scrollLeft - 滚动一次改变100，分为10次改变
		if (this.option.direction == 'horizontal') {
			var aDelay = []; // 需要等待执行滚动的次数，长度为0时结束定时器
			var scrollTimer = null;
			addMouseWheel(this.oWrap, function (delta) {
				aDelay = aDelay.concat(delta,delta,delta,delta,delta,delta,delta,delta,delta,delta);
				if (aDelay.length == 10) {
					changeLeft(aDelay[0]);
					aDelay.shift();
					scrollTimer = window.setInterval(function () {
						changeLeft(aDelay[0]);
						aDelay.shift();
						if (aDelay.length == 0) {
							window.clearInterval(scrollTimer);
						}
					}, 15);
				} else if (aDelay.length > 10) {
					var num = 0;
					for (var i = 0; i < aDelay.length; i++) {
						var item = aDelay[i];
						num+=Math.abs(item);
					}
					var dis = num / 10; // 间隔，用来判断每次动画执行的基础距离(10px)是多少个
					var arr = [];
					var fx = aDelay[0] > 0 ? 1 : -1; // 方向
					var all = 0; // 当前方向的综合
					for (var i = 0 ; i< aDelay.length; i++) {
						var item = aDelay[i];
						// 方向一致 - 累加
						if ((item > 0 && fx > 0) || (item < 0 && fx < 0)) {
							all+=item;
						// 方向改变 - 分割值到arr - 累加
						} else {
							arr = addArray(arr, all, dis, fx);
							// 重新计算
							all = item;
							fx = item > 0 ? 1 : -1; // 重置方向
						}
						// 计算到最后了
						if (i == aDelay.length -1) {
							arr = addArray(arr, all, dis, fx);
						}
					}
					aDelay = arr;
				}
			})
			// 向数组中添加数
			// all数组、all总数、dis间隔、fx方向
			function addArray (arr, all, dis, fx) {
				var brr = [];
				var isxh = true;
				all = Number(all.toFixed(2));
				// 将一个方向的距离按dis分割，最小分放到最前面
				while(isxh) {
					if (fx*all > dis) {
						brr.unshift(fx*dis);
						all = all - (fx*dis);
					} else {
						brr.unshift(all);
						isxh = false;
					}
				}
				return arr.concat(brr);
			}
			// delta -1为向下与向右
			function changeLeft (delta) {
				var isw = _this.oWrap.scrollWidth,
					icw = _this.oWrap.clientWidth;
				// 滚动宽度大于窗口宽度 - 可以滚动
				if (isw > icw) {
					var left = _this.oWrap.scrollLeft + (-1 * delta * 10);
					_this._setScrollSize(left, true);
				}
			}
		}

		// 如果有纵滚动轴
		if (this.option.YExist) {
			// 绑定拖动事件
			this.oYBar.onmousedown = function (evt) {
				var e = evt || window.event;
				var start = e.clientY;
				var top = _this.oWrap.scrollTop;
				//鼠标移动
				document.onmousemove = function(evt) {
					var e = evt || window.event;
					var dis = e.clientY - start;
					var oSize = _this._getSize();
					_this._setScrollSize(top + dis*oSize.vh/oSize.yh);
				}
				//鼠标松开 释放资源
				document.onmouseup = function(){
					document.onmousemove = null;
					document.onmouseup = null;
				}
				return false;
			}
			// 绑定滚动盒子点击事件
			this.oYAxis.onclick = function (evt) {
				var e = evt || window.event;
				var oSize = _this._getSize();
				_this._setScrollSize((e.offsetY-oSize.ybh/2)*oSize.vh/oSize.yh);
			}
			// 阻止冒泡
			this.oYBar.onclick = function (evt) {
				var e = evt || window.event;
				evt ? e.stopPropagation() : e.cancelBubble = true;
			}
		}
		// 如果有横滚动轴 
		if (this.option.XExist) {
			// 绑定拖动事件
			this.oXBar.onmousedown = function (evt) {
				var e = evt || window.event;
				var start = e.clientX;
				var left = _this.oWrap.scrollLeft;
				//鼠标移动
				document.onmousemove = function(evt) {
					var e = evt || window.event;
					var dis = e.clientX - start;
					var oSize = _this._getSize();
					_this._setScrollSize(left + dis*oSize.vw/oSize.xw, true);
				}
				//鼠标松开 释放资源
				document.onmouseup = function(){
					document.onmousemove = null;
					document.onmouseup = null;
				}
				return false;
			}
			// 绑定滚动盒子点击事件
			this.oXAxis.onclick = function (evt) {
				var e = evt || window.event;
				var oSize = _this._getSize();
				_this._setScrollSize((e.offsetX-oSize.xbw/2)*oSize.vw/oSize.xw,true);
			}
			// 阻止冒泡
			this.oXBar.onclick = function (evt) {
				var e = evt || window.event;
				evt ? e.stopPropagation() : e.cancelBubble = true;
			}
		}
	},

	// 初始化结构
	_initStructure: function () {
		if (this.option.YExist) {
			this.oYAxis = document.createElement('div');
			this.oYBar = document.createElement('div');
			addClass(this.oYAxis, 't-scrollbar__bar');
			addClass(this.oYAxis, 'is-vertical');
			addClass(this.oYBar, 't-scrollbar__thumb');
			this.oYAxis.appendChild(this.oYBar);
			this.oScrollBar.appendChild(this.oYAxis);
		}
		if (this.option.XExist) {	
			this.oXAxis = document.createElement('div');
			this.oXBar = document.createElement('div');
			addClass(this.oXAxis, 't-scrollbar__bar');
			addClass(this.oXAxis, 'is-horizontal');
			addClass(this.oXBar, 't-scrollbar__thumb');
			this.oXAxis.appendChild(this.oXBar);
			this.oScrollBar.appendChild(this.oXAxis);
		}
	},

	// 获取尺寸
	_getSize: function () {
		var res = {
			ww: this.oWrap.clientWidth, // 包裹层
			wh: this.oWrap.clientHeight,
			wst: this.oWrap.scrollTop, // 滚动距离 scrollTop
			wsl: this.oWrap.scrollLeft,
			vw: this.oView.clientWidth, // 滚动层
			vh: this.oView.clientHeight
		}
		if (this.option.YExist) {
			res.yh = this.oYAxis.clientHeight; // y纵轴
			res.ybh = this.oYBar.clientHeight; // y滚动轴
		}
		if (this.option.XExist) {
			res.xw = this.oXAxis.clientWidth // x横轴
			res.xbw = this.oXBar.clientWidth; // x滚动轴
		}
		return res;
	},

	// 获取滚动条的宽度
	_getBarSize: function (isHorizontal) {
		var oSize = this._getSize();
		// 纵向
		if (!isHorizontal) {
			var ybh = oSize.vh > oSize.wh ? oSize.yh * oSize.wh / oSize.vh : oSize.yh;
			return ybh;
		// 横向
		} else {
			var xbw = oSize.vw > oSize.ww ? oSize.xw * oSize.ww / oSize.vw : oSize.xw;
			return xbw;
		}
	},

	// 设置滚动轴滚动距离
	_setScrollSize: function (size, isHorizontal) {
		var oSize = this._getSize();
		size = size < 0 ? 0 : size;
		if (!isHorizontal) {
			size = size > oSize.vh - oSize.wh ? oSize.vh - oSize.wh : size;
			this.oWrap.scrollTop = size;
		} else {
			size = size > oSize.vw - oSize.ww ? oSize.vw - oSize.ww : size;
			this.oWrap.scrollLeft = size;
		}
	},

	// 设置滚动轴尺寸
	_setBarSize: function () {
		// 设置滚动轴样式
		if (this.option.YExist) {
			setStyle(this.oYBar, {
				height: this._getBarSize() + 'px'
			})
		}
		if (this.option.XExist) {
			setStyle(this.oXBar, {
				width: this._getBarSize(true) + 'px'
			})
		}
	},

	// 设置内容宽度
	setWidth: function (data) {
		setStyle(this.oView, {
			width: data ? data > 0 ? data + 'px' : data : ''
		})
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

// 获取class节点
function getByClass (className) {
	var arr = [];
	if ( document.querySelectorAll ) {
		var aElm = document.querySelectorAll('.' + className);
		for(var i=0; i<arr.length; i++) {
			arr.push(aElm[i]);
		}
	} else {
		var aElm = document.getElementsByTagName("*");
		
		for(var i=0; i<aElm.length; i++) {
			if(hasClass(aElm[i], className)) {
				arr.push(aElm[i]);
			}
		}
	}
	return arr;
}

// 获取节点的class列表
function getClassList (obj) {
	var sClass = obj.className;
	var aClass = sClass.split(' ');
	var list = [];
	for (var i = 0; i < aClass.length; i++) {
		var item = aClass[i];
		if (item) {
			list.push(item);
		}
	}
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

		for (var i = 0; i < aClass.length; i++) {
			var item = aClass[i];
			sClass += item;
			if (i < aClass.length -1) {
				sClass += ' ';
			}
		}
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
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			sClass += item;
		}
		sClass = sClass.replace(/\s+/g, ' ');
		sClass = sClass.replace(/^\s|\s$/g, '');
		obj.className = sClass;
	}
}

/**
 *添加滚动事件
 *@return [-1向下滚动、1向上滚动]
 */
function addMouseWheel (dom, handle) {
	//兼容性写法，该函数也是网上别人写的，不过找不到出处了，蛮好的，所有我也没有必要修改了
	//判断鼠标滚轮滚动方向
	if (window.addEventListener)//FF,火狐浏览器会识别该方法
	    dom.addEventListener('DOMMouseScroll', wheel, false);
	// window对象
	if (isWindow(dom)) {
		window.onmousewheel = document.onmousewheel = wheel;//W3C
	} else {
		dom.onmousewheel = wheel;
	}

	//统一处理滚轮滚动事件
	function wheel(event){
	    var delta = 0;
	    if (!event) {
	    	event = window.event;
	    }
	    if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
	        delta = event.wheelDelta/120; 
	        if (window.opera) {//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
	        	delta = -delta;
	        }
	    } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
	        delta = -event.detail/3;
	    }
	    if (delta) {
	        handle(delta);
	    }
	}

	function isWindow (obj) {
		if( !obj || typeof obj !== "object")//必须是一个对象
			return false;
		if (obj.window && (obj.window === obj.window.window)) {
			return true;
		} else {
			return false;
		}
	}
}


// 给节点绑定resize事件
var onelresize = function (el, handler) {
	// if (!(el instanceof window.HTMLElement)) {
	// 	throw new TypeError("参数1不是HTMLElement实例对象。")
	// }
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

	// expand.addEventListener('scroll', onScroll, false)
	// shrink.addEventListener('scroll', onScroll, false)
	addEvet(expand, 'scroll', onScroll);
	addEvet(shrink, 'scroll', onScroll);
}

/**
 * 绑定事件
 * target 节点对象
 * type 事件类型，不含'on'，如'click'
 * fn 处理函数
 */
function addEvet(target, type, fn) {
	if ( target.addEventListener ) {
		target.addEventListener(type, fn, false);
	} else if ( target.attachEvent ) {
		target.attachEvent('on' + type, fn);
	} else {
		target['on' + type] = fn;
	}
}

window.TScrollBar = TScrollBar;

})(window, document);