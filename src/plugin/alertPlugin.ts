import { createApp } from 'vue'
import AlertComponent from '@/components/AlertComponent.vue'

export default {
  install(app: any) {
    const alertContainer = document.createElement('div')
    document.body.appendChild(alertContainer)

    const alertInstance = createApp(AlertComponent).mount(alertContainer)

    app.config.globalProperties.$alert = (params: {
      type: 'success' | 'error' | 'question' | 'information' | 'warning'
      title: string
      message: string
      mode?: 'alert' | 'confirm' | 'prompt'
      okLabel?: string
      cancelLabel?: string
    }) => {
      return (alertInstance as any).showAlert(params)
    }
  },
}
