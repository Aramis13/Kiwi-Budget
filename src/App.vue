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
import Axios from 'axios'
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
  created () {
    Axios.get('/api/configuration/getTheme').then(res => {
      this.$root.$emit('ThemeChanged', res.data)
    }).catch(e => {
      // ToDo
    })
  },
  mounted () {
    this.navbarVisible = this.$route.name !== 'login'
    this.$root.$on('logedIn', () => {
      this.navbarVisible = true
      location.reload()
    })
    this.$root.$on('logedOut', () => {
      this.navbarVisible = false
    })
    this.$root.$on('ThemeChanged', (theme) => {
      if (this.theme !== theme) {
        this.theme = theme
      }
    })
  }
}
</script>
