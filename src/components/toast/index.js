import toast from './toast.vue'

function initToast (Vue) {
    Vue.component(toast.name, toast);
    const toastConstructor = Vue.extend(toast)
    let instance = new toastConstructor()
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    window.toast = (msg) => {
      instance.open(msg)
    }
    return  instance.vm
}




export default initToast;