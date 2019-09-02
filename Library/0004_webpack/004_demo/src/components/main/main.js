
import tpl from './main.html';
import './main.scss';

import sidebarCmp from '../sidebar/sidebar.js';
import indexCmp from '../index/index.js';
import recordCmp from '../record/record.js';


var main = {
	name: "main",
	tpl: tpl,
	routes: {},		
	init () {
		this.routes = {
			index: indexCmp,
			record: recordCmp
		}

		this.oSidebar = document.querySelector('.main-container > .sidebar');
		this.oMain = document.querySelector('.main-container > .main');

		this.oSidebar.innerHTML = sidebarCmp.tpl();
		sidebarCmp.init((route) => {
			this.setMain(route);
		});
		this.setMain('index');
	},

	setMain (route) {
		if (route in this.routes) {
			this.oMain.innerHTML = this.routes[route].tpl;
		}
	}
}


export default main;
