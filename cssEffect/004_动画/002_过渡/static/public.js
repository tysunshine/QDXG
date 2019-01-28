window.onload = function () {
	var oList = document.querySelector('.items-list');
	var oItems = document.querySelectorAll('.items-list .item');
	var oTsBtn = document.querySelector('.ts-btn');
	var idx = 0;
	var lg = oItems.length;
	var iEnd = 0;
	var tsName = oList.getAttribute('tsname');

	oTsBtn.onclick = function () {
		if ( !tsName ) {
			return false;
		}
		if ( iEnd > 0 ) {
			return false;
		}
		iEnd = 2;

		var prev = idx;
		var next;
		idx + 1 >= lg ? next = idx = 0 : next = idx = idx + 1;

		delay(function () {
			oItems[prev].tsState = 'out';
			addClass(oItems[prev], tsName + '-out-start');
		}, function () {
			addClass(oItems[prev], tsName + '-out-end');
		})

		delay(function () {
			oItems[next].tsState = 'in';
			addClass(oItems[next], tsName + '-in-start');
		}, function () {
			addClass(oItems[next], tsName + '-in-end');
		})
	}

	for ( var i = 0; i < lg; i++ ) {
		(function (i) {
			oItems[i].addEventListener('webkitTransitionEnd', function () {
				var aDel = [tsName + '-out-start', tsName + '-out-end', tsName + '-in-start', tsName + '-in-end'];
				for ( var i = 0; i < aDel.length; i++ ) {
					if ( hasClass(this, aDel[i]) ) {
						delClass(this, aDel[i]);
					}
				}

				if ( this.tsState == 'out' ) {
					delClass(this, 'current');
				} else if ( this.tsState == 'in' ) {
					addClass(this, 'current');
				}

				iEnd--;
			})
		})(i)
	}
}

function delay (prevFn, nextFn, time) {
	prevFn();
	setTimeout(function () {
		nextFn();
	}, time || 30);
}