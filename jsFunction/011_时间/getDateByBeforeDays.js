
/**
 *获取多少天前时间
 *@param {Number} days [多少天前]
 *@param {String} format [返回数据的格式，默认'yyyy年MM月dd日 HH:mm:ss']
 */
function getDateByBeforeDays (days, format) {
	var time = new Date().getTime();
	return switchTime(time - days*24*60*60*1000, format);
}
