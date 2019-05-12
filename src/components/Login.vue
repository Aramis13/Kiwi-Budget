<template>
<mdbContainer>
  <section class="form-simple">
    <mdb-row class="justify-content-center mx-auto mt-5">
      <mdb-col md="5">
        <mdb-card>
          <div class="header pt-3 blue lighten-2">
            <mdb-row class="d-flex justify-content-center">
              <h3 class="deep-grey-text mt-3 mb-4 pb-1 mx-5">Log in</h3>
            </mdb-row>
          </div>
          <mdb-card-body class="mx-3 grey-text">
            <mdb-input class="mb-5" v-model="email" icon="envelope" label="Email" type="text"/>
            <mdb-input v-model="password" icon="lock" label="Password" type="password" containerClass="mb-0"/>
            <p class="error-msg">{{errorMsg}}</p>
            <div class="text-center">
              <mdb-btn v-on:click="Submit()" type="button" gradient="blue" rounded class="btn-block z-depth-1a" :disabled="!emailValidated || !passwordValidated">Sign in</mdb-btn>
            </div>
            <Register />
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </section>
</mdbContainer>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbInput, mdbBtn, mdbContainer } from 'mdbvue'
import Register from './Register'
import axios from 'axios'
export default {
  name: 'FormsPage',
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbInput,
    mdbBtn,
    mdbContainer,
    Register
  },
  data () {
    return {
      email: null,
      password: null,
      emailValidated: false,
      passwordValidated: false,
      // eslint-disable-next-line
      emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      // eslint-disable-next-line
      passwordReg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      errorMsg: ''
    }
  },
  watch: {
    email (val) {
      if (this.emailReg.test(val)) {
        this.emailValidated = true
        this.errorMsg = ''
        // eslint-disable-next-line
      }
      else {
        this.errorMsg = 'Invalid Email'
        this.emailValidated = false
      }
    },
    password (val) {
      if (this.passwordReg.test(val)) {
        this.passwordValidated = true
        this.errorMsg = ''
        // eslint-disable-next-line
      }
      else {
        this.errorMsg = 'Password requirements: At least 8 characters, 1 number, 1 upper and 1 lowercase'
        this.passwordValidated = false
      }
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
          this.$cookie.set('portfolioManagerToken', data.token, { expires: '1D' })
          this.$router.push({ name: 'dashboard', params: { userName: data.userName } })
        }
      }).catch(e => {
        this.errorMsg = e
      })
    }
  }
}
</script>

<style scoped>
  .error-msg {
    display: flex;
    justify-content: center;
    color: orangered;
  }

  .form-simple .font-small {
    font-size: 0.8rem; }

  .form-simple .header {
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem; }

  .form-simple input[type=text]:focus:not([readonly]) {
    border-bottom: 1px solid #ff3547;
    -webkit-box-shadow: 0 1px 0 0 #ff3547;
    box-shadow: 0 1px 0 0 #ff3547; }

  .form-simple input[type=text]:focus:not([readonly]) + label {
    color: #4f4f4f; }

  .form-simple input[type=password]:focus:not([readonly]) {
    border-bottom: 1px solid #ff3547;
    -webkit-box-shadow: 0 1px 0 0 #ff3547;
    box-shadow: 0 1px 0 0 #ff3547; }

  .form-simple input[type=password]:focus:not([readonly]) + label {
    color: #4f4f4f; }
</style>
