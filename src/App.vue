<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

export default {
  name: 'App',
  components: {
    Login,
    Dashboard
  }
}
</script>

<style>
body ,html {
    height: 100%;
    background-repeat: no-repeat;
    background-image: url("./assets/302011.jpg");
    background-attachment: fixed;
    background-size: cover;
    background-position: 50% 0%;
}

</style>
