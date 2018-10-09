<template>
  <div>

    <div class="current-month">

      <div class="header-btn">


        <ul>
          <li :class="{'active-tab':index==activeTab }" v-if="monthList.length>0" v-for="(item,index) in monthList"
              @click="calculateTimeList(item.year,item.month ,index)">
            {{item.month}}月
          </li>
        </ul>
        <!---->
        <!--<div class="icon-wrap" @click="calculateTimeList('prev')">-->
        <!--<span class="triangle-left"></span>-->
        <!--</div>-->
        <!--<span class="title">-->
        <!--{{ year }}年{{month}}月-->
        <!--</span>-->

        <!--<div class="icon-wrap" @click="calculateTimeList('next')">-->
        <!--<span class="triangle-right"></span>-->
        <!--</div>-->


      </div>

      <p class="weekDay_text">

        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
        <span>六</span>
        <span>日</span>
      </p>

      <div>


        <div class="date-list-wrapper">
          <ul v-for="(items, index) in list" :key="index">

            <li v-for="(item, idx) in items" @click="select(item,index,idx)"
              :key="item.time"
                :class="[
                   {
                      'active':item.active,
                      'start-active': startTime  && item.StartActive==true,
                      'end-active': endTime  &&  item.EndActive ==true,
                      'singleClickActive': item.singleClickActive
                   }
                ]"
            >
              <div class="item-wrap">

                <!--酒店入住离开-->
                <p
                  v-if="item.StartActive  ||  item.EndActive"
                  :style="{color: '#Fff'}"
                  :class="[
                        'remainder',
                        { 'show':  true}
                   ]">
                  {{ item.StartActive ? '入住' : item.EndActive ?'离店':'' }}
                </p>


                <!--酒店-->
                <p
                  v-if="item.sum !==undefined && !item.singleClickActive"
                  :style="{color:!item.active? '#F36A05':'#Fff'}"
                  :class="[
                        'remainder',
                        { 'show': item.sum !==undefined  &&  false  }
                   ]">
                  余{{item.sum}}
                </p>

                <p
                  v-if="item.singleClickActive "
                  :style="{color: '#Fff'}"
                  :class="[
                        'remainder',
                        { 'show':  false}
                   ]">
                  已选
                </p>


                <p :class="['item-time',{ 'disabled ':item.disabled ,'white':item.singleClickActive}]"> {{ item.showDate}}</p>


                <!--通用价格-->
                <p
                  v-if="showPrice"
                  :class="{
                          'item-price':true,
                          'base-color':!item.active ,
                         'white':item.singleClickActive,
                          'active-color':item.active ,
                          'show': typeof item.price ==='undefined'
                       }"
                >
                  ￥{{ item.price}}
                </p>


                <!--儿童价格-->
                <p
                  v-if="showChildPrice"
                  :class="{
                      'item-price':true,
                      'base-color':!item.active ,
                      'active-color':item.active ,
                      'show': typeof item.childPrice ==='undefined'
                   }"
                >
                  ￥{{ item.childPrice}}
                </p>

                <!--成人价格-->
                <p
                  v-if="showAuitPrice"
                  :class="{
                            'item-price':true,
                            'base-color':!item.active ,
                            'active-color':item.active ,
                            'show': typeof item.auitPrice ==='undefined'
                            }"
                >
                  ￥{{ item.auitPrice}}
                </p>


              </div>

            </li>
          </ul>
        </div>

      </div>

    </div>
    <span style="visibility: hidden">{{yearAndMonth}}</span>
  </div>

</template>

<script type="text/ecmascript-6">

  import { dateToString, initTime, convertDateFromString, findIndex } from '@/assets/js/date'


  export default {
    created() {
      this.$nextTick(() => {

        //初始化获取每月数据
        this.initData()
        this.getMonthList()

        this.$emit('changeMonth', this.year, this.month)

      })

    },
    watch: {
      //被选择的数组
      arrangeArr: {
        handler(val) {
          this.comparisonList()
        },
        deep: true,
        immediate: true
      },
      dataList: {
        handler() {
          this.comparisonList()
        },
        deep: true,
      }
    },
    props: {
      isSingle: {
        type: Boolean,
        default: false,
      },
      click: {
        type: Boolean,
        default: true,
      },
      showPrice: {
        type: Boolean,
        default: true,
      },
      showChildPrice: {
        type: Boolean,
        default: false,
      },
      showAuitPrice: {
        type: Boolean,
        default: false,
      },
      dataList: {
        type: [Array],
        default: () => {
          return []
        }
      },
      timeKey: {
        type: [String],
        default: 'onDate'
      },
      nubmerKey: {
        type: [String],
        default: 'sum'
      },
      chooseItem: {
        type: [Object],
        default: () => {
        }
      }
    },
    computed: {
      yearAndMonth() {
        let str = this.year + '-' + this.month
        // this.$emit('changeMonth', str)
        return str
      },
      //根据开始时间和结束时间    startTime    endTime 计算  被选择的 list
      acitveList() {

        let startTime = this.startTime && convertDateFromString(this.startTime)
        let endTime = this.endTime && convertDateFromString(this.endTime)

        let ret = []
        let times = []

        //被选择的时间节点
        if (startTime && endTime) {
          times.push(startTime.getTime())
          times.push(endTime.getTime())
          times = times.sort()
        } else if (startTime || endTime) {
          let tmp = startTime ? startTime : endTime
          times[0] = tmp.getTime()
        }

        //二维数组转一维数组
        let list = JSON.parse(JSON.stringify(this.list))

        list = [].concat.apply([], list)

        if (times.length === 0) {
          this.$emit('change', [])
          return []
        }

        //根据点击的开始和结束时间来遍历
        if (startTime && endTime && times.length == 2) {
          list.forEach(e => {
            if (times[0] <= e.ms && times[1] >= e.ms) {
              ret.push(e)
            }
          })
        } else if ((startTime || endTime) && times.length == 1) {
          list.forEach(e => {
            if (times[0] === e.ms) ret.push(e)
          })
        }
        this.$emit('change', ret)

        return ret

      }
    },
    data() {
      return {
        activeTab: 0,
        selectList: [],
        list: [],
        startTime: null,
        endTime: null,
        monthList: [],
        arrangeArr: [],
        year: '',
        month: ''
      }
    },
    components: {},
    methods: {
      getMonthList() {
        let monthList = []
        let date = new Date()
        let month = date.getMonth() + 1
        let i = 0
        let year = date.getFullYear()

        while (i < 5) {
          if (month <= 12) {
            monthList.push({
              active: i == 0 ? true : false,
              year: date.getFullYear(),
              month
            })
          } else if (month > 12) {
            monthList.push({
              active: i == 0 ? true : false,
              year: date.getFullYear() + 1,
              month: month % 12
            })
          }
          month++
          i++
        }
        this.monthList = monthList

      },
      //点击选择规则
      checkActive(time) {
        if (this.startTime && !this.endTime) {
          if (time.ms === convertDateFromString(this.startTime).getTime()) {
            return true
          }
        }
      },
      //根据业务规则合并数组
      comparisonList() {

        let newTime = new Date().setHours(0, 0, 0, 0)
        let ret = []
        let startTimeMS = this.startTime && convertDateFromString(this.startTime).getTime()
        let endTimeMs = this.endTime && convertDateFromString(this.endTime).getTime()

        //合并接口数据
        let list = this.arrangeArr.map((e, index) => {

          e.active = false
          e.disabled = false
          e.istoday = false
          e.StartActive = false
          e.EndActive = false
          e.active = false




          //设置是否disabled
          if (e.ms < newTime) {
            e.disabled = true
          }
          //是否当天
          if (e.ms === newTime) {
            e.istoday = true
          }


          //如果是单选  默认高亮逻辑
          if (this.isSingle) {
            if(this.chooseItem &&   this.chooseItem.onDate==e.onDate){
            }

          //  如果是多选  处理开始和结束时间的高亮逻辑
          }
          if(!this.isSingle){
            //匹配开始时间  和结束时间
            if (this.startTime && startTimeMS == e.ms) {
              e.StartActive = true
            } else if (this.endTime && endTimeMs == e.ms) {
              e.EndActive = true
            } else if (startTimeMS < e.ms && endTimeMs > e.ms) {
              e.active = true
            } else if (!this.startTime && !this.endTime) {
              e.StartActive = false
              e.EndActive = false
              e.active = false
            }
          }

          //合并价格     dataList为接口数据
          this.dataList.forEach(r => {
            if (e.time == r[this.timeKey]) {
                e = Object.assign({}, e, r)
                e[this.nubmerKey] = r[this.nubmerKey]
            }
          })


          return e
        })


        //二纬数组
        this.list = this.chuck(list, 7)

        return ret
      },
      //多选处理业务逻辑
      multipleChoose(item, index, idx) {

        if (!this.startTime && !item.price) {
          toast('该天不在销售期')
          return
        }


        //处理反选
        let isNegation = false
        //处理断层
        let flag = true
        let lastItem


        //如果是第一次选择
        if (!this.startTime && !this.endTime) {

          this.startTime = item.time
        }
        //如果已经选择了开始时间并且点击结束时间是当天
        else if (this.startTime == item.time && this.endTime == undefined) {
          this.startTime = null
          console.error('234')
        }
        //选择开始和结束时间
        else if (this.startTime && !this.endTime) {

          if (new Date(this.startTime).getMonth() != new Date(item.time).getMonth()) {
            toast('暂不支持跨月选择')
            return
          }

          //反选逻辑  isNegation
          if (convertDateFromString(item.time) < convertDateFromString(this.startTime)) {
            this.endTime = this.startTime
            this.startTime = item.time
            isNegation = true
          } else {
            this.endTime = item.time
          }

        }
        else if (this.startTime && this.endTime) {
          this.endTime = null
          this.startTime = null
        }


        this.acitveList.some((e, index) => {
          if (!e.price) {
            flag = false
            lastItem = isNegation ? this.acitveList[index + 1] : this.acitveList[index - 1]
            return
          }
        })


        if (flag == false && lastItem) {
          this.endTime = lastItem.time
        }
        //处理反选
        if (isNegation && lastItem) {
          this.endTime = this.startTime
          this.startTime = lastItem.time
        }


        this.$nextTick(() => {
          this.comparisonList()
        })


      },
      singleChoose(item, index, idx) {

        // if (!item.price) {
        //   return
        // }

        let len = this.list.length

        // 循环遍历二维数组
        for (var i = 0; i < len; i++) {                      //循环最外面的数组
          for (var j = 0; j < this.list[i].length; j++) {   //循环里面的数组
            this.list[i][j].singleClickActive = false
          }
        }

        this.$nextTick(() => {
          item.singleClickActive = true
          this.list[index].splice(idx, 1, item)
        })

        this.$emit('singleClick', item)

      },
      //点击日历
      select(item, index, idx) {

        /*
         *       item  日历数据
         *       index 父数组下标
         *       idx子数组下标
         */

        
        if (!this.click) return

         
        //是否有库存
        // if (!item.price){
        //   return
        // }
        // //是否有库存
        // if (!item.price){
        //   return
        // }
        // //是否有库存
        // if (!item.sum){
        //   // toast('该天库存不足')
        //   return
        // }





        //是否单选
        if (this.isSingle) {
          if (item.disabled) return



          this.singleChoose(...arguments)
          //  多选
        } else {
          if (item.disabled) return
          this.multipleChoose(...arguments)
        }

      },
      contrastTime(time, time1) {
        if (time instanceof Date && time1 instanceof Date) {
          if (time.getTime() > time1.getTime()) {
            return true
          } else {
            return false
          }
        }
      },
      getPrevMonth() {
        if (this.month <= 1) {
          this.month = 13
          this.year = parseInt(this.year) - 1
          this.month--;
        } else {
          this.month--;
        }
      },
      getNextMonth() {
        if (this.month == 12) {
          this.month = 0
          this.year = parseInt(this.year) + 1
          this.month++;
        } else {
          this.month++
        }
      },
      //切换月份
      calculateTimeList(year, month, index) {


        this.activeTab = index
        this.year = year
        this.month = month
        let obj = initTime(this.year, this.month)
        this.arrangeArr = obj.days

        this.$emit('changeMonth', this.year, this.month)

      },
      initData() {

        let {year, month, days} = initTime()
        this.year = year
        this.month = month
        this.arrangeArr = days


      },
      chuck(arr, nub) {

        let result = [];
        for (let i = 0, len = arr.length; i < len; i += nub) {
          result.push(arr.slice(i, i + nub));
        }
        return result

      }
    }
  }
</script>

<style lang="scss" scoped>

  @import "../../assets/styles/base/fn";

  $maxWidth: 768px;

  .disabled {
    color: #C2C2C2 !important;
  }

  .header-btn {
    height:50px;
    display: flex;
    background: #FFF;
    justify-content: center;
    align-items: center;
    margin-bottom: px2rem(40);

    .title {
      height: 20px;
      font-family: PingFangSC-Regular;
      font-size: px2rem(30);
      color: #333333;
      margin: 0 px2rem(12);
    }

    ul {
      display: flex;
      /*border-bottom: 1px solid #e2e2e2 ;*/
      li {
        display: inline-flex;
        flex: 1;
        height: 30px;
        line-height:30px;
        text-align: center;
        justify-content: center;
        font-size: px2rem(30);
        color: #666666;
        border-bottom: 1px solid #e2e2e2;
      }
      .active-tab {
        font-size: px2rem(30);
        color: #222222;
        text-align: center;
        border-bottom: 1px solid #3F96FF !important;
      }
    }

  }


  .item-wrap {
    position: relative;
    height: 100%;
    width: 100%;
    padding: px2rem(10) 0;
    .item-time {

      font-size: px2rem(26);
      color: #444444;
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .item-price {
      position: absolute;
      bottom: px2rem(5);
      left: 50%;
      color: #666666;
      font-size: px2rem(20);
      transform: translateX(-50%) scale(.8);
    }
  }

  .btn {
    display: flex;
    p {
      flex: 1;
      text-align: center;
    }
  }

  .foodPanel-container {
    height: 100%;
    width: 100%;
  }

  .chooseBg {
    background: #538EF2;
    color: #fff;
    border-radius: px2rem(2)
  }

  .calendar_box {
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: px2rem(100);
  }

  .time_commit {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    max-width: $maxWidth;
    height: px2rem(90);
    /*margin:px2rem(20) px2rem(30);*/
    text-align: center;
    line-height: px2rem(90);
    background: #538EF2;
    color: #fff;
  }

  .current-month, .next-month {
    background: #fff;
  }

  h3 {
    text-align: center;
    height: px2rem(88);
    line-height: px2rem(88);
    background: #ECEDEC;
    color: #292524;
  }

  h4 {
    margin: px2rem(20) 0;
    text-align: center;
    color: #292524;
  }

  .next-month {
    padding: px2rem(44) 0;
    margin-top: px2rem(30)
  }

  .gray {
    color: #AAABAA;
  }

  .weekDay_text {
    display: flex;
    justify-content: space-around;
    color: #292524;
    line-height: px2rem(88);
    padding: 0 px2rem(20);
    span {
      flex: 1;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: px2rem(30);
      color: #666666;
    }
  }


  .date-list-wrapper {
    padding: px2rem(20);
    width: 100%;
  }

  ul {
    display: flex;
    width: 100%;
    li {
      // min-height: px2rem(100);
      // height:px2rem(100);
      min-height: 50px;
      width: px2rem(100);
      flex: 1;
      text-align: center;
      .base-color {
        color: #D67034;
      }
      color: #656665;
      font-size: px2rem(24);
    }
  }

  .show {
    visibility: hidden;
  }

  .icon-wrap {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
  }

  .triangle-left {
    display: inline-block;
    box-sizing: border-box;
    width: 6px;
    height: 13px;
    background: url("./img/triangle-left@3x.png") no-repeat;
    background-size: 6px 13px;
  }

  .triangle-right {
    box-sizing: border-box;
    display: inline-block;
    width: 6px;
    height: 13px;
    background: url("./img/triangle-right@3x.png") no-repeat;
    background-size: 6px 13px;
  }



  .remainder {
    width: 100%;
    color: #F36A05;
    position: absolute;
    top: 3px;
    left: 50%;
    -webkit-transform: translateX(-50%) scale(0.8);
    transform: translateX(-50%) scale(0.7);
  }


  .singleClickActive {
    background: #3F96FF;
    border-radius: 10px 4px 10px 4px;
    color: #fff !important;
  }

  .white {
    color: #fff !important;
  }

  /*开始结束*/
  .start-active {
    background: #3F96FF;
    border-radius: 10px 0 0 4px;
    color: #fff !important;
  }

  /*开始结束*/
  .end-active {
    background: #3F96FF;
    border-radius: 0 4px 10px 0;
    color: #fff !important;
  }

  /*中间部分*/
  .active {
    background: rgba(62, 198, 242, 0.20);
    color: #fff !important;
    /*border-radius: 5px;*/
    /*background: #538FF3;*/
  }


</style>

