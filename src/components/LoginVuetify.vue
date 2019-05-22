<template>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card style="min-height:375px;" class="elevation-12">
              <v-toolbar style="display:flex; justify-content:center; height:75px;" dark color="primary">
                <v-toolbar-title class="display-3">Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="alternate_email" name="Email" label="Email" type="email" v-model="email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions style="justify-content:center; display:grid;">
                <v-spacer></v-spacer>
                <v-btn @click="Submit()" large dark color="primary">Submit</v-btn>
              </v-card-actions>
              <v-card-actions class="mt-2" style="justify-content:center; display:flow-root;">
                  <v-spacer></v-spacer>
                <Register />
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import Register from './RegisterVuetify'
import axios from 'axios'
export default {
  components: {
    Register
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    Submit () {
      axios.post('/api/user/login', {
        email: this.email,
        password: this.password
      }).then(res => {
        let data = res.data
        if (data.auth) {
          this.$root.$emit('logedIn')
          this.$cookie.set('portfolioManagerToken', data.token, { expires: '1D' })
          localStorage.setItem('portfolioManagerUserName', data.userName)
          this.$router.push({ name: 'dashboard' })
          // eslint-disable-next-line
        }
        else {
          this.$toasted.show(data.message, {
            theme: 'bubble',
            position: 'top-right',
            duration: 5000,
            type: 'error',
            icon: 'error'
          })
        }
      }).catch(e => {
        this.$toasted.show(e, {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'error',
          icon: 'error'
        })
      })
    }
  }
}
</script>
