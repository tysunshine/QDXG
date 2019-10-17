import tpl from './login.ejs';
import './login.scss';

var oIndex = {
	name: 'login',
	init () {
		this.initState();
		this.initEvent();
	},

	initState () {
		this.tpl = tpl;

		this.initWebPage();
	},

	initEvent () {

	},

	// 初始化页面结构
	initWebPage () {
		$('#app').html(this.tpl())
	}
}

export default oIndex;