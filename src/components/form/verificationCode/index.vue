<template>
  <div>
      <button @click.stop='change'
              :class="{'btn-text':true,'disabled':disabled ||  status==2 }"
              v-show="status===1 && !timer"
      >
        {{text || '获取验证码'}}
      </button>
      <button :class="{'btn-text':true,'disabled':disabled  }" v-show="status===2"> {{time+'秒后重新发送'}}</button>
      <button @click.stop='change' :class="{'btn-text':true,'disabled':disabled || status==2 }" v-show="status==3">
        重新发送
      </button>
  </div>
</template>

<script>


  export default {
    watch:{ },
    props: {
      text: String,
      disabled: {
        type: Boolean,
        default: false
      },
      seconds: {
        type: [Number, String],
        default: 120
      }
    },
    data() {
      return {
        time: this.seconds,
        timer: null,
        isClick: false,
        status: 1,
        createdTime: null,
      }
    },
    methods: {
      change(){
        if (this.status === 1 || this.status === 3 && !this.disabled) {
                this.$emit('click')
           }
      },
      send() {
        if (this.status == 2 ) {
          return
        }
        this.status = 2
        this.timer = setInterval(() => {
          if (typeof this.time !== 'object' && typeof this.time !== 'undefined') {
            this.time = parseInt(this.time)
          }
          this.time--;
          if (this.time <= 0) {
            clearInterval(this.timer);
            this.status = 3
            this.time = this.seconds
          }
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/styles/base/fn";
  $buttonfontsize:px2rem(36);

  button {
    border: none;
    outline: none;
    background: #fff;
    border-radius: 0;
    font-size: $buttonfontsize;
    color: #A6A6A6;
  }

  .btn-text {
    color: #4D4D4D;
    font-size: $buttonfontsize;

  }

  .disabled {
    color: #a6a6a6 !important;
  }

</style>
