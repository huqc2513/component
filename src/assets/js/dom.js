
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}


let vendor = (() => {
  /* istanbul ignore if */
  // if (!inBrowser) {
  //   return false
  // }

  let elementStyle = document.createElement('div').style
  let transformNames = {
    standard: 'transform',
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  /* istanbul ignore next */
  return false
})()


export function prefixStyle(style) {
  /* istanbul ignore if */
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    if (style === 'transitionEnd') {
      return 'transitionend'
    }
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}



export function niceIn(prop){
  prop.find('i').addClass('niceIn');
  setTimeout(function(){
    prop.find('i').removeClass('niceIn');
  },1000);
}



export   function toggleBody(isPin){

  if(isPin){
    document.body.style.height = '100vh'
    document.body.style['overflow-y'] = 'hidden'
  }
  else{
    document.body.style.height = 'unset'
    document.body.style['overflow-y'] = 'auto'

  }
}





export function getMatchedTarget(e, targetClassName) {
  let el = e.target

  while (el && !hasClass(el, targetClassName)) {
    if (el === e.currentTarget) return null
    el = el.parentNode
  }

  return el
}




 export function findIndex(ary, fn) {

   //如果有findIndex  返回fn的return 给findindex
  if (ary.findIndex) {
      return ary.findIndex(fn)
  }
  let index = -1
  ary.some(function (item, i, ary) {
      const ret = fn.call(this, item, i, ary)
      if (ret) {
      index = i
      return ret
      }
  })
    return index
  }

export function offset(node) {
  if(!node) return false
  var offest = {
    top: 0,
    left: 0
  };
  // 当前为IE11以下, 直接返回{top: 0, left: 0}
  if (!node.getClientRects().length) {
    return offest;
  }
  // 当前DOM节点的 display === 'node' 时, 直接返回{top: 0, left: 0}
  if (window.getComputedStyle(node)['display'] === 'none') {
    return offest;
  }
  // Element.getBoundingClientRect()方法返回元素的大小及其相对于视口的位置。
  // 返回值包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
  // 返回如{top: 8, right: 1432, bottom: 548, left: 8, width: 1424…}
  offest = node.getBoundingClientRect();
  var docElement = node.ownerDocument.documentElement;

  return {
    top: offest.top + window.pageYOffset - docElement.clientTop,
    left: offest.left + window.pageXOffset - docElement.clientLeft,
    right:offest.right
  }
}
