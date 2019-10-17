import tpl from './index.ejs';

import oComHeader from '../../components/com-header/com-header.js';
import oComFooter from '../../components/com-footer/com-footer.js';

var oIndex = {
	name: 'index',
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
		$('#app').html(this.tpl({
			comHeader: oComHeader.init(),
			comFooter: oComFooter.init()
		}))
	}
}

export default oIndex;