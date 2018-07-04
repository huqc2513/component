    <template>
            <div>
                    <h1>tab</h1>

                     <br>
                    <br>

                    <tabBar :value='value' @change='change'  :data='list' :showSlider='showSlide' > 
                            <!-- <div style='height:500px;border:1px solid red;' v-for='(item,i) in list' :key="i">
                                {{item}}
                            </div> -->
                    </tabBar> 
                    <br>
                
                <inputeItem ref='inputItem' v-model="phone" placeholder="请输入手机号">
                    <div style="margin-left: 10px;min-width: 130px">
                    <verificationCode
                        ref="verificationCode" @click='getCode()'
                        :disabled="phone=='' ? true:false || isAjax">
                    </verificationCode>
                    </div>
                </inputeItem>


            </div>
    </template>

    <script type="text/ecmascript-6">
    
    import  { tabBar  }  from '@/components/tabBar/index'

    
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
            ]
        }
        },
        created() {

    
        },
        methods:{
            getCode(){
                    toast("验证码已发送，请查收短信")
                    this.$refs.verificationCode.send()

            },
            change(i){
              this.value=i;
            }
        }
    }
    </script>

    <style scoped>
    </style>

