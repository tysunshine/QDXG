;(function ($, window, document) {
	/**
	 滚动数字构造函数，
	 可以隔几秒调用setNum方法设置新数，
	 但是时间间隔必须大于4秒，不然会被忽略掉哈！
	 obj -> 设置滚动的节点
	 options.deVal -> 初始值
	 options.className -> 样式名
	 ScrollNumber.setNum(num) -> 设置值的方法
	 */
	function ScrollNumber (obj, options) {
		var defaults = {
			deVal: 0,       			//传入值
	        className:'data-nums',   	//样式名称
		}

		if (obj.length == 0) {
			return;
		}
		this.obj = obj;					// 对象
		this.options = $.extend(defaults, options);
		this.options.deVal = '' + this.options.deVal;
		this.options.digit = 0;			// 显示的数据位数

		this.time = 0;	// 用于记录两次数字滚动间隔时间

		this.initHtml();
	}

	ScrollNumber.prototype = {
		initHtml: function () {
			var html = '<div class="' + this.options.className + '"></div>';
			this.obj.html(html);

			this.setNumHtml();
			this.setNum(this.options.deVal);
		},

		// 设置数字
		setNumHtml: function () {
			var valLen = this.options.deVal.length;
			if (valLen == this.options.digit) {
				return false;

			} else if (valLen > this.options.digit) {
				var html = '';
				for (var i = 0; i < valLen - this.options.digit; i++) {
					html += '<div class="item">' +
					'			<div class="num-group">' +
					'				<span class="num0">0</span>' +
					'				<span class="num1">1</span>' +
					'				<span class="num2">2</span>' +
					'				<span class="num3">3</span>' +
					'				<span class="num4">4</span>' +
					'				<span class="num5">5</span>' +
					'				<span class="num6">6</span>' +
					'				<span class="num7">7</span>' +
					'				<span class="num8">8</span>' +
					'				<span class="num9">9</span>' +
					'				<span class="num0">0</span>' +
					'				<span class="num1">1</span>' +
					'				<span class="num2">2</span>' +
					'				<span class="num3">3</span>' +
					'				<span class="num4">4</span>' +
					'				<span class="num5">5</span>' +
					'				<span class="num6">6</span>' +
					'				<span class="num7">7</span>' +
					'				<span class="num8">8</span>' +
					'				<span class="num9">9</span>' +
					'			</div>' +
					'		</div>';
				}
				this.obj.find('.' + this.options.className).append(html);

			} else {
				var oItem = this.obj.find('.' + this.options.className + ' .item');
				for (var i = 0; i < this.options.digit - valLen; i++) {
					oItem.eq(i).remove();
				}
			}
			this.options.digit = valLen;

			this.setDotHtml();
		},

		// 设置点
		setDotHtml: function () {
			this.obj.find('.' + this.options.className + ' .dot').remove();

			var oItem = this.obj.find('.' + this.options.className + ' .item');
			for (var i = 0; i < oItem.length; i++) {
				if ((i + 1) % 3 == 0 && i < oItem.length -1) {
					var html = '<div class="dot">,</div>';
					oItem.eq(oItem.length - (i + 1)).before(html);
				}
			}
		},

		setNum: function (number) {
			var time = new Date().getTime();
			if (time - this.time < 4 * 1000) {
				return false;
			}
			this.time = time;

			if (number.length != this.options.digit) {
				this.options.deVal = '' + number;
				this.setNumHtml();
			}

			var $num_item = this.obj.find('.' + this.options.className).find('.num-group');
            var h = this.obj.find('.item').innerHeight();
          
            $num_item.css('transition','all 2s ease-in-out');
            var numberStr = number.toString();
            if(numberStr.length <= $num_item.length - 1){
                var tempStr = '';
                for(var a = 0; a < $num_item.length - numberStr.length; a++){
                    tempStr += '0';
                }
                numberStr = tempStr + numberStr;
            }

            var numberArr = numberStr.split('');
            $num_item.each(function(i, item) {
                var oItem = $num_item.eq(i);
                var oldNum = Math.abs(parseInt(oItem.css('top')) / h);
                var newNum = numberArr[i]
                if (oldNum != newNum) {
	                var iTop = -parseInt(numberArr[i])*h;
	                if (newNum < oldNum) {
	                	iTop = -parseInt(numberArr[i])*h - h*10;
	                }
	                $num_item.eq(i).css('top', iTop + 'px');
	                setTimeout(function () {
	                	$num_item.eq(i).css("transition", "none");
	                	$num_item.eq(i).css('top', -parseInt(numberArr[i])*h + 'px');
	                }, 3000);
                }
            });
		},
	}

	window.ScrollNumber = ScrollNumber;
})(jQuery, window, document);