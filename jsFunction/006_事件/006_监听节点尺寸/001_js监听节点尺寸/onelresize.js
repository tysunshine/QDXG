(function (window, document) {
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

	window.onelresize = onelresize;
})(window, document);