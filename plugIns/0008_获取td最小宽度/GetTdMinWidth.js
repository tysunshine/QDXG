;(function (window, document) {
	var oGetTdMinWidth = {
		config: {
			fontSize: 14,	// 字体大小
			distance: 10,	// 预留间隔
			width: -1, 		// 设置最小宽度
			min: 90,		// 最小宽度
			max: 250,		// 最大宽度
			pl: 10,			// padding-left
			pr: 10,			// padding-right
		},
		key: {},		// 每个key的具体配置

		aMinWidth: [], // 最小值数组，和head数组一一对应
		timer: null, // 用于移除计算文本最小宽度的元素
		isEnter: false, // 是否进入了计算，10秒没进入就移除元素

		init: function (tableData, config) {

			if (!tableData) {
				return;
			}

			if (!config) {
		        config = {}
		    }

		    this.tableData = tableData;

		    // 字体
		    this.config.fontSize = config.fontSize || this.config.fontSize;

		    // 间隔
		    this.config.distance = config.distance || this.config.distance;

		    // 最小宽度
		    this.config.width = config.width || this.config.width;

		    // 最小值，可谓auto
		    this.config.min = config.min || this.config.min;

		    // 最大值，可为auto
		    this.config.max = config.max || this.config.max;

		    // padding-left
		    this.config.pl = (config.pl > 0 || (typeof config.pl == 'number' && !config.pl)) ? config.pl : this.config.pl;

		    // padding-right
		    this.config.pr = (config.pr > 0 || (typeof config.pr == 'number' && !config.pr)) ? config.pr : this.config.pr;

		    // 获取每个key的具体配置
		    this.key = this.getKey(config.key || {});

		    this.aMinWidth = [];
		    this.basisHeadMin(); // 根据head设置最小值
		    this.basisDataMin(); // 根据data设置最小值

		    return this.aMinWidth;
		},

		// 获取每个key的具体配置
		getKey: function (obj) {
			var res = {}

			for (var i = 0; i < this.tableData.head.length; i++) {
				var key = this.tableData.head[i].key;
				res[key] = JSON.parse(JSON.stringify(this.config));

				for ( var j in res[key]) {
					if (obj[key] && obj[key][j]) {
						res[key][j] = obj[key][j];
					}
				}
			}

			return res;
		},

		// 根据head设置最小值
		basisHeadMin: function () {
			for (var i = 0; i < this.tableData.head.length; i++) {
				var key = this.tableData.head[i].key;
				var text = this.tableData.head[i].name;
				var width = this.basisTextMin(key, text);

				this.aMinWidth.push(width);
			}
		},

		// 根据data设置最小值
		basisDataMin: function () {
			for (var i = 0; i < this.tableData.data.length; i++) {
				for (var j = 0; j < this.tableData.head.length; j++) {
					var key = this.tableData.head[j].key;
					var text = this.tableData.data[i][key];

					var width = this.basisTextMin(key, text);

					if (this.aMinWidth[j] < width) {
						this.aMinWidth[j] = width;
					}
				}
			}
		},

		// 根据文本判断最小值
		basisTextMin: function (key, text) {
			var _this = this;
			var oKey = this.key[key]; // key项的配置

			// 是否有自设置的最小宽度
			if (oKey.width != '-1') {
				return oKey.width;
			}

			var oCalc = document.getElementById('_calcMinWidthSpan');
	        if (!oCalc) {
	            oCalc = document.createElement('span');
	            oCalc.id = '_calcMinWidthSpan';
	            oCalc.style.visibility  = 'hidden';
	            oCalc.style.display = 'inline-block';
	            oCalc.style.whiteSpace = 'nowrap';
	            oCalc.style.position = 'fixed';
	            oCalc.style.top = 0;
	            oCalc.style.left = 0;
	            oCalc.style.zIndex =  -1000;
	            document.body.appendChild(oCalc);

	            clearInterval(this.timer);
	            this.timer = setInterval(function () {
	            	if (!_this.isEnter) {
	            		document.body.removeChild(oCalc);
						clearInterval(_this.timer);
	            	}
	            	_this.isEnter = false;
	            }, 1000)
	        }
	        
	        oCalc.style.fontSize = oKey.fontSize + 'px';
	        oCalc.innerText = text;
	        this.isEnter = true;

	        var res = oCalc.clientWidth + oKey.pl + oKey.pr + oKey.distance;
	        if (oKey.min != 'auto' && res < oKey.min) {
	            res = oKey.min;
	        }
	        if (oKey.max != 'auto' && res > oKey.max) {
	            res = oKey.max;
	        } 

	        return res;
		}
	}

	window.GetTdMinWidth = function (tableData, config) {
		return oGetTdMinWidth.init(tableData, config);
	}
})(window, document);