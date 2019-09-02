import headerTpl from './header.ejs';
import footerTpl from './footer.html';


function App () {
	var oHeader = document.querySelector('.header');
	var oFooter = document.querySelector(".footer");

	oHeader.innerHTML = headerTpl({
		list: ["你", "号", "world!"]
	})

	oFooter.innerHTML = footerTpl;
}

App();

