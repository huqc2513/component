    <template>
            <div>
            <h1>
                <b>tab</b>  
            </h1>
            <div class='tabbar'>
                <tabBar :value='currentIndex  ' @change='change'  :data='list' :showSlider='showSlide' > 
                </tabBar> 
            </div>
  
            <div class="tab" ref="tab">
                    <div class="tab_content" ref="tabcontent">
                        <div class="tab_item" v-for="(item,index) in TabList"  :key='index' ref="tabitem">
                            {{item}}
                        </div>
                    </div>
                </div>   
            </div>
    </template>

    <script type="text/ecmascript-6">
    
    import  { tabBar  }  from '@/components/tabBar/index'
    import BScroll  from 'better-scroll'
    
    import { 
        button as ButtonItem,
        checkbox as checkboxItem,
        input as inputeItem,
        verificationCode 
        } from '@/components/form/index'

    export default {
        components:{
            tabBar,
            ButtonItem,
            checkboxItem,
            inputeItem,
            verificationCode
        },
        data(){
            return{
                isAjax:false,
                phone:'',
                value:1,
                showSlide:true,
                list:[
                        {
                            icon:'test',
                            label:0,
                        },
                        {
                            icon:'test',
                            label:1,
                        },
                        {
                            icon:'test',
                            label:2,
                        },
                        {
                            icon:'test',
                            label:3,
                        }
                ],
                TabList:[1,2,3,4],
                listWidth:[],
                scrollX:0
            }
        },
        computed:{
            currentIndex() {
                for (let i = 0; i < this.listWidth.length; i++) {
                    let width = this.listWidth[i];
                    let width2 = this.listWidth[i + 1];

                    if (!width2 || (this.scrollX >= width && this.scrollX < width2)) {
                    
                        return i;
                    }
                }
                return 0;
            }
        },
   
        mounted(){
             this.InitTabScroll()
        },
        methods:{
            _calculateHeight() {
                    let List =  this.$refs.tabcontent.getElementsByClassName('tab_item')
                    let width = 0;
                    this.listWidth.push(width);
                    for (let i = 0; i < List.length; i++) {
                        let item = List[i];
                        width += item.clientWidth;
                        this.listWidth.push(width);
                    }
            
             },
             InitTabScroll(){
                let width=0
                for (let  i = 0; i <this.TabList.length; i++) {
                    width+=this.$refs.tabitem[0].getBoundingClientRect().width
                }
                this.$nextTick(()=>{
                    this.$refs.tabcontent.style.width=width+'px'
                    this.$nextTick(()=>{
                        if (!this.scroll) {
                            this.scroll=new BScroll(this.$refs.tab, {
                                startX:0,
                                click:true,
                                scrollX:true,
                                scrollY:false,
                                eventPassthrough:'vertical',
                                probeType:3
                            })

                             this.scroll.on('scroll',(pos)=>{
                                this.scrollX = Math.ceil( -(pos.x)) <0 ? 0 : Math.ceil( -(pos.x))
                      
                             })

                             this._calculateHeight();

                        }else{
                            this.scroll.refresh()
                        }
                    })
                })

            },
            iscrollCenter(index){
                    const list = this.$refs.tabcontent.getElementsByClassName('tab_item')
                    if(list[index]){
                            this.$nextTick(()=>{
                                    this.scroll.scrollToElement(list[index],300,true)
                                    // this.scroll.refresh()
                            })
                    }
    
            },
            getCode(){
                    toast("验证码已发送，请查收短信")
                    this.$refs.verificationCode.send()
                    this.scrollmethod.scrollToElement(document.querySelector('.nav-box li:nth-child(' + val + ')'), null, true, true)
                    this.scrollmethod.refresh()
            },
            change(item,i){
                if(this.value!=i){
                   this.value=i;
                   this.iscrollCenter(i)
          
                }
            }
        }
    }
    </script>

    <style  lang='scss' >
                .tab{
                    position: absolute;
                    
                    width: 100%;
                    border: 1px solid red;
                    height: 100%;
                    overflow: hidden;

                }
                .tab_content{
                    height: 1.333333rem;
                    /*width: auto;*/
                    /*overflow-y: hidden;*/
                }
                .tab_item{
                    display: inline-block;
                    width: 375px;
                    height: 100px;
                      border: 1px solid black;
                    line-height: 1.333333rem;
                    padding: 0 0.466667rem;
                }

                .tabbar{

                        border-bottom:1px solid #ededed;
                        margin-bottom: 30px;
                        padding-bottom: 10px;
                }

    </style>

