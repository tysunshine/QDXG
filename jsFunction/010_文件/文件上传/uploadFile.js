
// vue 文件上传，上传中

import axios from 'axios'

import { Loading, Message } from 'element-ui';
import portAddress from '../../portAddress.js';


const origin = {
	url: 'fs/file/upload', // 默认的url上传地址
	type: [], // 文件类型 数组['image/jpeg', 'image/png']  参考 https://blog.csdn.net/weixin_43648947/article/details/89216622
	typeError: '上传文件类型错误',
	size: 5, // 文件限制大小MB，不限制大小设置为null
	loadtext: '正在上传中', // 上传百分比文本前缀
	param: {
		file: null, // 上传文件参数，file是一定要有的
	},
	success: null, // 成功函数
}

const uploadFile = function (option) {
	option = Object.assign(origin, option || {});

	var file = option.param.file
	if (!file) {
		return;
	}

	// 文件类型判断
	var type = file.type;
	if (option.type && (typeof option.type == 'string')) {
		option.type = [option.type];
	}
	if (option.type instanceof Array && option.type.length && option.type.indexOf(type) == -1) {
		Message.error(option.typeError);
		return;
	}

	// 文件大小判断
	if (option.size && file.size > option.size*1024*1024) {
		Message.error('文件大小不能超过'+ option.size + 'MB');
		return;
	}

	var formData = new FormData();
	for (var key in option.param) {
		formData.append(key, option.param[key]);
	}

	let loadingInstance = Loading.service({
		text: option.loadtext
	});

	axios({
		method: 'POST',
		url: portAddress.port + option.url,
		data: formData,
		headers: {
			'Content-Type':'multipart/form-data'
		},
		responseType: type || '', // 返回类型
		onUploadProgress: progressEvent => {
			let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
			loadingInstance.text = option.loadtext + ' ' + complete;
		}
	}).then(res => {
		loadingInstance.close();
		res = res.data;
		if (res.resultCode == "SUCCESS") {
			if (option.success) {
				option.success(res.data);
			}
		}
	}).catch(err => {
		loadingInstance.close();
	})
}

export default uploadFile;

