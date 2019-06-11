<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn block color="light-blue darken-4" outline v-on="on">New User? Register!</v-btn>
      </template>
      <v-card>
        <v-card-title style="justify-content:center;">
          <span class="headline">Register</span>
        </v-card-title>
        <v-divider />
        <v-card-text v-on:keyup.enter="Register">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field prepend-icon="person" label="Username" v-model="userName" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="alternate_email" label="Email" v-model="email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="lock" label="Password" type="password" v-model="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="Register">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    dialog: false,
    userName: null,
    email: null,
    password: null,
    // eslint-disable-next-line
    emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    // eslint-disable-next-line
    passwordReg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  }),
  methods: {
    Register () {
      if (!this.emailReg.test(this.email)) {
        this.$toasted.show('Please enter a valid email adress', {
          theme: 'bubble',
          position: 'top-right',
          duration: 10000,
          type: 'warning',
          icon: 'warning'
        })
        return
      }
      if (!this.passwordReg.test(this.password)) {
        this.$toasted.show('Password requirements: At least 8 characters, 1 number, 1 upper and 1 lowercase', {
          theme: 'bubble',
          position: 'top-right',
          duration: 10000,
          type: 'warning',
          icon: 'warning'
        })
        return
      }
      let loader = this.$loading.show({
        width: 100,
        height: 100,
        color: '#1976d2'
      })
      axios.post('/api/user/createUser', {
        userName: this.userName,
        email: this.email,
        password: this.password
      }).then(res => {
        let data = res.data
        if (data.success) {
          this.$root.$emit('logedIn')
          this.$cookie.set('portfolioManagerToken', data.token, { expires: '1D' })
          localStorage.setItem('portfolioManagerUserName', this.userName)
          this.$router.push({ name: 'dashboard' })
        }
      }).catch(e => {
        this.$toasted.show(e, {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'error',
          icon: 'error'
        })
      }).finally(() => {
        loader.hide()
      })
    }
  }
}
</script>
