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
	console.log(o);
	//1、创建AJAX对象
	var xhr = null;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//验证属性是否存在
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
		//2、连接服务器
		xhr.open("get",o.url,o.isAsync);
		if(o.headerData) {
			for(var key in o.headerData) {
				xhr.setRequestHeader(key,o.headerData[key]);
			}
		}
		//3、发送数据
		xhr.send();
	} else {
		//2、连接服务器
		xhr.open("post",o.url,o.isAsync);
		//post方式发送请求
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		if(o.headerData) {
			for(var key in o.headerData) {
				xhr.setRequestHeader(key,o.headerData[key]);
			}
		}
		//console.log(urlParamsHandler(o.data));
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