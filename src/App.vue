<template>
  <v-app :dark="theme == 'dark'">
    <navbar v-if="navbarVisible"/>
    <v-content>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/NavberVuetify'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      navbarVisible: false,
      theme: 'light'
    }
  },
  mounted () {
    this.navbarVisible = this.$route.name !== 'login'
    this.$root.$on('logedIn', () => {
      this.navbarVisible = true
    })
    this.$root.$on('logedOut', () => {
      this.navbarVisible = false
    })
    this.$root.$on('ThemeChanged', (theme) => {
      this.theme = theme
    })
  }
}
</script>

<style>
.body, html {
    height: 100%;
    background-repeat: no-repeat;
    background-image: url("./assets/302011.jpg");
    background-attachment: fixed;
    background-size: cover;
    background-position: 50% 0%;
}
</style>
