/**
 *格式化时间
 *@param {String} time [可以new Date()的时间]
 *@param {String} format [时间格式化类型
		yyyy			年
		M				月		不用补0
		MM				月		需要补0
		W 				周		不用补0
		WW				周		需要补0
		d 				日		不用补0
		dd				日		需要补0
		H 				24小时	不用补0
		HH 				24小时	需要补0
		h 				12小时	不用补0
		hh 				12小时	需要补0
		m 				分		不用补0
		mm 				分		需要补0
		s 				秒		不用补0
		ss 				秒		需要补0
		timestamp 		时间戳
		
		例子：yyyy年MM月dd日 HH:mm:ss
 	]
 */
 function switchTime (time, format) {
 	time = time || '';
	format = format ? format : 'yyyy年MM月dd日 HH:mm:ss';

	var res = format;

	var date = new Date(time);
	var timestamp = date.getTime(),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hours = date.getHours(),
		minutes = date.getMinutes(),
		seconds = date.getSeconds(),
		week = date.getDay(); // 0是星期日
	var shortHours = hours > 12 ? hours - 12 : hours; // 短时间

	// 判断传入是否可以转换为时间
	if (!year) {
		return time;
	}

	// 替换时间戳
	res = res.replace(/timestamp/g, timestamp);

	// 替换年
	res = res.replace(/yyyy/g, year);

	// 替换月
	res = res.replace(/MM/g, makeUpNum(month));
	res = res.replace(/M/g, month);

	// 替换日
	res = res.replace(/dd/g, makeUpNum(day));
	res = res.replace(/d/g, day);

	// 替换时
	res = res.replace(/HH/g, makeUpNum(hours));
	res = res.replace(/H/g, hours);
	res = res.replace(/hh/g, makeUpNum(shortHours));
	res = res.replace(/h/g, shortHours);

	// 替换分
	res = res.replace(/mm/g, makeUpNum(minutes));
	res = res.replace(/m/g, minutes);

	// 替换秒
	res = res.replace(/ss/g, makeUpNum(seconds));
	res = res.replace(/s/g, seconds);

	// 替换周
	res = res.replace(/WW/g, makeUpNum(week));
	res = res.replace(/W/g, week);

	function makeUpNum (num) {
		return num < 10 ? '0' + num : num;
	}

	return res;
}