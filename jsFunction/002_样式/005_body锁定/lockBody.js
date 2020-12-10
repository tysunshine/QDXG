/**
 *锁定body，设置body的overflow为hidden
 *data-false表示还原body的状态，其它或不传为锁定
 */
function lockBody (data) {
  var dom = document.body;
  if (data === false) {
    let originStyle = dom.getAttribute('origin-style');
    if (originStyle) {
      if (originStyle == 'null') {
        dom.removeAttribute('style');
      } else {
        dom.setAttribute('style', originStyle);
      }
      dom.removeAttribute('origin-style');
    }
  } else if (dom.style.overflow != 'hidden') {
    let originStyle = dom.getAttribute('style');
    // 判断是否存在style，存在则style末尾添加overflow:hidden，不存在这则设置style.overflow
    if (originStyle) {
      dom.setAttribute('style', originStyle[originStyle.length-1] == ';' ? originStyle+'overflow:hidden;' : ';overflow:hidden;');
    } else {
      dom.style.overflow = 'hidden';
    }
    dom.setAttribute('origin-style', originStyle || 'null');
  }
}