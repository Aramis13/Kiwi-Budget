<template>
  <div id="app">
    <Login />
  </div>
</template>

<script>
import Login from '@/components/Login'

export default {
  name: 'App',
  components: {
    Login
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
