import './com-footer.css';
import tpl from './com-footer.ejs';

var oComFooter = {
	init () {
		this.setTpl();

		this.initState();
		this.initEvent();

		return this.tpl;
	},

	initState () {

	},

	initEvent () {

	},

	// 设置模板
	setTpl () {
		this.tpl = tpl();
	}
}

export default oComFooter;
