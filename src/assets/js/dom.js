
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
