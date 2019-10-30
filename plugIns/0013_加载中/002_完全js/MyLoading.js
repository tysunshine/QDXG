/**
 * 加载中弹窗
 * MyLoading.show() -> 显示弹窗
 * MyLoading.close() -> 关闭弹窗
 */
;(function (window, document) {
	var MyLoading = {
		timer: null, // 计时器对象

		imgColor: '#87CEFF',
		fontColor: '#87CEFF',
		text: '请稍候',

		show: function (option) {
			var _this = this;
			var tips = document.getElementById('MyloadingBox');
			if (tips) {
				return false;
			}

			if (typeof option == 'string') {
				this.text = option;

			} else if (option) {
				this.imgColor = option.imgColor || this.imgColor;
				this.fontColor = option.fontColor || this.fontColor;

				this.text = option.text || this.text;
			}


			// 模态框
			tips = document.createElement('div');
			tips.id = 'MyloadingBox';
			tips.style.position = 'fixed';
			tips.style.zIndex = 9998;
			tips.style.top = 0;
			tips.style.left = 0;
			tips.style.bottom = 0;
			tips.style.right = 0;
			tips.style.background = 'rgba(0, 0, 0, 0.1)';

			// 动画容器
			var loadingBox = document.createElement('div');
			loadingBox.style.position = 'absolute';
			loadingBox.style.top = '50%';
			loadingBox.style.left = 0;
			loadingBox.style.marginTop = '-60px';
			loadingBox.style.width = '100%';
			tips.appendChild(loadingBox);

			// 动画图片
			// 改变path的fill属性可以改变颜色
			var loadingImg = document.createElement('div');
			loadingImg.style.display = 'block';
			loadingImg.style.margin = '0 auto';
			loadingImg.style.width = '60px';
			loadingImg.style.height = '60px';
			loadingImg.style.transition = 'all 3000ms linear';
			loadingImg.style.oTransition = 'all 3000ms linear';
			loadingImg.style.msTransition = 'all 3000ms linear';
			loadingImg.style.mozTransition = 'all 3000ms linear';
			loadingImg.style.webkitTransition = 'all 3000ms linear';
			loadingImg.style.transform = 'rotate(0)';
			loadingImg.style.otransform = 'rotate(0)';
			loadingImg.style.mstransform = 'rotate(0)';
			loadingImg.style.moztransform = 'rotate(0)';
			loadingImg.style.webkittransform = 'rotate(0)';
			loadingImg.innerHTML = '<svg class="icon" width="100%" height="100%" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="' + this.imgColor + '" d="M256 513.422c0 14.222-12.8 27.022-27.022 27.022H27.022C11.378 540.444 0 527.644 0 513.422V512c0-15.644 12.8-27.022 27.022-27.022h201.956C243.2 483.556 256 496.356 256 510.578v2.844zM1024 513.422c0 15.645-12.8 27.022-27.022 27.022H795.022c-15.644 0-27.022-12.8-27.022-27.022V512c0-15.644 12.8-27.022 27.022-27.022h200.534c15.644 0 27.022 12.8 27.022 27.022l1.422 1.422zM540.444 228.978c0 14.222-12.8 27.022-27.022 27.022H512c-15.644 0-28.444-12.8-28.444-27.022V27.022c0-15.644 12.8-27.022 27.022-27.022H512c15.644 0 27.022 12.8 27.022 27.022v201.956h1.422zM540.444 996.978c0 15.644-12.8 27.022-27.022 27.022H512c-15.644 0-27.022-12.8-27.022-27.022V795.022c0-15.644 12.8-27.022 27.022-27.022h1.422c15.645 0 27.022 12.8 27.022 27.022v201.956zM329.956 331.378c-11.378 11.378-28.445 11.378-38.4 0L149.333 189.156c-11.377-11.378-11.377-28.445 0-38.4l1.423-1.423c11.377-11.377 28.444-11.377 38.4 0l142.222 142.223c11.378 9.955 11.378 28.444-1.422 39.822zM873.244 874.667c-11.377 11.377-28.444 11.377-38.4 0L692.622 732.444c-11.378-11.377-11.378-28.444 0-38.4l1.422-1.422c11.378-11.378 28.445-11.378 38.4 0l142.223 142.222c11.377 9.956 11.377 28.445-1.423 39.823zM732.444 331.378c-11.377 11.378-28.444 11.378-38.4 0l-1.422-1.422c-11.378-11.378-11.378-28.445 0-38.4l142.222-142.223c11.378-11.377 28.445-11.377 38.4 0l1.423 1.423c11.377 11.377 11.377 28.444 0 38.4L732.444 331.378zM189.156 874.667c-11.378 11.377-28.445 11.377-38.4 0l-1.423-1.423c-11.377-11.377-11.377-28.444 0-38.4l142.223-142.222c11.377-11.378 28.444-11.378 38.4 0l1.422 1.422c11.378 11.378 11.378 28.445 0 38.4L189.156 874.667z" /></svg>';
			loadingBox.appendChild(loadingImg);

			// 文本提示
			var loadingTxt = document.createElement('div');
			loadingTxt.innerText = this.text;
			loadingTxt.style.color = this.fontColor;
			loadingTxt.style.fontSize = '14px';
			loadingTxt.style.lineHeight = 1;
			loadingTxt.style.textAlign = 'center';
			loadingTxt.style.fontWeight = 600;
			loadingTxt.style.letterSpacing = '2px';
			loadingTxt.style.marginTop = '15px';
			loadingBox.appendChild(loadingTxt);


			// 添加模态框到body中
			document.body.appendChild(tips);

			clearInterval(this.timer);
			setTimeout(function () {
				setImgAnimate();

				_this.timer = setInterval(function () {
					setImgAnimate();
				}, 3000);
			}, 30);

			// 设置图片动画
			var deg = 0;
			function setImgAnimate () {
				deg += 360;
				loadingImg.style.transform = 'rotate(' + deg + 'deg)';
				loadingImg.style.otransform = 'rotate(' + deg + 'deg)';
				loadingImg.style.mstransform = 'rotate(' + deg + 'deg)';
				loadingImg.style.moztransform = 'rotate(' + deg + 'deg)';
				loadingImg.style.webkittransform = 'rotate(' + deg + 'deg)';
			}
		},

		close: function () {
			clearInterval(this.timer);
			var loadingBox = document.getElementById('MyloadingBox');
			if (loadingBox) {
				document.body.removeChild(loadingBox);
			}
		}

	}

	window.MyLoading = MyLoading;
})(window, document);