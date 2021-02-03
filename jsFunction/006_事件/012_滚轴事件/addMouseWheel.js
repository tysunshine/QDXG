
(function (window, document) {

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
window.addMouseWheel = addMouseWheel;
})(window, document);