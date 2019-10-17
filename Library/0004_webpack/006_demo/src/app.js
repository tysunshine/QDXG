import './css/common.css';
import mainCmp from './components/main/main.js';

const App = function () {
	var app = document.getElementById('app');
	app.innerHTML = mainCmp.tpl;
	mainCmp.init();
}

App();