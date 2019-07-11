
/*
作用：封装document.getElementById让其简单使用
参数：id->查找的对象id
返回值：该id所对应的对象
*/
function $(id) {
	return document.getElementById(id);
}

/*
作用：获取指定对象的指定样式
参数：obj->需要获取样式的对象、name->样式名
返回值：样式值
*/
function getStyle(obj,name) {
	if(window.getComputedStyle) {
		return   (obj,null)[name];
	} else {
		return obj.currentStyle[name];
	}
}

// function getByClass(oParent,className) {
// 	var aElm = oParent.getElementsByTagName("*");
// 	var arr = [];
// 	for(var i=0; i<aElm.length; i++) {
// 		if(aElm[i].className == className) {
// 			arr.push(aElm[i]);
// 		}
// 	}
// 	return arr;
// }
/*
作用：通过class获取对象并解决getElementsByClassName的兼容问题
参数：className->要获取对象的class属性值
返回值：class值为className的对象
*/
function getByClass(className) {
	var aElm = document.getElementsByTagName("*");
	var arr = [];
	for(var i=0; i<aElm.length; i++) {
		if(aElm[i].className == className) {
			arr.push(aElm[i]);
		}
	}
	return arr;
}

/*
作用：清除对象的空子对象
参数：pNode->需要清除空子对象的对象
*/
function removeWhiteNode(pNode) {
	var aChild = pNode.childNodes;
	for(var i=0; i<aChild.length; i++) {
		if(aChild[i].nodeType==3 && /^\s+$/.test(aChild[i].nodeValue) ) {
			pNode.removeChild(aChild[i]);
		}
	}
}

/*
作用：在对象后面插入一个对象
参数：newNode->要插入的对象、node->在该对象后面插入
*/
function insertAfter(newNode,node) {
	var pNode = node.parentNode;
	if(node == pNode.lastChild) {
		pNode.appendNode(newNode);
	} else {
		pNode.insertBefore(newNode,node.nextSibling);
	}
}

/*
作用：解决id低版本浏览器与主流浏览器之间的鼠标点解事件的event对象返回的值不同一般配合鼠标点击事件使用
参数：evt->点击事件触发是自动创建的对象
返回值：0->表示是左键、1->表示是中间、2->表示是右键
*/
function getButton(evt) { //跨浏览器左中右键单击相应
	var e = evt || window.event;
	if (evt) { //Chrome 浏览器支持 W3C 和 IE
		return e.button; //要注意判断顺序
	} else if (window.event) {//兼容ie
		switch(e.button) {
			case 1 :
				return 0;
			case 4 :
				return 1;
			case 2 :
				return 2;
		}
	}
}