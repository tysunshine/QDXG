import '../static/css/common.css';
import page1Cmp from '../pages/page1/page1.js';

const Page1 = function () {
	var app = document.getElementById('app');
	app.innerHTML = page1Cmp.tpl;
	page1Cmp.init();
}

Page1();