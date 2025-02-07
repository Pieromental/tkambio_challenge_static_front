<template>
  <div class="not-found">
    <h1>Error 404</h1>
    <p>La página que estás buscando no existe</p>
    <router-link to="/auth">Volver al inicio</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 3rem;
  color: red;
}

p {
  font-size: 1.5rem;
}
</style>
