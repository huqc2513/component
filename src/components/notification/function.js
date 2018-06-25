import Vue from 'vue'
import Component from './func-notification'

//返回一个扩展实例构造器
const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1


const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
    //findIndex() 方法   为数组中的每个元素都调用一次函数执行     instances为实例数组
  const index = instances.findIndex(inst => instance.id === inst.id)

  instances.splice(index, 1)

  if (len <= 1) return
  const removeHeight = instance.vm.height 
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset =
      parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  if (Vue.prototype.$isServer) return

  //传入的options解构赋值
  const {
    autoClose,
    ...rest
  } = options

  //使用propsData  为
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  //每次调用函数 id+1
  const id = `notification_${seed++}`
  instance.id = id
  //生成dom节点
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)

  //设置值为显示dom
  instance.vm.visible = true

  let verticalOffset = 0

  //在每个实例上挂在这里的元素高度           第一个实例高度为0
  instances.forEach(item => {
    // offsetHeight 它返回该元素的像素高度     
    verticalOffset += item.$el.offsetHeight + 16
  })
 //首个和最后一个下边框留16个像素
  verticalOffset += 16
  instance.verticalOffset = verticalOffset


  instances.push(instance)

  //监听销毁组件关闭事件
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    //销毁组件
    instance.vm.$destroy()
  })

  //监听关闭组件事件
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
