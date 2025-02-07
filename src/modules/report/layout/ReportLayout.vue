<template>
  <div class="layout-container">
    <div class="header">
      <img
        class="layout__left_box-container-logo"
        src="@/assets/image/bg-tkambio-v2.png"
        alt="logo tkambio"
      />
    </div>
    <div class="router-view">
      <RouterView />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '@/assets/styles/main.sass'
.header
    height: 12vh
    background: linear-gradient(to bottom, rgb(7,168,240), rgb(69,99,230))
    display: flex
    align-items: center
    justify-content: center
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3)
    @include responsive("lg", "max")
        padding-left: 20px
        justify-content: left


img
    height: 50%

.router-view
    height: 88vh
</style>
