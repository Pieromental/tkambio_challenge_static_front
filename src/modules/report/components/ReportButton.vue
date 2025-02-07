<template>
  <button :class="style" :disabled="btnDisable" @click="actionModal">
    {{ title }}
    <img v-if="icon" :src="icon" alt="Icono" class="button-icon" />
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const defProps = defineProps({
  propTitle: {
    type: String,
    default: '',
  },
  propClass: {
    type: String,
    default: '',
  },
  propIcon: {
    type: String,
    default: '',
  },
  propDisable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['actionModal'])

const title = ref(defProps.propTitle)
const style = ref(defProps.propClass)
const icon = ref(defProps.propIcon)
const btnDisable = ref(defProps.propDisable)

watch(
  () => defProps.propTitle,
  (newValue) => {
    title.value = newValue
  },
)
watch(
  () => defProps.propClass,
  (newValue) => {
    style.value = newValue
  },
)
watch(
  () => defProps.propIcon,
  (newValue) => {
    icon.value = newValue
  },
)
watch(
  () => defProps.propDisable,
  (newValue) => {
    btnDisable.value = newValue
  },
)

const actionModal = () => {
  console.log('actionModal')
  emit('actionModal')
}

onMounted(async () => {
  console.log('Component Montado')
})
</script>

<style scoped lang="sass">
.button-icon
  width: 20px
  height: 20px
  margin-left: 8px
</style>
