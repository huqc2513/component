
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


