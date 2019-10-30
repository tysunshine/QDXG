
/**
 * 验证
 */
export const VALIDATE = {

	// 空
	empty: /^\s*$/,

	/**
	 * 用户名
	 */
	userName (txt) {
		var message = '';
		if (this.empty.test(txt)) {
			message = '用户名不能为空';
		} else if (txt.trim().length < 2) {
			message = '用户名长度应大于2'
		}

		return message;
	},

	/**
	 * 密码
	 */
	password (txt) {
		var message = '';
		if (this.empty.test(txt)) {
			message = '密码不能为空';
		} else if (txt.trim().length < 6) {
			message = '密码长度应大于6'
		}

		return message;
	}
}


export default {
	VALIDATE,	// 验证
}

