
import tpl from './sidebar.ejs';
import './sidebar.scss';

var list = [
	{name: '首页', route: 'index'},
	{name: '报表', route: 'record'}
]

var sidebar = {
	name: "sidebar",
	tpl: function (data) {
		if (data) {
			list = data;
		}
		
		return tpl({
			list: list
		})
	},
	init (setMain) {
		this.setMain = setMain;
		
		this.initState();
		this.initEvent();
	},

	initState () {
		this.oItem = document.querySelectorAll('.sidebar-container .item');
	},

	initEvent () {
		var _this = this;

		for (var i = 0; i < this.oItem.length; i++) {
			this.oItem[i].onclick = function () {
				var route = this.getAttribute('data-route');
				_this.setMain(route);
			}
		}
	}
}

export default sidebar;

