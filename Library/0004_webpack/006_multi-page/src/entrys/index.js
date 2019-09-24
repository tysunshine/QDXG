import '../static/css/common.css';
import indexCmp from '../pages/index/index.js';

const Index = function () {
	var app = document.getElementById('app');
	app.innerHTML = indexCmp.tpl;
	indexCmp.init();
}

Index();