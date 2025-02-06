<template>
  <div class="log-container">
    <h1 class="log-container-title">Inicia Sesión</h1>
    <form action="">
      <div class="log-container-group">
        <label for="email" class="log-container-label"> Correo</label>
        <input type="text" class="log-container-input" />
      </div>
      <div class="log-container-group">
        <label for="password" class="log-container-label">Contraseña</label>
        <input type="text" class="log-container-input" />
      </div>
      <div class="log-container-remenber-me">
        <input type="checkbox" class="log-container-remenber-me-check-box" />
        <label class="log-container-remenber-me-label">Recordar Sesión</label>
      </div>
      <div class="log-container-log-button">
        <button>Iniciar Sesión</button>
      </div>
    </form>
  </div>
</template>

<style lang="sass">
.log-container
  display: flex
  align-items: center
  justify-content: center
  min-height: 100%
  flex-direction: column

  &-title
    width: 100%
    font-size: 1.5rem
    font-weight: 600
    margin-bottom: 1rem
    text-align: center
  form
    min-width: 80%
  &-group
    display: flex
    flex-direction: column
    margin-bottom: 1rem

  &-label
    color: #4b5563
    margin-bottom: 0.5rem

  &-input
    min-width: 100%
    height: 30px
    border: 1px solid #d1d5db
    border-radius: 0.375rem
    padding: 0.5rem 0.75rem
    outline: none
    &:focus
      border-color: #3b82f6


  &-remenber-me
    margin-top: 1.5rem
    margin-bottom: 1.5rem

    &-check-box
      transform: scale(1.5)
      accent-color: #0FBCF4
    &-label
      margin-left:1rem
  &-log-button
    width:  100%
    display: flex
    justify-content: center
    align-items: center
    button
      min-width: 40%
      background-color: #FFAE0E
      color: black
      font-size: 1.1rem
      border-radius: 2rem
      height: 50px
      font-weight: bold
      border: none
      cursor: pointer
      transition: background 0.3s ease
      &:hover
        background-color: darken(#FFAE0E, 10%)
</style>
