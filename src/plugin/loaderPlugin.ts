import { createApp, h, ref } from 'vue'
import LoaderComponent from '@/components/LoaderComponent.vue'

const isLoading = ref(false)

export function useLoader() {
  const showLoader = () => {
    isLoading.value = true
  }

  const hideLoader = () => {
    isLoading.value = false
  }

  return { showLoader, hideLoader }
}

export default {
  install(app: any) {
    const loaderContainer = document.createElement('div')
    document.body.appendChild(loaderContainer)

    const loaderApp = createApp({
      setup() {
        return { isLoading }
      },
      render() {
        return h(LoaderComponent, { showLoader: isLoading.value })
      },
    })

    loaderApp.mount(loaderContainer)
  },
}
