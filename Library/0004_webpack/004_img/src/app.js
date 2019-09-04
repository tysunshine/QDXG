require('./components/index/index.css');
var indexTpl = require('./components/index/index.html');

function App () {
	document.getElementById('app').innerHTML = indexTpl;
}

App();
