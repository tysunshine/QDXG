(function (window, document) {

	/**
	 * 缓动函数
	 * @param t 动画已消耗时间
	 * @param b 原始值
	 * @param c 目标值
	 * @param d 持续时间
	 */
	var tween = { 
		linear: function ( t, b, c, d ) {
			return c * t / d + b; 
		},
		easeIn: function ( t, b, c, d ) {
			return c * ( t /= d ) * t + b;
		},
		strongEaseIn: function (t, b, c, d) {
			return c * ( t /= d ) * t * t * t * t + b;
		},
		strongEaseOut: function (t, b, c, d) {
			return c * ( ( t = t / d - 1) * t * t * t * t + 1 ) + b;
		},
		sineaseIn: function ( t, b, c, d ) {
			return c * ( t /= d) * t * t + b;
		},
		sineaseOut: function (t,b,c,d) {
			return c * ( ( t = t / d - 1) * t * t + 1 ) + b;
		}
	}

	/**
	 * 获取样式
	 */
	function getStyle (obj, name) {
	    if(window.getComputedStyle) {
	        return getComputedStyle(obj, null)[name];
	    } else {
	        return obj.currentStyle[name];
	    }
	}


	/**
	 * 动画函数
	 * 参数1		必选		设置动画的对象
	 * 参数2		必选		设置动画的效果（宽、高、top、left、right、bottom、opacity、scrollTop)
	 * 参数3		可选		动画时间，默认200ms
	 * 参数4		可选		速度曲线，默认'linear'
	 * 参数5		可选		回调函数
	 */
	function animate () {
		var obj = arguments[0];
		var json = arguments[1];
		if ( !obj || !json ) {
			return false;
		}

		var arg3 = arguments[2];
		var arg4 = arguments[3];
		var arg5 = arguments[4];
		var ty3 = typeof arg3;
		var ty4 = typeof arg4;
		var ty5 = typeof arg5;
		var speed = ty3 == 'number' ? arg3 : 200;
		var easing = ty4 == 'string' ? arg4 : ty3 == 'string' ? arg3 : 'linear';
		easing = easing	in tween ? easing : 'linear';
		var fn = ty5 == 'function' ? arg5 : ty4 == 'function' ? arg4 : ty3 == 'function' ? arg3 : null;


		var aTag = [];			// 过渡样式数组
		var start = 0;			// 开始时间
		for ( var item in json ) {
			var oTag = {
				name: '',		// 样式名
				start: 0,		// 开始值
				distance: 0		// 变化距离
			}
			oTag.name = item;
			if ( item == 'scrollTop' ) {
				oTag.start = obj.scrollTop;
			} else if ( item == 'opacity' ) {
				//当要改变的是透明度的时候其值用1到100之间的，如opacity:50
				oTag.start = parseInt(parseFloat(getStyle(obj.item)*100));
			} else {
				oTag.start = parseInt(getStyle(obj,item));
			}
			oTag.distance = parseInt(json[item]) - oTag.start;
			aTag.push(oTag);
		}

		// 设置样式值
		var setValue = function (obj, name, val) {
			if ( name == 'scrollTop' ) {
				obj.scrollTop = val;
			} else if ( name == 'opacity' ) {
				obj.style.filter = "alpha(opacity:" + val + ")";
                obj.style.opacity = val / 100;
			} else {
				obj.style[name] = val + 'px';
			}
		}

		var step = function (timestamp) {
			if (!start) {
				start = timestamp;
			}
			var isUpdate = true;
			for ( var i = 0; i < aTag.length; i++ ) {
				var iStep = tween[easing](timestamp - start, 0, aTag[i].distance, speed);
				if ( (aTag[i].distance >= 0 && iStep >= aTag[i].distance) || (aTag[i].distance < 0 && iStep <= aTag[i].distance) ) {
					iStep = aTag[i].distance;
					isUpdate = false;
				}

				var total = aTag[i].start + iStep;
				setValue(obj, aTag[i].name, total);
			}

			if ( isUpdate ) {
				requestAnimationFrame(step)
			} else {
				for ( var i = 0; i < aTag.length; i++ ) {
					var total = aTag[i].start + aTag[i].distance;
					setValue(obj, aTag[i].name, total);
				}
				if ( fn ) {
					fn();
				}
			}
		}
		requestAnimationFrame(step)
	}

	window.animate = animate;
})(window, document);