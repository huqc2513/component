<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" :style="svgStyle">
    <path id="path1" ref='path' d=""  :fill="bgColor" fill-opacity="1" />
    <!-- stroke="#000" -->
  </svg>
</template>

<script>

export default {
  props: {
    width: {
      type: [String, Number],
      default: `100px`
    },
    percent: {
      type: [String, Number],
      default: 20
    },
    bgColor: {
      type: [String],
      default: "#458fd2"
    }
  },
  computed:{
    svgStyle(){
      let style = {
        width:this.width,
        height:this.width,
        // backgroundColor:this.bgColor,
        opacity:this.percent / 100,
        transform:`rotaote(-90deg)`
      }
      return style
    }
  },
  mounted() {

          this.$nextTick(() => {
             this.path = this.$refs.path
              this.init(this.percent);  
          
          })

  },
  watch:{
    percent(val){
       this.init(val)
    },
    width(val){
      this.init(this.percent)
    } 
  },
  methods: {
    init(val) {
      this.$nextTick(() => {
        this.run(this.percent)
      });
    },
    drawArcByRadiusDeg(startX, startY, r, deg, clockwise) {
        var cw = typeof clockwise !== 'undefined' ? clockwise : 1;
        var x = startX - r + r*Math.cos(deg*Math.PI/180);
        var y = startY + (1===cw ? 1 : -1)*r*Math.sin(deg*Math.PI/180);
        var bigOrSmall = deg > 180 ? 1 : 0;
        var line = " L" + (startX - r) + " " + startY + " L"+startX + " " + startY + "Z";
        return "M " + startX +" "+ startY + " A "+ r +" " + r + " 0 " + bigOrSmall + " " +cw+ " " + x + " " + y + line;
    },
    run(deg){
        deg =  this.percent/100*360
         if(!this.path){return}
         var x = 40, y = 25, r = 15, add = 0===deg ? true : false;
         this.path.setAttribute("d", this.drawArcByRadiusDeg(x, y, r, add ? deg++ : deg--, 1)) ;

    }
   
  }
};
</script>

<style lang="scss" scoped>

</style>
