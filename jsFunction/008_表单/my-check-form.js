/**
 * @my-check-form.js
 * @作者 田园
 * @版本 1.0.1
 * @Created: 19-06-26
 */
(function (window, document) {
	/**
     * 输入框验证方法
     * 支持jQuery $全局调用以及模块化调用
     * @example
     * 初始化
     * $.MyCheckForm.init({
     *		class: 'my-check-item', 			// 默认class: 'my-check-item'
     *		rules: {
	 *			id1: [{
	 *				type: 'blur',				// 默认type:'blur'
	 *				fn: function (val) {
	 *					if (val.length == 0) {
	 *						return '不能为空'；
	 *					}
	 *					return '';
	 *				}
	 *			}]
     *		}
     *	});
     * 
     * 按钮验证
     * console.log($.MyCheckForm.validate());	// 结果true/false
     **/

	$.MyCheckForm = (function () {

		var oDeploy = null;
		var oCheckList = null;

		var _initState = function () {
			oCheckList = {};
			for (var id in oDeploy.rules) {

				var oId = $('#' + id);

				oDeploy.rules[id].forEach(function (item, idx, arr) {
					if (!item.type) {
						arr[idx].type = 'blur';
					}
				})

				if (oId.length > 0) {
					oCheckList[id] = oId;
				}
			}
		}

		// 绑定事件
		var _initEvent = function () {
			for (var id in oCheckList) {

				oDeploy.rules[id].forEach(function (item, idx, arr) {
					oCheckList[id].on(item.type, function () {
						_setErrorType($(this), item.fn);
					})
				})
			}
		}


		var _setErrorType = function (oTag, fn) {
			var oTip = oTag.prev();
			var oBox = oTag.parent();
			var val = oTag.val();		// 当前输入框值
			var msg = fn(val);			// 错误消息

			

			if (msg) {
				oTip.text(msg);
				oTip.fadeIn(300)
				oBox.animate({
					marginBottom: '20px'
				}, 300);

			} else {
				oTip.fadeOut(300)
				oBox.animate({
					marginBottom: '0'
				}, 300);
			}

			return msg ? false : true;
		}


		return {
			init: function (o) {
				if (!o) {
					return;
				}
				if (!o.class) {
					o.class = 'my-check-item';
				}
				if (!o.rules) {
					return;
				}

				oDeploy = o;


				_initState();
				_initEvent();

			},

			validate: function () {
				var bl = true;
				if (!oCheckList) {
					return false;
				}
				for (var id in oCheckList) {
					oDeploy.rules[id].forEach(function (item, idx, arr) {
						var res = _setErrorType(oCheckList[id], item.fn);
						if (bl && !res) {
							bl = false;
						}
					})
				}

				return bl;
			}
		}
	})()

	var MyCheckForm = function (o) {
		$.MyCheckForm.init(o);
	}

	MyCheckForm.prototype.validate = function () {
		return $.MyCheckForm.validate();
	}

	if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(MyCheckForm);
    } else {
        window.MyCheckForm = MyCheckForm;
    }
})(window, document);