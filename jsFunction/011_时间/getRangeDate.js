/**
 *获取时间范围
 *@param {Number} value [代表选中时间范围的值]
 *依赖 	switchTime 格式化时间
 *		getDateByBeforeDays 获取多少天前时间
 */
function getRangeDate (value) {
	var date = new Date();
	var week = date.getDay() > 0 ? date.getDay() : 7;
	var year = date.getFullYear();
	var day =  date.getDate();

	var start = '', end = switchTime(date, 'yyyy-MM-dd');
	if (value) {
	if (value == 1) {
		end = '';
	} else if (value == 2) {
		start = getDateByBeforeDays(week-1, 'yyyy-MM-dd');
	} else if (value == 3) {
		start = getDateByBeforeDays(day-1, 'yyyy-MM-dd');
	} else if (value == 4) {
		start = year + '-01-01';
	}
	} else {
		end = '';
	}
	return [start, end];
}

