<template>
    <mdb-container style="margin-top: 1.5rem!important;">
        <div style="display:flex; justify-content: center;">
            <mdb-btn @click.native="modal = true" gradient="peach"><mdb-icon icon="plus" class="mr-2"/>Sign Up</mdb-btn>
        </div>
      <mdb-modal :show="modal" @close="modal = false">
      <mdb-modal-header class="text-center">
        <mdb-modal-title tag="h4" bold class="w-100">Sign up</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body class="mx-3 grey-text">
        <mdb-input v-model="userName" label="Username" icon="user" class="mb-5"/>
        <mdb-input v-model="email" label="Email" icon="envelope" type="email" class="mb-5"/>
        <mdb-input v-model="password" label="Password" icon="lock" type="password"/>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn @click="Register()" gradient="peach">Sign Up</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
    </mdb-container>
</template>

<script>
import { mdbIcon, mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbTooltip, mdbPopover, mdbInput, mdbTextarea, mdbContainer, mdbRow, mdbCol } from 'mdbvue'
import axios from 'axios'

export default {
  name: 'ModalPage',
  data () {
    return {
      userName: null,
      email: null,
      password: null,
      modal: false,
      // eslint-disable-next-line
      emailReg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      // eslint-disable-next-line
      passwordReg: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    }
  },
  components: {
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbTooltip,
    mdbPopover,
    mdbInput,
    mdbTextarea,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbIcon
  },
  methods: {
    Register () {
      if (!this.emailReg.test(this.email)) {
        this.$toasted.show('Please enter a valid email adress', {
          theme: 'bubble',
          position: 'top-right',
          duration: 5000,
          type: 'error',
          icon: 'error'
        })
        return
      }
      if (!this.passwordReg.test(this.password)) {
        this.$toasted.show('Password requirements: At least 8 characters, 1 number, 1 upper and 1 lowercase', {
          theme: 'bubble',
          position: 'top-right',
          duration: 10000,
          type: 'error',
          icon: 'error'
        })
        return
      }
      axios.post('/api/user/createUser', {
        userName: this.userName,
        email: this.email,
        password: this.password
      }).then(res => {
        let data = res.data
        if (data.success) {
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
      })
    }
  }
}
</script>
