/**
 * 计算文本宽度
 * o.text 字符串-计算字符串的宽度，字符串数组-计算字符串数组的最大宽度、最小宽度
 * o.type text为字符串数组时，判断是计算最大max还是最小min
 */ 


;(function (window, document) {
	var timer = null;

	function calcTextWidth (o) {
		var res = '';
		if (!o) {
			o = {}
		}
		if (!o.text) {
			return;
		}
		if (!o.type) {
			o.type = 'max';
		}
		
		var oCalc = document.getElementById('_calcTextWidthSp');
		if (!oCalc) {
			oCalc = document.createElement('div');
			oCalc.id = '_calcTextWidthSp';
			oCalc.style.display = 'inline-block';
			oCalc.style.whiteSpace = 'nowrap';
			oCalc.style.visibility  = 'hidden';
			oCalc.style.position = 'fixed';
			oCalc.style.top = 0;
			oCalc.style.left = 0;
    		oCalc.style.zIndex =  -1000;
			document.body.appendChild(oCalc);
			
			clearInterval(timer);
			timer = setInterval(function () {
				document.body.removeChild(oCalc);
				clearInterval(timer);
			}, 1000);
		}
		
		// 绑定样式
		if (o.style) {
			for (var key in o.style) {
				oCalc.style[key] = o.style[key];
			}
		}

		// text是字符串
		if (typeof o.text == 'string') {
			oCalc.innerText = o.text;
			res = oCalc.clientWidth;

		// text是数组
		} else if (o.text instanceof Array) {
			var arr = [];
			for (var i = 0; i < o.text.length; i++) {
				oCalc.innerText = o.text[i];
				arr.push(oCalc.clientWidth);
			}
			res = o.type == 'max' ? Math.max.apply(arr, arr) : Math.min.apply(arr, arr);
		}
			
		return res;
	}

	window.calcTextWidth = calcTextWidth;
})(window, document);

