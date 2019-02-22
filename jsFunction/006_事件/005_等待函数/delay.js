(function (window, document) {

	/**
	 * 等待执行函数
	 * 可以用来链式执行动画
	 * time -> 最低的等待时间，默认30毫秒
	 */
	function Delay (time) {
		this._itime = this._or_itime = parseInt(time) > 0 ? parseInt(time) : 30;
		this._do = [];
	}

	Delay.prototype._resolve = function () {
		if ( this._do.length > 0 ) {
			this._do[0]();
			this._do.shift();
		}
	}

	/**
	 * 设置下一次事件需要等待的事件
	 */
	Delay.prototype.time = function (time) {
		time = parseInt(time);
		this._itime = time > 0 ? time : this._or_itime;
		return this;
	}

	/**
	 * 向事件列表中加入事件
	 */
	Delay.prototype.then = function (fn) {
		var _this = this;
		
		if ( typeof fn !== 'function' ) {
			return this;
		}

		var itime = this._itime;
		this._itime = this._or_itime;
		function doFn () {
			setTimeout(function () {
				fn();
				_this._resolve();
			}, itime);
		}
		
		this._do.push(doFn);
		return this;
	}

	/**
	 * 开始执行事件列表中的事件
	 */
	Delay.prototype.do = function () {
		if ( this._do.length > 0 ) {
			this._resolve();
		}
	}

	window.Delay = Delay;
})(window, document);