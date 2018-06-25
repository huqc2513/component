<template>
  <label class="imgLoader-style" @click="open">
    <slot></slot>
    <input type="file" accept="image/*" @change="readURL" :multiple="true" :disabled="isDisabled"
           v-if="!isWechat && isLogin"/>
  </label>
</template>
<script>

  export default {
    components: {},
    props: {
      //图片张数限制
      imgLimit: Number,
      //是否禁用
      isDisabled: Boolean,
//      特殊标识
      id: [String, Number]
    },
    data() {
      return {
        isWechat: this.$util.isWechatApp(),
        //要读取的文件列表
        fileList: [],
        //当前的进度列表
        nowSizeList: [],
        isLogin: false
      }
    },
    created() {
      if (!localStorage.getItem('userId')) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
    computed: {
      isMultiple() {
        return this.imgLimit !== 1;
      },
      totalSum() {
        let all = 0;
        this.fileList.forEach((i) => {
          all += i.size;
        });
        return all;
      },
      loadedSum() {
        let nowSize = 0;
        this.nowSizeList.forEach((i) => {
          nowSize += i.loaded;
        });
        return nowSize;
      },
    },
    methods: {
      open() {

        if (this.isWechat) {
          dialog.loading.open("加载图片");
          this.$wxsdk.chooseImage({count: this.imgLimit}).then((localIds) => {
            let len = localIds.length;
            let f = 0;
            let serverIds = [];
            let getData = () => {
//              this.$wxsdk.getLocalImgData(localIds[f]).then((localData) => {
//                let uuid = this.$util.uuid();
//                let localId = localIds[f];
//                this.$util.compressImg(localData, {encoderOptions: 1}).then((r) => {
//                  this.$emit('confirm', {
//                    dataURL: r,
//                    localId: localId,
//                    uuid: uuid,
//                    id: this.id,
//                  });
//                });
//                f++;
//                if (f < len) {
//                  getData();
//                } else {
//                  dialog.loading.close();
//                }
//              }).catch((err) => {
//                toast('抱歉获取图片出错，请刷新重试');
//              })
//            };
//            getData();
              // 8.20修改，改成上传图片到服务器
              dialog.loading.open("上传图片" + ' ' + (f + 1) + "/" + len);
              this.$wxsdk.uploadImage(localIds[f]).then((serverId) => {
                serverIds.push(serverId);
                f++;
                if (f < len) {
                  getData();
                } else {
                  // 上传图片到服务器
                  this.$api.getWechatImg(serverIds.join(',')).then((result) => {
                    result.data.forEach((i, index) => {
                      let uuid = this.$util.uuid();
                      this.$emit('confirm', {
                        url: i,
                        uuid: uuid,
                        id: this.id,
                      });
                    });
                    dialog.loading.close();
                  }).catch(err => {
                    console.og(err);
                    toast('抱歉获取图片出错，请刷新重试');
                  });
                }
              }).catch((err) => {
                toast('抱歉获取图片出错，请刷新重试');
              })
            };
            getData();
          }).catch((err) => {
            dialog.loading.close();
          });
        }
      },
      readURL(e) {
        //初始化
        this.fileList = [];
        this.nowSizeList = [];

        if (e.target.files) {


          let files = [].slice.call(e.target.files);

          for (let i = 0; i < Math.min(this.imgLimit, files.length); i++) {


            this.fileList.push(files[i]);
          }


          this.fileList.forEach((file, index) => {


            let uuid = this.$util.uuid();


            this.$util.readFileAsDataURL(file, {

              onLoadProgress: (e) => {
                if (e.lengthComputable) {
                  this.$set(this.nowSizeList, index, {
                    loaded: e.loaded,
                    total: e.total
                  });
                  this.$emit('loadProgress', {
                    totalSum: this.totalSum,
                    loadedSum: this.loadedSum,
                    loaded: e.loaded,
                    total: e.total,
                    uuid: uuid,
                    id: this.id
                  });
                }
              }
            }).then((result) => {


              this.$util.compressImg(result.dataURL).then((r) => {

                this.$emit('confirm', {
                  dataURL: r,
                  uuid: uuid,
                  name: file.name,
                  lastModified: file.lastModified,
                  id: this.id,
                });
              })
            }, (err) => {
              alert(err);
            })
          });
        }
      },
    }
  }
</script>
<style lang="scss" scoped>

  .imgLoader-style {
    position: relative;
    input[type='file'] {
      right: 0;
      top: 0;
      opacity: 0;
      filter: alpha(opacity=0); //兼容ie透明度写法
      cursor: pointer;
      display: none;
    }
  }
</style>
