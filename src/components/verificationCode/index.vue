<template>
  <div>
      <slot  @click.stop='send'>
                <button @click.stop='send'
                :class="{'btn-text':false,'disabled':disabled || status!=2 }" 
                v-show="status===1 && !timer"
                >  {{text || '获取验证码'}} 
                </button>    
                <button :class="{'btn-text':true,'disabled':disabled  }" v-show="status===2" >  {{time+'秒后重新发送'}} </button>  
                <button   @click.stop='send' :class="{'btn-text':true,'disabled':disabled || status!=2 }"   v-show="status==3"> '重新发送' </button>  
       </slot>
  </div>

</template>
<script>
export default {
  props:{
       text:String,
       disabled:{
          type:Boolean,
          default:false
      },
      seconds:{
          type:[Number,String],
          default:10
      }

  },
  created() {},
  data() {
    return {
      isSend: false,
      time:this.seconds,
      timer:null,
      isClick:false,
      status:1,
      createdTime:null,
    }
  },
  methods:{
  send(){

       if(this.status==2) return
        if(this.status===1 || this.status===3){
            this.$emit('click')
            this.createdTime =  new Date().getTime()+1000* this.seconds
            localStorage.setItem('codeCreatedTIme',this.createdTime)
        }
        this.status=2
        this.timer = setInterval(() => {
               if( typeof this.time !== 'object' && typeof this.time !== 'undefined' ){
                     this.time = parseInt(this.time)   
               }
               this.time--;
                if (this.time <= 0) {
                    clearInterval(this.timer);
                    this.isSend=true
                    this.status=3
                    this.time = this.seconds
                }
         }, 1000)

    }
  }
}
</script>

<style  lang='scss' scoped>

    button{
        border: none;
        outline: none; 
        background: #fff;
        border-radius: 0;
    }

  .btn-text{
     color: #4D4D4D;
      font-size: 12px;
  }

  .disabled{
        color: #a6a6a6 !important;
  }

</style>
