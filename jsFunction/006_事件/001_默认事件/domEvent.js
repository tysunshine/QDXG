(function (window, document) {

	var domEvent = {
		/**
		 * 绑定事件
		 * target 节点对象
		 * type 事件类型，不含'on'，如'click'
		 * fn 处理函数
		 */
		addEvent: function (target, type, fn) {
			if ( target.addEventListener ) {
				target.addEventListener(type, fn, false);
			} else if ( target.attachEvent ) {
				target.attachEvent('on' + type, fn);
			} else {
				target['on' + type] = fn;
			}
		},

		/**
		 * 移除事件
		 * target 节点对象
		 * type 事件类型，不含'on'
		 * fn 处理函数
		 */
		removeEvent: function (target, type, fn) {
			if ( target.removeEventListener ) {
				target.removeEventListener(type, fn);
			} else if ( target.detachEvent ) {
				target.detachEvent('on' + type, fn);
			} else {
				target['on' + type] = null;
			}
		},

		/**
		 * 阻止事件冒泡
		 * event 事件对象
		 */
		stopPropagation: function (event) {
			event ? event.stopPropagation() : window.event.cancelBubble = true;
		},

		/**
		 * 阻止默认事件
		 * event 事件对象
		 */
		preventDefault: function (event) {
			event ? event.preventDefault() : window.event.returnValue = false;
		},

		/**
		 * 获取事件源
		 * event 事件对象
		 */
		getTarget: function (event) {
			return event.target || window.event.srcElement;
		},

		/**
		 * 获取事件对象
		 * event 默认的事件对象
		 */
		getEvent: function (event) {
			return event ? event : window.event;
		},

		/**
		 * 获取事件类型
		 * target 事件源、元素节点
		 */
		getTagName: function (target) {
			return target.tagName.toLowerCase();
		}
	}

	window.domEvent = domEvent;
})(window, document);