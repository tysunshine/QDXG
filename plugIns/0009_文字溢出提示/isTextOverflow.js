/**
 * 判断文字是否溢出
 * 参数：dom ->dom对象
 * 返回：true->溢出了，false->没溢出
 */
;(function (window, document) {
	var timer = null;

	function isTextOverflow(dom) {
		if (!dom) {
			return;
		}
		var iTw = dom.clientWidth;
		var iPl = parseInt(getComputedStyle(dom, null)['paddingLeft']);
		var iPr = parseInt(getComputedStyle(dom, null)['paddingRight']);
		var iSize =  getComputedStyle(dom, null)['fontSize'];
		var sFamily = getComputedStyle(dom, null)['fontFamily'];
		var strText = dom.innerText;
		iTw = iTw - iPl - iPr;

		isEnter = true;

		var oCalc = document.getElementById('_calcMinWidthSpan');
		if (!oCalc) {
			oCalc = document.createElement('div');
			oCalc.id = '_calcMinWidthSpan';
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
				if (!isEnter) {
					document.body.removeChild(oCalc);
					clearInterval(timer);
				}
				isEnter = false;
			}, 1000);
		}
			
		oCalc.style.fontSize = iSize;
		oCalc.style.fontFamily = sFamily;
		oCalc.innerText = strText;
		
		var iCw = oCalc.clientWidth;

		return iCw > iTw;
	}

	window.isTextOverflow = isTextOverflow;
})(window, document)