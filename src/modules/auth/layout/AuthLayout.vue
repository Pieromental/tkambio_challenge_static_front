<template>
  <div class="layout">
    <div class="layout__left">
      <div class="layout__left_box-container">
        <img
          class="layout__left_box-container-logo"
          src="@/assets/image/bg-tkambio-v2.png"
          alt="logo tkambio"
        />
        <img
          class="layout__left_box-container-img"
          src="@/assets/image/girl_phone.png"
          alt="logo tkambio"
        />
      </div>
    </div>
    <div class="layout__right">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="sass">
@import '@/assets/styles/main.sass'

.layout
  display: flex
  justify-content: center
  align-items: center
  height: 100vh

  &__left
    width: 50%
    height: 100%
    background: rgb(0,210,255)
    background: linear-gradient(137deg, rgba(0,210,255,1) 0%, rgba(58,123,213,1) 98%)

    @include responsive("lg", "max")
      display: none

    &_box-container
      display: flex
      justify-content: center
      align-items: center
      flex-direction: column
      height: 100%
      &-logo
        height: 7%
      &-img
        margin-top: 1.5rem
        height: 60%

  &__right
    width: 50%
    height: 100%
    @include responsive("lg", "max")
      width: 90%
</style>
