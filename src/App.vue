<template>
  <div id="app">
    <!--img src="./assets/logo.png"-->
    <router-view/>
    <div id="root">
      <router-link to="/login">Go to Login</router-link>
      <router-link to="/gmap">Go to Gmap</router-link>
      <router-link to="/addShop">Go to addShop</router-link>
      <router-link to="/counter">Go to Counter</router-link>
      <router-link to="/todos">Go to Todos</router-link>
      <router-link to="/parent">Go to Parent</router-link>
      <router-link to="/Cam">Go to Cam</router-link>
      <router-link to="/GPS">Go to GPS</router-link>
      <router-link to="/Slides">Go to Slides</router-link>
      <router-link to="/Menus">Go to Menus</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
