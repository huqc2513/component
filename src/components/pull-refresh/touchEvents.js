const on = (function () {
  if ( document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener (event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent ('on' + event, handler);
      }
    };
  }
}) ();

class TouchEvent {
  constructor (el, vue) {
    this.eventType = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
    };
    this.vueInstance = vue;
    this.el = el
    this.isPhone = this.isPhone()

    if (!this.isPhone) {
      this.eventType.start = 'mousedown';
      this.eventType.move = 'mousemove';
      this.eventType.end = 'mouseup';
    }

    this.isHTMLElement = el instanceof HTMLElement;
   

    this.initListener ();


  }

  start = e => {

    if (this.vueInstance.startFlag == true) {
      return;
    }else{
      this.vueInstance.startFlag = true
    }
    let touch={}
    if(this.isPhone){
       touch = e.touches[0];
    }else{
      touch.pageX = e.pageX || 0
      touch.pageY = e.pageY || 0 
    }
    this.vueInstance.touch.pageX = touch.pageX;
    this.vueInstance.touch.pageY = touch.pageY;
 

  



  };

  move = (e) => {

    if(!this.vueInstance.startFlag){
        return 
    }
    let touch={}

    if(this.isPhone){
      touch = e.touches[0];
    }else{
      touch.pageY = e.pageY || 0
      touch.pageX = e.pageX || 0
    }


    if (touch.pageY - this.vueInstance.touch.pageY >= 0 === false) {
      return;
    }

    this.vueInstance.$pullRefreshContentEl.style['transition-property'] = 'null';
    this.vueInstance.$pullContentEl.style['transition-property'] = 'null';


    let distX = Math.abs (touch.pageX - this.vueInstance.touch.pageX);
    let distY = Math.abs (touch.pageY - this.vueInstance.touch.pageY);

    if (this.vueInstance.$pullRefreshContentEl && this.vueInstance.$pullContentEl) {
      if (this.vueInstance.pageY <= distY) {
        let shrinkPercent = distY / window.innerHeight;

        distY = this.vueInstance.pageY + this.vueInstance.pageY * shrinkPercent;
        this.vueInstance.touch.distY = distY;
        this.vueInstance.$nextTick (() => {
          if (this.vueInstance.pullStatus != 1) {
            this.vueInstance.pullStatus = 1;
          }
        });
      } else {
        this.vueInstance.pullStatus = 0;
      }

      this.vueInstance.$pullRefreshContentEl.style[
        'transform'
      ] = `translate3d(0,${distY}px,0)`;
      this.vueInstance.$pullContentEl.style['transform'] = `translate3d(0,${distY}px,0)`;
      this.vueInstance.$pullRefreshContentEl.style['transition-duration'] = 0;
      this.vueInstance.$pullContentEl.style['transition-duration'] = 0;
    }
  };

  end = e => {

    console.error(3)
    this.vueInstance.$nextTick (() => {
      this.vueInstance.startFlag  = false
      if (this.vueInstance.pullStatus === 1) {
        this.vueInstance.pullStatus = 3;

        function resetPaint () {
          let distY = this.vueInstance.$pullRefreshContentEl.offsetHeight;
          this.vueInstance.$pullRefreshContentEl.style['transition-duration'] = '0.2s';
          this.vueInstance.$pullRefreshContentEl.style['transition-property'] = 'all';
          this.vueInstance.$pullRefreshContentEl.style[
            'transform'
          ] = `translate3d(0,${distY}px,0)`;
          this.vueInstance.$pullContentEl.style['transition-duration'] = '0.3s';
          this.vueInstance.$pullContentEl.style['transition-property'] = 'all';
          this.vueInstance.$pullContentEl.style[
            'transform'
          ] = `translate3d(0,${distY}px,0)`;
        }
        resetPaint.call(this);

        this.vueInstance.$emit('pullingDown');
      } else {
        this.vueInstance.recall ();
      }
    });
  };

  isPhone = () => {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test (navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  };

  initListener () {
 

    if (this.isHTMLElement) {
      on(this.el, this.eventType.start, this.start);
      on(this.el, this.eventType.move, this.move);
      on(this.el, this.eventType.end, this.end);
    }
  }
}

export default TouchEvent