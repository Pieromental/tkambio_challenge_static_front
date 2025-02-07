<template>
  <div class="report-table-container">
    <ReportTable :propReporte="dataReport"></ReportTable>
  </div>
  <div class="report-table-button">
    <ReportButton
      :prop-class="'report-button-view'"
      :prop-title="'Crear reporte'"
      @actionModal="showModal = true"
    />
  </div>
  <ReportModal v-if="showModal" @closeModal="closeModal" />
</template>
<script lang="ts" setup>
/****************************************************************************/
/*                             IMPORTS                                      */
/****************************************************************************/
import { onMounted, ref } from 'vue'
import { useLoader } from '@/composable/loader/useLoader'

import ReportTable from '../components/ReportTable.vue'
import ReportModal from '../components/ReportModal.vue'
import ReportButton from '../components/ReportButton.vue'

import mockDataReport from '@/mocks//mockDataReport.json'
import type { Reporte } from '../interfaces/report'
/****************************************************************************/
/*                             COMPOSABLES                                    */
/****************************************************************************/

const { showLoader, hideLoader } = useLoader()

/****************************************************************************/
/*                             DATA                                       */
/****************************************************************************/
const dataReport = ref<Reporte[]>([])
const showModal = ref(false)
/****************************************************************************/
/*                             METHODS                                       */
/****************************************************************************/

const listReport = async () => {
  try {
    showLoader()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const storedReports = localStorage.getItem('mock_reports')
    if (storedReports) {
      dataReport.value = JSON.parse(storedReports)
    } else {
      dataReport.value = mockDataReport
    }

    hideLoader()
  } catch (error) {
    console.log(error)
  }
}
const closeModal = async () => {
  showModal.value = false
  await listReport()
}
/****************************************************************************/
/*                             LYFECICLE                                     */
/****************************************************************************/
onMounted(() => {
  listReport()
})
</script>
<style scoped lang="sass">
.report-table-container
  width: 100%
  margin: 0 auto
  border-radious:5px

.report-table-button
  display: flex
  justify-content: center
  align-items: center
  width: 100%

.report-button-view
  margin-top: 30px
  background-color: rgb(255, 190, 18)
  color: black
  padding: 1rem 3rem
  border: none
  border-radius: 25px
  cursor: pointer
  font-size: 20px
  font-weight: 700
  &:hover
    background-color: rgba(255, 192, 18, 0.725)
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3)

@media (max-width: 1024px)
  .report-button-view
    font-size: 20px

@media (max-width: 768px)
  .report-button-view
    font-size: 18px

@media (max-width: 425px)
  .report-button-view
    font-size: 16px
</style>
