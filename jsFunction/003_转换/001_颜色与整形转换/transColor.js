// 颜色转换为整数
function colorTransNumber (color) {
	if ( color ) {
        color = parseInt(color.split('#')[1], 16);
    } else {
        color = 16777215;
    }
    return color;
}

// 整数转为颜色
function numberTransColor (num) {
	num = parseInt(num);
    if ( !num || num < 0 || num > 16777215 ) {
        num = 16777215;
    }
    num = num.toString(16);
    if ( num.length < 6 ) {
        var l = 6 - num.length;
        for ( var i = 0; i < l; i++ ) {
            num = '0' + num;
        }
    }
    num = '#' + num;
    return num;
}
