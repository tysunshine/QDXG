(function (win, doc) {

var lightCode = {
	init: function () {
		this.oPre = doc.getElementsByTagName('pre');

		this.initState();
	},

	initState: function () {
		for ( var i = 0; i < this.oPre.length; i++ ) {
			var oCode = this.oPre[i].children[0];
			var tmp = oCode.className;
			var innerHtml = oCode.innerHTML;

			switch(tmp) {
				case 'js': oCode.innerHTML = this.replaceJs(innerHtml); break;
				default: oCode.innerHTML = this.replaceHtml(innerHtml);
			}
		}
	},

	// 替换html
	replaceHtml: function (text) {
		var nameReg = /&lt;([a-zA-Z-_]+)\b/g;			// 元素名正则
		var attrnameReg = /\b([0-9a-zA-Z-_]+)=/g;		// 属性名正则
		var attrvalueReg = /(".+")/g;					// 属性值正则
		var textReg = /&gt;(.+)&lt;/g;					// 文本正则
		var endReg = /&lt;\/([a-zA-Z-_]+)&gt;/g;		// 元素结尾正则


		// 使用小于号(&lt;)分割
		var arr = text.split('&lt;');
		arr.shift();
		arr = arr.map(function (item) {
			return '&lt;' + item;
		})

		// 按=将属性与属性值切出来
		var brr = [];
		for ( var i = 0; i < arr.length; i++ ) {
			var res = arr[i].split(/(\b[a-zA-Z]+[a-zA-Z0-9-_]*="[a-zA-Z0-9-_\s]+")/);
			brr = brr.concat(res);
		}

		// 使用=分割
		var crr = [];
		for ( var i = 0; i < brr.length; i++ ) {
			var res = brr[i];
			if ( /="/.test(brr[i]) ) {
				res = brr[i].split('=');

				for ( var j = 0; j < res.length; j++ ) {
					if ( j < res.length-1 ) {
						res[j]+='=';
					}
				}
			}
			crr = crr.concat(res);
		}

		// 替换
		var drr = [];
		for ( var i = 0; i < crr.length; i++ ) {
			if ( nameReg.test(crr[i]) ) {
				drr.push(crr[i].replace(nameReg, '&lt;<span class="lc-name">$1</span>'));
			} else if ( attrnameReg.test(crr[i]) ) {
				drr.push(crr[i].replace(attrnameReg, '<span class="lc-attrname">$1</span>='));
			} else if ( attrvalueReg.test(crr[i]) ) {
				drr.push(crr[i].replace(attrvalueReg, '<span class="lc-attrvalue">$1</span>'));
			} else if (endReg.test(crr[i]) ) {
				drr.push(crr[i].replace(endReg, '&lt;/<span class="lc-name">$1</span>&gt;'));
			} else {
				drr.push(crr[i]);
			}
		}

		var res = drr.join('');
		res = res.replace(textReg, '&gt;<span class="lc-text">$1</span>&lt;');
		return res;
	},

	// 替换js
	replaceJs: function (text) {
		// /**/注释
		var noteReg1 = /(\/\*.*\*\/)/;
		// const、var、let、function、Array、Object、String、RegExp、Date、函数 等关键字
		var blueReg = /(\bconst\b|\bvar\b|\blet\b|\bfunction\b|\bArray\b|\bObject\b|\bString\b|\bRegExp\b|\bDate\b)/;
		// new、try、catch、for、if、else、do、while、switch、= < > + - * / %、&& || !、return、continue、break 等关键字
		var redReg = /(\bnew\b|\btry\b|\bcatch\b|\bfor\b|\bin\b|\bif\b|\belse\b|\bdo\b|\bwhile\b|\bswitch\b|\breturn\b|return;\b|\bcontinue\b|\bcontinue;\b|break\b|\bbreak;\b|=|&lt;|&gt;|\+|-|\*|\\|%|&&|\||!)/;
		// 数字
		var greenReg = /(\d+)/;
		// 字符串
		var purpleReg = /('.+'|".+"|`.+`|\/.+\/)/;

		// 分割注释

		// // 使用;分割字符串
		// var arr = [];
		// if ( /(;)/.test(text) ) {
		// 	arr = text.split(';');
		// 	for ( var i = 0; i < arr.length; i++ ) {
		// 		arr[i] += ';';
		// 	}
		// }

		// // 使用{}()分割字符串
		// var brr = [];
		// for ( var i = 0; i < arr.length; i++ ) {
		// 	var res = arr[i];
		// 	if ( /({|}|\(|\))/.test(arr[i]) ) {
		// 		res = arr[i].split(/({|}|\(|\))/);
		// 	}
		// 	brr = brr.concat(res);
		// }

		// // 分割1类关键字
		// var crr = [];
		// for ( var i = 0; i < brr.length; i++ ) {
		// 	crr = crr.concat(brr[i].split(blueReg));
		// }

		// // 分割2类关键字
		// var drr = [];
		// for ( var i = 0; i < crr.length; i++ ) {
		// 	drr = drr.concat(crr[i].split(redReg));
		// }

		// // 分割数字
		// var err = [];
		// for ( var i = 0; i < drr.length; i++ ) {
		// 	err = err.concat(drr[i].split(greenReg));
		// }

		// // 分割字符串
		// var frr = [];
		// for ( var i = 0; i < err.length; i++ ) {
		// 	frr = frr.concat(err[i].split(purpleReg));
		// }

		// var grr = [];
		// for ( var i = 0; i < frr.length; i++ ) {
		// 	var item = frr[i];
		// 	var res = '';
		// 	if ( blueReg.test(item) ) {
		// 		res = item.replace(blueReg, '<span class="lc-js-key1">$1</span>');
		// 	} else if ( redReg.test(item) ) {
		// 		res = item.replace(redReg, '<span class="lc-js-key2">$1</span>');
		// 	} else if ( greenReg.test(item) ) {
		// 		res = item.replace(greenReg, '<span class="lc-js-num">$1</span>');
		// 	} else if ( purpleReg.test(item) ) {
		// 		res = item.replace(purpleReg, '<span class="lc-js-str">$1</span>');
		// 	} else if ( item.length > 0 ) {
		// 		res = '<span class="lc-js-common">' + item + '</span>';
		// 	}
		// 	grr.push(res);
		// }
		// console.log(grr);

		return text;
	},

	joinJsReg: function (arr) {
		var str = '(';
		for ( var i = 0; i < arr.length; i++ ) {
			str += arr[i];
			if ( i < arr.length-1 ) {
				str += '|';
			} else {
				str+=')';
			}
		}
		var reg = new RegExp(str);
		return reg; 
	}
}

win.lightCode = lightCode;
})(window, document)