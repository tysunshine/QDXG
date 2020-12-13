(function (window, document) {
	const ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
		ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
		ieEDGE = navigator.userAgent.match(/Edge/g),
		ieVer = (ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));

	/**
	 *根据类型下载文件
	 *如果是url下载，不存在兼容问题
	 *如果是blob下载ie11使用msSaveOrOpenBlob，ie10及以下不能下载，其它浏览器无兼容问题
	 *@param {String} option.url [下载文件地址，或者二进制文件数据]
	 *@param {String} option.type [下载类型，默认url以路径形式下载，blob以二进制下载]
	 *@param {String} option.name [文件名称，默认'附件'，在blob下载时会用到]
	 */
	function downFile (option) {
		if (typeof option == 'string') {
			option = {
				url: option
			}
		}
		// param.data的类型，url链接、blob二进制
		if (!option.type) {
			option.type = 'url';
		}
		// 附件标题
		if (!option.name) {
			option.name = '附件';
		}
    // 请求参数
    if (!option.param) {
      option.param = {}
    }
    var aUrl = option.url.split('?');
    var sParam = aUrl[1];
    if (sParam) {
      var aParam = sParam.split('&');
      for (var i = 0; i < aParam.length; i++) {
        var item = aParam[i];
        var attr = item.split('=');
        option.param[attr[0]] = attr[1];
      }
    }
    option.url =  aUrl[0];

    if (option.type == 'url') {
      formdownload(option.url, option.param);
    } else if (option.type == 'blob') {
    	if (ie) {
    		if (ie11) {
    			window.navigator.msSaveOrOpenBlob(option.url, option.name);
    		} else {
    			window.alert('请更换高级或ie11以上版本浏览器');
    		}
    	} else {
    		const reader = new FileReader();
        reader.readAsDataURL(option.url); // 转换为base64，可以直接放入a标签href
        reader.onload = e => {
          adownload(option.name, e.target.result);
        };
    	}
    }
	}

  // 使用form表单下载无兼容问题
	function formdownload (url, param) {
    let form = document.createElement("form");
    form.setAttribute("style", "display:none");
    form.setAttribute("target", "_self");
    form.setAttribute("method", 'get');
    form.setAttribute("action", url);
    if (param) {
      for (var key in param) {
        let ipt = document.createElement("input");
        ipt.setAttribute("name", key);
        ipt.setAttribute("value", param[key]);
        form.appendChild(ipt);
      }
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

  // 使用a表单点击下载
  function adownload (title, url) {
    let link = document.createElement('a');
    link.style.display = 'none';
    link.download = title;
    link.href = url;
    // 触发点击
    document.body.appendChild(link);
    link.click();
    // 然后移除
    document.body.removeChild(link);
  }

  window.downFile = downFile;
})(window, document);