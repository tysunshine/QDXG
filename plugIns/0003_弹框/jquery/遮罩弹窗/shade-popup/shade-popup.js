
(function (window, document) {
	// 显示背景
	var showShade = function () {
		var oShade = $('._shade-popup._shade');
		if (oShade.length > 0) {
			return;
		}

		oShade = $('<div class="_shade-popup _shade"></div>');
		$('body').append(oShade);
		new Delay().then(function () {
			oShade.addClass('show')
		}).do();
	}
	var hideShade = function () {
		$('._shade-popup._shade').remove();
	}


	var showRecipel = function () {
		showShade();
	}

	var hideRecipel = function () {

	}

	window.shadepopup = {
		showRecipel: showRecipel,
		hideRecipel: hideRecipel
	}


})(window, document);

	





