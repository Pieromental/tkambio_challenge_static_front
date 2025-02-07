<template>
  <teleport to="body">
    <div v-if="isVisible" class="alert-overlay">
      <div class="alert-box">
        <img :src="iconSrc" alt="Alert Icon" class="alert-icon" />
        <h3 class="alert-title">{{ title }}</h3>
        <p class="alert-message">{{ message }}</p>
        <div class="alert-buttons">
          <button
            v-if="mode === 'confirm' || mode === 'prompt'"
            @click="cancelAction"
            class="alert-button cancel"
          >
            {{ cancelLabel }}
          </button>
          <button @click="confirmAction" class="alert-button ok">{{ okLabel }}</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import successIcon from '@/assets/icons/alert/positive.png'
import errorIcon from '@/assets/icons/alert/negative.png'
import questionIcon from '@/assets/icons/alert/question.png'
import infoIcon from '@/assets/icons/alert/information.png'
import warningIcon from '@/assets/icons/alert/warning.png'

const isVisible = ref(false)
const title = ref('')
const message = ref('')
const mode = ref<'alert' | 'confirm' | 'prompt'>('alert')
const resolveFn = ref<(value: boolean | string | null) => void>(() => {})
const okLabel = ref('Aceptar')
const cancelLabel = ref('Cancelar')
const iconSrc = ref('')

const alertIcons = {
  success: successIcon,
  error: errorIcon,
  question: questionIcon,
  information: infoIcon,
  warning: warningIcon,
}

const showAlert = (params: {
  type: 'success' | 'error' | 'question' | 'information' | 'warning'
  title: string
  message: string
  mode?: 'alert' | 'confirm' | 'prompt'
  okLabel?: string
  cancelLabel?: string
}) => {
  title.value = params.title
  message.value = params.message
  mode.value = params.mode ?? 'alert'
  okLabel.value = params.okLabel ?? 'Aceptar'
  cancelLabel.value = params.cancelLabel ?? 'Cancelar'
  iconSrc.value = alertIcons[params.type]
  isVisible.value = true

  return new Promise((resolve) => {
    resolveFn.value = resolve
  })
}

const confirmAction = () => {
  isVisible.value = false
  resolveFn.value(true)
}

const cancelAction = () => {
  isVisible.value = false
  resolveFn.value(false)
}

defineExpose({ showAlert })
</script>

<style lang="sass" scoped>
.alert-overlay
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.5)
  display: flex
  justify-content: center
  align-items: center
  z-index: 1000

.alert-box
  background: white
  padding: 20px
  border-radius: 10px
  text-align: center
  width: 300px

.alert-icon
  width: 50px
  height: 50px
  margin-bottom: 10px

.alert-title
  font-size: 1.2rem
  font-weight: bold

.alert-message
  margin: 10px 0

.alert-buttons
  display: flex
  justify-content: center
  gap: 10px
  margin-top: 15px

.alert-button
  padding: 8px 15px
  border: none
  border-radius: 5px
  cursor: pointer
  font-size: 1rem

.ok
  background: #28a745
  color: white

.cancel
  background: #dc3545
  color: white
</style>
