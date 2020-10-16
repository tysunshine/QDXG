<template>
	<div class="com-editor-wp">
		<quill-editor class="editor" ref="myQuillEditor"
			v-model="content"
			:options="editorOption"
			@change="onEditorChange($event)">
		</quill-editor>
		<input v-show="false" ref="uploadEditorFile" type="file" :accept="fileAccept.join(',')" @change="uploadEditorFile">
	</div>
</template>
<script>

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Quill from 'quill'
import { quillEditor } from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', ImageResize)


import {richText} from '@/config/api.js';
var oFile = null;

export default {
	name: 'comEditor',
	data () {
		return {
			fileAccept: ['image/png','image/jpg','image/jpeg'], // 文件类型
			content: '',
			editorOption: {
				modules: {
					toolbar: {
						container: [
							["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
							[{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
							[{ script: "sub" }, { script: "super" }], // 上标/下标
							[{ indent: "-1" }, { indent: "+1" }], // 缩进
							[{ size: ["small", false, "large", "huge"] }], // 字体大小
							[{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
							[{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
							[{ font: [] }], // 字体种类
							[{ align: [] }], // 对齐方式
							["clean"], // 清除文本格式
							["link", "image", "video"] // 链接、图片、视频
						], //工具菜单栏配置
						handlers: {
							image: function(value) {
								if (value) {
									oFile.click();
								} else {
									this.quill.format("image", false);
								}
							},
						}
					},
					imageResize:{
                        displayStyles:{
                            backgroundColor:'black',
                            border:'none',
                            color:'white'
                        },
                        modules:['Resize','DisplaySize','Toolbar']
                    }
				},
				placeholder: '请输入发稿内容', //提示
			},
		}
	},
	props: {
		text: {
			default: '',
		},
	},
	watch: {
		text (val) {
			this.content = this.text;
		},
		content (val) {
			this.$emit('setContent', val);
		}
	},
	components: {
		quillEditor,
	},
	mounted () {
		this.content = this.text;
		oFile = this.$refs.uploadEditorFile;
	},
	methods: {
		// 富文本上传图片
		uploadEditorFile () {
			var files = oFile.files;
			if (!files.length || this.fileAccept.indexOf(files[0].type) == -1) {
				oFile.value = '';
				return false;
			}
			var formData = new FormData();
			formData.append('upfile', files[0]);

			this.$postFile(richText.richTextFile, formData).then(res => {
				if (res.result == 200 && res.data.urls.length) {

					let quill = this.$refs.myQuillEditor.quill;
					// 获取光标所在位置
					let length = quill.getSelection().index;
					// 插入图片  res.url为服务器返回的图片地址
					quill.insertEmbed(length, "image", res.data.urls[0]);
					// 调整光标到最后
					quill.setSelection(length + 1);

					oFile.value = '';
				}
			})
		},

		onEditorChange (editor) {
			this.content = editor.html;
		},

		clear () {
			this.content = '';
		}
	}
}
</script>
<style lang="scss">
.com-editor-wp {
	line-height: normal;
	.editor .ql-container {
		height: 400px;
	}
} 
</style>
