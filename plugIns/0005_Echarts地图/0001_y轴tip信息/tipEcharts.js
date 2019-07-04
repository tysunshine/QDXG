(function (window, document) {

	/**
	 * 无默认则必须
	 * {list: [],
		el: '#main',
		top: 0,			// 默认
		left: 0,		// 默认
		bottom: 0,		// 默认
		width: 10px,	
		tipZ: 50		// 默认
	 * }
	 */

	var option = {}
	var TipEacharts = function (o) {
		if (!o.list || o.list.length == 0 || !o.el || !o.width) {
			return;
		}

		option.el = o.el;
		option.list = o.list;
		option.width = parseInt(o.width) + 'px';

		option.top = o.top ? parseInt(o.top) + 'px' : 0;
		option.left = o.left ? parseInt(o.left) + 'px' : 0;
		option.bottom = o.bottom ? parseInt(o.bottom) + 'px' : 0;
		option.tipZ = o.tipZ || 50;

		setYTitle();
		setTimeout(function () {
			var oYTitleSp = document.querySelectorAll('.y-title span');
			for (var i = 0; i < oYTitleSp.length; i++) {
				setEvent(oYTitleSp[i]);
			}
		}, 50);
	}

	// 创建Y轴
	function setYTitle () {
		var oMain = document.querySelector(option.el);
		var oYTitleBox = document.createElement('div');

		oYTitleBox.className = 'y-title-box';

		setStyle(oYTitleBox, {
			position: 'absolute',
			top: option.top,
			left: option.left,
			bottom: option.bottom,
			width: option.width,
			textAlign: 'right',
			overflow: 'hidden'
		})

		for (var i = 0; i < option.list.length; i++) {
			var oT = document.createElement('div');
			oT.className = 'y-title';
			setStyle(oT, {
				position: 'absolute',
				right: 0,
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				width: '1000px',
				whiteSpace: 'nowrap',
				visibility: 'hidden',
				top: 'calc(100% / ' + option.list.length  + ' * ' + (option.list.length - 1 - i) + ')'
			})
			
			var oSp = document.createElement('span');
			oSp.innerText = option.list[i];
			setStyle(oSp, {
				display: 'inline-block'
			})
			oT.appendChild(oSp);


			oYTitleBox.appendChild(oT);

			(function (oT, oSp) {
				setTimeout(function () {
					if ( parseInt(getStyle(oYTitleBox, 'width')) < parseInt(getStyle(oSp, 'width')) ) {
						oSp.className = 'is-show';
					}

					setStyle(oT, {
						lineHeight: parseInt(getStyle(oYTitleBox, 'height')) / option.list.length + 'px',
						visibility: 'visible',
						width: '100%'
					})
				}, 30);
			})(oT, oSp);
		}

		oMain.appendChild(oYTitleBox);

	}

	// 绑定事件
	function setEvent (dom) {
		dom.onmouseenter = function (evt) {
			var e = evt || window.event;
			if (e.target.className == 'is-show') {
				showTip(e)
			}
		}

		dom.onmousemove = function (evt) {
			var e = evt || window.event;
			if (e.target.className == 'is-show') {
				showTip(e)
			}
		}

		dom.onmouseleave = function () {
			closeTip();
		}
	}

	// 显示tip
	function showTip (event){
		var oTip = document.querySelector('.y-title-tip');

		if (!oTip) {
			oTip = document.createElement('span');
			oTip.className = 'y-title-tip';

			setStyle(oTip, {
				position: 'fixed',
				top: event.clientY - 30 + 'px',
				left: event.clientX + 'px',
				zIndex: option.tipZ,
				background: 'rgba(0, 0, 0, .6)',
				borderRadius: '4px',
				padding: '3px 10px',
				color: '#fff',
				fontSize: '14px',
				lineHeight: '20px'
			})

			oTip.innerText = event.target.innerText;

			document.body.appendChild(oTip);
		}

		setStyle(oTip, {
			top: event.clientY - 40 + 'px',
			left: event.clientX - 20 + 'px'
		})
	}

	// 移除tip
	function closeTip () {
		var oTip = document.querySelector('.y-title-tip');
		if (oTip) {
			document.body.removeChild(oTip);
		}
	}

	// 获取样式值
	function getStyle (obj, name) {
	    if(window.getComputedStyle) {
	        return getComputedStyle(obj, null)[name];
	    } else {
	        return obj.currentStyle[name];
	    }
	}
	// 设置样式值
	function setStyle (obj, oStyle) {
	    for(var i in oStyle) {
	        obj.style[i] = oStyle[i];
	    }
	}

	window.TipEacharts = TipEacharts;

})(window, document);