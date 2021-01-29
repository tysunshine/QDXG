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

		this.option = {
			// 方向
			direction: option.direction || 'vertical',
			// y轴是否存在
			YExist: option.direction != 'horizontal' ? true : false,
			// x轴是否存在
			XExist: option.direction != 'vertical' ? true : false,
			axis: {
				size: "6px"
			},
			bar: {
				radius: "3px",
				color: 'rgba(144,147,153,.3)', // 背景颜色
				hoverColor: 'rgba(144,147,153,.5)', // 鼠标移上颜色
				transition: '.3s background-color', // 过渡时间
			}
		}

		this._initStructure(); // 初始化结构
		this._initState(); // 初始化状态
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
		


		// 设置滚动轴样式
		if (this.option.YExist) {
			setStyle(this.oYAxis, {
				position: 'absolute',
				right: '2px',
				top: '2px',
				bottom: '2px',
				width: this.option.axis.size
			})
			setStyle(this.oYBar, {
				position: 'absolute',
				top: 0,
				width: '100%',
				height: this._getBarSize() + 'px',
				borderRadius: this.option.bar.radius,
				background: 'rgba(144,147,153,0)'
			})
		}
		if (this.option.XExist) {
			setStyle(this.oXAxis, {
				position: 'absolute',
				left: '2px',
				right: '2px',
				bottom: '2px',
				height: this.option.axis.size,
			})
			setStyle(this.oXBar, {
				position: 'absolute',
				left: 0,
				width: this._getBarSize('horizontal') + 'px',
				height: '100%',
				borderRadius: this.option.bar.radius,
				background: 'rgba(144,147,153,0)'
			})
		}
	},

	// 初始化事件
	_initEvent: function () {

	},

	// 初始化结构
	_initStructure: function () {
		if (this.option.YExist) {
			this.oYAxis = document.createElement('div');
			this.oYBar = document.createElement('div');
			this.oYAxis.appendChild(this.oYBar);
			this.oScrollBar.appendChild(this.oYAxis);
		}
		if (this.option.XExist) {	
			this.oXAxis = document.createElement('div');
			this.oXBar = document.createElement('div');
			this.oXAxis.appendChild(this.oXBar);
			this.oScrollBar.appendChild(this.oXAxis);
		}
	},

	// 获取尺寸
	_getSize: function () {
		return {
			ww: this.oWrap.scrollWidth,
			wh: this.oWrap.scrollHeight,
			vw: this.oView.scrollWidth,
			vh: this.oView.scrollHeight
		}
	},

	// 获取滚动条的宽度
	_getBarSize: function (direction) {
		var oSize = this._getSize();
		console.log(oSize);
		// 纵向
		if (!direction || direction == 'vertical') {
			return oSize.vh > oSize.wh ? oSize.wh * oSize.wh / oSize.vh : oSize.wh;
		} else if (direction == 'horizontal') {
			return oSize.vw > oSize.ww ? oSize.ww * oSize.ww / oSize.vw : oSize.ww;
		}
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


window.TScrollBar = TScrollBar;

})(window, document);