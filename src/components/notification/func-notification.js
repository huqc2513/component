import Notification from './notification.vue'

export default {
  //继承模版的所有选项，重写
  extends: Notification,
  //用于动态给到bottom定位
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    //用于开始计算倒计时
    this.createTimer()
  },
  methods: {
    createTimer () {
      //autoClose值在props里面已经传进来了
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () {
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestory () {
    //组件销毁之前清除定时器
    this.clearTimer()
  },
  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000,
      height: 0,
      visible: false
    }
  }
}
