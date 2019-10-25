;(function ($, window, document) {

	var oCenterImg = {
		init: function ($dom, src) {
			this.data = {
				$dom: $dom, // 要居中图片的盒子对象
				$img: null, // 图片对象
				src: src, // 图片路径
			}

			this.loadImg(); // 加载图片
		},

		// 加载图片
		loadImg: function () {
			this.data.$img = $('<img src="' + this.data.src + '"/>');

			this.data.$img.on('load', function () {
				console.log($(this).width(), $(this).height());
			})
		}
	}

	$.fn.CenterImg = function (src) {
        this.each(function () {
            oCenterImg.init($(this), src)
        });
    };

})(jQuery, window, document);