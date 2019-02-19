<template>

  <div @touchmove.stop.prevent="">

    <div class="measure-ruler-wrap" @touchstart.stop="_touchStart"  @touchmove.stop.prevent="_touchMove" @touchend="_touchEnd">
      <div class="bg-line" ref="measure">
        <div class="stick-wrapper" ref="stick" :style="style">
          <span class="left" ref="LeftStick"></span>
          <span class="right" ref="RightStick"></span>
        </div>
      </div>
    </div>

    <div>
      <p> start与end差13个值</p>
      <p>start : {{ this.startPoint>0  ? this.startPoint+ 17 : this.startPoint }}</p>
      <p>end : {{ this.endPoint ==0 ? this.endPoint -17 :this.endPoint }}</p>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        // url: require('../assets/images/q-lv-move.gif'),
        // swiperOption: {
        //   height: 380,
        //   speed: 500,//切换速度
        //   watchOverflow: true,
        //   loop: true,//开启循环模式
        //   spaceBetween: 30,
        //   // slidesPerView:2,
        //   preventClicksPropagation: true,//阻止click冒泡。拖动Swiper时阻止click事件。
        //   simulateTouch: false,//鼠标模拟手机触摸。默认为true，Swiper接受鼠标点击、拖动。
        //   pagination: '.swiper-pagination',
        //   onTap: (swiper, event) => {
        //     event.stopPropagation();
        //   }
        // },
        startPoint: 50,
        endPoint: 90,
        distX: 0,
        startPointWidthOfPercentage: 0,
        LeftStick: null,
        RightStick: null,
      }
    },
    computed: {
      style() {
        let style = {
          left: this.startPoint + '%',
          right: 100 - this.endPoint + '%',
        }
        return style
      }
    },
    mounted() {

      this.$nextTick(() => {
        this.measureWidth = this.$refs.measure.clientWidth
        this.startPointWidthOfPercentage = (this.$refs.LeftStick.clientWidth / this.measureWidth).toFixed(2) * 100
        // console.error('startPointWidthOfPercentage :' + this.startPointWidthOfPercentage)
        this.LeftStick = this.$refs.LeftStick
        this.RightStick = this.$refs.RightStick
      })

    },
    components: {},
    methods: {
      getOffsetPercentage(offsetLeft) {

        let distX = offsetLeft - this.$refs.measure.offsetLeft
        distX = distX / this.measureWidth
        distX = distX >= 1 ? 1 : distX <= 0 ? 0 : distX

        return distX
      },
      _getDirectionOffset(pageX, direction = 'left') {
        if (direction == 'right') {
          return (1 - (pageX / this.measureWidth)) * 100
        } else {
          return ((pageX / this.measureWidth)) * 100
        }
      },
      _touchStart() {
        if (this.isBeginTouch) {
          return
        }
        this.isBeginTouch = true
        const point = event.touches[0]
        this.distX = 0
        this.StartPagex = point.pageX

        this.LeftBoundary = parseInt((100 - this.startPoint - this.startPointWidthOfPercentage * 2))
        this.RightBoundary = parseInt((100 - this.endPoint - this.startPointWidthOfPercentage * 2))

        this.direction = this._getDirectionOffset(this.StartPagex, 'left') > this.startPoint ? 1 : 0

        this._setOffsetPercentage(this.direction , point.pageX)

      },
      _setOffsetPercentage(direction ,pagex) {

        let pointX
        //偏移百分比大于左边界点，则视为右移动
        if (direction === 1) {
          console.error('右边')
          pointX = this._getDirectionOffset(pagex, 'right')
          if (pointX <= 0) {
            pointX = 0
          }
          if (pointX >= this.LeftBoundary) {
            pointX = this.LeftBoundary - 1
          }
          this.endPoint = 100 - parseInt(pointX)
        }

        if (direction === 0) {

          if (this._getDirectionOffset(pagex, 'left') > this.endPoint - this.startPointWidthOfPercentage * 2) {
            this.startPoint = parseInt(this.endPoint - this.startPointWidthOfPercentage * 2 - 1)
          } else {

            pointX = this._getDirectionOffset( pagex, 'left')
            if (pointX <= 0) {
              pointX = 0
            }

            //修正小球的偏移量

            this.startPoint = parseInt(pointX)
          }
        }
      },
      _touchMove() {
        this.isBeginTouch = true
        const point = event.touches[0]
        let pointX

        if (this.direction === 1) {
            this._setOffsetPercentage(this.direction,point.pageX)
        }
        if (this.direction === 0) {
          this._setOffsetPercentage(this.direction,point.pageX)
        }

      },
      _touchEnd() {
        this.isBeginTouch = false
      },

    }
  }

</script>

<style lang="scss" scoped>
  @import "../../assets/styles/base/fn";

  .img-box {
    box-sizing: border-box;
    display: inline-block;
    width: 48%;
    height: 150px;
    margin-bottom: px2rem(10);
    margin-right: px2rem(10);
    overflow: hidden;

    img {
      width: 100%;
      height: 200px;
    }

  }

  .my-bullet-active {
    background: #3F96FF !important;
    border-radius: 8px !important;
  }

  div, span {
    box-sizing: border-box;
  }

  .measure-ruler-wrap {
    margin-top: px2rem(200);

    display: flex;
    border: 1px solid transparent;
    position: relative;
    height: 30px;
    align-items: center;
    justify-content: center;
    background: #FFF;
    .bg-line {
      position: relative;
      width: 90%;
      height: 8px;
      background: #EDEDED;
      &:before {
        display: block;
        position: absolute;
        content: '';
        left: -1px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        border-radius: 100%;
        background: #EDEDED;
      }
      &:after {
        display: block;
        content: '';
        position: absolute;
        right: -1px;
        top: 50%;
        transform: translateY(-50%);
        width: 12px;
        height: 12px;
        border-radius: 100%;
        background: #EDEDED;
      }
    }
  }

  .stick-wrapper {
    position: absolute;
    background: #3EC6F2;
    height: 100%;
    left: 10%;
    right: 10%;
    & > span {
      display: block;
      position: absolute;
      width: 30px;
      height: 30px;
      top: 50%;

      background: #FFF;
      border-radius: 100%;
      border: 1px solid #666666;
      z-index: 1;
    }
    .left {
      left: -1px;
      transform: translate( -50% ,-50%);
    }
    .right {
      right: -1px;
      transform: translate(50% ,-50%);
    }

  }


</style>

