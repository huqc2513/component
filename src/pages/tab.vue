    <template>
            <div>
                    <h1>tab</h1>
                    <tabBar :value='value' @change='change'  :data='list' :showSlider='showSlide' > 
                            <!-- <div style='height:500px;border:1px solid red;' v-for='(item,i) in list' :key="i">
                                {{item}}
                            </div> -->
                    </tabBar> 
            </div>
    </template>

    <script type="text/ecmascript-6">
    
    import  { tabBar  }  from '@/components/tabBar/index'

    console.error(tabBar)
    

    export default {
        components:{
            tabBar,
        },
        data(){
        return{
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
            change(i){
              this.value=i;
            }
        }
    }
    </script>

    <style scoped>
    </style>

