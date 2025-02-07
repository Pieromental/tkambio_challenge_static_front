<template>
  <div class="modal-container">
    <div class="modal-content">
      <h1>Reporte por fecha de nacimiento</h1>
      <h4>Ingresa los siguientes datos para generar tu reporte</h4>
      <form @submit.prevent="submitForm">
        <div class="input-text-group">
          <input
            type="text"
            name="text"
            class="input-text"
            v-model="description"
            @input="sanitizeAndValidateDescription"
            minlength="3"
            maxlength="50"
          />
          <label class="user-text-label">Descripción del reporte</label>
        </div>
        <p v-if="isDescriptionInvalid" class="error-message">
          El campo no puede estar vacío o contener solo espacios.
        </p>
        <p>Fecha de nacimiento</p>
        <div class="date-fields">
          <div class="input-date-group">
            <label class="user-date-label">Inicio</label>
            <input
              required
              type="date"
              name="startDate"
              class="input-date"
              v-model="startDate"
              @change="validateDates"
            />
          </div>
          <div class="input-date-group">
            <label class="user-date-label">Fin</label>
            <input
              required
              type="date"
              name="endDate"
              class="input-date"
              v-model="endDate"
              @change="validateDates"
            />
          </div>
        </div>
        <p v-if="dateError" class="error-message">
          La fecha de fin no puede ser anterior a la fecha de inicio.
        </p>
        <div class="report-modal-button">
          <ReportButton
            :propDisable="!isComplete"
            :propTitle="'Generar reporte'"
            :prop-class="'report-button'"
            :style="{
              backgroundColor: isComplete ? 'rgb(255, 190, 18)' : 'rgb(169, 169, 169)',
            }"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
/****************************************************************************/
/*                             IMPORTS                                      */
/****************************************************************************/
import { ref, watch } from 'vue'
import ReportButton from './ReportButton.vue'
import { useLoader } from '@/composable/loader/useLoader'
import { useAlert } from '@/composable/alert/useAlert'
import mockDataReport from '@/mocks//mockDataReport.json'
/****************************************************************************/
/*                             COMPOSABLES                                    */
/****************************************************************************/
const { showLoader, hideLoader } = useLoader()
const { showAlert } = useAlert()

/****************************************************************************/
/*                             DATA                                      */
/****************************************************************************/

const description = ref('')
const startDate = ref('')
const endDate = ref('')
const isComplete = ref(false)
const dateError = ref(false)
const isDescriptionInvalid = ref(false)
const errorDescription = ref('')
const dataReport = ref(mockDataReport)
/****************************************************************************/
/*                             EMITS                                      */
/****************************************************************************/
const emit = defineEmits(['closeModal'])
/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/
const saveMockReports = () => {
  localStorage.setItem('mock_reports', JSON.stringify(dataReport.value))
}

const checkCompletion = () => {
  if (description.value.length > 0 && startDate.value && endDate.value) {
    isComplete.value = true
  } else {
    isComplete.value = false
  }
}
/****************************************************************************/
/*                             WATCHER                                      */
/****************************************************************************/
watch(description, checkCompletion)
watch(startDate, checkCompletion)
watch(endDate, checkCompletion)

/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/
const sanitizeInput = (input: any) => {
  const element = document.createElement('div')
  element.innerText = input
  return element.innerHTML
}
const sanitizeAndValidateDescription = () => {
  const sanitizedInput = sanitizeInput(description.value)

  description.value = sanitizedInput

  const length = description.value.length

  if (length < 3) {
    isDescriptionInvalid.value = true
    errorDescription.value = 'La descripción debe tener al menos 3 caracteres.'
  } else if (length > 100) {
    isDescriptionInvalid.value = true
    errorDescription.value = 'La descripción no puede superar los 50 caracteres.'
  } else {
    isDescriptionInvalid.value = false
    errorDescription.value = ''
  }
}

const validateDates = () => {
  if (startDate.value && endDate.value && new Date(endDate.value) < new Date(startDate.value)) {
    dateError.value = true
  } else {
    dateError.value = false
  }
}

const closeModal = () => {
  emit('closeModal')
}

const submitForm = async () => {
  try {
    if (!description.value.trim() || !startDate.value || !endDate.value) {
      await showAlert({
        type: 'warning',
        title: 'Campos incompletos',
        message: 'Todos los campos son obligatorios.',
      })
      return
    }

    showLoader()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const newReport = {
      report_id: Date.now().toString(),
      user_id: '12345',
      title: description.value.trim(),
      description: 'Descripción del reporte generado.',
      report_link: `/storage/reports/reporte_${Date.now()}.xlsx`,
      active: 1,
      created_by: 'admin',
      updated_by: null,
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0],
    }

    dataReport.value.push(newReport)

    saveMockReports()

    hideLoader()

    await showAlert({
      type: 'success',
      title: 'Reporte creado',
      message: 'El reporte se ha generado correctamente.',
    })
    description.value = ''
    startDate.value = ''
    endDate.value = ''
    isComplete.value = false
    closeModal()
  } catch (error) {
    hideLoader()
    console.error('Error al crear reporte:', error)
    await showAlert({
      type: 'error',
      title: 'Error',
      message: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
    })
  }
}
</script>

<style lang="sass">
.modal-container
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: rgba(0, 0, 0, 0.5)
  display: flex
  justify-content: center
  align-items: center

.modal-content
  background-color: white
  padding: 30px
  border-radius: 15px
  width: 40vw

.input-text-group
  position: relative

.input-text
  color: gray
  min-width: 94.5%
  border: solid 1.5px #ccc
  border-radius: 5px
  background: none
  padding: 1rem
  font-size: 1rem
  transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1)
  &:focus
    border: 1.5px solid #ccc
    outline: none

.user-text-label
  color: gray
  position: absolute
  padding: 0 5px
  left: 15px
  pointer-events: none
  transform: translateY(-50%) scale(0.8)
  background-color: white

.date-fields
  display: flex
  gap: 10px
  justify-content: space-between
  width: 100%

.input-date-group
  color: gray
  width: 48%
  display: flex
  flex-direction: column
  position: relative

.user-date-label
  color: gray
  position: absolute
  padding: 0 5px
  left: 15px
  pointer-events: none
  transform: translateY(-50%) scale(0.8)
  background-color: white

.input-date
  color: gray
  min-width: 80%
  border: solid 1.5px #ccc
  border-radius: 5px
  background: none
  padding: 1rem
  font-size: 1rem
  transition: border 150ms cubic-bezier(0.4, 0, 0.2, 7)
  &:focus
    border: 1.5px solid #ccc
    outline: none

h1, h4
  text-align: center
h4, p
  color: gray
h4
  font-size: 21px
  font-weight: 100
  margin-bottom: 40px
p
  font-size: 13px

.report-modal-button
  display: flex
  justify-content: center
  align-items: center
  width: 100%

.report-button
  margin-top: 30px
  margin-bottom: 10px
  background-color: rgb(255, 190, 18)
  color: black
  padding: 1rem 3rem
  border: none
  border-radius: 25px
  cursor: pointer
  font-size: 20px
  font-weight: 700
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3)

.error-message
  color: red
  font-size: 12px
  margin-top: 5px

@media (max-width: 1440px)
  .user-text-label
    transform: translateY(-340%) scale(0.8)

@media (max-width: 1024px)
  .user-text-label
    transform: translateY(-40%) scale(0.8)
  .input-text
    min-width: 91.6%
  h1
    font-size: 25px
  h4
    font-size: 18px
  .report-button
    font-size: 18px

@media (max-width: 768px)
  .modal-content
    width: 50vw
  .user-text-label
    transform: translateY(-40%) scale(0.8)
  .input-text
    min-width: 90%
  h1
    font-size: 22px
  h4
    font-size: 16px
  .report-button
    font-size: 16px

@media (max-width: 425px)
  h1
    font-size: 18px
  h4
    font-size: 16px
  .modal-content
    width: 80vw
  .user-text-label
    transform: translateY(-40%) scale(0.8)
  .report-button
    font-size: 14px

@media (max-width: 375px)
  .modal-content
    width: 80vw
  .user-text-label
    transform: translateY(-340%) scale(0.8)
</style>
