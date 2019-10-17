import './com-header.css';
import tpl from './com-header.ejs';

var oComHeader = {
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

export default oComHeader;
