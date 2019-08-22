/*****************************封装获取节点对象*********************************/
/*
作用：封装document.getElementById让其简单使用
参数：id->查找的对象id
返回值：该id所对应的对象
*/
function $(str,obj) {
	if(str[0] == "#") {
		var id = str.slice(1);
		return document.getElementById(id);
	} else if(str[0] == ".") {
		var className = str.slice(1);
		return getByClass(className);
	} else if(obj != undefined){
		return obj.getElementsByTagName(str);
	} else {
		alert("$调用错误，通过id选择加#,通过class选择加.，通过tagName选择需要加上父节点");
	}
}
/*****************************获取style样式属性值*********************************/
/*
作用：获取指定对象的指定样式
参数：obj->需要获取样式的对象、name->样式名
返回值：样式值
*/
function getStyle(obj,name) {
	if(window.getComputedStyle) {
		return getComputedStyle(obj,null)[name];
	} else {
		return obj.currentStyle[name];
	}
}
/**************************************************************/
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
/****************************通过Class获取节点对象**********************************/
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
/******************************清除pNode的空子节点********************************/
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
/*******************************在节点后面添加一个兄弟节点*******************************/
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
/********************************获取鼠标按下是哪一个键******************************/
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
/*********************************多人开发时的事件监听函数封装*****************************/
//兼容版事件监听函数
function addEvent(target,type,fn) {
	if(target.addEventListener) {
		//寻常浏览器
		target.addEventListener(type,fn);
	} else if(target.attachEvent) {
		//ie低版本兼容
		target.attachEvent("on"+type,fn);
	} else {
		//ie5兼容
		target["on"+type] = fn;
	}
}
/***********************************移出事件监听***************************/
//兼容版移除事件监听函数
function removeEvent(target,type,fn) {
	if(target.removeEventListener) {
		target.removeEventListener(type,fn);
	} else if(target.detachEvent) {
		target.detachEvent("on"+type,fn);
	} else {
		target["on"+type] = null;
	}
}
/************************************封装AJAX**************************/
/*
作用：封装AJAX请求
参数：o -> 代表一个对象，该对象为
		o{method:"get",                      [可选] 默认"get"
		url:"test.html",					  必填
		data:{key1:value1,key2:value2},      [可选]
		isAsync:true,						 [可选] 默认"true"
		headerData:{key1:value1,key2:value2},[可选]
		success:function(data){},            [可选]
		error:function(data){}               [可选]
		}
*/
function ajax(o) {
	//1、创建AJAX对象
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//2、连接服务器
	if(!o.method) {
		o.method = "get";
	}
	if(!(typeof o.isAsync == "boolean")){
		o.isAsync = true;
	}
	if(o.method.toLowerCase() == "get") {
		//get方式发送请求
		o.url = o.url+"?t="+new Date().getTime();
		if(o.data) {
			o.url = o.url+"&"+urlParamsHandler(o.data);
		}
		xhr.open("get",o.url,o.isAsync);
		if(o.headerData) {
			for(var key in o.headerData) {
				xhr.setRequestHeader(key,o.headerData[key]);
			}
		}
		//3、发送数据
		xhr.send();
	} else {
		xhr.open("post",o.url,o.isAsync);
		//post方式发送请求
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		if(o.headerData) {
			for(var key in o.headerData) {
				xhr.setRequestHeader(key,o.headerData[key]);
			}
		}
		//3、发送数据
		xhr.send(urlParamsHandler(o.data));
	}
	//4、接收数据
	if(o.isAsync) {
		//异步处理
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					if(o.success) {
						o.success(xhr.responseText);
					}
				} else {
					if(o.error) {
						o.error(xhr.status);
					}
				}
			}
		}
	} else {
		//同步处理
		if(xhr.status == 200) {
			if(o.success) {
				o.success(xhr.responseText);
			}
		} else {
			if(o.error) {
				o.error(xhr.status);
			}
		}
	}
}
//url参数处理
// params 参数 handler处理
function urlParamsHandler(data) {
	var result = [];
	for(var key in data) {
		result.push(encodeURIComponent(key)+"="+encodeURIComponent(data[key]));
	}
	return result.join("&");
}

/****************************************封装Cookie的增删改查****************************************/
/*
作用：封装cookie的增和改
参数：name->当前这条cookie的名称，value->当前cookie的值，day->当前cookie存在的天数为0或为空则为有效时间是当前会话，path->为当前cookie的有效路径不设则为根路径/
*/
function setCookie(name,value,day,path) {
	var result = "";
	result += encodeURIComponent(name)+"="+encodeURIComponent(value);
	if(day) {
		var date = new Date();
		date.setDate(date.getDate()+day);
		result += "; expires="+date;
	}
	if(path) {
		result += "; path="+path;
	} else {
		result += "; path=/";
	}
	document.cookie = result;
}

/*
作用：通过传key值，返回需要的当前key的value值，即封装cookie的查
参数：name->cookie中的key值
返回：有则返回value，无则返回""空
调用方法 console.log(getCookie("phone"));
*/
function getCookie(name) {
	var cookieTxt = decodeURIComponent(document.cookie);
	var arr = cookieTxt.split("; ");
	for(var i=0; i<arr.length; i++) {
		var arr1 = arr[i].split("=");
		if(arr1[0] == name) {
			return arr1[1];
		}
	}
	return "";
}

/*
作用：封装cookie的删
参数：name->需要删除的cookie的名称
*/
function removeCookie(name) {
	setCookie(name,"",-1);
}

/******************************运动函数***********************************/
/*
obj->对象
json->运动过程中变化的属性，如：opacity透明度、width宽度、height高度、left、top等
fn->运动结束后调用的函数
*/
function startMove(obj,json,fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bStop = true;//当bStop为true时结束运动
		//对json进行遍历,对每一项需要变化的属性都进行运动
		for(var attr in json) {
			//获取当前变化属性的值
			var iCur = 0;
			//当要改变的是透明度的时候其值用1到100之间的，如opacity:50
			if(attr == "opacity") {
				var iCur = parseInt(parseFloat(getStyle(obj.attr)*100));
			} else {
				iCur = parseInt(getStyle(obj,attr));
			}

			//计算速度
			var iSpeed = (parseFloat(json[attr])-iCur)/8;
			iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			//检测停止
			if(iCur != parseFloat(json[attr])) {
				bStop = false;
				if(attr == "opacity") {
					obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")";
					obj.style.opacity = (iCur+iSpeed)/100;
				} else {
					obj.style[attr] = iCur+iSpeed+"px";
				}
			}
		}
		if(bStop) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	},30);
}