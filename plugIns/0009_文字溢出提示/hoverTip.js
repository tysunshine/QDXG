/**
 * 文本溢出提示
 * 参数：el -> 需要绑定该动作的选择器，默认.hover-tip
 */
;(function (window, document) {
	var oHoverTip = {
		init: function (el) {
			this.oTip = document.querySelectorAll(el);	
			this.initEvent();
		},
		initEvent: function () {
			for (var i = 0; i < this.oTip.length; i++) {
				var oThis = this.oTip[i];

				if (oThis.bindTip) {
					continue;
				}

				oThis.bindTip = true;
				var timer = null, isEnter = false;
				oThis.onmouseenter = function () {
					var iTw = this.clientWidth;
					var iPl = parseInt(getComputedStyle(this, null)['paddingLeft']);
					var iPr = parseInt(getComputedStyle(this, null)['paddingRight']);
					var iSize =  getComputedStyle(this, null)['fontSize'];
					var strText = this.innerText;
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
					oCalc.innerText = strText;
					
					var iCw = oCalc.clientWidth;

					if (iCw > iTw) {
						this.setAttribute('title', strText);
					}
				}
				oThis.onmouseleave = function () {
					var oCalc = document.querySelectorAll('._calc-hover-tip');
					this.removeAttribute('title');
					for (var i = 0; i < oCalc.length; i++) {
						document.body.removeChild(oCalc[i]);
					}
				}
			}
		}
	}

	window.hoverTip = function (el) {
		this.el = el || '.hover-tip';
		oHoverTip.init(this.el);
	}
})(window, document);