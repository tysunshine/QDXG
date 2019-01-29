(function (window, document) {

	/*
	要完成的事：
	一个节点监听一中自定义事件，并且能够自己调用
	结语：唔，搞完了一看咋好像直接target.fn = ... 也可以呀，好像还完爆我的这个
	不过，还是留着，毕竟也是我敲了一下午的哈
	*/

	var customEvent = {
		// 事件映射
		// 类型: target.customevent.aclick: ['fn1', 'fn2']
		// customevent: {},

		/**
		 * 给节点添加自定义事件到其customevent属性中
		 * target 元素节点
		 * type 自定义的事件名
		 * fn 对应的处理函数
		 */
		addEvent: function (target, type, fn) {
			if ( target.customevent === undefined ) {
				target.customevent = {};
			}
			
			if ( target.customevent[type] === undefined ) {
				target.customevent[type] = [];
			}

			// 判断是否已存在监听事件
			var hasEvent = false;
			for ( var i = 0; i < target.customevent[type].length; i++ ) {
				if ( target.customevent[type][i] === fn ) {
					hasEvent = true;
					break;
				}
			}
			if ( !hasEvent && typeof fn === 'function' ) {
				target.customevent[type].push(fn);
			}
		},

		/**
		 * 触发节点上监听的自定义事件
		 * target 元素节点
		 * type 自定义事件名
		 * param1，param2，... 只有在处理函数只有一个的时候可以传参
		 */
		fireEvent: function (target, type) {
			if ( !target.customevent || !target.customevent[type] || target.customevent[type].length <= 0 ) {
				return false;
			}

			// 只有一个处理函数可以接收参数
			if ( target.customevent[type].length == 1 ) {
				var params = [];
				for ( var i = 2; i < arguments.length; i++ ) {
					params.push(arguments[i]);
				}
				target.customevent[type][0].apply(target, params);

			} else {
				for ( var i = 0; i < target.customevent[type].length; i++ ) {
					target.customevent[type][i].apply(target);
				}
			}
		},

		/**
		 * 移除自定义事件
		 * target 元素节点
		 * type 自定义的事件名
		 */
		removeEvent: function (target, type, fn) {
			if ( !target.customevent || !target.customevent[type] || target.customevent[type].length <= 0 ) {
				return false;
			}
			
			var handlers = target.customevent[type];
			for ( var i = 0; i < handlers.length; i++ ) {
				if ( handlers[i] === fn ) {
					handlers.splice(i, 1);
					break;
				}
			}

			if ( handlers.length <= 0 ) {
				delete target.customevent[type];
			}

			if ( JSON.stringify(target.customevent) == '{}' ) {
				delete target.customevent;
			}
		}
	}

	window.customEvent = customEvent;

})(window, document);