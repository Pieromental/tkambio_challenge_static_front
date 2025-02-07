<template>
  <div class="container-title">
    <h1 class="title-report">Generador de reportes TK</h1>
  </div>
  <div class="table-container">
    <table class="report-table">
      <thead>
        <tr>
          <th class="align-left">Título</th>
          <th class="align-center">Fecha de creación</th>
          <th class="align-right">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="report in reports" :key="report.report_id">
          <td class="align-left-td">{{ report.title }}</td>
          <td class="align-center">{{ report.created_at }}</td>
          <td class="align-right">
            <div class="button-container-table">
              <ReportButton
                :prop-class="'report-button-table'"
                :prop-title="'Descargar'"
                :propIcon="downloadIcon"
                @click="exportReport(report)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
/****************************************************************************/
/*                             IMPORTS                                      */
/****************************************************************************/
import type { Reporte } from '@/modules/report/interfaces/report'
import { defineProps, ref, watch, type PropType } from 'vue'
import ReportButton from './ReportButton.vue'
import downloadIcon from '@/assets/icons/download.png'

import { useLoader } from '@/composable/loader/useLoader'
import { useAlert } from '@/composable/alert/useAlert'

/****************************************************************************/
/*                             COMPOSABLES                                    */
/****************************************************************************/
const { showLoader, hideLoader } = useLoader()
const { showAlert } = useAlert()

/****************************************************************************/
/*                             PROPS                                        */
/****************************************************************************/
const defProps = defineProps({
  propReporte: {
    type: Array as PropType<Reporte[]>,
    default: () => [],
  },
})
/****************************************************************************/
/*                             DATA                                         */
/****************************************************************************/
const reports = ref(defProps.propReporte)
/****************************************************************************/
/*                             WATCHER                                    */
/****************************************************************************/
watch(
  () => defProps.propReporte,
  (newValue) => {
    reports.value = newValue
  },
)
/****************************************************************************/
/*                             METHODS                                    */
/****************************************************************************/
const exportReport = async (report: Reporte) => {
  try {
    showLoader()

    await new Promise((resolve) => setTimeout(resolve, 1000))
    const filePath = `${import.meta.env.BASE_URL}/reports/Report.xlsx`;
    const link = document.createElement('a')
    link.href = filePath
    link.setAttribute('download', `Reporte_${report.created_at}.xlsx`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    hideLoader()
  } catch (error) {
    console.log(error)
    await showAlert({
      type: 'error',
      title: 'Error de descarga',
      message: 'No se pudo descargar el archivo.',
    })
  }
}
</script>

<style scoped lang="sass">
.container-title
  display: flex
  justify-content: center
  align-items: center

.title-report
  text-align: center
  margin-top: 25px
  margin-bottom: 45px

.table-container
  width: 100%
  overflow-x: auto
  -webkit-overflow-scrolling: touch

.report-table
  border-radius: 10px
  background-color: rgb(69, 99, 230)
  color: white
  width: 100%
  min-width: 600px
  border-collapse: collapse
  th,
  td
    padding: 8px

  thead
    position: relative

    &::before
      content: ''
      position: absolute
      top: 10
      bottom: -3px
      left: 20px
      width: calc(100% - 40px)
      height: 5px
      background-color: #ccc

  tbody tr
    position: relative
  tbody tr::after
    content: ''
    position: absolute
    bottom: 0
    left: 3%
    right: 3%
    height: 1px
    background-color: #ccc
  tbody tr:last-child::after
    display: none


  tbody tr
    td
      position: relative
      padding: 9px
      &:not(:last-child)::after
        content: ''
        position: absolute
        top: 25%
        bottom: 25%
        right: 0
        width: 5px
        background-color: #ccc

  .align-left
    text-align: left
    padding: 17px
    font-weight: 100
    font-size: 20px
  .align-left-td
    text-align: left
    padding-left: 20px
    font-weight: 100
    font-size: 15px
  .align-center
    text-align: center
    font-weight: 100
    font-size: 20px
  .align-right
    text-align: right
    padding-right: 20px
    font-weight: 100
    font-size: 20px

.button-container-table
  justify-content: right

.report-button-table
  background-color: transparent
  color: white
  padding: 0.5rem 1rem
  border: none
  border-radius: 0
  font-size: 18px
  font-weight: 700
  cursor: pointer

@media (max-width: 2560px)
  .report-table
    width: 70%
    margin: 0 auto

@media (max-width: 1440px)
  .report-table
    width: 70%
    margin: 0 auto

@media (max-width: 1024px)
  .report-table
    width: 70%
    margin: 0 auto

@media (max-width: 768px)
  .title-report
    font-size: 25px
    margin-bottom: 35px

@media (max-width: 425px)
  .table-container
    padding: 0 0
  .report-table
    margin: 20px

  .title-report
    font-size: 25px
    margin-bottom: 10px

@media (max-width: 320px)
  .title-report
    font-size: 20px
    margin-bottom: 15px
</style>
