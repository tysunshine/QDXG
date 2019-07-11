window.onload = function() {
	var oMove = $(".move")[0];
	var aWall = $(".wall");
	var stepSize = 30;//步长一次移动的长度
	document.onkeydown = function(evt) {
		var e = evt || window.event;
		var keyCode = e.keyCode;
		switch(keyCode) {
			case 37: isWall("left",oMove,stepSize); break;
			case 38: isWall("top",oMove,stepSize); break;
			case 39: isWall("right",oMove,stepSize); break;
			case 40: isWall("bottom",oMove,stepSize); break;
		}
	}

	//判断在其方向的下一步是否会碰到墙壁,并返回墙壁离其有多远
	/*
	参数：direction->方向，left、right、top、bottom
		obj->要移动的方块
		stepSize->一次要移动多远，步长
	*/
	function isWall(direction,obj,stepSize) {
		var isGo = true;
		
		switch(direction) {
			case "right": {
				for(var i=0; i<aWall.length; i++) {
					var inWallLeft = obj.offsetLeft+stepSize+obj.offsetWidth > aWall[i].offsetLeft;
					var inWallTop = obj.offsetTop+obj.offsetHeight > aWall[i].offsetTop;//表示移动块在墙里面
					var inWallBottom = obj.offsetTop < aWall[i].offsetTop+aWall[i].offsetHeight;//表示移动块在墙里面
					var inWallRight = obj.offsetLeft < aWall[i].offsetLeft+aWall[i].offsetWidth;
					if(inWallRight && inWallTop && inWallBottom && inWallLeft) {
						obj.style.left = aWall[i].offsetLeft-obj.offsetWidth+"px";
						isGo = false;
						break;
					}
				}
				//表示没有墙，照常移动
				if(isGo) {
					obj.style.left = obj.offsetLeft+stepSize+"px";
				}
			} break;
			case "bottom": {
				for(var i=0; i<aWall.length; i++) {
					var inWallLeft = obj.offsetLeft+obj.offsetWidth > aWall[i].offsetLeft;
					var inWallRight = obj.offsetLeft < aWall[i].offsetLeft+aWall[i].offsetWidth;
					var inWallTop = obj.offsetTop+obj.offsetHeight+stepSize > aWall[i].offsetTop;//表示移动块在墙里面
					var inWallBottom = obj.offsetTop < aWall[i].offsetTop+aWall[i].offsetHeight;//表示移动块在墙里面
					if(inWallTop && inWallRight && inWallLeft && inWallBottom) {
						obj.style.top = aWall[i].offsetTop-obj.offsetHeight+"px";
						isGo = false;
						break;
					}
				}
				if(isGo) {
					obj.style.top = obj.offsetTop+stepSize+"px";
				}
			} break;
			case "top": {
				for(var i=0; i<aWall.length; i++) {
					var inWallLeft = obj.offsetLeft+obj.offsetWidth > aWall[i].offsetLeft;
					var inWallRight = obj.offsetLeft < aWall[i].offsetLeft+aWall[i].offsetWidth;
					var inWallTop = obj.offsetTop+obj.offsetHeight > aWall[i].offsetTop;//表示移动块在墙里面
					var inWallBottom = obj.offsetTop-stepSize < aWall[i].offsetTop+aWall[i].offsetHeight;//表示移动块在墙里面
					if(inWallTop && inWallRight && inWallLeft && inWallBottom) {
						obj.style.top = aWall[i].offsetTop+aWall[i].offsetHeight+"px";
						isGo = false;
						break;
					}
				}
				if(isGo) {
					obj.style.top = obj.offsetTop-stepSize+"px";
				}
			} break;
			case "left": {
				for(var i=0; i<aWall.length; i++) {
					var inWallLeft = obj.offsetLeft+obj.offsetWidth > aWall[i].offsetLeft;
					var inWallTop = obj.offsetTop+obj.offsetHeight > aWall[i].offsetTop;//表示移动块在墙里面
					var inWallBottom = obj.offsetTop < aWall[i].offsetTop+aWall[i].offsetHeight;//表示移动块在墙里面
					var inWallRight = obj.offsetLeft-stepSize < aWall[i].offsetLeft+aWall[i].offsetWidth;
					if(inWallRight && inWallTop && inWallBottom && inWallLeft) {
						obj.style.left = aWall[i].offsetLeft+aWall[i].offsetWidth+"px";
						isGo = false;
						break;
					}
				}
				//表示没有墙，照常移动
				if(isGo) {
					obj.style.left = obj.offsetLeft-stepSize+"px";
				}
			} break;
		}
	}
}

