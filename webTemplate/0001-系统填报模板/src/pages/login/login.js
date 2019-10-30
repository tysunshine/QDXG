import tpl from './login.ejs';
import './login.scss';

import {VALIDATE} from '../../static/lib/tools.js';
import MyLoading from '../../static/lib/MyLoading.js';
import MyMessage from '../../static/lib/MyMessage.js';

var oIndex = {

	tpl: tpl, // html模板

	dom: null, // 页面总盒子

	// 发送请求参数
	reqData: {
		user: '',
		pwd: ''
	},

	init () {
		this.initState();
	},

	initState () {

		this.initWebPage(); // 初始化页面结构

		this.dom = $('.login-box');

		this.initEvent();
	},

	initEvent () {
		var _this = this;

		this.dom.find('.submit-btn').on('click', function () {
			_this.setRequestData(); // 设置请求参数
			var bl = _this.checkData(); // 验证请求参数

			if (bl) {
				_this.sendLogin();
			}
		})
	},

	// 登陆
	sendLogin () {
		MyLoading.show();
		setTimeout(() => {
			MyLoading.close();
			location.href = './index.html';
		}, 1000);
	},

	// 设置请求参数
	setRequestData () {
		this.reqData.user = this.dom.find('#userIpt').val();
		this.reqData.pwd = this.dom.find('#pwdIpt').val();
	},

	// 验证请求参数
	checkData () {
		var message = VALIDATE.userName(this.reqData.user) || VALIDATE.password(this.reqData.pwd);

		if (message) {
			MyMessage(message);
		}

		return !message;
	},

	// 初始化页面结构
	initWebPage () {
		$('#app').html(this.tpl())
	}
}

export default oIndex;