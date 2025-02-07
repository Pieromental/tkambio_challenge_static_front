import { getCurrentInstance } from 'vue'

export function useAlert() {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('useAlert debe ser usado dentro de un setup()')
  }

  const showAlert = (params: {
    type: 'success' | 'error' | 'question' | 'information' | 'warning'
    title: string
    message: string
    mode?: 'alert' | 'confirm' | 'prompt'
    okLabel?: string
    cancelLabel?: string
  }) => {
    return (instance.appContext.config.globalProperties.$alert as any)(params)
  }

  return { showAlert }
}
